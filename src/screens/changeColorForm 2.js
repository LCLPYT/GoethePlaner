import React, { useState } from 'react';
import { globalStyles } from '../styles/global';
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-navigation';
//import { ColorWheel } from 'react-native-color-wheel';

import tinycolor from 'tinycolor2';
import HueSlider from '../color_menu/sliders/HueSlider.js';
import SaturationSlider from '../color_menu/sliders/SaturationSlider.js';
import LightnessSlider from '../color_menu/sliders/LightnessSlider.js';

export default function AddLessonForm({changeColor, changeTextColor ,init_color}) {

  const [color, setColor] = useState(tinycolor(init_color).toHsl());

  if (color.h == 0) {
    setColor(tinycolor('#FFA500').toHsl());
  }

  const colorHex = tinycolor(color).toHexString();

  updateLightness = l => {
    setColor({ h: color.h, s: color.s, l: l });
    changeColor(colorHex, color.l);
    changeTextColor(color.l);
  }
  updateHue = h => {
    setColor({ h: h, s: color.s, l: color.l });
    changeColor(colorHex, color.l);
    changeTextColor(color.l);
  }
  updateSaturation = s => {
    setColor({ h: color.h, s: s, l: color.l });
    changeColor(colorHex);
    changeTextColor(color.l);
  }
  
  return (
    <SafeAreaView style={styles.container}>

      <View
        style={{backgroundColor: colorHex, height: 100, width: 100, alignSelf: 'center', borderRadius: 460}}
      >
      </View>

      <HueSlider
        gradientSteps={40}
        value={color.h}
        onValueChange={updateHue} />

      <SaturationSlider
        gradientSteps={20}
        value={color.s}
        color={color}
        style={{ marginTop: 16 }}
        onValueChange={updateSaturation}
      />
      <LightnessSlider
        style={{ marginTop: 16 }}
        gradientSteps={20}
        value={color.l}
        color={color}
        onValueChange={updateLightness}
      />

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});