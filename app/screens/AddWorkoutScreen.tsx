import React, { useState, useEffect } from 'react';
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
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import firestore from '@react-native-firebase/firestore';

// Define Workout interface
interface Workout {
  id: string;
  title: string;
  duration: string;
  exercises: number;
  level: string;
  levelColor: string;
  image: string;
  category: string;
}

const categories = [
  { id: 'all', label: 'All' },
];

export default function AddWorkoutScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState(categories);

  useEffect(() => {
    // Fetch system workouts
    const unsubscribeSystem = firestore()
      .collection('workout_programs')
      .onSnapshot(querySnapshot => {
        const workoutsData: Workout[] = [];
        const fetchedCategories = new Set<string>();
        
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          
          // Map level color based on level text
          let levelColor = '#ccff00'; // Default Green
          const levelLower = (data.level || '').toLowerCase();
          if (levelLower.includes('beginner')) levelColor = '#3b82f6'; // Blue
          else if (levelLower.includes('advanced')) levelColor = '#ef4444'; // Red
          
          if (data.workout_type_name) {
            fetchedCategories.add(data.workout_type_name);
          }

          workoutsData.push({
            id: documentSnapshot.id,
            title: data.name || 'Untitled Workout',
            duration: data.duration || '0 mins',
            exercises: data.exercises ? data.exercises.length : 0, 
            level: data.level || 'General',
            levelColor: levelColor,
            image: data.coverImage || 'https://via.placeholder.com/300', 
            category: data.workout_type_name || 'General', 
          });
        });

        // Also fetch custom user workouts
        const userId = 'current-user-id'; // Replace with actual auth
        firestore()
          .collection('customUserWorkouts')
          .where('userId', '==', userId)
          .get()
          .then(customSnapshot => {
            customSnapshot.forEach(doc => {
              const data = doc.data();
              workoutsData.push({
                id: doc.id,
                title: data.title || 'Custom Workout',
                duration: data.duration ? (data.duration.includes('min') ? data.duration : `${data.duration} mins`) : '0 mins',
                exercises: data.exerciseCount || 0,
                level: data.level || 'Custom',
                levelColor: '#a855f7', // Purple for custom
                image: data.image || 'https://via.placeholder.com/300',
                category: 'Custom'
              });
              fetchedCategories.add('Custom');
            });

            // Update state
            const newCategories = [
              { id: 'all', label: 'All' },
              ...Array.from(fetchedCategories).map(cat => ({
                id: cat,
                label: cat
              }))
            ];
            
            setCategoryList(newCategories);
            setWorkouts(workoutsData);
            setLoading(false);
          });

      }, error => {
        console.error("Error fetching workouts: ", error);
        setLoading(false);
      });

    return () => unsubscribeSystem();
  }, []);

  const handleAddWorkout = (workoutId: string) => {
    // Logic to add workout to the program would go here
    // For now, just go back
    router.back();
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                            (workout.category && workout.category.toLowerCase().includes(selectedCategory.toLowerCase())); // Simple category matching
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f230f" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1f230f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Workout</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={24} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search workouts..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
          {categoryList.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id ? styles.categoryChipSelected : styles.categoryChipUnselected
              ]}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat.id ? styles.categoryTextSelected : styles.categoryTextUnselected
              ]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Workout List */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
         {/* Create Custom Workout Button - Moved inside ScrollView so it scrolls along with the workout cards. */}
         
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
        <TouchableOpacity 
          style={styles.createCustomButton}
          activeOpacity={0.8}
          onPress={() => router.push('/screens/CreateCustomWorkoutScreen')} 
        >
          <LinearGradient
            colors={['#ccff00', '#99cc00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.createCustomGradient}
          >
            <View style={styles.createCustomContent}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="add" size={24} color="#1f230f" />
              </View>
              <View>
                <Text style={styles.createCustomTitle}>Create Custom Workout</Text>
                <Text style={styles.createCustomSubtitle}>Design your own routine from scratch</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#1f230f" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

        {loading ? (
          <ActivityIndicator size="large" color="#ccff00" style={{ marginTop: 20 }} />
        ) : (
          filteredWorkouts.map((workout) => (
            <TouchableOpacity 
              key={workout.id} 
              activeOpacity={0.9}
              style={styles.card}
              onPress={() => router.push({
                pathname: '/screens/WorkoutDetailsScreen',
                params: { 
                  id: workout.id,
                  isCustom: workout.category === 'Custom' ? 'true' : 'false'
                }
              })}
            >
              <ImageBackground
                source={{ uri: workout.image }}
                style={styles.cardImage}
                imageStyle={{ borderRadius: 16 }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.cardOverlay}
                />
                <View style={[styles.levelBadge, { backgroundColor: workout.levelColor }]}>
                  <Text style={styles.levelText}>{workout.level}</Text>
                </View>
              </ImageBackground>
              
              <View style={styles.cardFooter}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{workout.title}</Text>
                  <Text style={styles.cardSubtitle}>{workout.duration} • {workout.exercises} exercises</Text>
                </View>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => handleAddWorkout(workout.id)}
                >
                  <MaterialIcons name="add" size={24} color="#1f230f" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f230f',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(31, 35, 15, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneButton: {
    color: '#ccff00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 999,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#f1f5f9',
    fontSize: 16,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  createCustomButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: "#ccff00",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  createCustomGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  createCustomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(31, 35, 15, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createCustomTitle: {
    color: '#1f230f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createCustomSubtitle: {
    color: 'rgba(31, 35, 15, 0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryChipSelected: {
    backgroundColor: '#ccff00',
    borderColor: '#ccff00',
  },
  categoryChipUnselected: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: '#1f230f',
  },
  categoryTextUnselected: {
    color: '#f1f5f9',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  cardImage: {
    height: 160,
    justifyContent: 'flex-end',
    padding: 12,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  levelText: {
    color: '#1f230f',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  cardTitle: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ccff00',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
