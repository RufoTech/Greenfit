import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const PRIMARY = "#ccff00";
const BG_DARK = "#1f230f";
const { width } = Dimensions.get('window');

// Icons
const Icons = {
  Back: () => (
    <Svg height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
      <Path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z"/>
    </Svg>
  ),
  Play: () => (
    <Svg height="36" viewBox="0 -960 960 960" width="36" fill="currentColor">
      <Path d="M320-200v-560l440 280-440 280Z"/>
    </Svg>
  ),
  Pause: () => (
    <Svg height="36" viewBox="0 -960 960 960" width="36" fill="currentColor">
      <Path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/>
    </Svg>
  ),
  Reps: () => (
    <Svg height="20" viewBox="0 -960 960 960" width="20" fill="currentColor">
      <Path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Z"/>
    </Svg>
  ),
  Sets: () => (
    <Svg height="20" viewBox="0 -960 960 960" width="20" fill="currentColor">
      <Path d="M160-80v-160h-40v-320l80-240h480l80 240v320h-40v160h-80v-160H240v160h-80Z"/>
    </Svg>
  ),
  Fitness: () => (
    <Svg height="22" viewBox="0 -960 960 960" width="22" fill="currentColor">
      <Path d="M120-160v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-473v-113l320-320 320 320v113L440-793 120-473Z"/>
    </Svg>
  ),
  ChevronLeft: () => (
    <Svg height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
      <Path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
    </Svg>
  ),
  ChevronRight: () => (
    <Svg height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
      <Path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
    </Svg>
  )
};

const muscles = [
  { label: "Chest", sub: "Pectorals", active: true },
  { label: "Arms", sub: "Triceps", active: false },
  { label: "Shoulder", sub: "Front Delts", active: false },
];

const dots = [false, true, false, false];

