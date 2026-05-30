import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import { AppContext } from '../context/AppContext';

const analyticsData = [
  { id: 1, metric: 'Overall Productivity', value: '85%', fill: 0.85, color: '#4CAF50' },
  { id: 2, metric: 'Task Completion Rate', value: '70%', fill: 0.70, color: '#2196F3' },
  { id: 3, metric: 'On-time Deliveries', value: '92%', fill: 0.92, color: '#8A2B91' },
  { id: 4, metric: 'Average Attendance', value: '88%', fill: 0.88, color: '#FF9800' },
];

const ProgressBar = ({ label, percentage, fill, color }) => (
  <View style={styles.progressContainer}>
    <View style={styles.progressHeader}>
      <Text style={styles.progressLabel}>{label}</Text>
      <Text style={[styles.progressValue, { color }]}>{percentage}</Text>
    </View>
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${fill * 100}%`, backgroundColor: color }]} />
    </View>
  </View>
);

const AnalyticsScreen = ({ navigation }) => {
  const { tasksData, attendanceData } = React.useContext(AppContext);

  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  
  const completedTasks = tasksData.filter(t => t.status === 'Completed').length;
  const totalAbsences = attendanceData.filter(a => a.status === 'Absent').length;

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
          <Text className='text-2xl font-aleo-bold text-center text-[#180537]'>Analytics</Text>
          <Icon name="account-circle" size={24} color="black" />
        </View>

        <View className="bg-[#EFEFEF] py-4 mt-6 shadow-sm -mx-3 rounded-lg px-6 flex-row justify-between">
          <View>
            <Text className="text-[#8A2B91CC] text-xs font-aleo-semibold mb-1">Timeframe</Text>
            <Text className="text-[#180537] text-lg font-aleo-bold">This Month</Text>
          </View>
          <Icon name="calendar-month-outline" size={32} color="#8A2B91" />
        </View>

        <View
          style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}
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
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Performance Metrics</Text>
              {analyticsData.map(item => (
                <ProgressBar
                  key={item.id}
                  label={item.metric}
                  percentage={item.value}
                  fill={item.fill}
                  color={item.color}
                />
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Weekly Summary</Text>
              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>124</Text>
                  <Text style={styles.summaryLabel}>Total Hours</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>{completedTasks}</Text>
                  <Text style={styles.summaryLabel}>Tasks Done</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>{totalAbsences}</Text>
                  <Text style={styles.summaryLabel}>Absences</Text>
                </View>
              </View>
            </View>

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

export default AnalyticsScreen

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Aleo-Bold',
    color: '#180537',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Aleo-SemiBold',
    color: '#18053799',
  },
  progressValue: {
    fontSize: 12,
    fontFamily: 'Aleo-Bold',
  },
  track: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    width: '30%',
  },
  summaryValue: {
    fontSize: 24,
    fontFamily: 'Aleo-Bold',
    color: '#8A2B91',
  },
  summaryLabel: {
    fontSize: 10,
    fontFamily: 'Aleo-Medium',
    color: '#18053799',
    marginTop: 4,
    textAlign: 'center',
  }
})