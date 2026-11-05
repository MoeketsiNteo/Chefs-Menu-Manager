# Chef's Menu Manager

**A React Native mobile application for simple and efficient restaurant menu management.**

## Background

Chef's Menu Manager was developed to address a menu management challenge faced by a local restaurant owner, Christoffel.

Previously, the restaurant's chef relied on paper records to manage menu information. This made it difficult to update dishes, organise menu items and quickly retrieve information when needed.

The application provides a digital solution that allows the restaurant owner to manage menu items directly from a mobile device. It brings menu information together in one place, making it easier to maintain an organised and up-to-date restaurant menu.

The application was developed progressively, beginning with planning and design, followed by the development of a working application and further enhancements to its functionality and user experience.

## Application Features

### 1. Menu Management

Manage restaurant menu items from one central screen. Each menu item displays its name, description, course, price and optional image.

![Chef's Menu Manager Main Screen](screenshots/01-menu-screen.png)

Users can view the complete menu and see the total number of menu items.

### 2. Add Menu Items

![Add Menu Item Form](screenshots/02-add-menu-item.png)

Add new dishes using a form that captures:

- Dish name
- Description
- Course (Starter, Main Course or Dessert)
- Price
- Optional dish image

The form includes a Clear Form option to reset entered information before saving.

### 3. Form Validation and Feedback

![Form Validation](screenshots/03-validation.png)

The application validates form entries before saving a menu item. It checks that required fields are completed and that the price is a valid amount greater than zero.

Clear error messages help users identify and correct invalid entries. Success messages provide feedback when an item is saved successfully.

### 4. Search and Filtering

![Search and Filter Menu Items](screenshots/04-search-and-filter.png)

Find menu items quickly using the search and course-filtering features.

- Search for dishes by name.
- Filter dishes by Starter, Main Course or Dessert.
- Combine search and course filters.
- Clear active filters to return to the complete menu.
- View the number of matching items compared with the total menu items.

### 5. Menu Overview and Statistics

![Menu Statistics](screenshots/05-menu-statistics.png)

The Menu Overview provides a summary of the restaurant's menu.

It displays:

- Total number of menu items.
- Average price across the entire menu.
- Number of dishes in each course.
- Average price for each course.

The overview can be expanded or collapsed to keep the main menu organised and easy to navigate.

### 6. Edit and Delete Menu Items

![Edit and Delete Menu Items](screenshots/06-edit-and-delete.png)

Keep menu information up to date by editing existing dishes or removing items that are no longer needed.

- Edit menu item details.
- Update saved menu information.
- Delete menu items with a confirmation prompt.
- Automatically refresh the menu after changes.

![Edit and Delete Feedback](screenshots/06-validation.png)

Confirmation and feedback messages help users understand when menu items have been updated or deleted successfully.

## User Interface and Experience

Chef's Menu Manager uses a clean and consistent layout to make menu management straightforward.

The application includes:
- Simple navigation between the main menu and the add/edit form.
- Clearly labelled buttons and input fields.
- Consistent colours, spacing and typography.
- Accessible search and filtering controls.
- Clear validation, confirmation and success messages.
- Reusable components to maintain a consistent interface.

## Technologies Used

- **React Native** – Building the mobile application interface.
- **Expo** – Development and application tooling.
- **TypeScript** – Type-safe application development.
- **Expo Router** – Screen navigation.
- **React Hooks** – Managing component state and behaviour.
- **Context API** – Sharing menu data across screens.

## Project Structure

```text
Chefs-Menu-Manager/
│
├── assets/
│
├── screenshots/
│   ├── 01-menu-screen.png
│   ├── 02-add-menu-item.png
│   ├── 03-validation.png
│   ├── 04-search-and-filter.png
│   ├── 05-menu-statistics.png
│   ├── 06-edit-and-delete.png
│   └── 06-validation.png
│
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── add-menu.tsx
│   │
│   ├── components/
│   │   └── menu-items.tsx
│   │
│   └── MenuContext.tsx
│
├── package.json
├── README.md
└── ...
```


GitHub Repository: [Chef's Menu Manager](https://github.com/MoeketsiNteo/Chefs-Menu-Manager)

---

*Chef's Menu Manager – Making restaurant menu management simple and organised.*
