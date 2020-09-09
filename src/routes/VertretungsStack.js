import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Stundenplan from '../screens/Stundenplan/StundenplanScreen';
import AddLessonForm from '../screens/Stundenplan/EditLesson';
import Vertretungsplan from '../screens/VertretungScreen';
import { Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default HomeTab = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Vertretungsplan">
      <Stack.Screen name="Vertretungsplan" component={Vertretungsplan} options={{
        headerTitle: "Vertretungsplan",
        headerLeft: () => {
          return <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Image source={require('../images/drawer.png')} style={{height: 29}} resizeMode='contain' />
          </TouchableOpacity>
        }
      }}/>
    </Stack.Navigator>
  );
}