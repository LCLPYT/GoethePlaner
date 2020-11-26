import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text, Switch, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-navigation';
import { globalStyles } from '../../styles/global';
import DropDownPicker from 'react-native-dropdown-picker';
import FlatButton from '../../shared/button';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

import tinycolor from 'tinycolor2';

import { useNavigation } from '@react-navigation/native';


export default function EditLesson({ route }) {

  const navigation = useNavigation();

  const [noLessonWarning, setNoLessonWarning] = useState(0);

  const { title, room, doubleLesson, darkText, key } = route.params;


  const KEY = 'COLOR_DATA';

  const STORAGE_KEY_2 = 'STUNDENPLAN_DATA_EDIT';

  var lessonToColor = [];

  const [color, setColor] = useState("#000000");

  const [showDoubleLesson, setDoubleLesson] = useState(false);

  async function checkdoubleLesson(){
    const hours = JSON.parse(await AsyncStorage.getItem("STUNDENPLAN_DATA"));
    if (!((key > 5 && key <= 10) || (key > 15 && key <= 25) || hours.length - key < 5)) {
      setDoubleLesson(true);
    }
  }
  checkdoubleLesson();


  async function getColorData(values) {
    try {
      const value = await AsyncStorage.getItem(KEY);
      if (value !== null) {
        lessonToColor = JSON.parse(value);
        for (var i of lessonToColor) {
          if (i.lesson == values.lesson) {
            setColor(i.color);
            return i.color;
          }
        }
      }
    } catch (e) { }
    return color;
  }

  async function submit(values) {
    values.bg_color = await getColorData(values);
    if (values.doubleLesson == null) {
      values.doubleLesson = false
    }
    colorl = tinycolor(values.bg_color).toHsl.l;
    (colorl > 0.65) ? values.darkText = true : values.darkText = false;
    values.key = key;
    await AsyncStorage.setItem(STORAGE_KEY_2, JSON.stringify(values));
    navigation.navigate('Stundenplan');
  }

  function text() {
    let day, hour;
    switch (key % 5) {
      case 1: day = "Montag"; break;
      case 2: day = "Dienstag"; break;
      case 3: day = "Mittwoch"; break;
      case 4: day = "Donnerstag"; break;
      case 0: day = "Freitag"; break;
    }

    //Good coding right here...
    if (key <= 5) hour = " 1. Stunde";
    if (key <= 10 && key > 5) hour = " 2. Stunde";
    if (key <= 15 && key > 10) hour = " 3. Stunde";
    if (key <= 20 && key > 15) hour = " 4. Stunde";
    if (key <= 25 && key > 20) hour = " 5. Stunde";
    if (key <= 30 && key > 25) hour = " 6. Stunde";
    if (key <= 35 && key > 30) hour = " 7. Stunde";
    if (key <= 40 && key > 35) hour = " 8. Stunde";
    if (key <= 45 && key > 40) hour = " 9. Stunde";
    if (key <= 50 && key > 45) hour = " 10. Stunde";
    if (key <= 55 && key > 50) hour = " 11. Stunde";
    return day + hour
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <Text style={styles.title}>{text()}</Text>
        <Formik
          initialValues={{ lesson: title, room: room, bg_color: "#000000", doubleLesson: doubleLesson, darkText: false, key: key }}
          onSubmit={(values, actions) => {
            if (values.lesson != null) {
              submit(values);
            } else {
              setNoLessonWarning(12);
            }
          }}
        >

          {props => (
            <View>
              <DropDownPicker
                items={[
                  { label: 'Mathe' }, { label: 'Deutsch' }, { label: 'Physik' }, { label: 'Biologie' }, { label: 'Chemie' }, { label: 'Geschichte' }, { label: 'Erdkunde' }, { label: 'Sport' }, { label: 'Englisch' }, { label: 'Französisch' }, { label: 'Philosophie' }, { label: 'Informatik' }, { label: 'Politik' },
                ]}
                zIndex={500}
                containerStyle={{ height: 40, marginHorizontal: 10, marginVertical: 5, marginTop: 10 }}
                showArrow={true}
                customArrowUp={() => <Image source={require('../../../src/images/arrow_up.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
                customArrowDown={() => <Image source={require('../../../src/images/arrow_down.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
                style={{ backgroundColor: '#fafafa' }}
                dropDownMaxHeight={200}
                placeholder={title != null ? title : "Fach auswählen"}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                onChangeItem={(item) => props.setFieldValue('lesson', item.label)}
                searchable={true}
                searchablePlaceholder="Suchen"
                searchablePlaceholderTextColor="gray"
                searchableError={() => <Text>Nicht gefunden</Text>}
                zIndex={1000}
              />

              <DropDownPicker
                items={[
                  { label: '031' }, { label: '032' }, { label: '033' }, { label: '051' }, { label: '052' }, { label: '053' }, { label: '054' }, { label: '131' }, { label: '132' }, { label: '133' }, { label: '151' },
                  { label: '152' }, { label: '153' },
                  { label: '154' }, { label: '201' }, { label: '202' }, { label: '204' }, { label: '231' }, { label: '232' }, { label: '233' }, { label: '251' }, { label: '252' }, { label: '253' }, { label: '054' },
                  { label: '023' }, { label: 'K01' },
                  { label: 'K02' }, { label: 'K02a' }, { label: 'Lili' },
                ]}
                zIndex={500}
                showArrow={true}
                customArrowUp={() => <Image source={require('../../../src/images/arrow_up.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
                customArrowDown={() => <Image source={require('../../../src/images/arrow_down.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
                containerStyle={{ height: 40, marginHorizontal: 10, marginVertical: 5 }}
                style={{ backgroundColor: '#fafafa' }}
                dropDownMaxHeight={200}
                placeholder={room != null ? room : "Raum auswählen"}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                onChangeItem={(item) => props.setFieldValue('room', item.label)}
                searchable={true}
                searchablePlaceholder="Suchen"
                searchablePlaceholderTextColor="gray"
                searchableError={() => <Text>Nicht gefunden</Text>}
              />


              {showDoubleLesson ?
                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>Doppelstunde: </Text>
                  <Switch
                    style={styles.switch}
                    value={props.values.doubleLesson}
                    onValueChange={value =>
                      props.setFieldValue('doubleLesson', value)
                    } />
                </View> : null}

              <Text style={{ fontSize: noLessonWarning, alignSelf: 'center' }}>Du hast kein Fach ausgewählt</Text>

              <FlatButton text="Fertig" onPress={props.handleSubmit} stylez={{ backgroundColor: '#90B494', flex: 1 }} />
            </View>
          )}
        </Formik>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    color: '#000000',
    borderColor: '#000000',
    borderWidth: 1,
    margin: 10,
  },
  switchContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 8,
    margin: 10,
  },
  switchText: {
    fontSize: 12,
    alignSelf: 'center'
  },
  container: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    margin: 20,
    fontWeight: 'bold'
  }
});