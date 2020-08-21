import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StatusBar,
  FlatList,
} from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import StundenplanScreen from './src/screens/StundenplanScreen';
import VertretungScreen from './src/screens/VertretungScreen';


const Tab = createBottomTabNavigator();

var Images = [
  require('./src/images/clock_black.png'),
  require('./src/images/clock.png'),
  require('./src/images/list_black.png'),
  require('./src/images/list.png'),
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = { isLoading: true }
  }

  
  wait = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  async componentDidMount() {
    const data = await this.wait();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  render(){
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <NavigationContainer>
        <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;

            if (route.name === 'Home') {
              icon = focused ? 2 : 3;
            } else if (route.name === 'Stundenplan') {
              icon = focused ? 0 : 1;
            }

            return  <Image
                source={Images[icon]}
                resizeMode='contain'
                style={{width: 30, height: 30}}
          />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'orange',
          inactiveTintColor: 'gray',
        }}>
          <Tab.Screen name="Home" component={VertretungScreen} />
          <Tab.Screen name="Stundenplan" component={StundenplanScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle: {
    backgroundColor: '#C65C5C',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flex: 1,
    margin: 1
  },
});
