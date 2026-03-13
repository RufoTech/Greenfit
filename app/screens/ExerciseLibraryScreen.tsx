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
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const PRIMARY = "#ccff00";
const BG_DARK = "#12140a"; // Using the background color from CreateCustomWorkoutScreen
const CARD_BG = "rgba(255, 255, 255, 0.05)";
const TEXT_COLOR = "#f1f5f9";
const SUBTEXT_COLOR = "#94a3b8";

const CATEGORIES = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms"];

const EXERCISES = [
  {
    id: 1,
    name: "Dumbbell Bench Press",
    muscle: "Chest",
    equipment: "Dumbbells",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjF9D6m4oq_TBIFbInke17oHL8e_JL8dk0ZhhNMDgmMHuHuHAEALmpFYs66GgtGGo04X80InihQIvip4d0R10vBmXgPd6UAFyBxbyTQb3VIue9_MrPOFgMJzDrfHgigpK81FeRjWSJnsmz-eRZQkR1GMSOgZdj40Xrdr-iEmE2fGgut--OM9QZaIUdZKjMokYUw6NHL5L_vbg_BfZLFm88Ngn8bnKRXFr73XYC11mKjGaFp_TtWpsOlxmskWfWk1MxxafyuKPLGxw",
    icon: "fitness-center"
  },
  {
    id: 2,
    name: "Barbell Squat",
    muscle: "Legs",
    equipment: "Barbell",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP_CkEvHb0AHKcqBocRveKhSbNzvbblOukhh6KM1Vzfk9DDXZUyZeE5ogg0KVsFVCcNOcwoZqO1-6O295s31YLvVCaYptTZjVPEAZfN7EVD03TbzyO_LHzQBM4CTnZG_1AFMxaVqxU3wcJ4Gex87ZPdGqexmWEjDaNn5E2fIbBdjLdCIDs4RHQ7ubOA9z6G2SiRYfPU8HhkqfHy6ZHsqsvvII9jWliL44ixmnMfaK159f5GoRvmqTh4ZF-MlLCB7XvbEu49OTSkHU",
    icon: "fitness-center"
  },
  {
    id: 3,
    name: "Lat Pull Down",
    muscle: "Back",
    equipment: "Cable Machine",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeTCOyghfpaIyLuApy6x10WW3skEWHy6U-pQ26xaP5tYafJxpp9SRNGkwegCAeEmg6iahDovO5LEWqr0bAPzh_k7QwnA_6VcK--Ol9SI9SollQvcZX3_avrXYT6wkbkyLmrxutm8xOctyQOV7LbTDIUg35XtiAb5GDQCb2OgYwNc4IizSvihlAqVm_3dPqShJwQm_v4601ZdclrTeXlgrujD7x0DfS3Qef8Ga2cVXpc7THSrtud8fZIlrEqDiy9_H99mjgG5-3FFk",
    icon: "settings" // approximation for cable machine
  },
  {
    id: 4,
    name: "Overhead Press",
    muscle: "Shoulders",
    equipment: "Barbell",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLg14PFHgnzx_wn5D9OHxV1oxcMXGkGFfiF3hmncAopdbHB4Dj3T1pMYjY5pDVKUtuIG_NZd96C3QBNulHFgLOpF8-XKAfGDlyhsuy22mQ9gmr2lCSmOyI0sj4RyxnrHEXMgsMwd_0i4dMZwXJj4o1G8CAVrTGXEp7pNCXEGdpENahAs49i2hkFvvqKIbsxVdoxRS6RMXxKo7LuJRqvolNv16glquOwuBE-nvcQJ5Uh5djPpKs1SisKXOQXUv-dE7X_KTBZWp723I",
    icon: "fitness-center"
  },
  {
    id: 5,
    name: "Hammer Curls",
    muscle: "Arms",
    equipment: "Dumbbells",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp1ZuRLaDzsN0YbUhuxKYSK42YkuE8rBoyaXLiXwoyVWtWNn4od25Vbd1ycL822fRSmFrEfI3uNVNtwWmiCwhAoyI0fNBbeMoN-5unO1rLomGxO9Xj6xzffE7VPV3Qego-DSZDCMvjADWAT_JtGk1XnzaCBZkza6II3ezXn9Z5kVGvgT-7faTN1BHzgWJ94BKy82AXSDmj1TYlAEuKhgOmvQ2G-RFTeUk8aM3D1aWMmryiMPVBNH6jsUlwUnFea3pS7Cti6cCRs_I",
    icon: "fitness-center"
  }
];

export default function ExerciseLibraryScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredExercises = EXERCISES.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) || 
                          ex.muscle.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || ex.muscle === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={TEXT_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exercise Library</Text>
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
            placeholder="Search exercises, muscles..."
            placeholderTextColor="#64748b"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.categoryChip,
                activeCategory === cat ? styles.categoryChipActive : styles.categoryChipInactive
              ]}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === cat ? styles.categoryTextActive : styles.categoryTextInactive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Exercise List */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.exercisesList}>
          {filteredExercises.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.exerciseCard}
              activeOpacity={0.7}
              // onPress={() => handleSelectExercise(item)}
            >
              <View style={styles.exerciseImageContainer}>
                <Image source={{ uri: item.image }} style={styles.exerciseImage} />
              </View>
              
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <View style={styles.exerciseMeta}>
                  <Text style={styles.muscleText}>{item.muscle}</Text>
                </View>
              </View>
              
              <View style={styles.chevronContainer}>
                <TouchableOpacity 
                  style={styles.addButton}
                  // onPress={() => handleAddExercise(item)}
                >
                  <MaterialIcons name="add" size={24} color={BG_DARK} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
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
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    flex: 1,
    marginLeft: 16,
  },
  menuButton: {
    padding: 8,
    marginRight: -8,
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
    height: 56,
    overflow: 'hidden',
  },
  searchIconContainer: {
    width: 48,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: TEXT_COLOR,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryChip: {
    height: 40,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  categoryChipActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  categoryChipInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: BG_DARK,
    fontWeight: 'bold',
  },
  categoryTextInactive: {
    color: SUBTEXT_COLOR,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  exercisesList: {
    gap: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 16,
  },
  exerciseImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  exerciseInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginBottom: 4,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleText: {
    fontSize: 12,
    fontWeight: '600',
    color: PRIMARY,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dotSeparator: {
    fontSize: 12,
    color: SUBTEXT_COLOR,
  },
  equipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  equipmentText: {
    fontSize: 12,
    color: SUBTEXT_COLOR,
    fontWeight: '400',
  },
  chevronContainer: {
    paddingRight: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
