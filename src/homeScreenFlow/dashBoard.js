import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native'
import React, { useState, useRef, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from './components/SearchBar';
import { AppContext } from '../context/AppContext';

const { width } = Dimensions.get('window');

const StatCard = ({ title, value, icon, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <View style={styles.statIconContainer}>
      <Icon name={icon} size={28} color={color} />
    </View>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  </View>
);

const recentActivities = [
  { id: 1, title: 'UI Design Review', time: '10:00 AM', status: 'Completed', color: '#4CAF50' },
  { id: 2, title: 'API Integration', time: '1:30 PM', status: 'In Progress', color: '#FF9800' },
  { id: 3, title: 'Client Meeting', time: '4:00 PM', status: 'Pending', color: '#F44336' },
];

const dashBoard = ({ navigation }) => {
  const { tasksData, teamMembers, attendanceData, addTask, markAttendance } = useContext(AppContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);

  const [isTaskModalVisible, setTaskModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');

  const [isLeaveModalVisible, setLeaveModalVisible] = useState(false);
  const [leaveName, setLeaveName] = useState('');

  const handleAddTask = () => {
    if (taskTitle && taskAssignee) {
      addTask({
        title: taskTitle,
        assignee: taskAssignee,
        status: 'Pending',
        due: new Date().toISOString().split('T')[0],
        priority: 'Medium',
        color: '#FF9800'
      });
      setTaskTitle('');
      setTaskAssignee('');
      setTaskModalVisible(false);
    }
  };

  const handleLeaveRequest = () => {
    if (leaveName) {
      const member = attendanceData.find(m => m.name.toLowerCase() === leaveName.toLowerCase());
      if (member) {
        markAttendance(member.id, 'On Leave', '--:-- AM', '--:-- PM');
      }
      setLeaveName('');
      setLeaveModalVisible(false);
    }
  };

  const thumbHeight = contentHeight > containerHeight
    ? Math.max(48, (containerHeight / contentHeight) * containerHeight)
    : containerHeight;

  const maxScrollOffset = Math.max(1, contentHeight - containerHeight);
  const maxThumbOffset = Math.max(0, containerHeight - thumbHeight);

  const thumbTop = scrollY.interpolate({
    inputRange: [0, maxScrollOffset],
    outputRange: [0, maxThumbOffset],
    extrapolate: 'clamp',
  });

  const presentCount = attendanceData.filter(m => m.status === 'Present' || m.status === 'Late').length;
  const openTasksCount = tasksData.filter(t => t.status !== 'Completed').length;

  return (
    <LinearGradient
      colors={['#FCFBFE', '#F1DBFD']}
      style={{ flex: 1 }}
    >
      <View className='mx-4 flex-1'>
        {/* Header */}
        <View className='flex flex-row justify-between items-center mt-16 '>
          <TouchableOpacity onPress={() => navigation.navigate('hamburgerMenu')}>
            <Icon name="menu" size={24} color="#9D869B" />
          </TouchableOpacity>
          <Text className='text-2xl font-aleo-bold text-center text-[#180537]'>Dashboard</Text>
          <TouchableOpacity onPress={() => navigation.navigate('hamburgerMenu')}>
            <Icon name="account-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <SearchBar placeholder='Search For Overview' />

        <View
          style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}
          onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
        >
          <Animated.ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={(_, h) => setContentHeight(h)}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <StatCard title="Total Staff" value={teamMembers.length} icon="account-group" color="#8A2B91" />
              <StatCard title="Present Today" value={presentCount} icon="calendar-check" color="#4CAF50" />
              <StatCard title="Open Tasks" value={openTasksCount} icon="clipboard-list" color="#FF9800" />
              <StatCard title="Productivity" value="85%" icon="chart-line" color="#2196F3" />
            </View>

            {/* Quick Actions */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>
            <View style={styles.quickActionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={() => setTaskModalVisible(true)}>
                <Icon name="plus-circle-outline" size={24} color="#8A2B91" />
                <Text style={styles.actionText}>Add Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => setLeaveModalVisible(true)}>
                <Icon name="calendar-plus" size={24} color="#8A2B91" />
                <Text style={styles.actionText}>Leave Req</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Analytics')}>
                <Icon name="file-document-outline" size={24} color="#8A2B91" />
                <Text style={styles.actionText}>Report</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Activities */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activities</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={[styles.activityDot, { backgroundColor: activity.color }]} />
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: activity.color + '20' }]}>
                  <Text style={[styles.statusText, { color: activity.color }]}>{activity.status}</Text>
                </View>
              </View>
            ))}

          </Animated.ScrollView>
          <View style={{ width: 6, marginLeft: 6, marginVertical: 16, borderRadius: 3, backgroundColor: '#E0C4E8', height: containerHeight - 32, overflow: 'hidden' }}>
            <Animated.View style={{ width: 6, height: thumbHeight, borderRadius: 3, marginTop: thumbTop, overflow: 'hidden' }}>
              <LinearGradient
                colors={['#AB3A8D', '#3D058B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1 }}
              />
            </Animated.View>
          </View>
        </View>

        {/* Add Task Modal */}
        <Modal visible={isTaskModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Task</Text>
              <TextInput style={styles.input} placeholder="Task Title" value={taskTitle} onChangeText={setTaskTitle} placeholderTextColor="#888" />
              <TextInput style={styles.input} placeholder="Assignee Name" value={taskAssignee} onChangeText={setTaskAssignee} placeholderTextColor="#888" />
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => setTaskModalVisible(false)} style={[styles.modalButton, { backgroundColor: '#F44336' }]}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddTask} style={[styles.modalButton, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.modalButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Leave Request Modal */}
        <Modal visible={isLeaveModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Request Leave</Text>
              <TextInput style={styles.input} placeholder="Employee Name" value={leaveName} onChangeText={setLeaveName} placeholderTextColor="#888" />
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => setLeaveModalVisible(false)} style={[styles.modalButton, { backgroundColor: '#F44336' }]}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLeaveRequest} style={[styles.modalButton, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.modalButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </LinearGradient>
  )
}

export default dashBoard

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Aleo-Bold',
    color: '#180537',
  },
  statTitle: {
    fontSize: 12,
    fontFamily: 'Aleo-Regular',
    color: '#18053799',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Aleo-Bold',
    color: '#180537',
  },
  seeAllText: {
    fontSize: 12,
    fontFamily: 'Aleo-SemiBold',
    color: '#8A2B91',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Aleo-Medium',
    color: '#180537',
    marginTop: 6,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Aleo-SemiBold',
    color: '#180537',
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Aleo-Regular',
    color: '#18053799',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Aleo-Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Aleo-Bold',
    marginBottom: 16,
    color: '#180537'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontFamily: 'Aleo-Regular',
    color: '#000'
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center'
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Aleo-Bold',
  }
})