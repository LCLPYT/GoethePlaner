import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Stundenplan from '../screens/Stundenplan/StundenplanScreen';
import AddLessonForm from '../screens/Stundenplan/EditLesson';
import ColorForm from '../screens/Stundenplan/ColorForm';
import ColorForLessons from '../screens/Stundenplan/ColorForLessons';
import { Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default HomeTab = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Stundenplan">
      <Stack.Screen name="Stundenplan" component={Stundenplan} options={{
        headerTitle: "Stundenplan",
        headerRight: () => {
          return <TouchableOpacity
            onPress={() => {
              navigation.navigate("ColorForLessons");
            }}
          >
            <Image source={require('../images/colorSettings.png')} style={{height: 29}} resizeMode='contain' />
          </TouchableOpacity>
        }

      }} initialParams={{ values: "none" }} />
      <Stack.Screen name="EditLesson" component={AddLessonForm} options={({ route }) => ({
        headerTitle: "Stunde bearbeiten",
        headerRight: () => {
          return <TouchableOpacity
            onPress={() => {
              //navigation.navigate('Stundenplan');
            }}
          >
            <Image source={require('../images/delete.png')} style={{height: 29}} resizeMode='contain' />
          </TouchableOpacity>
        }
      })} />
      <Stack.Screen name="ColorForm" component={ColorForm} options={({ route }) => ({
        headerTitle: "Farbe auswählen"
      })}
      />
      <Stack.Screen name="ColorForLessons" component={ColorForLessons} options={({ route }) => ({
        headerTitle: "Farben auswählen"
      })}
      />
    </Stack.Navigator>
  );
}