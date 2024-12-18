import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Rewire</Text>
        
        <Text style={styles.description}>
          ReWire is a mobile application designed to assist individuals in managing and overcoming behavioral addictions. By combining AI-driven assessments with personalized recovery strategies, the app offers a structured, non-medication approach to support users on their recovery journey.
        </Text>

        <Text style={styles.sectionTitle}>Features</Text>

        <View style={styles.featureContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Personalized Recovery Plans</Text>
            <Text style={styles.featureDescription}>
              Daily tasks tailored to each user's specific behavioral challenges and needs.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>AI-Powered Assessments</Text>
            <Text style={styles.featureDescription}>
              Chatbots and questionnaires to evaluate addiction levels and provide actionable insights.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Community Support</Text>
            <Text style={styles.featureDescription}>
              Chatbots and questionnaires to evaluate addiction levels and provide actionable insights.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Professional Guidance</Text>
            <Text style={styles.featureDescription}>
              Options to book consultations with therapists or counselors.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#E0E0E0',
    marginBottom: 32,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureContainer: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a71c8',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#888',
  },
});