export default function ExerciseDetailScreen() {
  const [playing, setPlaying] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f230f" />
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
        >
          <View style={{ color: '#f1f5f9' }}>
             <Icons.Back />
          </View>
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Məşq Sessiyası</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Exercise Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.exerciseTitle}>Barbell Bench Press</Text>
          <Text style={styles.exerciseSubtitle}>Sinə əzələlərini gücləndirən əsas məşq</Text>
        </View>

        {/* Video Area */}
        <View style={styles.videoContainer}>
          <View style={styles.videoWrapper}>
            <Image 
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU-xcu1tQdcxu-HNaBwif_zeKJTiJNBczgXw7J4iSp60UQQ7XeNRcnfLjZZVvv4RKllb7W7VTia-dBOo8yzSudbVLBnQldL7sqYxdS2rl2x3b1wUJLsKb7AiiS9Ts5Tb5oDrwuQ7nUOo9hrYhg496u6Oh23EWJne8bD5Wuk10DW4LDkDLKZJp0MVNxMVWj5dpE0y2M2a92BKeB2gpXmEHaQ_1xK1aAUFuccxUH1nnHbs30fGJ71jGFATQ751a73tk6MfDojQqygAA" }}
                style={styles.videoImage}
                resizeMode="cover"
            />
            <View style={styles.videoOverlay}>
                <TouchableOpacity 
                    style={styles.playButton}
                    onPress={() => setPlaying(!playing)}
                >
                    <View style={{ color: BG_DARK }}>
                        {playing ? <Icons.Pause /> : <Icons.Play />}
                    </View>
                </TouchableOpacity>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarWrapper}>
                        <View style={[styles.progressBar, { width: '33%' }]}>
                             <View style={styles.progressBarKnob} />
                        </View>
                        <View style={styles.progressBarRemaining} />
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>01:12</Text>
                        <Text style={styles.timeText}>03:45</Text>
                    </View>
                </View>
            </View>
          </View>
        </View>

        {/* Stats Boxes */}
        <View style={styles.statsContainer}>
            <View style={styles.statBox}>
                <View style={styles.statHeader}>
                    <View style={{ color: '#94a3b8' }}><Icons.Reps /></View>
                    <Text style={styles.statLabel}>Təkrar (Reps)</Text>
                </View>
                <Text style={styles.statValue}>10</Text>
            </View>
            <View style={styles.statBox}>
                <View style={styles.statHeader}>
                    <View style={{ color: '#94a3b8' }}><Icons.Sets /></View>
                    <Text style={styles.statLabel}>Set Sayı</Text>
                </View>
                <Text style={styles.statValue}>2</Text>
            </View>
        </View>

        {/* Targeted Muscles */}
        <View style={styles.musclesSection}>
            <View style={styles.musclesHeader}>
                <View style={{ color: PRIMARY }}><Icons.Fitness /></View>
                <Text style={styles.musclesTitle}>Hədəf Əzələlər / Targeted Muscles</Text>
            </View>
            
            <View style={styles.musclesCard}>
                <View style={styles.muscleImageContainer}>
                    <Image 
                        source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0xlZS9lWVaYyHoLcSAm6mctlftO7RI91PEN48_WjcBd01gBzR_4kfLeBqIg3uNFdmWNlAynXRJRUpF-uyL9Sw0f8E4J8Oz3KO5GydS63Jc5Qnh8_cWoq0ajqLqc58aCfgviiZ5gJOZaspP7Eo3lZPanMaTU6loDKQKQmX04I3rlAo0mT0I0hCrPdVoO1P73KoB6_g-eloOHqjYD5DkRjB0Mm7wSnH7D-xviofZ4a6AWZFTdkRs9BCFkeZryMnzhAnvUcY3iWj9-k" }}
                        style={styles.muscleImage}
                        resizeMode="contain"
                    />
                    <View style={styles.muscleImageOverlay} />
                </View>
                
                <View style={styles.muscleGrid}>
                    {muscles.map((m, i) => (
                        <View key={i} style={[styles.muscleItem, { borderColor: m.active ? `${PRIMARY}4d` : "#334155" }]}>
                            <Text style={[styles.muscleItemLabel, { color: m.active ? PRIMARY : "#94a3b8" }]}>{m.label}</Text>
                            <Text style={styles.muscleItemSub}>{m.sub}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.footer}>
            <View style={styles.dotsContainer}>
                {dots.map((active, i) => (
                    <View 
                        key={i} 
                        style={[
                            styles.dot, 
                            { width: active ? 24 : 8, backgroundColor: active ? PRIMARY : "#334155" }
                        ]} 
                    />
                ))}
            </View>
            
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.prevButton}>
                    <View style={{ color: '#f1f5f9' }}><Icons.ChevronLeft /></View>
                    <Text style={styles.prevButtonText}>Əvvəlki</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Növbəti</Text>
                    <View style={{ color: BG_DARK }}><Icons.ChevronRight /></View>
                </TouchableOpacity>
            </View>
        </View>

        <View style={{ height: 24 }} />
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
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(31, 35, 15, 0.8)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b', // slate-800
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: PRIMARY,
    marginBottom: 4,
  },
  exerciseSubtitle: {
    fontSize: 14,
    color: '#94a3b8', // slate-400
  },
  videoContainer: {
    padding: 16,
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: `${PRIMARY}33`,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoImage: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
    zIndex: 10,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  progressBarWrapper: {
    flexDirection: 'row',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginBottom: 4,
    alignItems: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: PRIMARY,
    borderRadius: 3,
    position: 'relative',
  },
  progressBarKnob: {
    position: 'absolute',
    right: -6,
    top: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: PRIMARY,
    borderWidth: 2,
    borderColor: '#fff',
  },
  progressBarRemaining: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.5)', // slate-800/50
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155', // slate-700
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 30,
    fontWeight: '900',
    color: PRIMARY,
  },
  musclesSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  musclesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  musclesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  musclesCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)', // slate-800/30
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
  },
  muscleImageContainer: {
    width: '100%',
    height: 256,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginBottom: 24,
    position: 'relative',
  },
  muscleImage: {
    width: '100%',
    height: '100%',
  },
  muscleImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(204, 255, 0, 0.1)', // primary/10
    opacity: 0.5,
  },
  muscleGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  muscleItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: BG_DARK,
  },
  muscleItemLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  muscleItemSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#cbd5e1', // slate-300
  },
  footer: {
    padding: 16,
    gap: 16,
    marginTop: 'auto',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  prevButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#1e293b', // slate-800
  },
  prevButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BG_DARK,
  },
});
