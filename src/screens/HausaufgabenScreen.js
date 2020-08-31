import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import TodoItem from './HausaufgabenScreenParts/todoItem';
import AddTodo from './HausaufgabenScreenParts/addTodo';
import { globalStyles } from '../styles/global';
import Button from 'react-native-buttonex';
import { Modal } from 'react-native';
import FlatButton from '../shared/button'

export default function HausaufgabenScreen() {
  const [todos, setTodos] = useState([
    { text: 'Seite 5', key: '1', fach: 'Mathe' },
    { text: 'create an app', key: '2', fach: 'Mathe' },
    { text: 'play on the switch', key: '3', fach: 'Mathe' },
  ]);

  const pressHandler = () => {
    setModalOpen(true)
  };

  const delHandler = (key) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const pressHandler2 = (key) => {
    setState('../../images/checkbox_checked.png')
  };

  const [modalOpen, setModalOpen] = useState(false);

  const submitHandler = (text, fach) => {
    setText('');
    setTodos(prevTodos => {
      return [
        { text, key: Math.random().toString(), fach },
        ...prevTodos
      ];
    });
    setModalOpen(false)
  };

  const [state, setState] = useState('../../images/checkbox.png')

  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>

          <View style={globalStyles.titlebar}>
            <Text style={globalStyles.title}>Deine Hausaufgaben</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.list}>
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={delHandler} state={state} />
                )}
              />
            </View>
            <FlatButton text="Hausaufgabe hinzufügen" stylez={globalStyles.button} onPress={() => pressHandler()}/>
          </View>

          <Modal visible={modalOpen} animationType='slide'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{alignContent: 'center', justifyContent: 'center'}}>
                <AddTodo submitHandler={submitHandler} pressHandler={pressHandler}/>
                <FlatButton text='Cancel' onPress={() => setModalOpen(false)}/>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </SafeAreaView>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    padding: 10,
    marginTop: 5,
  },
  list: {
    marginTop: 0,
  },
  button: {
    backgroundColor: '#ff3b30',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 10,
    width: 350,
    height: 55,
  }
});
