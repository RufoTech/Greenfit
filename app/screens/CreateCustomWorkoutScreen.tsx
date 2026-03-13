import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CreateCustomWorkoutScreen() {
  const router = useRouter();
  const [programName, setProgramName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#12140a" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#f1f5f9" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Create Custom Program</Text>
        </View>

      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Program Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Program Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PROGRAM NAME </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Summer Shred"
              placeholderTextColor="#64748b"
              value={programName}
              onChangeText={setProgramName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>DESCRIPTION</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your program goals"
              placeholderTextColor="#64748b"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Workout Builder Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Workout Builder</Text>

          </View>

          {/* Day 1 Card */}
          <View style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <View style={styles.dayTitleContainer}>
                <MaterialIcons name="drag-indicator" size={24} color="#94a3b8" />
                <Text style={styles.dayTitle}>Day 1: Upper Body</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <MaterialIcons name="delete" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>

            <View style={styles.dayContent}>
              {/* Exercise Item 1 */}
              <View style={styles.exerciseItem}>
                <MaterialIcons name="drag-handle" size={24} color="#64748b" />
                <View style={styles.exerciseImageContainer}>
                  <Image 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA62i1zCKJsucRq4OVtemqod1LBmCLsw_WzHhbYteGCHpkskfxmnWh1e8wTXSthBO9-n6mwOeMSpXdAFNdGB2de-0Zq8wsiJ-j4MXJogUrYfwRdSRleTYGIRqlGzauWE1TQuqvelN3sIj0-Il88YQ2IT7-CIorN7l-tKvf7D3Vf3xEA9h-B_ib3BSv0MEzgfiGV1hGVlysTo0YNADYDDmP2qVfCCdljgORqJ5DTIP6O--9XY1a6ZKl7Wu5VqzOwiSZem88injWmqMI' }} 
                    style={styles.exerciseImage} 
                  />
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>Bench Press / Oturaraq Pres</Text>
                  <Text style={styles.exerciseDetails}>4 Sets × 10 Reps</Text>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="more-vert" size={24} color="#94a3b8" />
                </TouchableOpacity>
              </View>

              {/* Exercise Item 2 */}
              <View style={styles.exerciseItem}>
                <MaterialIcons name="drag-handle" size={24} color="#64748b" />
                <View style={styles.exerciseImageContainer}>
                  <Image 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlxWNMFFJFth4r7Lvr0UQwNkJm9L1ITt004FPCzk8jaBBAnl2CQe-ygWMeFU4VbYxvdIQ0z9KVeTdoPsyYKCSpfBVMAOAqIvZpw4VJn5MJVBBvlFNRrLbDh_2XPJeeAgp9ceOLf4_Los7LIrIi1Msoch1EsffIuu1NT--rUMaxx65hyupEKCXxJIi9dUI1x3H4L4VKF84gmxyoUDENjl3ASkWqDRf3-J5ZyngMuwxrQp0WnHADLrpLn20uJSceD7MR3LEW0WNqPy0' }} 
                    style={styles.exerciseImage} 
                  />
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>Pull Ups / Turnikdə Dartınma</Text>
                  <Text style={styles.exerciseDetails}>3 Sets × Max</Text>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="more-vert" size={24} color="#94a3b8" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.addExerciseButton}
                onPress={() => router.push('/screens/ExerciseLibraryScreen')}
              >
                <MaterialIcons name="add-circle-outline" size={20} color="#64748b" />
                <Text style={styles.addExerciseText}>Add Exercise</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <LinearGradient
        colors={['transparent', '#12140a']}
        style={styles.bottomActionsContainer}
        pointerEvents="box-none"
      >
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.draftButton}>
            <Text style={styles.draftButtonText}>Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton}>
            <Text style={styles.publishButtonText}>Publish Program</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12140a',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(204, 255, 0, 0.1)',
    backgroundColor: 'rgba(18, 20, 10, 0.8)',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(204, 255, 0, 0.05)',
  },
  headerTitleContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  headerTitle: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: '#ccff00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ccff00',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: 'rgba(204, 255, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(204, 255, 0, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#f1f5f9',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addDayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(204, 255, 0, 0.3)',
    backgroundColor: 'rgba(204, 255, 0, 0.05)',
  },
  addDayText: {
    color: '#ccff00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dayCard: {
    backgroundColor: 'rgba(204, 255, 0, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(204, 255, 0, 0.1)',
    overflow: 'hidden',
    marginBottom: 16,
  },
  dayCardCollapsed: {
    opacity: 0.8,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(204, 255, 0, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(204, 255, 0, 0.1)',
  },
  dayTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayTitle: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  dayContent: {
    padding: 16,
    gap: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(18, 20, 10, 0.5)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(204, 255, 0, 0.1)',
  },
  exerciseImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(204, 255, 0, 0.2)',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  exerciseDetails: {
    color: '#94a3b8',
    fontSize: 12,
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed',
    borderRadius: 12,
    marginTop: 4,
  },
  addExerciseText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomActionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 40,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
  },
  draftButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(204, 255, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(18, 20, 10, 0.8)',
  },
  draftButtonText: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  publishButton: {
    flex: 2,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#ccff00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ccff00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  publishButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
