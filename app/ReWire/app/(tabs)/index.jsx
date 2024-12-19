import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (

    <View style={styles.container}>
      <View style={styles.quoteBox}>
        <Text style={styles.quoteTitle}>Daily Quote</Text>
        <Text style={styles.quote}>"Your decision to kill your addiction will become a reality only if you believe and reinforce the fact that you have the capacity to do it."</Text>
        <Text style={styles.quoteAuthor}>- Dr. Prem</Text>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <View style={styles.progressCards}>
          <View style={styles.progressCard}>
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <Text style={styles.progressValue}>48%</Text>
            <Text style={styles.progressLabel}>Good</Text>
          </View>
          <View style={styles.progressCard}>
            <Text style={styles.progressLabel}>Daily Task</Text>
            <Text style={styles.progressValue}>85%</Text>
            <Text style={styles.progressLabel}>Almost There</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.progressTitle, { paddingLeft: 16 }]}>Achievements</Text>
      <View style={styles.achievements}>
        <View style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>Task 07 Completed</Text>
          <Text style={styles.achievementSubtitle}>Day 7 Gold</Text>
        </View>
        <View style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>7 days Streak</Text>
          <Text style={styles.achievementSubtitle}>1st Streak</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  quoteBox: {
    padding: 24,
    margin: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  quote: {
    fontSize: 14,
    lineHeight: 20,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  quoteTitle: {
    textAlign: 'center',
    color: '#888',
    fontSize: 20,
    paddingBottom: 16,
    fontWeight: 500
  },
  quoteAuthor: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 8,
  },
  progressSection: {
    padding: 16,
  },
  progressTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  progressCards: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  progressCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  progressValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4FD1C5',
    marginVertical: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#888',
  },
  achievements: {
    padding: 16,
    flexDirection: 'row',
    gap: 16,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#E0E0E0',
  },
  achievementSubtitle: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
});