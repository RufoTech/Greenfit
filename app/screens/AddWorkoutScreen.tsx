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
  ImageBackground,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for workouts
const workoutLibrary = [
  {
    id: 1,
    title: 'Full Body Blast',
    titleAz: 'Bütöv bədən',
    duration: '45 mins',
    exercises: 8,
    level: 'Intermediate',
    levelAz: 'Orta',
    levelColor: '#ccff00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6izQ0Ztc_1FLxlMoHUaRoQR1UdvESJUKseVdIr9DTsqykilnUMonbrk7omWWCsMzwIfMruY36WgTLGfhYSnAtjD49XZ4C7vbAX5AB4rTnPqujhn0h4oVD04Y3FAtMCyeNtJZF7QKynQ_sWaNcAhv64eXC2l01EFHaGb7f0Zt-XWRNm_7F51PRTPfZPQ9sRTyuQQixb8TXvblUhdr5kbU4EOUk60LR_APO3dPlcq1Aeyub2-VYovHA38MZNcr0a1qFJwuNHPbH1A',
    category: 'Full Body'
  },
  {
    id: 2,
    title: 'Upper Body Power',
    titleAz: 'Üst bədən',
    duration: '30 mins',
    exercises: 6,
    level: 'Advanced',
    levelAz: 'Qabaqcıl',
    levelColor: '#ef4444',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvuWL4scLhi2ya4Mys5iI2sg3yec8eR7q8F9JV31WObbUDK0BaMhahCRIKQUYXvQKMHN2YJ4wSEoeiNYgnaVBnyNJ8iVQHE2HF52Nmnz-b_Km5g7MSQaS9S8rtPh6dD_KCX64L-99jIx1xFxKGXQkd55Xs3tGnRxvY-9CoQ8HFxkf5VKSWQeKpAnB7am0bhcCBGDMsYtytutYsaNe3ymS4Ins4O1Z9pGeyu_ezlTocOv2wt1qovjRIVy2GMuaNAW21MfwGWQGYoSA',
    category: 'Push'
  },
  {
    id: 3,
    title: 'Leg Day Routine',
    titleAz: 'Ayaq günü',
    duration: '50 mins',
    exercises: 10,
    level: 'Beginner',
    levelAz: 'Başlanğıc',
    levelColor: '#3b82f6',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVe-Dx4h62LavfWndD3uoE7528OUYuDTV9HCdh9Lz-Q10PayTRcoAVjENF1-PC3OZzbZxZ0Jybh96eELL58tnzwIBRB2t7wYBTA1nMPnQwV12baW2t4YX-qJFr84kPEQOBdvw6Cnd6q8KSMpTvqrBRsPmhoJbtkti0IrbPsdPZYuq28o6kBVxBfItokvNoJ4bmTsG7SHCZc4ptEe9fiGs3oeOctkRlGPt1WbIxd3Wks-HeU-pWQvXvRiMFoq-RTOLF4mAoQRWSsdc',
    category: 'Legs'
  },
  {
    id: 4,
    title: 'HIIT Cardio Burn',
    titleAz: 'HIIT Kardio',
    duration: '20 mins',
    exercises: 5,
    level: 'Intermediate',
    levelAz: 'Orta',
    levelColor: '#ccff00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMDYheDvL91bi4IVByVIQynjLDa0lKR89kfRBzSq584Smwj7xZO5kFNCOima32IHOuPYQcd8TWrVYGATw3XVkH4-fCZUUmHnCLyhWranMcW4vzSQpjkk2gvLv73f8aSKZsAE0BbXt9wgygHUvCBu01RurEh3jl5wD9fsbguDNZhjEtLTMIp9WVfWF8YobUzMXrmH5Cy8nBC6_g60tC6vPdMuD1HbWxyuc1LS32E-yqW8zjpkW7jRO17K6Fv1PfoXQUTcPpKCjCHQg',
    category: 'HIIT'
  }
];

const categories = [
  { id: 'all', label: 'All / Hamısı' },
  { id: 'full', label: 'Full Body / Bütün bədən' },
  { id: 'push', label: 'Push / Təkan' },
  { id: 'pull', label: 'Pull / Dartma' },
  { id: 'legs', label: 'Legs / Ayaqlar' },
  { id: 'hiit', label: 'HIIT' },
];

export default function AddWorkoutScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAddWorkout = (workoutId: number) => {
    // Logic to add workout to the program would go here
    // For now, just go back
    router.back();
  };

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
        <Text style={styles.headerTitle}>Add Workout / Məşq əlavə et</Text>
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
            placeholder="Search workouts... / Məşq axtar..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
          {categories.map((cat) => (
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

        {workoutLibrary.map((workout) => (
          <TouchableOpacity 
            key={workout.id} 
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => router.push({
              pathname: '/screens/WorkoutDetailsScreen',
              params: { id: workout.id }
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
                <Text style={styles.levelText}>{workout.level} / {workout.levelAz}</Text>
              </View>
            </ImageBackground>
            
            <View style={styles.cardFooter}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{workout.title} / {workout.titleAz}</Text>
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
        ))}
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
