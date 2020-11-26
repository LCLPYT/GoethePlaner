import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HausaufgabenScreen from '../screens/HausaufgabenScreen';
import { Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default HomeTab = () => {
  const navigation = useNavigation();
  
  return (
    <Stack.Navigator initialRouteName="Hausaufgaben">
      <Stack.Screen name="Hausaufgaben" component={HausaufgabenScreen} options={{
        headerTitle: "Hausaufgaben",
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