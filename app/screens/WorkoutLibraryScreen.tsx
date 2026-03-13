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

const { width } = Dimensions.get('window');

const PRIMARY = "#ccff00";
const BG_DARK = "#12140a";
const CARD_BG = "rgba(255, 255, 255, 0.05)";
const TEXT_COLOR = "#f1f5f9";
const SUBTEXT_COLOR = "#94a3b8";

const WORKOUTS = [
  {
    id: 1,
    title: "Morning Full Body Blast",
    level: "Advanced",
    muscle: "Full Body",
    exerciseCount: 12,
    duration: 45,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBShROEz63Yf_YbPCWub4K2SaQKp9BJt1NX0hWd_RN-lnzVXblEon9U1t1auzJ8vOP1rrbZu1o3EFBbJuFVJHj6PieK9LhJ2QzlBe__4Df18z3l67IscKIYl_zHVqHkdIYqIPmukOs9BTO1kSfFF0w1bdQVlWAGMF7rva6zlFc1GIdyyn2f6vRsO0mbjLj6bQnnLvOeOuW6r-hWPYZAMdE4dAUssuCMwzLM36HKF09KrxdxyhZbictQDXw7nR3TzyCIp6I05vIxf3s",
    icon: "fitness-center"
  },
  {
    id: 2,
    title: "Lower Body Power",
    level: "Intermediate",
    muscle: "Legs & Glutes",
    exerciseCount: 10,
    duration: 35,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQFxUPdD2x04AukOW2DYcmkJUPsET7WvlzwgeWrxn3ktW9TBxXX52J9e2SbFM2xMSCRROxZD4KxwSzsLUTw6hsb3E_ol15VjkTnO90ozmoH6t_kLkNb2KElPOEl7iwn4sikOAIt_MKullaDogRUNRPsO4IxCN6uI98A2j5yq0DZ5SZl8rEd0FOmGOcNwd2BOsQjCpxMOpNFl5b4mTif3sK1IWv82xJ6FoWQd-S1V-aox6JeBhnZ3a-GqsBiRWo2nfzQ1oVHLOQrN4",
    icon: "directions-run"
  },
  {
    id: 3,
    title: "Core & Mobility",
    level: "Beginner",
    muscle: "Abs & Core",
    exerciseCount: 8,
    duration: 20,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9nSWLsyUdqOfo1VROJYgk7WMG9eCoiUqWeRriiLXzERYcTxd8qzIt0l7iTf1mLInO7weE_r5jiuAZd99I0qKG4EB7FjixMEZ42fxmrGifY1zjwh698y5vbahJQom7z706jCB5wrOHLJWqHQbmsrNhyt-QSV2hPXIbfmNibZn8q8lRRkrg4NrZZ0wtCXvJP97LzosoUg4LP_0IGd5XBAPrDjkdma6ijguwLJk2x-WgkXkcdzT0t940DWigmVific_1Um9xUu3wUPM",
    icon: "self-improvement"
  },
  {
    id: 4,
    title: "Upper Body Hypertrophy",
    level: "Elite",
    muscle: "Chest & Back",
    exerciseCount: 15,
    duration: 60,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2uIjlZdiH3DWwfWjcGI_VSAAxnfQHU53FiBQ2FydNEwsFlpOcclw-l3612yK4mm5arptR29AB0jfUrKJ4AT6V4q9UBdzRH3JJyM-zZ2gW3rrJam1fi0B0zd_aOxRIF_ED1jLNFHMLNMn7fDtbxRhtqIzupo4H8nXmdAdLqSrNc7Xxvxhdtj2c73ovFid-ohssMm-PwS7IC1oJCbeXd-923vLY7Asruu-_ycKbmQ4AoNypMb-0cc-xSsA2ma8v2vEeK0GjoWDUUYc",
    icon: "fitness-center"
  }
];

export default function WorkoutLibraryScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'workouts' | 'programs'>('workouts');

  const filteredWorkouts = WORKOUTS.filter(workout => 
    workout.title.toLowerCase().includes(search.toLowerCase()) || 
    workout.muscle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={TEXT_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Library</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color={TEXT_COLOR} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <View style={styles.searchIconContainer}>
            <MaterialIcons name="search" size={24} color="#94a3b8" />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search workouts, programs..."
            placeholderTextColor="#64748b"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filter Toggle Removed */}
      
      {/* Workout List */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.workoutsList}>
          {filteredWorkouts.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.workoutCard}
              activeOpacity={0.9}
            >
              <View style={styles.workoutInfo}>
                <View style={styles.workoutHeader}>
                    <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>{item.level}</Text>
                    </View>
                </View>
                
                <Text style={styles.workoutTitle}>{item.title}</Text>
                
                <View style={styles.workoutMetaContainer}>
                    <View style={styles.metaItem}>
                        <MaterialIcons name={item.icon as any} size={14} color={SUBTEXT_COLOR} />
                        <Text style={styles.metaText}>{item.muscle}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <MaterialIcons name="list-alt" size={14} color={SUBTEXT_COLOR} />
                        <Text style={styles.metaText}>{item.exerciseCount} Exercises</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <MaterialIcons name="schedule" size={14} color={SUBTEXT_COLOR} />
                        <Text style={styles.metaText}>{item.duration} min</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.startButton}
                    onPress={() => router.push('/screens/WeeklyProgramScreen')}
                >
                    <MaterialIcons name="play-arrow" size={20} color={BG_DARK} />
                    <Text style={styles.startButtonText}>Start Workout</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.workoutImageContainer}>
                <Image source={{ uri: item.image }} style={styles.workoutImage} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="add" size={32} color={BG_DARK} />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_DARK,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(18, 20, 10, 0.8)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    height: 48,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchIconContainer: {
    width: 48,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: TEXT_COLOR,
    fontSize: 16,
    paddingRight: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 4,
    height: 48,
  },
  filterOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  filterOptionActive: {
    backgroundColor: PRIMARY,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: SUBTEXT_COLOR,
  },
  filterTextActive: {
    color: BG_DARK,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  workoutsList: {
    gap: 16,
  },
  workoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 16,
  },
  workoutInfo: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 12,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelBadge: {
    backgroundColor: 'rgba(204, 255, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  levelText: {
    color: PRIMARY,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    lineHeight: 24,
  },
  workoutMetaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: SUBTEXT_COLOR,
  },
  startButton: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    gap: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  startButtonText: {
    color: BG_DARK,
    fontSize: 14,
    fontWeight: 'bold',
  },
  workoutImageContainer: {
    width: 120, // w-32 or w-40 equivalent
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
