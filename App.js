import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import SplashScreen from './src/screens/SplashScreen';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>

      <Button
        title="Zum Stundenplan"
        onPress={() => navigation.navigate('Stundenplan')}
      />
    </View>
  );
}

function Stundenplan({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dein Stundenplan</Text>

      <Button
        title="Zurück"
        onPress={() => navigation.navigate('Home')} // or navigation.goBack()
      />
    </View>
  );
}


const Stack = createStackNavigator();

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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Stundenplan" component={Stundenplan} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  };
}


const styles = StyleSheet.create({
});
