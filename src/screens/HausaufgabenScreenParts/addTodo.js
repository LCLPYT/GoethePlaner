import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Button from 'react-native-buttonex'
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import ColorPalette from 'react-native-color-palette'
import FlatButton from '../../shared/button'
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddTodo({ submitHandler, pressHandler }) {
  [text, setText] = useState('');
  [fach, setFach] = useState('');

  const [selectedColor, setColor] = useState('#151E3F');
  const changeHandler = (val) => {setText(val)};


  return (
    <SafeAreaView>
      <View>
        <View>
          <View style={globalStyles.titlebar}>
            <Text style={globalStyles.title}>Hausaufgabe hinzufügen</Text>
          </View>
          <View style={{height: 30}}/>
          <DropDownPicker
            items={[
              { label: 'Mathe' }, { label: 'Deutsch' }, { label: 'Physik' }, { label: 'Biologie' }, { label: 'Chemie' },
              { label: 'Geschichte' }, { label: 'Erdkunde' }, { label: 'Sport' }, { label: 'Philosophie' }, { label: 'Informatik'}
            ]}
            zIndex={500}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: '#fafafa', marginHorizontal: 10, height: 40 }}
            dropDownMaxHeight={140}
            placeholder={'Fach auswählen'}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            showArrow={false}
            onChangeItem={(item) => setFach(item.label)}
            searchable={true}
            searchablePlaceholder="Suchen"
            searchablePlaceholderTextColor="gray"
            searchableError={() => <Text>Nicht gefunden</Text>}
          />

          <TextInput
            style={styles.input}
            placeholder='HAUSAUFGABE'
            onChangeText={changeHandler}
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
