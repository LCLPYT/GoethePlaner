import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text, Switch, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-navigation';
import { globalStyles } from '../styles/global';
import ChangeColorForm from './changeColorForm';
import DropDownPicker from 'react-native-dropdown-picker';
import FlatButton from '../shared/button';

export default function AddLessonForm({ editLesson, title, room, color, doubleLesson }) {
  const [noLessonWarning, setNoLessonWarning] = useState(0);

  return (
    <SafeAreaView>
      <View>
        <Formik
          initialValues={{ lesson: title, room: room, color: color, doubleLesson: doubleLesson, darkText: false }}
          onSubmit={(values, actions) => {
            if (values.lesson != null) {
              if (values.color == "" || values.color == null) {
                values.color = '#FFA500';
              }
              if (values.doubleLesson == null) {
                values.doubleLesson = false
              }
              actions.resetForm();
              editLesson(values);
            } else {
              setNoLessonWarning(12);
            }
          }}
        >

          {props => (
            <View>
              <View style={globalStyles.titlebar}>
                <Text style={globalStyles.title}>Stunde bearbeiten</Text>
              </View>


              <DropDownPicker
                items={[
                  { label: 'Mathe' }, { label: 'Deutsch' }, { label: 'Physik' }, { label: 'Biologie' }, { label: 'Chemie' }, { label: 'Geschichte' }, { label: 'Erdkunde' }, { label: 'Sport' }, { label: 'Englisch' }, { label: 'Französisch' }, { label: 'Philosophie' }, { label: 'Informatik' }, { label: 'Politik' },
                ]}
                zIndex={500}
                containerStyle={{ height: 40, marginHorizontal: 10, marginVertical: 5, marginTop: 10  }}
                showArrow={true}
                customArrowUp={()=> <Image source={require('../../src/images/arrow_up.png')} resizeMode='contain' style={{width: 30, height: 30}} />}
                customArrowDown={()=> <Image source={require('../../src/images/arrow_down.png')} resizeMode='contain' style={{width: 30, height: 30}} />}
                style={{ backgroundColor: '#fafafa'}}
                dropDownMaxHeight={200}
                placeholder={'Fach auswählen'}
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
                  { label: '031' }, { label: '032' }, { label: '033' }, { label: '051' }, { label: '052' }, { label: '053' }, { label: '054' }, { label: '131' }, { label: '132' }, { label: '133' }, { label: '151' }, { label: '152' }, { label: '153' },
                  { label: '054' }, { label: '201' }, { label: '202' }, { label: '204' }, { label: '231' }, { label: '232' }, { label: '233' }, { label: '251' }, { label: '252' }, { label: '253' }, { label: '054' }, { label: '023' }, { label: 'K01' },
                  { label: 'K02' }, { label: 'K02a' },
                ]}
                zIndex={500}
                showArrow={true}
                customArrowUp={()=> <Image source={require('../../src/images/arrow_up.png')} resizeMode='contain' style={{width: 30, height: 30}} />}
                customArrowDown={()=> <Image source={require('../../src/images/arrow_down.png')} resizeMode='contain' style={{width: 30, height: 30}} />}
                containerStyle={{ height: 40, marginHorizontal: 10, marginVertical: 5  }}
                style={{ backgroundColor: '#fafafa' }}
                dropDownMaxHeight={200}
                placeholder={'Raum auswählen'}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                onChangeItem={(item) => props.setFieldValue('room', item.label)}
                searchable={true}
                searchablePlaceholder="Suchen"
                searchablePlaceholderTextColor="gray"
                searchableError={() => <Text>Nicht gefunden</Text>}
              />

              <ChangeColorForm changeColor={(c) => props.setFieldValue('color', c)} changeTextColor={(l) => (l > 0.65) ? props.setFieldValue('darkText', true) : props.setFieldValue('darkText', false)} init_color={props.values.color} />

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Doppelstunde: </Text>
                <Switch
                  style={styles.switch}
                  value={props.values.doubleLesson}
                  onValueChange={value =>
                    props.setFieldValue('doubleLesson', value)
                  }
                />
              </View>

              <Text style={{ fontSize: noLessonWarning, alignSelf: 'center' }}>Du hast kein Fach ausgewählt</Text>

              <FlatButton text="Fertig" onPress={props.handleSubmit} stylez={{backgroundColor: '#90B494'}}/>
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
    margin: 10,
    marginBottom: 20,
  },
  switchText: {
    fontSize: 12,
    alignSelf: 'center'
  },
  switch: {
  }
});

{/* <TextInput
                maxLength={10}
                style={styles.input}
                placeholder='Fach'
                onChangeText={props.handleChange('lesson')}
                value={props.values.lesson}
              /> */}
