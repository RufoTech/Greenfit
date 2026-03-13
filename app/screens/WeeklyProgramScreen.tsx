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
  Image,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PRIMARY = "#ccff00";
const BG_DARK = "#12140a";
const SURFACE_DARK = "#1c1f0f";
const BORDER_DARK = "#2a2e18";
const TEXT_COLOR = "#f1f5f9";
const SUBTEXT_COLOR = "#94a3b8";

const WEEKS = ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4"];

const WEEK_SCHEDULE = [
  {
    day: 1,
    title: "Upper Body Power",
    type: "workout",
    duration: 45,
    exercises: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA54W803vFxU5VPAnNg2g9Sc2M3icI2uMEwRJ6dDjn2q5blzxW2GrltkuHoNINUVarOpRym9hZqtXU5I_0XDWRxrATrkW6Lef5oVLp0mer0gUY8WtYMXEO_IjUxkbb_TENn8pt73Y-Qb_oMTt3T_MSMqoTuDM7pW0AqGI0pd4vNbbCOgmDRMNzC5qTtoeAIyiPgItfixM2y14rA2TwPLpj4ZOV6vrO36YDhbQK7tpnLRNcK6Q9ZoQhg0nFfqsfttA0jgCCKGDfAqo4",
    focus: "Chest, Shoulders, Triceps",
    isCurrent: true
  },
  {
    day: 2,
    title: "Lower Body Burn",
    type: "workout",
    duration: 50,
    exercises: 10,
    isCurrent: false
  },
  {
    day: 3,
    title: "Rest Day",
    type: "rest",
    note: "Suggested: 20m Yoga or light walking",
    isCurrent: false
  },
  {
    day: 4,
    title: "Core & Cardio",
    type: "workout",
    duration: 30,
    exercises: 8,
    isCurrent: false
  },
  {
    day: 5,
    title: "Rest Day",
    type: "rest",
    note: "Deep tissue rolling recommended",
    isCurrent: false
  },
  {
    day: 6,
    title: "Full Body Strength",
    type: "workout",
    duration: 60,
    exercises: 14,
    isCurrent: false
  },
  {
    day: 7,
    title: "Rest Day",
    type: "rest",
    note: "Weekly reflection and meal prep",
    isCurrent: false
  }
];

