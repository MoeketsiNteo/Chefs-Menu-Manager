# Chef's Menu Manager

**A React Native mobile application for simple and efficient restaurant menu management.**

**GitHub Repository:** https://github.com/MoeketsiNteo/Chefs-Menu-Manager

## Background

Chef's Menu Manager was developed to address a menu management challenge experienced by Christoffel, a local restaurant owner. Managing restaurant menu information using paper records made it difficult to organise, update and retrieve menu items efficiently.

The application provides a digital solution that allows restaurant owners to manage their menu items in one place. It was developed using React Native and Expo, with an emphasis on simplicity, functionality and user-friendly design.

The project progressed through three stages: initial planning and interface design in Part 1, development of the working application in Part 2, and further enhancements and code refactoring for the Final PoE.

## Change Log

This section documents the functional improvements, user interface enhancements and code refactoring implemented after Part 2.

### 1. Functional Enhancements

| Enhancement | Description |
|---|---|
| Total Menu Item Counter | Implemented a counter displaying the total number of menu items in the restaurant's menu. |
| Edit Menu Items | Added functionality to select an existing menu item, modify its details and save the updated information. |
| Delete Menu Items | Added the ability to delete menu items, including a confirmation prompt before deletion. |
| Search Functionality | Implemented a search feature allowing users to find menu items by dish name. |
| Course Filtering | Added filtering options for Starter, Main Course and Dessert. |
| Combined Search and Filtering | Enabled users to search and filter menu items simultaneously. |
| Clear Filters | Added functionality to reset active search and course filters. |
| Search Result Counter | Added a dynamic counter displaying the number of matching items compared with the total number of menu items. |
| Menu Statistics | Added an overview displaying the total number of dishes, overall average price, number of dishes per course and average price per course. |
| Collapsible Menu Overview | Added the ability to expand or collapse the menu statistics section. |
| Clear Form | Added functionality to reset form fields and validation messages. |
| Improved Price Validation | Implemented validation to prevent empty, non-numeric, zero and negative prices. |
| Improved User Feedback | Added clearer validation messages and feedback for successful additions, updates and deletions. |
| Improved Empty States | Added appropriate messages when the menu is empty or when no items match the current search or filters. |

### 2. User Interface and Experience Improvements

- Moved the Add New Menu Item button towards the top of the main screen for easier access.
- Replaced the course dropdown with selectable course buttons.
- Added a dynamic search result counter.
- Displayed the Clear Filters button only when a search or course filter is active.
- Made the Menu Overview collapsible to reduce unnecessary screen space.
- Improved the organisation and presentation of menu statistics.
- Improved the layout and presentation of menu item information and action buttons.
- Maintained consistent colours, spacing, typography and button styling throughout the application.

### 3. Code Refactoring and Organisation

| Refactoring | Description |
|---|---|
| Reusable Menu Item Component | Extracted the menu item card interface into `src/components/menu-items.tsx` to avoid repeating the same interface code. |
| Shared Menu Data Management | Used the React Context API in `src/MenuContext.tsx` to manage menu items and make the data accessible across application screens. |
| Reusable Validation Functions | Created reusable functions to validate required fields and menu item prices. |
| Centralised Validation Clearing | Created a reusable function to clear validation messages and success feedback. |
| Improved Screen Organisation | Separated the main menu screen and add/edit form into different files using Expo Router. |
| Improved Function and Variable Naming | Used meaningful names to make the code easier to understand and maintain. |
| Reduced Code Duplication | Reused components and functions instead of repeating interface and validation logic. |

## Application Features

### 1. Menu Management

The main screen displays the restaurant's menu items.

**Figure 1: Main Restaurant Menu Screen**

![Main Menu Screen](screenshots/01-menu-screen.png)

### 2. Add Menu Items

Users can add new dishes by completing the menu item form.

**Figure 2: Add Menu Item Form**

![Add Menu Item](screenshots/02-add-menu-item.png)

### 3. Form Validation and Feedback

The application validates required fields and displays appropriate feedback.

**Figure 3: Form Validation Messages**

![Validation Messages](screenshots/03-validation.png)

### 4. Search and Filtering

Users can search for dishes and filter menu items by course.

**Figure 4: Search and Filtering**

