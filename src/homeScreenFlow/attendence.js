import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Person from '../assets/Images/clarity_employee-line.svg';
import SearchBar from './components/SearchBar';
import TeamMemberCard from './components/TeamMemberCard'; // Kept for reference or if you still want generic cards, but we'll use a custom AttendanceCard

import { AppContext } from '../context/AppContext';

const AttendanceCard = ({ member, onMarkPresent, onMarkAbsent }) => {
  const swipeableRef = useRef(null);
  let statusColor = '#4CAF50'; // Present
  let bgColor = '#E8F5E9';
  if (member.status === 'Absent') {
    statusColor = '#F44336';
    bgColor = '#FFEBEE';
  } else if (member.status === 'Late') {
    statusColor = '#FF9800';
    bgColor = '#FFF3E0';
  } else if (member.status === 'On Leave') {
    statusColor = '#9E9E9E';
    bgColor = '#F5F5F5';
  }

  const handleMarkPresent = () => {
    onMarkPresent(member.id);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const handleMarkAbsent = () => {
    onMarkAbsent(member.id);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const renderLeftActions = () => {
    return (
      <View style={{ backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 20, borderRadius: 12, marginBottom: 12, flex: 1 }}>
        <Icon name="check-circle" size={32} color="#FFF" />
      </View>
    );
  };

  const renderRightActions = () => {
    return (
      <View style={{ backgroundColor: '#F44336', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 20, borderRadius: 12, marginBottom: 12, flex: 1 }}>
        <Icon name="close-circle" size={32} color="#FFF" />
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={handleMarkPresent}
      onSwipeableRightOpen={handleMarkAbsent}
    >
      <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{member.name}</Text>
          <Text style={styles.userRole}>{member.role}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{member.status}</Text>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <View style={styles.timeBlock}>
          <Icon name="login" size={14} color="#4CAF50" />
          <Text style={styles.timeText}>In: {member.timeIn}</Text>
        </View>
        <View style={styles.timeBlock}>
          <Icon name="logout" size={14} color="#F44336" />
          <Text style={styles.timeText}>Out: {member.timeOut}</Text>
        </View>
      </View>
      </View>
    </Swipeable>
  );
};

const attendence = ({ navigation }) => {
  const { attendanceData, markAttendance } = React.useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMarkPresent = (id) => {
    const timeIn = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    markAttendance(id, 'Present', timeIn, '--:-- PM');
  };

  const handleMarkAbsent = (id) => {
    markAttendance(id, 'Absent', '--:-- AM', '--:-- PM');
  };

  const today = new Date();
  
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;
  
  const [selected, setSelected] = useState(todayStr);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = monthNames[today.getMonth()];
  const currentYear = today.getFullYear();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const filteredAttendance = attendanceData.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);

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
          <Text className='text-2xl font-aleo-bold text-center text-[#180537]'>Attendance</Text>
          <Icon name="account-circle" size={24} color="black" />
        </View>

        <View className='flex flex-row justify-between '>
          <View className='flex flex-row items-center mt-10'>
            <Icon name="calendar-blank-outline" size={24} color="#18053799" />
            <Text className='text-2xl font-aleo-bold text-center text-[#8A2B91] mt-1 ml-1'>{currentMonth}</Text>
            <Text className='text-sm font-aleo-bold text-[#180537] mt-3 ml-1'>{currentYear}</Text>
          </View>
          <View className='flex flex-row items-center mt-10'>
            <Text className='text-lg font-aleo-medium text-[#18053799] mr-1'>Office</Text>
            <Icon name="chevron-down" size={22} color="#18053799" />
          </View>
        </View>

        <View className="bg-[#EFEFEF] py-4 mt-6 shadow-sm -mx-3">
          <View className="flex flex-row justify-around items-center">
            {weekDays.map((dateObj, index) => {
              const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
              const day = dayLabels[index];
              
              const yyyy = dateObj.getFullYear();
              const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
              const dd = String(dateObj.getDate()).padStart(2, '0');
              const dateStr = `${yyyy}-${mm}-${dd}`;
              
              const isSelected = selected === dateStr;
              return (
                <View
                  key={index}
                  onTouchEnd={() => setSelected(dateStr)}
                  className={`flex items-center justify-center w-10 py-3 rounded-lg ${isSelected ? 'bg-[#8A2B91]' : ''}`}
                >
                  <Text className={`text-xs font-aleo-regular mb-1 ${isSelected ? 'text-white' : 'text-[#18053799]'}`}>
                    {day}
                  </Text>
                  <Text className={`text-lg font-aleo-bold ${isSelected ? 'text-white' : 'text-[#180537]'}`}>
                    {dateObj.getDate()}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className='flex flex-row items-center mt-10 gap-2'>
          <Person />
          <Text className='text-2xl font-aleo-medium text-[#18053799]'>Team Attendance</Text>
        </View>

        <SearchBar placeholder='Search For Members' value={searchQuery} onChangeText={setSearchQuery} />

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
            {filteredAttendance.map((member) => (
              <AttendanceCard 
                key={member.id} 
                member={member} 
                onMarkPresent={handleMarkPresent}
                onMarkAbsent={handleMarkAbsent}
              />
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
    </LinearGradient>
  )
}

export default attendence

const styles = StyleSheet.create({
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Aleo-Bold',
    color: '#180537',
  },
  userRole: {
    fontSize: 12,
    fontFamily: 'Aleo-Regular',
    color: '#18053799',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Aleo-Bold',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  timeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Aleo-Medium',
    color: '#180537',
    marginLeft: 4,
  }
})