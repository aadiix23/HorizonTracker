import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Person from '../assets/Images/clarity_employee-line.svg';

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

const attendence = () => {
  const [selected, setSelected] = useState("2026-02-12");
  return (
    <LinearGradient
      colors={['#FCFBFE', '#F1DBFD']}
      style={{ flex: 1 }}
    >
      <View className='mx-4 flex-1'>
        <View className='flex flex-row justify-between items-center mt-16 '>
          <Icon name="menu" size={24} color="#9D869B" />
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
                  className={`flex items-center justify-center w-10 py-3 rounded-lg ${isSelected ? 'bg-[#8A2B91]' : ''
                    }`}
                >
                  <Text
                    className={`text-xs font-aleo-regular mb-1 ${isSelected ? 'text-white' : 'text-[#18053799]'
                      }`}
                  >
                    {day}
                  </Text>
                  <Text
                    className={`text-lg font-aleo-bold ${isSelected ? 'text-white' : 'text-[#180537]'
                      }`}
                  >
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
        <View className='mt-5 flex-row items-center border-[1.5px] border-[#8A2B9133] rounded-xl bg-white/50 px-4 h-14'>
          <TextInput
            className='flex-1 font-aleo-regular text-[#18053799] text-lg'
            placeholder='Search for members'
            placeholderTextColor='#18053766'
          />
          <View className='w-[1px] h-8 bg-[#8A2B9133] mx-3' />
          <Icon name="magnify" size={28} color="#18053799" />
        </View>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {teamMembers.map((member) => (
            <View key={member.id} className="bg-white rounded-xl p-4 mt-6 shadow-sm shadow-[#8A2B9122]" >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: member.image }}
                    className="w-14 h-14 rounded-full mr-4 bg-[#8A2B9111]"
                  />
                  <View>
                    <Text className="text-xl font-aleo-bold text-[#8A2B91CC]">{member.name}</Text>
                    <Text className="text-l font-aleo-semibold text-[#18053799]">{member.email}</Text>
                  </View>
                </View>
                <View className="self-start">
                  <Icon name="dots-horizontal" size={24} color="#18053733" />
                </View>
              </View>
              <View className="mt-4 b border-[#00000005] pt-3">
                <Text className="text-sm font-aleo-medium text-[#18053799]">
                  {member.role}
                </Text>
              </View>
            </View>
          ))}

        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default attendence

const styles = StyleSheet.create({})