![Search and Filtering](screenshots/04-search-and-filter.png)

### 5. Menu Overview and Statistics

The overview displays menu totals and average prices.

**Figure 5: Menu Overview and Statistics**

![Menu Statistics](screenshots/05-menu-statistics.png)

### 6. Edit and Delete Menu Items

Users can update existing dishes or delete them after confirmation.

**Figure 6: Edit and Delete Menu Items**

![Edit and Delete](screenshots/06-edit-and-delete.png)

**Figure 7: Delete Confirmation**

![Delete Confirmation](screenshots/06-validation.png)

## User Interface and Experience

Chef's Menu Manager was designed with simplicity and ease of use in mind. The interface uses a consistent colour scheme, clear labels, readable text and organised menu item cards.

The application provides straightforward navigation and feedback to help users manage their restaurant menu efficiently. Validation messages guide users when entering information, while confirmation prompts help prevent accidental deletions.

## Technologies Used

| Technology | Purpose |
|---|---|
| React Native | Used to develop the mobile application interface. |
| Expo | Used as the development platform and to run the application. |
| TypeScript | Used to define data types and improve code structure. |
| Expo Router | Used for application navigation between screens. |
| React Hooks | Used to manage component state and application behaviour. |
| Context API | Used to share and manage menu data across components. |
| FlatList | Used to efficiently display menu items. |
| JavaScript Array Methods | Used for searching, filtering and calculating menu statistics. |
| Expo ImagePicker | Used to allow users to select images for menu items. |
| Git and GitHub | Used for version control and project management. |

## Project Structure

The application is organised into the following folders and files:

| Folder / File | Description |
|---|---|
| `assets/` | Contains application images and other static resources. |
| `screenshots/` | Contains screenshots showcasing the application's interface and features. |
| `src/app/` | Contains the application screens and navigation layout. |
| `src/app/_layout.tsx` | Defines the application's navigation layout. |
| `src/app/index.tsx` | Main restaurant menu screen, including menu overview, search and filtering. |
| `src/app/add-menu.tsx` | Form used to add new menu items and edit existing ones. |
| `src/components/` | Contains reusable interface components. |
| `src/components/menu-items.tsx` | Displays individual menu item cards and their actions. |
| `src/MenuContext.tsx` | Manages and shares menu item data across the application. |
| `package.json` | Contains project dependencies and configuration. |
| `README.md` | Provides project information, screenshots and setup instructions. |

## Acknowledgements and Sources

The development of Chef's Menu Manager was supported by official technical documentation and online learning resources. React Native and Expo documentation were consulted for application development and image selection. React documentation provided guidance on React Hooks, while GeeksforGeeks and W3Schools were used to understand list rendering, form validation and filtering. Stack Overflow provided additional guidance on calculating averages using JavaScript array methods.

## References

Expo (n.d.) *Create your first app*. Expo Documentation. Available at: https://docs.expo.dev/tutorial/create-your-first-app/ (Accessed: 30 August 2026).

Expo (n.d.) *ImagePicker*. Expo Documentation. Available at: https://docs.expo.dev/versions/latest/sdk/imagepicker/ (Accessed: 5 September 2026).

GeeksforGeeks (2025) *How to Implement Form Validation in React Native?* Available at: https://www.geeksforgeeks.org/mobile-computing/how-to-implement-form-validation-in-react-native/ (Accessed: 5 Septermber 2026).

GeeksforGeeks (2026) *React Native FlatList Component*. Available at: https://www.geeksforgeeks.org/react-native/react-native-flatlist-component/ (Accessed: 20 October 2026).

React (n.d.) *useEffect*. React Documentation. Available at: https://react.dev/reference/react/useEffect (Accessed: 30 August 2026).

React Native (n.d.) *Introduction*. React Native Documentation. Available at: https://reactnative.dev/docs/getting-started (Accessed:5 September 2026).

Stack Overflow (2018) *Average with the Reduce Method in JavaScript*. Available at: https://stackoverflow.com/questions/52139703/average-with-the-reduce-method-in-javascript (Accessed: 3 November 2026).

W3Schools (n.d.) *JavaScript Array filter() Method*. Available at: https://www.w3schools.com/jsref/jsref_filter.asp (Accessed: 3 November 2026).
