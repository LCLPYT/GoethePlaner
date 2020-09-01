import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, TextInput, View, Text, Switch, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-navigation';
import { globalStyles } from '../../styles/global';
import DropDownPicker from 'react-native-dropdown-picker';
import FlatButton from '../../shared/button';
import AsyncStorage from '@react-native-community/async-storage'

import tinycolor from 'tinycolor2';
import HueSlider from '../../color_menu/sliders/HueSlider.js';
import SaturationSlider from '../../color_menu/sliders/SaturationSlider.js';
import LightnessSlider from '../../color_menu/sliders/LightnessSlider.js';
import { NavigationContainer } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

let lessonToColor = [{ lesson: 'Mathe', color: '#4c46e1' }, { lesson: 'Deutsch', color:"#ba3b3b" }, { lesson: 'Physik' }, { lesson: 'Biologie' }, { lesson: 'Chemie' }, { lesson: 'Geschichte' }, { lesson: 'Erdkunde' }, { lesson: 'Sport' }, { lesson: 'Englisch' }, { lesson: 'Französisch' }, { lesson: 'Philosophie' }, { lesson: 'Informatik' }, { lesson: 'Politik' },];

let datalist = [{lesson: "BSP", key: 1}];

export default function ColorForm({ route }) {
  const navigation = useNavigation();

  const STORAGE_KEY = 'STUNDENPLAN_DATA'

  const KEY = 'COLOR_DATA';

  const { lesson } = route.params;


  useEffect(() => {
    getColorData();
    getStundenplanData();
  }, []);

  const [color, setColor] = useState(tinycolor('#FFA500').toHsl());

  async function getColorData() {
    try {
      const value = await AsyncStorage.getItem(KEY)
      if (value !== null) {
        lessonToColor = JSON.parse(value);
        for (var i of lessonToColor) {
          if (i.lesson == lesson) {
            setColor(tinycolor(i.color).toHsl());
          }
        }
      }
    } catch (e) { }
  }

  async function getStundenplanData() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      if (value !== null) {
        datalist = JSON.parse(value);
      }
    } catch (e) { }
  }


  const colorHex = tinycolor(color).toHexString();

  const updateLightness = l => {
    setColor({ h: color.h, s: color.s, l: l });
  }
  const updateSaturation = s => {
    setColor({ h: color.h, s: s, l: color.l });
  }
  const updateHue = h => {
    setColor({ h: h, s: color.s, l: color.l });
  }



  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{ backgroundColor: colorHex, height: 100, width: 100, alignSelf: 'center', borderRadius: 460 }}>
        </View>

        <HueSlider
          style={{ marginTop: 16 }}
          gradientSteps={20}
          value={color.h}
          onValueChange={updateHue} />

        <SaturationSlider
          gradientSteps={10}
          style={{ marginTop: 16 }}
          value={color.s}
          color={color}
          onValueChange={updateSaturation}
        />
        <LightnessSlider
          style={{ marginTop: 16 }}
          gradientSteps={10}
          value={color.l}
          color={color}
          onValueChange={updateLightness}
        />

      </View>
      <FlatButton text="Fertig" onPress={
        async function submit() {
          for (var i of lessonToColor) {
            if (i.lesson == lesson) {
              i.color = colorHex;
            }
          }
          for (var j of datalist) {
            if (j.lesson == lesson) {
              j.bg_color = colorHex;
              console.log(j.bg_color);
            }
          }
          await AsyncStorage.setItem(KEY, JSON.stringify(lessonToColor));
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(datalist));
          navigation.navigate('ColorForLessons');
        }
      } stylez={{ backgroundColor: '#90B494', flex: 1, marginTop: 20 }} />
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
    marginTop: 40,
  },
});
