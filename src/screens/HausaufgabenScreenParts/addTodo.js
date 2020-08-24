import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Button from 'react-native-buttonex'
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import ColorPalette from 'react-native-color-palette'
import FlatButton from '../../shared/button'

export default function AddTodo({ submitHandler }) {
  const [selectedColor, setColor] = useState('#151E3F');
  return (
    <SafeAreaView>
      <View>
        <Formik
          initialValues={{ lesson: '', room: '', color: '#44355B', doubleLesson: false }}
          onSubmit={(values, actions) => {
            actions.resetForm();
            editLesson(values)
          }}
        >

          {props => (
            <View>
              <View style={globalStyles.titlebar}>
                <Text style={globalStyles.title}>Hausaufgabe hinzufügen</Text>
              </View>
              <TextInput
                style={styles.inputTOP}
                placeholder='FACH'
                onChangeText={props.handleChange('lesson')}
                value={props.values.lesson}
              />

              <TextInput
                style={styles.input}
                placeholder='HAUSAUFGABE'
                onChangeText={props.handleChange('room')}
                multiline
                value={props.values.room}
              />
              <FlatButton text="Hausaufgabe hinzufügen" onPress={props.handleSubmit}/>
            </View>
          )}
        </Formik>
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
