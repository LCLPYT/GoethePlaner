import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, SafeAreaView, Text } from 'react-native';
import TodoItem from './HausaufgabenScreenParts/todoItem';
import AddTodo from './HausaufgabenScreenParts/addTodo';
import { globalStyles } from '../styles/global';
import Button from 'react-native-buttonex'

export default function HausaufgabenScreen() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1' },
    { text: 'create an app', key: '2' },
    { text: 'play on the switch', key: '3' },
  ]);

  const pressHandler = (key) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if(text.length > 3){
      setText('');
      setTodos(prevTodos => {
        return [
          { text, key: Math.random().toString() },
          ...prevTodos
        ];
      });
    } else {
      Alert.alert('Ups..', 'Deine HA muss länger als 3 Buchstaben sein', [
        {text: 'OK', onPress: () => console.log('alert closed') }
      ]);
    }
  };

  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>

          <View style={globalStyles.titlebar}>
            <Text style={globalStyles.title}>Deine Hausaufgaben</Text>
          </View>
          <View style={styles.content}>
            <Button title="Hausaufgabe hinzufügen" bordered bold />
            <View style={styles.list}>
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                )}
              />
            </View>
          </View>
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
});
