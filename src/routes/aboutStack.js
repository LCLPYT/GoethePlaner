
import { createStackNavigator } from '@react-navigation/stack';
import About from '../screens/SplashScreen';

const screens = {
  About: {
    screen: About,
    navigationOptions: {
      title: 'About'
    },
  },
}

const AboutStack = createStackNavigator()

export default AboutStack;