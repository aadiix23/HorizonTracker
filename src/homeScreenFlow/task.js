import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
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
          <Text className='text-2xl font-aleo-bold text-center text-[#180537]'>Tasks</Text>
          <Icon name="account-circle" size={24} color="black" />
        </View>
        <View className="bg-[#EFEFEF] py-4 mt-6 shadow-sm -mx-3">
          <View className="flex flex-row justify-between items-center px-6">
            <View className="items-start">
              <Text className="text-[#8A2B91CC] text-s font-aleo-semibold mb-1">Assignment date :</Text>
              <View className="flex flex-row items-center gap-x-1">
                <Icon name="calendar-outline" size={14} color="#18053799" />
                <Text className="text-[#18053799] text-s font-aleo-semibold ml-1">7 feb , 2026</Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-[#8A2B91CC] text-s font-aleo-semibold mb-1">Due date :</Text>
              <View className="flex flex-row items-center gap-x-1">
                <Icon name="calendar-outline" size={14} color="#18053799" />
                <Text className="text-[#18053799] text-s font-aleo-semibold ml-1">8 feb , 2026</Text>
              </View>
            </View>
          </View>
        </View>
        <SearchBar placeholder='Search For Task To Manage' />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}

        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default attendence

const styles = StyleSheet.create({})