import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from './components/SearchBar';
import TeamMemberCard from './components/TeamMemberCard';
import { ScrollView } from 'react-native-gesture-handler';

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

const team = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#FCFBFE', '#F1DBFD']}
      style={{ flex: 1 }}
    >
      <View className='mx-4'>
        <View className='flex flex-row justify-between items-center mt-16 '>
          <TouchableOpacity onPress={() => navigation.navigate('hamburgerMenu')}>
            <Icon name="menu" size={24} color="#9D869B" />
          </TouchableOpacity>
          <Text className='text-2xl font-aleo-bold text-center text-[#180537]'>Analytics</Text>
          <Icon name="account-circle" size={24} color="black" />
        </View>
        <SearchBar placeholder='Search For Team Member Analytics' />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}>
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </ScrollView>

      </View>
    </LinearGradient>
  )
}

export default team

const styles = StyleSheet.create({})