import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const hamburgerMenu = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#FCFBFE', '#F1DBFD']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="close" size={28} color="#180537" />
        </TouchableOpacity>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>Admin Horizon</Text>
          <Text style={styles.profileEmail}>admin@horizon.com</Text>
        </View>

        {/* Menu Links */}
        <View style={styles.menuLinksContainer}>
          <TouchableOpacity style={styles.menuLink} onPress={() => navigation.navigate('MainTabs', { screen: 'dashBoard' })}>
            <Icon name="home-outline" size={24} color="#8A2B91" />
            <Text style={styles.menuLinkText}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuLink} onPress={() => navigation.navigate('MainTabs', { screen: 'team' })}>
            <Icon name="account-group-outline" size={24} color="#8A2B91" />
            <Text style={styles.menuLinkText}>Team Directory</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuLink} onPress={() => Alert.alert("Coming Soon", "Settings will be available in the next update!")}>
            <Icon name="cog-outline" size={24} color="#8A2B91" />
            <Text style={styles.menuLinkText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuLink} onPress={() => Alert.alert("Coming Soon", "Help & Support will be available in the next update!")}>
            <Icon name="help-circle-outline" size={24} color="#8A2B91" />
            <Text style={styles.menuLinkText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
            <Icon name="logout" size={24} color="#F44336" />
            <Text style={[styles.menuLinkText, { color: '#F44336' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export default hamburgerMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#8A2B91',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Aleo-Bold',
    color: '#180537',
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Aleo-Regular',
    color: '#18053799',
    marginTop: 4,
  },
  menuLinksContainer: {
    flex: 1,
  },
  menuLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0C4E855',
  },
  menuLinkText: {
    fontSize: 16,
    fontFamily: 'Aleo-Medium',
    color: '#180537',
    marginLeft: 16,
  },
  logoutContainer: {
    marginBottom: 50,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  }
})