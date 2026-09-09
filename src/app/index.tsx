import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
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
  const { dishes } = useMenu();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}

        //Restaurant menu header
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>
                RESTAURANT MENU
              </Text>

              <Text style={styles.subtitle}>
                Manage your restaurant menu
              </Text>
            </View>

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

            </View>
          </View>
        )}

        //Message when there are no menu items
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No menu items yet
            </Text>

            <Text style={styles.emptyText}>
              Add your first menu item using the button below.
            </Text>
          </View>
        }

        //Add menu item button
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('add-menu')}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>
              + ADD NEW MENU ITEM
            </Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}

//Screen and menu item styles
const styles = StyleSheet.create({
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
});