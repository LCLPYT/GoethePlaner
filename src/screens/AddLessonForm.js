import React, {useState} from 'react';
import { StyleSheet, Button, TextInput, View, Text, Switch, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-navigation';
import { globalStyles } from '../styles/global';
import ColorPalette from 'react-native-color-palette'

export default function AddLessonForm({ editLesson }) {
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

              <ColorPalette
                  icon={
                    <Text>✔</Text>
                  }
                onChange={color => {props.setFieldValue('color', color); setColor(color)}}
                value={selectedColor}
                colors={[  '#151E3F','#123440', '#1098F7', '#C83E4D','#f48c06', '#F4B860', '#307351' ,'#74c69d']}
                title={""}
                scaleToWindow={true}
            />

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


              <TouchableOpacity style={{alignSelf: 'center', marginVertical: 5}} onPress={props.handleSubmit}>
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
  switchContainer:{
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
    marginBottom: 60,
  },
  switchText: {
    fontSize: 12,
    alignSelf: 'center'
  },
  switch: {
  }
});
