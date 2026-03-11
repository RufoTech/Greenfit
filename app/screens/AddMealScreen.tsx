import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PRIMARY = "#ccff00";
const BG_DARK = "#1f230f";

// Mock data for meals
const meals = {
  recent: [
    { id: 1, icon: "egg", name: "Boiled Eggs", detail: "2 units • 156 kcal" }, // egg_alt -> egg
    { id: 2, icon: "coffee", name: "Oatmeal with Milk", detail: "250g • 320 kcal" },
    { id: 3, icon: "restaurant", name: "Avocado Toast", detail: "1 slice • 210 kcal" }, // nutrition -> restaurant (approx)
  ],
  frequent: [
    { id: 4, icon: "restaurant", name: "Grilled Chicken", detail: "150g • 245 kcal" },
    { id: 5, icon: "eco", name: "Greek Salad", detail: "200g • 180 kcal" },
  ],
};

const categories = ["Breakfast", "Lunch", "Dinner", "Snacks"];

interface MealItemProps {
    icon: string;
    name: string;
    detail: string;
    onAdd?: (item: any) => void;
}

const MealItem = ({ icon, name, detail, onAdd }: MealItemProps) => {
  const [added, setAdded] = useState(false);

  const router = useRouter();

  const handleMealPress = (item: any) => {
    router.push({
      pathname: "/screens/MealDetailsScreen",
      params: { name: item.name, detail: item.detail, icon: item.icon }
    });
  };

  const handleAdd = () => {
    setAdded(true);
    onAdd?.({ name, detail, icon });
    // Visual feedback duration
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <View style={styles.mealItem}>
      <TouchableOpacity 
        style={styles.mealLeft}
        onPress={() => handleMealPress({ name, detail, icon })}
      >
        <View style={styles.mealIconContainer}>
          <MaterialIcons name={icon as any} size={24} color={PRIMARY} />
        </View>
        <View>
          <Text style={styles.mealName}>{name}</Text>
          <Text style={styles.mealDetail}>{detail}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAdd}
        style={[
            styles.addButton,
            added ? styles.addButtonAdded : styles.addButtonNormal
        ]}
        activeOpacity={0.8}
      >
        <MaterialIcons name={added ? "check" : "add"} size={24} color="#1f230f" />
      </TouchableOpacity>
    </View>
  );
};

export default function AddMealScreen() {
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  const [search, setSearch] = useState("");
  const [addedItems, setAddedItems] = useState<any[]>([]);
  const router = useRouter();

  const filterMeals = (list: any[]) =>
    list.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (item: any) => {
    setAddedItems((prev) => [...prev, item]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(31,35,15,0.8)" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
            <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => router.back()}
            >
                <MaterialIcons name="arrow-back" size={24} color="#f1f5f9" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Meal</Text>
            {addedItems.length > 0 ? (
                <View style={styles.counterBadge}>
                    <Text style={styles.counterText}>{addedItems.length}</Text>
                </View>
            ) : (
                <View style={styles.placeholderButton} />
            )}
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <MaterialIcons name="search" size={24} color="rgba(204,255,0,0.6)" style={{ marginRight: 8 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search food"
                    placeholderTextColor="rgba(204,255,0,0.4)"
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity>
                    <MaterialIcons name="qr-code-scanner" size={24} color="rgba(204,255,0,0.6)" />
                </TouchableOpacity>
            </View>
        </View>

        {/* Category Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat}
                    onPress={() => setActiveCategory(cat)}
                    style={[
                        styles.tabButton,
                        activeCategory === cat ? styles.tabButtonActive : styles.tabButtonInactive
                    ]}
                >
                    <Text style={[
                        styles.tabText,
                        activeCategory === cat ? styles.tabTextActive : styles.tabTextInactive
                    ]}>{cat}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      {/* Content Section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <MaterialIcons name="history" size={20} color={PRIMARY} />
                <Text style={styles.sectionTitle}>Recent</Text>
            </View>
            <View style={styles.mealsList}>
                {filterMeals(meals.recent).map((meal) => (
                    <MealItem key={meal.id} {...meal} onAdd={handleAdd} />
                ))}
                {filterMeals(meals.recent).length === 0 && (
                    <Text style={styles.emptyText}>No results found</Text>
                )}
            </View>
        </View>

        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <MaterialIcons name="star" size={20} color={PRIMARY} />
                <Text style={styles.sectionTitle}>Frequent</Text>
            </View>
            <View style={styles.mealsList}>
                {filterMeals(meals.frequent).map((meal) => (
                    <MealItem key={meal.id} {...meal} onAdd={handleAdd} />
                ))}
                {filterMeals(meals.frequent).length === 0 && (
                    <Text style={styles.emptyText}>No results found</Text>
                )}
            </View>
        </View>
      </ScrollView>

      {/* Fixed Footer Action */}
      <View style={styles.footer}>
        <TouchableOpacity 
            style={styles.customMealButton} 
            activeOpacity={0.9}
            onPress={() => router.push('/screens/AddCustomMealScreen')}
        >
            <MaterialIcons name="add-circle" size={24} color="#1f230f" />
            <Text style={styles.customMealText}>Add Custom Meal</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: 'rgba(31,35,15,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(204,255,0,0.1)',
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(204,255,0,0.1)', // hover effect simulation
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
    flex: 1,
    textAlign: 'center',
  },
  counterBadge: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(204,255,0,0.2)',
  },
  counterText: {
    color: PRIMARY,
    fontSize: 14,
    fontWeight: 'bold',
  },
  placeholderButton: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(204,255,0,0.1)',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchInput: {
    flex: 1,
    color: '#f1f5f9',
    fontSize: 16,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  tabButton: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: PRIMARY,
  },
  tabButtonInactive: {
    backgroundColor: 'rgba(204,255,0,0.1)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#1f230f',
  },
  tabTextInactive: {
    color: PRIMARY,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // space for footer
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  mealsList: {
    gap: 12,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  mealLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  mealIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(204,255,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  mealDetail: {
    fontSize: 14,
    color: 'rgba(204,255,0,0.6)',
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonNormal: {
    backgroundColor: PRIMARY,
  },
  addButtonAdded: {
    backgroundColor: '#4ade80', // green-400
    transform: [{ scale: 1.1 }],
  },
  emptyText: {
    color: 'rgba(204,255,0,0.4)',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 32,
    backgroundColor: 'rgba(31,35,15,0.9)', // gradient simulation
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  customMealButton: {
    width: '100%',
    height: 56,
    backgroundColor: PRIMARY,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  customMealText: {
    color: '#1f230f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