export default function WeeklyProgramScreen() {
  const router = useRouter();
  const [activeWeek, setActiveWeek] = useState("WEEK 1");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      
      {/* Header Navigation */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <MaterialIcons name="arrow-back" size={24} color={TEXT_COLOR} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Strength Evolution</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="more-vert" size={24} color={TEXT_COLOR} />
        </TouchableOpacity>
      </View>

      {/* Weekly Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
            {WEEKS.map((week) => (
                <TouchableOpacity
                    key={week}
                    style={[styles.tab, activeWeek === week && styles.activeTab]}
                    onPress={() => setActiveWeek(week)}
                >
                    <Text style={[styles.tabText, activeWeek === week && styles.activeTabText]}>{week}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.scheduleHeader}>
            <Text style={styles.scheduleTitle}>{activeWeek} Schedule</Text>
            <Text style={styles.scheduleSubtitle}>Follow the plan to maximize results</Text>
        </View>

        {/* Day List */}
        <View style={styles.daysList}>
            {WEEK_SCHEDULE.map((item) => {
                if (item.isCurrent) {
                    return (
                        <View key={item.day} style={styles.currentDayCard}>
                            <View style={styles.currentDayHeader}>
                                <View style={styles.dayInfo}>
                                    <Text style={styles.currentDayLabel}>CURRENT DAY</Text>
                                    <Text style={styles.dayTitle}>Day {item.day}: {item.title}</Text>
                                    <View style={styles.dayMeta}>
                                        <MaterialIcons name="schedule" size={14} color={SUBTEXT_COLOR} />
                                        <Text style={styles.metaText}>{item.duration} min</Text>
                                        <Text style={styles.metaDot}>•</Text>
                                        <MaterialIcons name="fitness-center" size={14} color={SUBTEXT_COLOR} />
                                        <Text style={styles.metaText}>{item.exercises} exercises</Text>
                                    </View>
                                </View>
                                <View style={styles.boltIconContainer}>
                                    <MaterialIcons name="bolt" size={24} color={PRIMARY} />
                                </View>
                            </View>

                            <View style={styles.heroImageContainer}>
                                <Image source={{ uri: item.image }} style={styles.heroImage} />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    style={styles.imageOverlay}
                                />
                                <Text style={styles.focusText}>Focus: {item.focus}</Text>
                            </View>

                            <TouchableOpacity 
                                style={styles.startWorkoutButton}
                                onPress={() => router.push('/screens/WorkoutStartScreen')}
                            >
                                <MaterialIcons name="play-circle-filled" size={24} color={BG_DARK} />
                                <Text style={styles.startWorkoutText}>START WORKOUT</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }

                if (item.type === 'rest') {
                    return (
                        <View key={item.day} style={styles.restDayCard}>
                            <View style={styles.restDayContent}>
                                <View style={styles.dayInfo}>
                                    <Text style={styles.dayTitle}>Day {item.day}: {item.title}</Text>
                                    <Text style={styles.restNote}>{item.note}</Text>
                                </View>
                                <MaterialIcons 
                                    name={item.title === "Rest Day" && item.day === 7 ? "calendar-today" : item.title === "Rest Day" && item.day === 5 ? "hotel" : "self-improvement"} 
                                    size={24} 
                                    color="rgba(204, 255, 0, 0.6)" 
                                />
                            </View>
                        </View>
                    );
                }

                return (
                    <View key={item.day} style={styles.dayCard}>
                        <View style={styles.dayCardContent}>
                            <View style={styles.dayInfo}>
                                <Text style={styles.dayTitle}>Day {item.day}: {item.title}</Text>
                                <View style={styles.dayMeta}>
                                    <MaterialIcons name="schedule" size={14} color={SUBTEXT_COLOR} />
                                    <Text style={styles.metaText}>{item.duration} min • {item.exercises} exercises</Text>
                                </View>
                            </View>
                            <MaterialIcons 
                                name={item.title.includes("Lower") ? "fitness-center" : item.title.includes("Core") ? "directions-run" : "exercise"} 
                                size={24} 
                                color={SUBTEXT_COLOR} 
                            />
                        </View>
                    </View>
                );
            })}
        </View>

        <View style={{ height: 100 }} />
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
    borderBottomWidth: 1,
    borderBottomColor: BORDER_DARK,
    backgroundColor: 'rgba(18, 20, 10, 0.8)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  menuButton: {
    padding: 8,
    marginRight: -8,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER_DARK,
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    minWidth: 80,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: PRIMARY,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: SUBTEXT_COLOR,
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: PRIMARY,
  },
  content: {
    padding: 16,
  },
  scheduleHeader: {
    marginBottom: 16,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginBottom: 4,
  },
  scheduleSubtitle: {
    fontSize: 14,
    color: SUBTEXT_COLOR,
  },
  daysList: {
    gap: 16,
  },
  currentDayCard: {
    backgroundColor: SURFACE_DARK,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(204, 255, 0, 0.3)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  currentDayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dayInfo: {
    flex: 1,
    gap: 4,
  },
  currentDayLabel: {
    color: PRIMARY,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  dayMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: SUBTEXT_COLOR,
  },
  metaDot: {
    fontSize: 12,
    color: SUBTEXT_COLOR,
  },
  boltIconContainer: {
    backgroundColor: 'rgba(204, 255, 0, 0.1)',
    padding: 8,
    borderRadius: 8,
  },
  heroImageContainer: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  focusText: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  startWorkoutButton: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  startWorkoutText: {
    color: BG_DARK,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  dayCard: {
    backgroundColor: SURFACE_DARK,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER_DARK,
  },
  dayCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restDayCard: {
    backgroundColor: 'rgba(28, 31, 15, 0.4)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER_DARK,
    borderStyle: 'dashed',
  },
  restDayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.7,
  },
  restNote: {
    fontSize: 12,
    color: SUBTEXT_COLOR,
    fontStyle: 'italic',
  },
});
