import { createStackNavigator } from '@react-navigation/stack';
import Stundenplan from '../screens/StundenplanScreen';

const Stundeplanscreens = {
  Stundenplan: {
    screen: Stundenplan,
    navigationOptions: {
      title: 'Stundenplan',
    },
  },
}

const StundenplanStack = createStackNavigator()

export default StundenplanStack;