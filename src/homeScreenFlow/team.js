import { StyleSheet, Text, View, Image, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from './components/SearchBar';
import TeamMemberCard from './components/TeamMemberCard';

import { AppContext } from '../context/AppContext';
import { Modal, TextInput } from 'react-native';

const team = ({ navigation }) => {
  const { teamMembers, addTeamMember } = React.useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleAddMember = () => {
    if (newName && newRole) {
      addTeamMember({
        name: newName,
        role: newRole,
        email: newEmail || `${newName.split(' ')[0].toLowerCase()}@devhorizon.in`,
      });
      setNewName('');
      setNewRole('');
      setNewEmail('');
      setModalVisible(false);
    }
  };

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
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
          <Text className='text-2xl font-aleo-bold text-center text-[#180537]'>Team Members</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="account-plus" size={28} color="#8A2B91" />
          </TouchableOpacity>
        </View>
        <SearchBar placeholder='Search For Team Members' value={searchQuery} onChangeText={setSearchQuery} />

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
            {filteredMembers.map((member) => (
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
      
      {/* Add Team Member Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Team Member</Text>
            <TextInput style={styles.input} placeholder="Full Name" value={newName} onChangeText={setNewName} placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Role" value={newRole} onChangeText={setNewRole} placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Email (optional)" value={newEmail} onChangeText={setNewEmail} placeholderTextColor="#888" />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, { backgroundColor: '#F44336' }]}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddMember} style={[styles.modalButton, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.modalButtonText}>Add Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  )
}

export default team

const styles = StyleSheet.create({
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