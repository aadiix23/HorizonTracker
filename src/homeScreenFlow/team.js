import { StyleSheet, Text, View, Image, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
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

const team = ({ navigation }) => {
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
          <Text className='text-2xl font-aleo-bold text-center text-[#180537]'>Team Members</Text>
          <Icon name="account-circle" size={24} color="black" />
        </View>
        <SearchBar placeholder='Search For Team Members' />

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

export default team

const styles = StyleSheet.create({})