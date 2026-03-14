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
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Theme Colors
const PRIMARY = "#ccff00";
const BACKGROUND_LIGHT = "#f8f8f5";
const BACKGROUND_DARK = "#12140a";
const SURFACE_DARK = "#1d2012";
const ACCENT_DARK = "#2a2e1a";
const TEXT_LIGHT = "#0f172a";
const TEXT_DARK = "#f1f5f9";
const TEXT_MUTED_DARK = "#94a3b8";

// Dummy Data
const categories = ["All", "Full Body", "HIIT", "Strength", "Yoga", "Cardio"];

const routines = [
  {
    id: 1,
    title: "Savage Chest Workout",
    category: "Pro",
    muscle: "Chest, Triceps",
    duration: "45 mins",
    exercises: "8 Exercises",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC18TF4YHICw5HKPL2P62kTUTtsP1hWi13rJjuIxIdbpRV46gBDG8TJew1u30leCZwWSXY9o9AzXzpHQ6MhpyrfmLSYiuq9GX-CCsKlIWCLv7_74bbW8Gq2_ypyuaoYcHNywbs8YfVIfYSJJolHGn2oprtR8tQiqzC8JDsH_VVGhY4YLPjJN7VN7Mgrlwu1uKBto0ZudDC2bTbK34b4onw8Mvq5Z7UEItu0JdI2zfGEC2KagA0GhlrZusA8etntg0csOxsm8WPuRDA",
    levelColor: PRIMARY
  },
  {
    id: 2,
    title: "Core Crusher",
    category: "Intermediate",
    muscle: "Abs, Core",
    duration: "20 mins",
    exercises: "6 Exercises",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK7aEhRDeh81Akem-89TC9JqXOnnU_YHxAO59U8eARWwEmmFOlWCyj8NOWhQ9-XAQCyu_ACBSSbDHaT_tX-o1C3-5LapNrgB73sc6bfXg-P5hjIvDSsVm2s4Hta3YZF4s1gizq3padTcTZC1dLXn0h9erF6YVprvyejI-qbH5QDw5mfGTY_MqpdPB2PtEz1QEFegFfxSnNn97TxplyXxa70sdSfVREHAX2v7HKuDjVw1b2fAkZQAzNQHRiJR3U7FRzA7lWAhHmS9Q",
    levelColor: "#3b82f6"
  },
  {
    id: 3,
    title: "Morning Flow Yoga",
    category: "Beginner",
    muscle: "Full Body",
    duration: "15 mins",
    exercises: "10 Flows",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATmOZwkmt5fQp4NxaE4UYoEOfrn_1kB5G5rDzBVB9dsbUp5RT_mc1gp5BW8i5AyiKrWVlqsBnlEp7AOBhdLp0cd0QR9rAVFhD8Ou93pVFSjgHeMU_28jmKGAT9tS7pciWKT7S2ovqrI2xrCUefQ3XI1wGVZLASE4Nt3N2At-iAkdF57BoKkvSJm9JFomgOv7mIPNp6McCwgPJLjI9w790QC17C5ROPOqjKaRMyRXBiXc0CexSgElzCxqGMvAaoqRQvk239QDQoNRo",
    levelColor: "#10b981"
  }
];

export default function FeaturedRoutinesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BACKGROUND_DARK} />
      
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Featured Routines</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="notifications" size={24} color={PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color={TEXT_MUTED_DARK} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises or routines"
            placeholderTextColor={TEXT_MUTED_DARK}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Chips */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryChip,
                selectedCategory === cat ? styles.categoryChipActive : styles.categoryChipInactive
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat ? styles.categoryTextActive : styles.categoryTextInactive
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main List */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {routines.map((routine) => (
          <View key={routine.id} style={styles.card}>
            <View style={styles.imageContainer}>
              <ImageBackground source={{ uri: routine.image }} style={styles.cardImage}>
                <LinearGradient
                  colors={['rgba(18, 20, 10, 0.8)', 'transparent', 'transparent']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.levelBadgeContainer}>
                   <View style={[styles.levelBadge, { backgroundColor: routine.levelColor }]}>
                     <Text style={styles.levelText}>{routine.category}</Text>
                   </View>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{routine.title}</Text>
              </View>
              
              <View style={styles.metaContainer}>
                <View style={styles.metaItem}>
                  <MaterialIcons name="fitness-center" size={16} color={PRIMARY} />
                  <Text style={styles.metaText}>{routine.muscle}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="schedule" size={16} color={PRIMARY} />
                  <Text style={styles.metaText}>{routine.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="list-alt" size={16} color={PRIMARY} />
                  <Text style={styles.metaText}>{routine.exercises}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Workout</Text>
                <MaterialIcons name="play-circle-filled" size={20} color={BACKGROUND_DARK} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(18, 20, 10, 0.8)',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ACCENT_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_DARK,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE_DARK,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: TEXT_DARK,
    fontSize: 14,
    height: '100%',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: PRIMARY,
  },
  categoryChipInactive: {
    backgroundColor: SURFACE_DARK,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: BACKGROUND_DARK,
  },
  categoryTextInactive: {
    color: TEXT_DARK,
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: SURFACE_DARK,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: ACCENT_DARK,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  levelBadgeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: BACKGROUND_DARK,
    textTransform: 'uppercase',
  },
  cardContent: {
    padding: 20,
    gap: 12,
  },
  cardHeader: {
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_DARK,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_MUTED_DARK,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BACKGROUND_DARK,
  },
});
