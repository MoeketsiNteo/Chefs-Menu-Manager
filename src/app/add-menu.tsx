import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

import { useMenu } from '../MenuContext';

export default function AddMenuScreen() {
    //Navigation
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string }>();

    //Access menu context
    const { dishes, addDish, updateDish } = useMenu();

    //Find the menu item being edited
    const editingDish = dishes.find((dish) => dish.id === id);
    const isEditing = Boolean(id);
    

    //Check whether the menu item exists
    if (isEditing && !editingDish) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.keyboardContainer}>
            <Text style={styles.title}>
              Menu item not found.
            </Text>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.replace('/')}
            >
              <Text style={styles.cancelButtonText}>
                BACK TO MENU
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

  //Form fields
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);

  //Load existing menu item details when editing
  useEffect(() => {
    if (editingDish) {
      setDishName(editingDish.name);
      setDescription(editingDish.description);
      setCourse(editingDish.course);
      setPrice(editingDish.price);
      setImage(editingDish.image);
    }
  }, [editingDish]);

  //Validation messages
  const [dishNameError, setDishNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [courseError, setCourseError] = useState('');
  const [priceError, setPriceError] = useState('');

  //Success message
  const [successMessage, setSuccessMessage] = useState('');

  //Select an optional picture
  const selectImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  //Remove selected picture
  const removeImage = () => {
    setImage(undefined);
  };

  //Save menu item
  const saveMenuItem = () => {
    //Clear previous validation messages
    setDishNameError('');
    setDescriptionError('');
    setCourseError('');
    setPriceError('');
    setSuccessMessage('');

    let hasError = false;

    //Validate dish name
    if (!dishName.trim()) {
      setDishNameError('Please enter the dish name.');
      hasError = true;
    }

    //Validate description
    if (!description.trim()) {
      setDescriptionError('Please enter the dish description.');
      hasError = true;
    }

    //Validate price
    if (!price.trim()) {
      setPriceError('Please enter the price.');
      hasError = true;
    }

    //Validate course
    if (!course) {
      setCourseError('Please select a course.');
      hasError = true;
    }

    //Stop if validation fails
    if (hasError) {
      return;
    }
    
    //Create menu item
    const savedDish = {
      id: editingDish ? editingDish.id : Date.now().toString(),
      name: dishName.trim(),
      description: description.trim(),
      course,
      price: price.trim(),
      image,
    };

    //Update existing item or add a new item
    if (editingDish) {
      updateDish(editingDish.id, savedDish);
      setSuccessMessage('Menu item updated successfully!');
    } else {
      addDish(savedDish);
      setSuccessMessage('Menu item added successfully!');
    }

    //Clear form fields
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setImage(undefined);

    //Return to restaurant menu
    setTimeout(() => {
      router.replace('/');
    }, 1500);
  };

  //Cancel and return to restaurant menu
  const cancel = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
>

          {/*Page heading*/}
          <Text style={styles.title}>
            {isEditing ? 'EDIT MENU ITEM' : 'ADD MENU ITEMS'}
          </Text>

          {/*Success message*/}
          {successMessage ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>
                ✓ {successMessage}
              </Text>
            </View>
          ) : null}

          {/*Dish name*/}
          <Text style={styles.label}>
            DISH NAME:
          </Text>

          <TextInput
            style={[
              styles.input,
              dishNameError ? styles.inputError : null,
            ]}
            placeholder="Enter dish name"
            placeholderTextColor="#888888"
            value={dishName}
            onChangeText={(text) => {
              setDishName(text);
              setDishNameError('');
            }}
          />

          {dishNameError ? (
            <Text style={styles.errorText}>
              {dishNameError}
            </Text>
          ) : null}

          {/*Description*/}
          <Text style={styles.label}>
            DESCRIPTION:
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.descriptionInput,
              descriptionError ? styles.inputError : null,
            ]}
            placeholder="Enter dish description"
            placeholderTextColor="#888888"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setDescriptionError('');
            }}
            multiline
          />

          {descriptionError ? (
            <Text style={styles.errorText}>
              {descriptionError}
            </Text>
          ) : null}

          {/*Price*/}
          <Text style={styles.label}>
            PRICE:
          </Text>

          <TextInput
            style={[
              styles.input,
              priceError ? styles.inputError : null,
            ]}
            placeholder="Enter price"
            placeholderTextColor="#888888"
            value={price}
            onChangeText={(text) => {
              setPrice(text);
              setPriceError('');
            }}
            keyboardType="decimal-pad"
          />

          {priceError ? (
            <Text style={styles.errorText}>
              {priceError}
            </Text>
          ) : null}

          {/*Course*/}
          <Text style={styles.label}>
            COURSE:
          </Text>

          <View
            style={[
              styles.pickerContainer,
              courseError ? styles.pickerError : null,
            ]}
          >
            <Picker
              selectedValue={course}
              onValueChange={(itemValue) => {
                setCourse(itemValue);
                setCourseError('');
              }}
            >
              <Picker.Item
                label="Select course"
                value=""
              />

              <Picker.Item
                label="Starter"
                value="Starter"
              />

              <Picker.Item
                label="Main Course"
                value="Main Course"
              />

              <Picker.Item
                label="Dessert"
                value="Dessert"
              />
            </Picker>
          </View>

          {courseError ? (
            <Text style={styles.errorText}>
              {courseError}
            </Text>
          ) : null}

          {/*Optional picture*/}
          <Text style={styles.label}>
            MENU ITEM PICTURE:
          </Text>

          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: image }}
                style={styles.imagePreview}
              />

              <TouchableOpacity
                style={styles.removeButton}
                onPress={removeImage}
                activeOpacity={0.8}
              >
                <Text style={styles.removeButtonText}>
                  REMOVE PICTURE
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addPictureButton}
              onPress={selectImage}
              activeOpacity={0.8}
            >
              <Text style={styles.addPictureIcon}>
                +
              </Text>

              <Text style={styles.addPictureText}>
                ADD PICTURE
              </Text>

              <Text style={styles.optionalText}>
                Optional
              </Text>
            </TouchableOpacity>
          )}

          {/*Save button*/}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveMenuItem}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>
              {isEditing ? 'UPDATE MENU' : 'SAVE MENU'}
            </Text>
          </TouchableOpacity>

          {/*Cancel button*/}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={cancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>
              CANCEL
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

//Form styles
const styles = StyleSheet.create({
  //Main screen
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },

  //Keyboard container
  keyboardContainer: {
    flex: 1,
  },

  //Form content
  content: {
    padding: 24,
    paddingBottom: 40,
  },

  //Page heading
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3D8B5F',
    textAlign: 'center',
    marginBottom: 24,
  },

  //Form labels
  label: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3E2C23',
    marginBottom: 8,
  },

  //Text input
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D8D0C8',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#3E2C23',
    backgroundColor: '#FFFFFF',
    marginBottom: 6,
  },

  //Error input border
  inputError: {
    borderColor: '#D9534F',
    borderWidth: 1.5,
  },

  //Validation message
  errorText: {
    color: '#D9534F',
    fontSize: 13,
    marginBottom: 14,
    marginTop: 2,
  },

  //Description input
  descriptionInput: {
    height: 100,
    paddingTop: 14,
    textAlignVertical: 'top',
  },

  //Course picker
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D0C8',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 6,
  },

  //Error picker border
  pickerError: {
    borderColor: '#D9534F',
    borderWidth: 1.5,
  },

  //Picture selection button
  addPictureButton: {
    height: 130,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D0C8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  //Picture plus icon
  addPictureIcon: {
    fontSize: 30,
    fontWeight: '300',
    color: '#3D8B5F',
    marginBottom: 2,
  },

  //Picture button text
  addPictureText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3D8B5F',
  },

  //Optional picture text
  optionalText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },

  //Picture preview
  imagePreviewContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D8D0C8',
    alignItems: 'center',
  },

  //Picture preview image
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },

  //Remove picture button
  removeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  //Remove picture text
  removeButtonText: {
    color: '#D9534F',
    fontSize: 13,
    fontWeight: '700',
  },

  //Success message box
  successBox: {
    backgroundColor: '#E7F5EC',
    borderWidth: 1,
    borderColor: '#3D8B5F',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },

  //Success message text
  successText: {
    color: '#3D8B5F',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

  //Save button
  saveButton: {
    height: 52,
    backgroundColor: '#3D8B5F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  //Save button text
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  //Cancel button
  cancelButton: {
    height: 52,
    backgroundColor: '#8A8A8A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Cancel button text
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});