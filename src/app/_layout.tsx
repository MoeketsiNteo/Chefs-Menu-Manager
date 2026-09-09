import React from 'react';
import { Stack } from 'expo-router';

import { MenuProvider } from '../MenuContext';

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack>
        {/*Restaurant menu screen*/}
        <Stack.Screen
          name="index"
          options={{
            title: 'Restaurant Menu',
          }}
        />

        {/*Add menu item screen*/}
        <Stack.Screen
          name="add-menu"
          options={{
            title: 'Add Menu Items',
          }}
        />

        {/*Explore screen*/}
        <Stack.Screen
          name="explore"
          options={{
            title: 'Explore',
          }}
        />
      </Stack>
    </MenuProvider>
  );
}