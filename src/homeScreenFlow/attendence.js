import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Person from '../assets/Images/clarity_employee-line.svg';
import SearchBar from './components/SearchBar';
import TeamMemberCard from './components/TeamMemberCard';

const teamMembers = [
  { id: 1, name: 'Divyansh Pandey', email: 'divyansh@devhorizon.in', role: 'UI/UX Designer, Database, Team manager', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Alok Verma', email: 'alok@devhorizon.in', role: 'Frontend Developer, React Native', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'Rohan Gupta', email: 'rohan@devhorizon.in', role: 'Backend Engineer, Node.js', image: 'https://randomuser.me/api/portraits/men/46.jpg' },
  { id: 4, name: 'Isha Patel', email: 'isha@devhorizon.in', role: 'QA Lead, Automation', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@devhorizon.in', role: 'DevOps, AWS Cloud', image: 'https://randomuser.me/api/portraits/men/85.jpg' },
  { id: 6, name: 'Kritika Roy', email: 'kritika@devhorizon.in', role: 'Product Designer, Figma', image: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { id: 7, name: 'Amit Verma', email: 'amit@devhorizon.in', role: 'Mobile Lead, Architecture', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: 8, name: 'Sneha Reddy', email: 'sneha@devhorizon.in', role: 'UI Designer, Illustrations', image: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { id: 9, name: 'Arjun Das', email: 'arjun@devhorizon.in', role: 'Database Admin, PostgreSQL', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: 10, name: 'Megha Jain', email: 'megha@devhorizon.in', role: 'HR Manager, Operations', image: 'https://randomuser.me/api/portraits/women/50.jpg' },
];

const attendence = ({ navigation }) => {
  const [selected, setSelected] = useState("2026-02-12");

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
            <Text className='text-2xl font-aleo-bold text-center text-[#8A2B91] mt-1 ml-1'>Feb</Text>
            <Text className='text-sm font-aleo-bold text-[#180537] mt-3 ml-1'>2026</Text>
          </View>
          <View className='flex flex-row items-center mt-10'>
            <Text className='text-lg font-aleo-medium text-[#18053799] mr-1'>Office</Text>
            <Icon name="chevron-down" size={22} color="#18053799" />
          </View>
        </View>

        <View className="bg-[#EFEFEF] py-4 mt-6 shadow-sm -mx-3">
          <View className="flex flex-row justify-around items-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
              const dateStr = `2026-02-${(10 + index).toString().padStart(2, '0')}`;
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
                    {10 + index}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className='flex flex-row items-center mt-10 gap-2'>
          <Person />
          <Text className='text-2xl font-aleo-medium text-[#18053799]'>Team Members</Text>
        </View>

        <SearchBar placeholder='Search For Members' />

        {/* List + custom scrollbar */}
        <View
          style={{ flex: 1, flexDirection: 'row' }}
          onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
        >
          {/* Card list */}
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
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
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

const styles = StyleSheet.create({})