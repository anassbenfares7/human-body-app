import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Human Body Explorer</Text>
        <Text style={styles.subtitle}>Learn anatomy in 3D</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Explore' as never)}
        >
          <Text style={styles.buttonText}>Start Exploring</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Quiz' as never)}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Take Quiz</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featureSection}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.feature}>
          <Text style={styles.featureText}>🎮 Interactive 3D Body Viewer</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureText}>🫀 Clickable Organs</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureText}>🦴 Body System Layers</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureText}>🔬 Multi-Scale Exploration</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  buttonContainer: {
    gap: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#3b82f6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  feature: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
});
