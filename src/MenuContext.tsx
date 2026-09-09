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

  return (
    <MenuContext.Provider
      value={{
        dishes,
        addDish,
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