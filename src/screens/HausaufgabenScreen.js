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
    { text: 'buy coffee', key: '1' },
    { text: 'create an app', key: '2' },
    { text: 'play on the switch', key: '3' },
  ]);

  const pressHandler = () => {
    setModalOpen(true)
  };

  const [modalOpen, setModalOpen] = useState(false);


  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>

          <View style={globalStyles.titlebar}>
            <Text style={globalStyles.title}>Deine Hausaufgaben</Text>
          </View>
          <View style={styles.content}>
            <FlatButton text="Hausaufgabe hinzufügen" onPress={() => pressHandler()}/>
            <View style={styles.list}>
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                )}
              />
            </View>
          </View>
          <Modal visible={modalOpen} animationType='slide'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{alignContent: 'center', justifyContent: 'center'}}>
                <AddTodo/>
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
    marginTop: 50,
  },
  list: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ff3b30',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 350,
    height: 55,
  }
});
