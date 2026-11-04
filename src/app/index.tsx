import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
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

export default function RestaurantMenuScreen() {
  //Navigation
  const router = useRouter();

  //Get menu items from the menu context
  const { dishes, deleteDish } = useMenu();

  //Search and filter menu items
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  //Filter menu items by name and course
  const filteredDishes = dishes.filter((dish) => {
    const matchesName = dish.name
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    const matchesCourse =
      selectedCourse === 'All' || dish.course === selectedCourse;

    return matchesName && matchesCourse;
  });

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
          <View style={styles.dishCard}>

            {/*Menu item picture*/}
            <View style={styles.imageContainer}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.dishImage}
                />
              ) : (
                <View style={styles.noImage}>
                  <Text style={styles.noImageText}>
                    No Image
                  </Text>
                </View>
              )}
            </View>

            {/*Menu item information*/}
            <View style={styles.dishInfo}>

              {/*Dish name*/}
              <Text style={styles.dishName}>
                {item.name}
              </Text>

              {/*Course underneath the dish name*/}
              <Text style={styles.course}>
                {item.course}
              </Text>

              {/*Dish description*/}
              <Text style={styles.description}>
                {item.description}
              </Text>

              {/*Price at the bottom right*/}
              <Text style={styles.price}>
                R{item.price}
              </Text>

              {/*Edit and delete buttons*/}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    router.push({
                      pathname: '/add-menu',
                      params: { id: item.id },
                    })
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.editButtonText}>
                    EDIT
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDelete(item.id, item.name)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.deleteButtonText}>
                    DELETE
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
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
                ? 'Add your first menu item using the button below.'
                : 'Try a different search or course filter.'}
            </Text>
          </View>
        }

        //Add menu item button and total count
        ListFooterComponent={
          <View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push('/add-menu')}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>
                + ADD NEW MENU ITEM
              </Text>
            </TouchableOpacity>

            {/*Total number of menu items*/}
            <View style={styles.totalContainer}>
              <Text style={styles.totalNumber}>
                {dishes.length}
              </Text>

              <Text style={styles.totalLabel}>
                TOTAL MENU ITEMS
              </Text>
            </View>
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

  //Menu item card
  dishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5DED7',
    flexDirection: 'row',
    minHeight: 150,
  },

  //Picture container
  imageContainer: {
    width: 120,
    marginRight: 14,
  },

  //Menu item picture
  dishImage: {
    width: 120,
    height: 125,
    borderRadius: 12,
  },

  //Picture placeholder
  noImage: {
    width: 120,
    height: 125,
    borderRadius: 12,
    backgroundColor: '#EDE9E4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Placeholder text
  noImageText: {
    fontSize: 12,
    color: '#999999',
  },

  //Menu information area
  dishInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  //Dish name
  dishName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#3E2C23',
    marginBottom: 4,
  },

  //Course displayed in italic
  course: {
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#3D8B5F',
    marginBottom: 6,
  },

  //Dish description
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: '#75675F',
  },

  //Red price at the bottom right
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D9534F',
    textAlign: 'right',
    marginTop: 'auto',
  },

  //Edit and delete button container
actionButtons: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: 10,
  gap: 8,
},

//Edit button
editButton: {
  backgroundColor: '#3D8B5F',
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 7,
},

//Edit button text
editButtonText: {
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: '800',
},

//Delete button
deleteButton: {
  backgroundColor: '#D9534F',
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 7,
},

//Delete button text
deleteButtonText: {
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: '800',
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
    marginTop: 10,
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
});