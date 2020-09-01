import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  View,
  Text,

} from 'react-native';

import StundenplanStack from './StundenplanStack';
import VertretungScreen from '../screens/VertretungScreen';
import HausaufgabenScreen from '../screens/HausaufgabenScreen'

var Images = [
  require('../../src/images/vertretung_black.png'),
  require('../../src/images/vertretung.png'),
  require('../../src/images/HA_black.png'),
  require('../../src/images/HA.png'),
  require('../../src/images/clock_black.png'),
  require('../../src/images/clock.png'),
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
            tintColor={color}
      />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
      labelStyle: {marginBottom: 4}
    }}
    >
      <Tab.Screen name="Vertretungen" component={VertretungScreen} />
      <Tab.Screen name="Hausaufgaben" component={HausaufgabenScreen} />
      <Tab.Screen name="Stundenplan" component={StundenplanStack} />
    </Tab.Navigator>
  );
}
