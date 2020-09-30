import * as React from 'react';
import { NavigationContainer, getStateFromPath } from '@react-navigation/native';
import Navigator from './src/routes/drawer';
import AsyncStorage from '@react-native-community/async-storage'

import SplashScreen from './src/screens/SplashScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true };
  }

  wait = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        500
      )
    );
  }

  async componentDidMount() {
    const data = await this.wait();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  async Colors() {
    if (await AsyncStorage.getItem("first_start") == null) {
      let lessonToColor = [{ lesson: 'Mathe', color: '#4c46e1' }, { lesson: 'Deutsch', color: '#ba3b3b' }, { lesson: 'Physik', color: '#4fcaf8' },
      { lesson: 'Biologie', color: '#5d9d4d' }, { lesson: 'Chemie', color: '#e89e11' }, { lesson: 'Geschichte', color: '#2e2e2e' }, { lesson: 'Erdkunde', color: '#471011' }, { lesson: 'Sport', color: '#4ac97b' },
      { lesson: 'Englisch', color: '#177823' }, { lesson: 'Französisch', color: '#9c36fc' }, { lesson: 'Philosophie', color: '#dfbc4e' }, { lesson: 'Informatik', color: '#000000' }, { lesson: 'Politik', color: '#c4c4c4' },];
      await AsyncStorage.setItem('COLOR_DATA', JSON.stringify(lessonToColor));
      await AsyncStorage.setItem('first_start', "false");
      await AsyncStorage.setItem('class', "12");
      return <SplashScreen />;
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    this.Colors();

    return (
      <Navigator />
    )
  };
}