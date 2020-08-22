import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  View,
  Text,

} from 'react-native';

import StundenplanScreen from '../screens/StundenplanScreen';
import VertretungScreen from '../screens/VertretungScreen';
import HausaufgabenScreen from '../screens/HausaufgabenScreen'

var Images = [
  require('../../src/images/list_black.png'),
  require('../../src/images/list.png'),
  require('../../src/images/clock_black.png'),
  require('../../src/images/clock.png'),
  require('../../src/images/list_black.png'),
  require('../../src/images/list.png'),
];

const Tab = createBottomTabNavigator();

export default HomeTab = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let icon;

        if (route.name === 'Vertretungen') {
          icon = focused ? 0 : 1;
        } else if (route.name === 'Hausaufgaben') {
          icon = focused ? 2 : 3;
        }
        else if (route.name === 'Stundenplan') {
          icon = focused ? 4 : 5;
        }

        return  <Image
            source={Images[icon]}
            resizeMode='contain'
            style={{width: 25, height: 25}}
      />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen name="Vertretungen" component={VertretungScreen} options={{title: 'Vertretungen'}} />
      <Tab.Screen name="Hausaufgaben" component={HausaufgabenScreen} />
      <Tab.Screen name="Stundenplan" component={StundenplanScreen} />
    </Tab.Navigator>
  );
}
