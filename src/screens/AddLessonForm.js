import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text, Switch, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-navigation';
import { globalStyles } from '../styles/global';
import ChangeColorForm from './changeColorForm';
import DropDownPicker from 'react-native-dropdown-picker';

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
            }else{
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
                  { label: 'Mathe' }, { label: 'Deutsch' }, { label: 'Physik' }, { label: 'Biologie' }, { label: 'Chemie' }, { label: 'Geschichte' }, { label: 'Erdkunde' }, { label: 'Sport' }, { label: 'Philosophie' },
                ]}
                zIndex={500}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                dropDownMaxHeight={200}
                placeholder={'Fach auswählen'}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                showArrow={false}
                onChangeItem={(item) => props.setFieldValue('lesson', item.label)}
                searchable={true}
                searchablePlaceholder="Suchen"
                searchablePlaceholderTextColor="gray"
                searchableError={() => <Text>Nicht gefunden</Text>}
              />

              <DropDownPicker
                items={[
                  { label: '031' }, { label: '032' }, { label: '033' },{ label: '131' }, { label: '132' }, { label: '133' },{ label: '231' }, { label: '232' }, { label: '233' }
                ]}
                zIndex={500}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                dropDownMaxHeight={200}
                placeholder={'Raum auswählen'}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                showArrow={false}
                onChangeItem={(item) => props.setFieldValue('room', item.label)}
                searchable={true}
                searchablePlaceholder="Suchen"
                searchablePlaceholderTextColor="gray"
                searchableError={() => <Text>Nicht gefunden</Text>}
              />

              <ChangeColorForm changeColor={(c) => props.setFieldValue('color', c)} changeTextColor={(l) => (l>0.65) ? props.setFieldValue('darkText', true) : props.setFieldValue('darkText', false)}  init_color={props.values.color} />

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

                <Text style={{fontSize: noLessonWarning, alignSelf: 'center'}}>Du hast kein fach ausgewählt</Text>

              <TouchableOpacity style={{ alignSelf: 'center', marginVertical: 5 }} onPress={props.handleSubmit}>
                <View style={{
                  backgroundColor: '#90B494', alignItems: 'center',
                  justifyContent: 'center', borderRadius: 15, width: 300, height: 40
                }}
                >
                  <Text style={{ color: 'white' }}>Fertig</Text>
                </View>
              </TouchableOpacity>
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
