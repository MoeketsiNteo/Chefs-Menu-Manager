import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Dish } from '../MenuContext';

//Menu item component properties
type MenuItemsProps = {
  item: Dish;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
};

//Display a single menu item
export default function MenuItems({
  item,
  onEdit,
  onDelete,
}: MenuItemsProps) {
  return (
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
        <Text style={styles.dishName}>
          {item.name}
        </Text>

        <Text style={styles.course}>
          {item.course}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        <Text style={styles.price}>
          R{item.price}
        </Text>

        {/*Edit and delete buttons*/}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.editButtonText}>
              EDIT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(item.id, item.name)}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteButtonText}>
              DELETE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});