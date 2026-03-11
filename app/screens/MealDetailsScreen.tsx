import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Platform, StatusBar, ImageBackground } from 'react-native';
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import Slider from '@react-native-community/slider';

const PRIMARY = "#ccff00";
const BG_DARK = "#1f230f";
const TEXT_WHITE = "#f1f5f9";
const TEXT_MUTED = "#94a3b8";

const MealDetailsScreen = () => {
  const router = useRouter();
  const { name, calories } = useLocalSearchParams();
  const [servingSize, setServingSize] = useState(150);

  // Mock data - normally would come from API/params
  const mealName = name || "Grilled Chicken Breast";
  const baseCalories = 165; // per 100g
  
  const currentCalories = Math.round((baseCalories * servingSize) / 100);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.iconButton}
        >
          <MaterialIcons name="arrow-back" size={24} color={TEXT_WHITE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FitFlow</Text>
        <TouchableOpacity style={styles.addButtonHeader}>
           <MaterialIcons name="add" size={24} color={PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Hero Image */}
        <View style={styles.heroImageContainer}>
             <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrm9eztoAugTme14LBjfsKJ6kZAvlfgJHcpdlzAdXdyIc2UVexcp7rArO4DU27ZnfIF-k-Tcm3wXcO__ByqzqvfEA5lhb8lNwUZF1-FKM1R5EvHyUNIlY-bO1aCkKyycdGcIUHCMEtB6QSxvxVViot_vL3qijV4oP667rMGDRyCihn2o2gm8N1MScaUp_HY3ij3KWyFYySxSjEeuEwDMAbZaepYN6uPHSSdC0PlqbhYbq3dfHOqlLOZzvQixLtCioi601tRIyYpjo' }}
                style={styles.heroImage}
                imageStyle={{ borderRadius: 24 }}
            />
        </View>

        {/* Title & Calories */}
        <View style={styles.titleSection}>
            <Text style={styles.mealTitle}>{mealName}</Text>
            <View style={styles.calorieTag}>
                <MaterialIcons name="local-fire-department" size={16} color={PRIMARY} />
                <Text style={styles.calorieText}>{baseCalories} kcal / 100g</Text>
            </View>
        </View>

        {/* Nutrition Overview */}
        <View style={styles.nutritionSection}>
            <Text style={styles.sectionTitle}>Nutrition Overview</Text>
            <View style={styles.nutritionGrid}>
                {/* Protein */}
                <View style={styles.nutritionCard}>
                    <View style={styles.chartContainer}>
                        <Svg height="56" width="56" viewBox="0 0 56 56">
                            <Circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="transparent" />
                            <Circle cx="28" cy="28" r="24" stroke={PRIMARY} strokeWidth="4" fill="transparent" strokeDasharray="150.7" strokeDashoffset="30.1" strokeLinecap="round" rotation="-90" origin="28, 28" />
                        </Svg>
                        <Text style={styles.chartLabel}>80%</Text>
                    </View>
                    <Text style={styles.macroValue}>31g</Text>
                    <Text style={styles.macroLabel}>PROTEIN</Text>
                </View>

                {/* Carbs */}
                <View style={styles.nutritionCard}>
                    <View style={styles.chartContainer}>
                        <Svg height="56" width="56" viewBox="0 0 56 56">
                            <Circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="transparent" />
                            <Circle cx="28" cy="28" r="24" stroke="rgba(204, 255, 0, 0.4)" strokeWidth="4" fill="transparent" strokeDasharray="150.7" strokeDashoffset="145" strokeLinecap="round" rotation="-90" origin="28, 28" />
                        </Svg>
                        <Text style={styles.chartLabel}>2%</Text>
                    </View>
                    <Text style={styles.macroValue}>0g</Text>
                    <Text style={styles.macroLabel}>CARBS</Text>
                </View>

                {/* Fats */}
                <View style={styles.nutritionCard}>
                    <View style={styles.chartContainer}>
                        <Svg height="56" width="56" viewBox="0 0 56 56">
                            <Circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="transparent" />
                            <Circle cx="28" cy="28" r="24" stroke="rgba(204, 255, 0, 0.6)" strokeWidth="4" fill="transparent" strokeDasharray="150.7" strokeDashoffset="120" strokeLinecap="round" rotation="-90" origin="28, 28" />
                        </Svg>
                        <Text style={styles.chartLabel}>18%</Text>
                    </View>
                    <Text style={styles.macroValue}>3.6g</Text>
                    <Text style={styles.macroLabel}>FATS</Text>
                </View>
            </View>
        </View>

        {/* Serving Size Selector */}
        <View style={styles.servingSection}>
            <View style={styles.servingHeader}>
                <View>
                    <Text style={styles.sectionTitle}>Serving Size</Text>
                    <Text style={styles.sectionSubtitle}>Adjust your portion</Text>
                </View>
                <View style={styles.servingValueBox}>
                    <Text style={styles.servingValueText}>{servingSize}</Text>
                    <Text style={styles.servingUnitText}>g</Text>
                </View>
            </View>

            <Slider
                style={{width: '100%', height: 40}}
                minimumValue={10}
                maximumValue={500}
                step={10}
                value={servingSize}
                onValueChange={setServingSize}
                minimumTrackTintColor={PRIMARY}
                maximumTrackTintColor="rgba(255,255,255,0.2)"
                thumbTintColor={PRIMARY}
            />
            
            <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>10g</Text>
                <Text style={styles.sliderLabel}>100g</Text>
                <Text style={styles.sliderLabel}>200g</Text>
                <Text style={styles.sliderLabel}>300g</Text>
                <Text style={styles.sliderLabel}>400g</Text>
                <Text style={styles.sliderLabel}>500g</Text>
            </View>
        </View>

        {/* Detailed Macros */}
        <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Detailed Macros</Text>
            <View style={styles.detailList}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Fiber</Text>
                    <Text style={styles.detailValue}>0g</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Sugar</Text>
                    <Text style={styles.detailValue}>0g</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Sodium</Text>
                    <Text style={styles.detailValue}>74mg</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Cholesterol</Text>
                    <Text style={styles.detailValue}>85mg</Text>
                </View>
                <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.detailLabel}>Potassium</Text>
                    <Text style={styles.detailValue}>256mg</Text>
                </View>
            </View>
        </View>

        {/* Bottom Spacer */}
        <View style={{ height: 100 }} />

      </ScrollView>

      {/* Sticky Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToMealButton} activeOpacity={0.9}>
            <MaterialIcons name="add-task" size={24} color="#1f230f" />
            <Text style={styles.addToMealText}>Add to Breakfast</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    backgroundColor: 'rgba(31, 35, 15, 0.8)',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_WHITE,
  },
  addButtonHeader: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(204, 255, 0, 0.2)',
  },
  content: {
    padding: 16,
  },
  heroImageContainer: {
    height: 288, // min-h-72
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#2d3319',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  titleSection: {
    marginBottom: 32,
  },
  mealTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: TEXT_WHITE,
    lineHeight: 36,
  },
  calorieTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  calorieText: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nutritionSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_WHITE,
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  nutritionCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
  },
  chartContainer: {
    position: 'relative',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  chartLabel: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    color: TEXT_WHITE,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: TEXT_WHITE,
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: TEXT_MUTED,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  servingSection: {
    marginBottom: 32,
  },
  servingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
  servingValueBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'rgba(204, 255, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(204, 255, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  servingValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  servingUnitText: {
    fontSize: 12,
    fontWeight: '500',
    color: PRIMARY,
    marginLeft: 2,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: TEXT_MUTED,
    textTransform: 'uppercase',
  },
  detailsSection: {
    marginBottom: 32,
  },
  detailList: {
    gap: 0,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_MUTED,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: TEXT_WHITE,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: BG_DARK, // simplified gradient for now
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  addToMealButton: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  addToMealText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f230f',
  },
});

export default MealDetailsScreen;