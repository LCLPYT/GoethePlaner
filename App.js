import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation-tabs';

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

const datalist = [{key: '1'},{key: '2'},{key: '3'},{key: '4'},{key: '5'},{key: '6'},{key: '7'},{key: '8'},{key: '9'},{key: '10'}]

function Stundenplan({ navigation }) {

  _renderItem = ({item, index}) => {
    return(
        <View style={styles.itemStyle}>
          <Text>{item.key}</Text>
        </View>

    )
  }

  return (
    <View style={styles.container}>
      <Text>Dein Stundenplan</Text>
      <FlatList
        data={datalist}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={5}
      />

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
  container: {
    flex: 1
  },
  itemStyle: {
    backgroundColor: '#C65C5C',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    flex: 1
  },
});
