import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, Switch} from 'react-native';
import { Formik} from 'formik';
import { SafeAreaView } from 'react-navigation';
import { globalStyles } from '../styles/global';

export default function AddLessonForm({editLesson}) {

  return (
    <SafeAreaView>
    <View>
      <Formik
        initialValues={{ lesson: '', room: '', color: '', doubleLesson: false}}
        onSubmit={(values, actions) => {
            actions.resetForm();
            editLesson(values)
        }}
      >
        {props => (
          <View>
        <View style={globalStyles.titlebar}>
        <Text style={globalStyles.title}>Stunde bearbeiten</Text>
        </View>
            <TextInput
              style={styles.input}
              placeholder='Fach'
              onChangeText={props.handleChange('lesson')}
              value={props.values.lesson}
            />

            <TextInput
              style={styles.input}
              placeholder='Raum'
              onChangeText={props.handleChange('room')}
              value={props.values.room}
            />

          <TextInput
              style={styles.input}
              placeholder='Farbe'
              onChangeText={props.handleChange('color')}
              value={props.values.color}
            /> 

          <Text>Doppelstunde: </Text>
            <Switch
              value={props.values.doubleLesson}
              onValueChange={value =>
                props.setFieldValue('doubleLesson', value)
              }
            />
            
            <Button onPress={props.handleSubmit} title="Fertig" ></Button> 
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
});
