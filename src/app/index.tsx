import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useMenu } from '../MenuContext';
import MenuItems from '../components/menu-items';

export default function RestaurantMenuScreen() {
  //Navigation
  const router = useRouter();

  //Get menu items from the menu context
  const { dishes, deleteDish } = useMenu();

  //Search and filter menu items
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  //Menu overview visibility
  const [showOverview, setShowOverview] = useState(false);

  //Filter menu items by name and course
  const filteredDishes = dishes.filter((dish) => {
    const matchesName = dish.name
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    const matchesCourse =
      selectedCourse === 'All' || dish.course === selectedCourse;

    return matchesName && matchesCourse;
  });

  //Calculate menu statistics
const totalItems = dishes.length;

//Calculate average menu price
const totalPrice = dishes.reduce(
  (total, dish) => total + (Number(dish.price) || 0),
  0
);

const averagePrice =
  totalItems > 0 ? totalPrice / totalItems : 0;

//Count items in each course
const starterCount = dishes.filter(
  (dish) => dish.course === 'Starter'
).length;

const mainCourseCount = dishes.filter(
  (dish) => dish.course === 'Main Course'
).length;

const dessertCount = dishes.filter(
  (dish) => dish.course === 'Dessert'
).length;

//Calculate average price for a course
const calculateCourseAverage = (courseName: string) => {
  const courseDishes = dishes.filter(
    (dish) => dish.course === courseName
  );

  if (courseDishes.length === 0) {
    return 0;
  }

  const courseTotal = courseDishes.reduce(
    (total, dish) => total + (Number(dish.price) || 0),
    0
  );

  return courseTotal / courseDishes.length;
};

//Calculate average price for each course
const starterAverage = calculateCourseAverage('Starter');
const mainCourseAverage = calculateCourseAverage('Main Course');
const dessertAverage = calculateCourseAverage('Dessert');

//Delete menu item with confirmation
const confirmDelete = (id: string, name: string) => {
  if (Platform.OS === 'web') {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (confirmed) {
      deleteDish(id);
    }
  } else {
    Alert.alert(
      'Delete Menu Item',
      `Are you sure you want to delete ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteDish(id),
        },
      ]
    );
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}

        //Restaurant menu header
        ListHeaderComponent={
          <View>
            {/*Restaurant heading*/}
            <View style={styles.header}>
              <Text style={styles.title}>
                RESTAURANT MENU
              </Text>

              <Text style={styles.subtitle}>
                Manage your restaurant menu
              </Text>
            </View>

            {/*Add menu item button*/}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push('/add-menu')}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>
                + ADD NEW MENU ITEM
              </Text>
            </TouchableOpacity>

            {/*Search menu items*/}
            <TextInput
              style={styles.searchInput}
              placeholder="Search menu items by name..."
              value={searchText}
              onChangeText={setSearchText}
            />

            {/*Filter menu items by course*/}
            <View style={styles.filterContainer}>
              <Text style={styles.filterLabel}>
                FILTER BY COURSE:
              </Text>

              <View style={styles.filterButtons}>
                {['All', 'Starter', 'Main Course', 'Dessert'].map((course) => (
                  <TouchableOpacity
                    key={course}
                    style={[
                      styles.filterButton,
                      selectedCourse === course && styles.activeFilterButton,
                    ]}
                    onPress={() => setSelectedCourse(course)}
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        selectedCourse === course && styles.activeFilterButtonText,
                      ]}
                    >
                      {course}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/*Clear search and filters*/}
            {(searchText.trim() !== '' || selectedCourse !== 'All') && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setSearchText('');
                  setSelectedCourse('All');
                }}
              >
                <Text style={styles.clearButtonText}>
                  CLEAR FILTERS
                </Text>
              </TouchableOpacity>
            )}

            {/*Menu overview toggle*/}
            <TouchableOpacity
              style={styles.overviewToggle}
              onPress={() => setShowOverview(!showOverview)}
              activeOpacity={0.8}
            >
              <Text style={styles.overviewToggleText}>
                {showOverview ? 'HIDE MENU OVERVIEW' : 'SHOW MENU OVERVIEW'}
              </Text>
            </TouchableOpacity>

            {/*Menu overview*/}
            {showOverview && (
              <View style={styles.statisticsOverview}>
                <Text style={styles.overviewTitle}>
                  MENU OVERVIEW
                </Text>

                {/*Starters*/}
                <View style={styles.courseCard}>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>Starters</Text>
                    <Text style={styles.courseDescription}>
                      {starterCount} dishes
                    </Text>
                  </View>
                  <View style={styles.coursePriceInfo}>
                    <Text style={styles.courseAverage}>
                      R{starterAverage.toFixed(2)}
                    </Text>
                    <Text style={styles.courseDescription}>
                      Average price
                    </Text>
                  </View>
                </View>

                {/*Main courses*/}
                <View style={styles.courseCard}>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>Main Courses</Text>
                    <Text style={styles.courseDescription}>
                      {mainCourseCount} dishes
                    </Text>
                  </View>
                  <View style={styles.coursePriceInfo}>
                    <Text style={styles.courseAverage}>
                      R{mainCourseAverage.toFixed(2)}
                    </Text>
                    <Text style={styles.courseDescription}>
                      Average price
                    </Text>
                  </View>
                </View>

                {/*Desserts*/}
                <View style={styles.courseCard}>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>Desserts</Text>
                    <Text style={styles.courseDescription}>
                      {dessertCount} dishes
                    </Text>
                  </View>
                  <View style={styles.coursePriceInfo}>
                    <Text style={styles.courseAverage}>
                      R{dessertAverage.toFixed(2)}
                    </Text>
                    <Text style={styles.courseDescription}>
                      Average price
                    </Text>
                  </View>
                </View>

                {/*Menu totals*/}
                <View style={styles.overviewCards}>
                  <View style={styles.overviewCard}>
                    <Text style={styles.overviewNumber}>
                      {totalItems}
                    </Text>
                    <Text style={styles.overviewLabel}>
                      TOTAL DISHES
                    </Text>
                  </View>

                  <View style={styles.overviewCard}>
                    <Text style={styles.overviewNumber}>
                      R{averagePrice.toFixed(2)}
                    </Text>
                    <Text style={styles.overviewLabel}>
                      AVERAGE PRICE
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/*Menu items result count*/}
            {dishes.length > 0 && (
              <Text style={styles.resultCount}>
                Showing {filteredDishes.length} of {dishes.length} menu items
              </Text>
            )}

            {/*Menu items heading*/}
            {dishes.length > 0 && (
              <Text style={styles.sectionTitle}>
                MENU ITEMS
              </Text>
            )}
          </View>
        }

        //Display each menu item
        renderItem={({ item }) => (
          <MenuItems
            item={item}
            onEdit={(id) =>
              router.push({
                pathname: '/add-menu',
                params: { id },
              })
            }
            onDelete={confirmDelete}
          />
        )}

          //Message when there are no menu items
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                {dishes.length === 0
                  ? 'No menu items yet'
                  : 'No matching menu items'}
              </Text>

              <Text style={styles.emptyText}>
                {dishes.length === 0
                  ? 'Use the button above to add your first menu item.'
                  : 'Try a different search or course filter.'}
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    );
  }

//Screen and menu item styles
const styles = StyleSheet.create({

//Total menu items container
totalContainer: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 16,
  marginBottom: 24,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E5DED7',
},

//Total number of menu items
totalNumber: {
  fontSize: 32,
  fontWeight: '800',
  color: '#3D8B5F',
},

//Total menu items label
totalLabel: {
  fontSize: 13,
  fontWeight: '700',
  color: '#75675F',
  marginTop: 4,
},

  //Main screen
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },

  //Main content spacing
  content: {
    padding: 24,
    paddingBottom: 40,
  },

  //Green restaurant header
  header: {
    backgroundColor: '#3D8B5F',
    borderRadius: 12,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },

  //Main restaurant heading
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
  },

  //Restaurant subtitle
  subtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'center',
  },

  //Orange menu items heading
  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#E58A2B',
    textAlign: 'left',
    marginBottom: 14,
  },

  //Menu items result count
  resultCount: {
    fontSize: 13,
    color: '#8A7D75',
    marginBottom: 6,
  },

  //Empty menu container
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
  },

  //Empty menu heading
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3E2C23',
    marginBottom: 8,
  },

  //Empty menu message
  emptyText: {
    fontSize: 14,
    color: '#8A7D75',
    textAlign: 'center',
  },

  //Add menu item button
  addButton: {
    height: 52,
    backgroundColor: '#3D8B5F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },

  //Add button text
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  //Search input field
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#3D8B5F',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#3E2C23',
    marginBottom: 20,
    elevation: 2,
  },

  //Course filter container
  filterContainer: {
    marginBottom: 20,
  },

  //Filter label
  filterLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E2C23',
    marginBottom: 10,
  },

  //Filter buttons container
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  //Filter button
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3D8B5F',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 15,
  },

  //Selected filter button
  activeFilterButton: {
    backgroundColor: '#3D8B5F',
  },

  //Filter button text
  filterButtonText: {
    color: '#3D8B5F',
    fontSize: 13,
    fontWeight: '600',
  },

  //Selected filter text
  activeFilterButtonText: {
    color: '#FFFFFF',
  },

  //Clear filters button
  clearButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 15,
  },

  //Clear filters button text
  clearButtonText: {
    color: '#3D8B5F',
    fontSize: 13,
    fontWeight: '700',
  },

  //Menu statistics container
statisticsContainer: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 16,
  marginBottom: 24,
  borderWidth: 1,
  borderColor: '#E5DED7',
},

//Statistics heading
statisticsHeading: {
  fontSize: 15,
  fontWeight: '800',
  color: '#3D8B5F',
  marginBottom: 15,
},

//Statistics row
statisticsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#E5DED7',
},

//Statistics labels
statisticsLabel: {
  fontSize: 14,
  color: '#3E2C23',
  fontWeight: '600',
},

//Statistics numbers
statisticsNumber: {
  fontSize: 16,
  fontWeight: '800',
  color: '#3D8B5F',
},

//Menu overview container
statisticsOverview: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 18,
  marginTop: 20,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: '#E5DED7',
},

//Menu overview toggle button
overviewToggle: {
  backgroundColor: '#3D8B5F',
  borderRadius: 10,
  paddingVertical: 14,
  paddingHorizontal: 16,
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 16,
},

//Menu overview toggle text
overviewToggleText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},

//Menu overview heading
overviewTitle: {
  fontSize: 18,
  fontWeight: '800',
  color: '#3E2C23',
  marginBottom: 16,
},

//Course statistics card
courseCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F7F4EF',
  borderRadius: 12,
  padding: 14,
  marginBottom: 10,
},

//Course information
courseInfo: {
  flex: 1,
},

//Course name
courseName: {
  fontSize: 15,
  fontWeight: '700',
  color: '#3E2C23',
},

//Course description
courseDescription: {
  fontSize: 12,
  color: '#8A7D75',
  marginTop: 3,
},

//Course item count
courseCount: {
  fontSize: 22,
  fontWeight: '800',
  color: '#3D8B5F',
},

//Course average price container
coursePriceInfo: {
  alignItems: 'flex-end',
},

//Course average price
courseAverage: {
  fontSize: 17,
  fontWeight: '800',
  color: '#3D8B5F',
},

//Container for the two overview cards
overviewCards: {
  flexDirection: 'row',
  gap: 12,
  marginTop: 20,
  marginBottom: 24,
},

//Individual overview card
overviewCard: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  borderRadius: 14,
  padding: 18,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E5DED7',
},

//Overview card number
overviewNumber: {
  fontSize: 24,
  fontWeight: '800',
  color: '#3D8B5F',
},

//Overview card label
overviewLabel: {
  fontSize: 12,
  fontWeight: '700',
  color: '#75675F',
  marginTop: 8,
  textAlign: 'center',
},

});