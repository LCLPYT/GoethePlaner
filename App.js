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
  Button,
  StatusBar,
  FlatList,
} from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
//import StundenplanScreen from './src/screens/StundenplanScreen';

class HomeScreen extends React.Component{
  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>

        {/* <Button
          title="Zum Stundenplan"
          onPress={() => navigation.navigate('Stundenplan')}
        /> */}
      </View>
    );
  }
}

const datalist = [{key: '1', lesson: "Ma"},{key: '2', lesson: "En"},{key: '3', lesson: "Pol"},{key: '4', lesson: "De"},{key: '5', lesson: "Ch"},{key: '6', lesson: "Ma"},{key: '7', lesson: "Ph"},{key: '8', lesson: "Mu"},{key: '9', lesson: ""},{key: '10', lesson: ""}]


class StundenplanScreen extends React.Component {

  _renderItem = ({item, index}) => {
    return(
        <View style={styles.itemStyle}>
          <Text>{item.lesson}</Text>
        </View>

    )
  }
  render(){
    return (
      <View style={styles.container}>
        <Text>Dein Stundenplan</Text>
        <FlatList
          data={datalist}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
        />

        {/* <Button
          title="Zurück"
          onPress={() => navigation.navigate('Home')} // or navigation.goBack()
        /> */}
      </View>
    );
  }
}

const Tab = createBottomTabNavigator();

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
        /*screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'folder' : 'folder-outline';
            }

            return  <Icon
              reverse
              name='ios-american-football'
              type='ionicon'
              color='#517fa4'
          />;
          },
        })}*/
        tabBarOptions={{
          activeTintColor: 'orange',
          inactiveTintColor: 'gray',
        }}>
          <Tab.Screen name="Home" component={HomeScreen} />
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
