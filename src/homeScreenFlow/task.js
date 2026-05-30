import { StyleSheet, Text, View, Animated, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState, useRef, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from './components/SearchBar';

import { AppContext } from '../context/AppContext';

const TaskCard = ({ task, onUpdateStatus }) => {
  const handleStatusPress = () => {
    let nextStatus = 'Pending';
    if (task.status === 'Pending') nextStatus = 'In Progress';
    else if (task.status === 'In Progress') nextStatus = 'Completed';
    else if (task.status === 'Completed') nextStatus = 'Pending';
    
    if (onUpdateStatus) {
      onUpdateStatus(task.id, nextStatus);
    }
  };

  return (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <View style={[styles.priorityBadge, { backgroundColor: task.color + '20' }]}>
          <Text style={[styles.priorityText, { color: task.color }]}>{task.priority}</Text>
        </View>
      </View>
      <View style={styles.taskDetails}>
        <View style={styles.taskRow}>
          <Icon name="account" size={16} color="#18053799" />
          <Text style={styles.taskDetailText}>{task.assignee}</Text>
        </View>
        <View style={styles.taskRow}>
          <Icon name="calendar-clock" size={16} color="#18053799" />
          <Text style={styles.taskDetailText}>Due: {task.due}</Text>
        </View>
      </View>
      <View style={styles.taskFooter}>
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={handleStatusPress}
          style={[styles.statusBadge, { backgroundColor: task.status === 'Completed' ? '#4CAF50' : task.status === 'In Progress' ? '#FF9800' : '#F44336' }]}
        >
          <Text style={styles.statusText}>{task.status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TaskScreen = ({ navigation }) => {
  const { tasksData, addTask, updateTaskStatus, teamMembers } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');

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
      setModalVisible(false);
    }
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);

  const filteredTasks = tasksData.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <LinearGradient
      colors={['#FCFBFE', '#F1DBFD']}
      style={{ flex: 1 }}
    >
      <View className='mx-4 flex-1'>
        <View className='flex flex-row justify-between items-center mt-16 '>
          <TouchableOpacity onPress={() => navigation.navigate('hamburgerMenu')}>
            <Icon name="menu" size={24} color="#9D869B" />
          </TouchableOpacity>
          <Text className='text-2xl font-aleo-bold text-center text-[#180537]'>Tasks</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="plus-circle" size={28} color="#8A2B91" />
          </TouchableOpacity>
        </View>
        <View className="bg-[#EFEFEF] py-4 mt-6 shadow-sm -mx-3 rounded-lg">
          <View className="flex flex-row justify-between items-center px-6">
            <View className="items-start">
              <Text className="text-[#8A2B91CC] text-xs font-aleo-semibold mb-1">Today's Tasks</Text>
              <Text className="text-[#180537] text-lg font-aleo-bold">{tasksData.filter(t => t.due === new Date().toISOString().split('T')[0]).length} Active</Text>
            </View>
            <View className="items-end">
              <Text className="text-[#8A2B91CC] text-xs font-aleo-semibold mb-1">Completed</Text>
              <Text className="text-[#180537] text-lg font-aleo-bold">{tasksData.filter(t => t.status === 'Completed').length}</Text>
            </View>
          </View>
        </View>
        <SearchBar placeholder='Search For Task To Manage' value={searchQuery} onChangeText={setSearchQuery} />

        <View
          style={{ flex: 1, flexDirection: 'row' }}
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
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onUpdateStatus={updateTaskStatus} />
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
      </View>

      {/* Add Task Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assign New Task</Text>
            <TextInput style={styles.input} placeholder="Task Title" value={taskTitle} onChangeText={setTaskTitle} placeholderTextColor="#888" />
            
            <Text style={{ fontFamily: 'Aleo-Medium', marginBottom: 8, color: '#180537' }}>Select Assignee:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
              {teamMembers.map(member => (
                <TouchableOpacity 
                  key={member.id} 
                  onPress={() => setTaskAssignee(member.name)}
                  style={{
                    backgroundColor: taskAssignee === member.name ? '#8A2B91' : '#F0F0F0',
                    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, margin: 4
                  }}
                >
                  <Text style={{ fontFamily: 'Aleo-Regular', fontSize: 12, color: taskAssignee === member.name ? '#FFF' : '#333' }}>
                    {member.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, { backgroundColor: '#F44336' }]}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddTask} style={[styles.modalButton, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.modalButtonText}>Assign Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  )
}

export default TaskScreen

const styles = StyleSheet.create({
  taskCard: {
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
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: 'Aleo-Bold',
    color: '#180537',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 10,
    fontFamily: 'Aleo-Bold',
  },
  taskDetails: {
    marginBottom: 12,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskDetailText: {
    fontSize: 12,
    fontFamily: 'Aleo-Regular',
    color: '#18053799',
    marginLeft: 6,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Aleo-Bold',
    color: '#FFFFFF',
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