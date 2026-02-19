import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import attendence from './attendence'
import task from './task'

function homeScreen(){
    const navigation =useNavigation();
}
const MyTabs = createBottomTabNavigator({
  screens: {
    attendence: attendence,
    task: task,
  },
});
const homeNavigator = () => {
  return (
    <View>
        <SafeAreaView>
 <Text>Hello</Text>
      </SafeAreaView>
    </View>
  )
}

export default homeNavigator

const styles = StyleSheet.create({})