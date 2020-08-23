import { createStackNavigator } from '@react-navigation/stack';
import Stundenplan from '../screens/StundenplanScreen';

const Stundepnlanscreens = {
  Stundenplan: {
    screen: Stundenplan,
    navigationOptions: {
      title: 'Stundenplan',
    },
  },
}

const StundenplanStack = createStackNavigator()

export default StundenplanStack;