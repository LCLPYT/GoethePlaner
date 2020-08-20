import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import SplashScreen from './src/screens/SplashScreen';

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
      <>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text>Hi :)</Text>
        </SafeAreaView>
      </NavigationContainer>
      </>
    );
  };
}

const styles = StyleSheet.create({
});