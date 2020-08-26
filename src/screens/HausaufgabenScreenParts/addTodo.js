import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Button from 'react-native-buttonex'
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import ColorPalette from 'react-native-color-palette'
import FlatButton from '../../shared/button'

export default function AddTodo({ submitHandler, pressHandler }) {
  [text, setText] = useState('');
  [fach, setFach] = useState('');

  const [selectedColor, setColor] = useState('#151E3F');
  const changeHandler = (val) => {setText(val)};
  const changeHandler2 = (val) => {setFach(val)};

  return (
    <SafeAreaView>
      <View>
        <View>
          <View style={globalStyles.titlebar}>
            <Text style={globalStyles.title}>Hausaufgabe hinzufügen</Text>
          </View>
          <TextInput
            style={styles.inputTOP}
            placeholder='FACH'
            onChangeText={changeHandler}
          />

          <TextInput
            style={styles.input}
            placeholder='HAUSAUFGABE'
            onChangeText={changeHandler2}
          />
          <FlatButton text="Hausaufgabe hinzufügen" onPress={() => submitHandler(text, fach)}/>
        </View>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: 40,
    color: '#000000',
    borderColor: '#b2b2b2',
    borderWidth: 2,
    margin: 10,
  },
  inputTOP: {
    fontSize: 20,
    height: 40,
    color: '#000000',
    borderColor: '#b2b2b2',
    borderWidth: 2,
    margin: 10,
    marginTop: 30,
  },
});
