import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from './HomeBottomNavigation';
import Klausuren from './KlausurenStack';
import Settings from './SettingsStack';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          paddingTop: 20
        }}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Klausuren" component={Klausuren} />
        <Drawer.Screen name="Einstellungen" component={Settings} />
        {/* <Drawer.Screen name="About" component={About} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}