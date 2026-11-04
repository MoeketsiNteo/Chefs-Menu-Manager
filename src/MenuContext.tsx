
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

//Menu item data structure
export type Dish = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
  image?: string;
};

//Menu context data
type MenuContextType = {
  dishes: Dish[];
  addDish: (dish: Dish) => void;
  updateDish: (id: string, updatedDish: Dish) => void;
  deleteDish: (id: string) => void;
};

//Create menu context
const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

//Menu provider
export function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //Store menu items
  const [dishes, setDishes] = useState<Dish[]>([]);

  //Add a new menu item
  const addDish = (dish: Dish) => {
    setDishes((currentDishes) => [
      ...currentDishes,
      dish,
    ]);
  };

  //Update an existing menu item
  const updateDish = (id: string, updatedDish: Dish) => {
    setDishes((currentDishes) =>
      currentDishes.map((dish) =>
        dish.id === id ? updatedDish : dish
      )
    );
  };

  //Delete a menu item
  const deleteDish = (id: string) => {
    setDishes((currentDishes) =>
      currentDishes.filter((dish) => dish.id !== id)
    );
  };

  return (
    <MenuContext.Provider
      value={{
        dishes,
        addDish,
        updateDish,
        deleteDish,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

//Access menu context
export function useMenu() {
  const context = useContext(MenuContext);

  //Make sure the hook is used inside the provider
  if (!context) {
    throw new Error(
      'useMenu must be used inside MenuProvider'
    );
  }

  return context;
}
