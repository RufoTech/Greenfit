import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Mock data for workout details (in a real app, this would come from an API or global state)
const workoutDetails = {
  1: {
    title: 'Full Body Blast',
    titleAz: 'Bütöv bədən',
    level: 'Intermediate',
    duration: '45 min',
    equipment: 'Dumbbells, Bench',
    target: 'Chest, Back',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6izQ0Ztc_1FLxlMoHUaRoQR1UdvESJUKseVdIr9DTsqykilnUMonbrk7omWWCsMzwIfMruY36WgTLGfhYSnAtjD49XZ4C7vbAX5AB4rTnPqujhn0h4oVD04Y3FAtMCyeNtJZF7QKynQ_sWaNcAhv64eXC2l01EFHaGb7f0Zt-XWRNm_7F51PRTPfZPQ9sRTyuQQixb8TXvblUhdr5kbU4EOUk60LR_APO3dPlcq1Aeyub2-VYovHA38MZNcr0a1qFJwuNHPbH1A',
    exercises: [
      { id: 1, name: 'Incline Bench Press', sets: 4, reps: '10-12', muscles: ['Chest', 'Triceps'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4If4UziMY8b6WwlmYtubwnVCn_W5USqJbOoJpaqiR4HV8e42X_xfdXKho7nch12qzH7ZHC4ap_KN4AIKKmTSY_NKv0Pf0aldzF4lFjdIEMDu6QTkbsSjJKV2pvqP-qt1SLS1_mX0TUHtTSHw4gBjUGUpfbq1K5J3XK07dFP2RUn_P8aepDJPd7EyNs4hknFzpTl4ozbYenQif9EvQU9H6BFMNXGCu_9Hzms4aoXj7JfsE0cSoBM1KfOf5_RODSocu062ZzYOHgGc' },
      { id: 2, name: 'Single Arm Rows', sets: 3, reps: '12', muscles: ['Lats', 'Biceps'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGVzzC3c0Jj6iXPLFEUqV8RaLBTtt0wCt2z9BKAmdUS1Oso7k3cLgaudQh7hfhJpLKH434KN_S1HzGIGb8XJjVGgbPasskIc2a7-FqGyseNCkDWWxcoPmGATTnnVUavP0-zGo4Uq1_p3dvDyJXBzq-JXP665AO5iQ7MWi1X0B5mMAATv6z6RNAyJUHsnShrMBp9Q-xGTlhDH3hfK7JgOwgCxGLxFICq0kX2_wYLn5kuOC8jUehI3WNuoLeS7TawGBYA5v7KsI1iAU' },
      { id: 3, name: 'Military Press', sets: 4, reps: '8', muscles: ['Shoulders'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0EYbzU0Y5MyuRbsKb-aV5ylNI3RXiG5afQrYNn-sLPbjSfTcxiC05jINjHhkkmdD61BNa__BwnzyZlYPbg9l9inMr7Zp5rk0VcZgdRV6CBrpcP6zA6Aee8y9Vyg-hyTVVz0mmsQrSo9HGpst-RlFMgAZosdbTotwf19YjlvAw0M7S3lV8dp5PWNarem8gggRO_S_7FQCZ5-Xnj9qr4C_LE9jPC8doiFc_QP-d4dKkd-2S5mWZpmFTl6MOQFdbYBn-BSWdKHpHRaM' },
      { id: 4, name: 'Pull Ups', sets: 3, reps: 'Max', muscles: ['Back'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmcAMgYsTCNGpTeFRSzeqs85x6ZceT1-HpAkb5a2wHZA8rIOAz-7npuyxl4blT2d4Sy_IhnMvItvYtAHSIAlbQDvUB3n1GeOFCLGCjgqcUkTN0TnYITfR2xuYACfzEbs1Rd_c81iJAFj3bGRW1QrF4zhpDjwxZ6I1efoq58MHqHWraeMNxs6MuM_o-iFOhNtXjhWjVhHGWn56i0ZwXpI9ovk-l-ygKGItgfVm_SEQ-cr1BODLEv7XIO5MfVaM21BpnQwGBuWSEQcs' },
    ]
  },
  // Default fallback
  default: {
    title: 'Upper Body Power',
    titleAz: 'Üst Bədən Gücü',
    level: 'Advanced',
    duration: '45 min',
    equipment: 'Dumbbells, Bench',
    target: 'Chest, Back',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcdXH8iZhUm34SHGmjmOXRKoQX11pT-x0ehw_TodLXfcCaa4eeUJTrkU7QKMjKLbzBdpBl71Hf2JXy-BHFuJY0LDuKyRrheaL-2CBjxD_xJk4wgruNCFKY0tujby3fgmQHnKMyjNQ3An1s09d5D7oQWtR4ihVLWvW0WYIzLmE7XbhptxJBbF-cGe63fqkvy8CbJXb5hadFmQa4-mvQfq4M6wXvkPn7DH-UsQKJWI9dN-M_rAW6o501cNx_2BCErBiq3HfoW-YWld8',
    exercises: [
      { id: 1, name: 'Incline Bench Press', sets: 4, reps: '10-12', muscles: ['Chest', 'Triceps'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4If4UziMY8b6WwlmYtubwnVCn_W5USqJbOoJpaqiR4HV8e42X_xfdXKho7nch12qzH7ZHC4ap_KN4AIKKmTSY_NKv0Pf0aldzF4lFjdIEMDu6QTkbsSjJKV2pvqP-qt1SLS1_mX0TUHtTSHw4gBjUGUpfbq1K5J3XK07dFP2RUn_P8aepDJPd7EyNs4hknFzpTl4ozbYenQif9EvQU9H6BFMNXGCu_9Hzms4aoXj7JfsE0cSoBM1KfOf5_RODSocu062ZzYOHgGc' },
      { id: 2, name: 'Single Arm Rows', sets: 3, reps: '12', muscles: ['Lats', 'Biceps'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGVzzC3c0Jj6iXPLFEUqV8RaLBTtt0wCt2z9BKAmdUS1Oso7k3cLgaudQh7hfhJpLKH434KN_S1HzGIGb8XJjVGgbPasskIc2a7-FqGyseNCkDWWxcoPmGATTnnVUavP0-zGo4Uq1_p3dvDyJXBzq-JXP665AO5iQ7MWi1X0B5mMAATv6z6RNAyJUHsnShrMBp9Q-xGTlhDH3hfK7JgOwgCxGLxFICq0kX2_wYLn5kuOC8jUehI3WNuoLeS7TawGBYA5v7KsI1iAU' },
      { id: 3, name: 'Military Press', sets: 4, reps: '8', muscles: ['Shoulders'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0EYbzU0Y5MyuRbsKb-aV5ylNI3RXiG5afQrYNn-sLPbjSfTcxiC05jINjHhkkmdD61BNa__BwnzyZlYPbg9l9inMr7Zp5rk0VcZgdRV6CBrpcP6zA6Aee8y9Vyg-hyTVVz0mmsQrSo9HGpst-RlFMgAZosdbTotwf19YjlvAw0M7S3lV8dp5PWNarem8gggRO_S_7FQCZ5-Xnj9qr4C_LE9jPC8doiFc_QP-d4dKkd-2S5mWZpmFTl6MOQFdbYBn-BSWdKHpHRaM' },
      { id: 4, name: 'Pull Ups', sets: 3, reps: 'Max', muscles: ['Back'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmcAMgYsTCNGpTeFRSzeqs85x6ZceT1-HpAkb5a2wHZA8rIOAz-7npuyxl4blT2d4Sy_IhnMvItvYtAHSIAlbQDvUB3n1GeOFCLGCjgqcUkTN0TnYITfR2xuYACfzEbs1Rd_c81iJAFj3bGRW1QrF4zhpDjwxZ6I1efoq58MHqHWraeMNxs6MuM_o-iFOhNtXjhWjVhHGWn56i0ZwXpI9ovk-l-ygKGItgfVm_SEQ-cr1BODLEv7XIO5MfVaM21BpnQwGBuWSEQcs' },
    ]
  }
};

export default function WorkoutDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Get workout data based on ID, or use default if not found
  const workout = workoutDetails[id] || workoutDetails.default;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f230f" />
      
      {/* Back Button Overlay - Fixed Position */}
      <TouchableOpacity 
        style={styles.backButtonOverlay}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#f1f5f9" />
      </TouchableOpacity>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: workout.image }}
            style={styles.heroImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <LinearGradient
              colors={['transparent', 'rgba(31, 35, 15, 0.8)']}
              style={styles.heroOverlay}
            />

            <View style={styles.heroContent}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{workout.level}</Text>
              </View>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.addToDayButton}>
            <Text style={styles.addToDayText}>Add to Day</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveToLibraryButton}>
            <Text style={styles.saveToLibraryText}>Save to Library</Text>
          </TouchableOpacity>
        </View>

        {/* Workout Summary Info */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <MaterialIcons name="schedule" size={24} color="#ccff00" style={styles.summaryIcon} />
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{workout.duration}</Text>
          </View>
          <View style={[styles.summaryItem, styles.summaryBorder]}>
            <MaterialIcons name="fitness-center" size={24} color="#ccff00" style={styles.summaryIcon} />
            <Text style={styles.summaryLabel}>Equipment</Text>
            <Text style={styles.summaryValue}>{workout.equipment}</Text>
          </View>
          <View style={styles.summaryItem}>
            <MaterialIcons name="adjust" size={24} color="#ccff00" style={styles.summaryIcon} />
            <Text style={styles.summaryLabel}>Target</Text>
            <Text style={styles.summaryValue}>{workout.target}</Text>
          </View>
        </View>

        {/* Exercise List */}
        <View style={styles.exercisesContainer}>
          <View style={styles.exercisesHeader}>
            <Text style={styles.exercisesTitle}>Exercises ({workout.exercises.length})</Text>
            <TouchableOpacity>
              <Text style={styles.previewAllText}>Preview All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.exercisesList}>
            {workout.exercises.map((exercise, index) => (
              <TouchableOpacity 
                key={exercise.id} 
                style={[styles.exerciseItem, index === workout.exercises.length - 1 && styles.lastItem]}
                onPress={() => router.push('/screens/ExerciseDetailScreen')}
                activeOpacity={0.7}
              >
                <View style={styles.exerciseImageContainer}>
                  <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
                </View>
                <View style={styles.exerciseContent}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseSets}>{exercise.sets} Sets • {exercise.reps} Reps</Text>
                  <View style={styles.musclesContainer}>
                    {exercise.muscles.map((muscle, idx) => (
                      <View key={idx} style={styles.muscleBadge}>
                        <Text style={styles.muscleText}>{muscle}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <MaterialIcons name="drag-indicator" size={24} color="#94a3b8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f230f',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1f230f',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroContainer: {
    padding: 16,
    paddingBottom: 12,
  },
  heroImage: {
    width: '100%',
    height: 320,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  backButtonOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 24,
  },
  heroContent: {
    padding: 24,
  },
  levelBadge: {
    backgroundColor: '#ccff00',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  levelText: {
    color: '#1f230f',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  workoutTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  addToDayButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#ccff00',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ccff00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addToDayText: {
    color: '#1f230f',
    fontSize: 14,
    fontWeight: 'bold',
  },
  saveToLibraryButton: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveToLibraryText: {
    color: '#ccff00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryIcon: {
    marginBottom: 4,
    color: '#ccff00',
  },
  summaryLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 2,
  },
  summaryValue: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exercisesContainer: {
    paddingHorizontal: 16,
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exercisesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  previewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ccff00',
  },
  exercisesList: {
    gap: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    gap: 16,
  },
  lastItem: {
    opacity: 0.6,
  },
  exerciseImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  exerciseSets: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  musclesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  muscleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  muscleText: {
    fontSize: 10,
    color: '#f1f5f9',
  },
});
