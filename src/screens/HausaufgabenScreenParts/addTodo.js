import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
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

          <TextInput
            style={styles.input}
            placeholder='Aufgabe'
            onChangeText={changeHandler}
          />

          <DropDownPicker
          items={[
                  { label: 'Mathe' }, { label: 'Deutsch' }, { label: 'Physik' }, { label: 'Biologie' }, { label: 'Chemie' }, { label: 'Geschichte' }, { label: 'Erdkunde' }, { label: 'Sport' }, { label: 'Englisch' }, { label: 'Französisch' }, { label: 'Philosophie' }, { label: 'Informatik' }, { label: 'Politik' },
                ]}
                zIndex={500}
                containerStyle={{ height: 40, marginHorizontal: 10, marginVertical: 5, marginTop: 10 }}
                showArrow={true}
                customArrowUp={() => <Image source={require('../../../src/images/arrow_up.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
                customArrowDown={() => <Image source={require('../../../src/images/arrow_down.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
                style={{ backgroundColor: '#fafafa'}}
                dropDownMaxHeight={200}
                placeholder={"Fach auswählen"}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                onChangeItem={(item) => setFach(item.label)}
                searchable={true}
                searchablePlaceholder="Suchen"
                searchablePlaceholderTextColor="gray"
                searchableError={() => <Text>Nicht gefunden</Text>}
                zIndex={1000}
              />
          <FlatButton stylez={{ backgroundColor: '#90B494', marginTop: 30}} text="Hausaufgabe hinzufügen" onPress={() => submitHandler(text, fach)}/>
        </View>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    height: 40,
    color: '#000000',
    borderColor: '#b2b2b2',
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
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
