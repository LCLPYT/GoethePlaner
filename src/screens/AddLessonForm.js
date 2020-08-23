import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';

export default function AddLessonForm({editLesson}) {

  return (
    
    <View>
      <Formik
        initialValues={{ lesson: '', room: ''}}
        onSubmit={(values, actions) => {
            actions.resetForm();
            editLesson(values)
        }}
      >
        {props => (
          <View>
            <TextInput
              //style={globalStyles.input}
              placeholder='Fach'
              onChangeText={props.handleChange('lesson')}
              value={props.values.lesson}
            />

            <TextInput
              //style={globalStyles.input}
              multiline
              placeholder='Raum'
              onChangeText={props.handleChange('room')}
              value={props.values.room}
            />
            
            <Button onPress={props.handleSubmit} title="Fertig" ></Button> 
          </View>
        )}
      </Formik>
    </View>
    
  );
}