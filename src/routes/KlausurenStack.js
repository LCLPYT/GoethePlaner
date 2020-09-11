import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Klausuren from '../screens/KlausurenScreen';
import { Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default HomeTab = () => {
  const navigation = useNavigation();
  
  return (
    <Stack.Navigator initialRouteName="Klausuren">
      <Stack.Screen name="Klausuren" component={Klausuren} options={{
        headerTitle: "Klausuren",
        headerLeft: () => {
          return <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Image source={require('../images/drawer.png')} style={{height: 29}} resizeMode='contain' />
          </TouchableOpacity>
        }
      }}/>
    </Stack.Navigator>
  );
}