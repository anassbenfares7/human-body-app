import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useAppStore } from '../store/useAppStore';
import { BODY_SYSTEMS } from '@human-body/shared';

export default function ExploreScreen() {
  const { selectedGender, visibleSystems, toggleSystem, setGender } = useAppStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Human Body</Text>
        <View style={styles.genderButtons}>
          <Text style={styles.label}>Gender:</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, selectedGender === 'male' && styles.activeButton]}
              onPress={() => setGender('male')}
            >
              <Text style={styles.buttonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedGender === 'female' && styles.activeButton]}
              onPress={() => setGender('female')}
            >
              <Text style={styles.buttonText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.systemsSection}>
          <Text style={styles.sectionTitle}>Body Systems</Text>
          <View style={styles.systemsList}>
            {BODY_SYSTEMS.map((system) => (
              <TouchableOpacity
                key={system.id}
                style={[
                  styles.systemButton,
                  visibleSystems.includes(system.id) && styles.activeSystemButton
                ]}
                onPress={() => toggleSystem(system.id)}
              >
                <View style={styles.systemColorIndicator} />
                <Text style={styles.systemButtonText}>{system.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.canvasContainer}>
          <Canvas style={{ flex: 1 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls enableZoom={true} enableRotate={true} />
          </Canvas>
        </View>
    </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  activeButton: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  systemsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  systemsList: {
    gap: 10,
  },
  systemButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  activeSystemButton: {
    backgroundColor: '#d1d5db',
  },
  systemColorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  systemButtonText: {
    fontSize: 14,
    color: '#333',
  },
  canvasContainer: {
    flex: 1,
    height: 400,
    backgroundColor: '#e0e0e0',
  },
});
