import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage'
import AddLessonForm from './AddLessonForm';
import FlatButton from '../shared/button';


const Stack = createStackNavigator();

let current_key = 0;

const KEY = 'STUNDENPLAN_DATA'

_renderWeekdayItem = ({ item, index }) => {
  return (
    <View style={styles.itemWeekdayStyle}>
      <Text>{item.day}</Text>
    </View>
  )
}

let init = true;

export default function StundenplanScreen({ navigaton }) {

  const [modalOpen, setModalOpen] = useState(false);

  const weekdays = [{ key: '1', day: "Mo" }, { key: '2', day: "Di" }, { key: '3', day: "Mi" }, { key: '4', day: "Do" }, { key: '5', day: "Fr" }]

  const [datalist, setDatalist] = useState([
    { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 },
    { key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }, { key: 10 },
    { key: 11 }, { key: 12 }, { key: 13 }, { key: 14 }, { key: 15 },
    { key: 16 }, { key: 17 }, { key: 18 }, { key: 19 }, { key: 20 },
    { key: 21 }, { key: 22 }, { key: 23 }, { key: 24 }, { key: 25 },
    { key: 21 }, { key: 22 }, { key: 23 }, { key: 24 }, { key: 25 },
    { key: 21 }, { key: 22 }, { key: 23 }, { key: 24 }, { key: 25 },
    { key: 21 }, { key: 22 }, { key: 23 }, { key: 24 }, { key: 25 },
    { key: 21 }, { key: 22 }, { key: 23 }, { key: 24 }, { key: 25 }])

  useEffect(() => {
    async function getData() {
      if (init) {
        console.log(init);
        init = false;
        try {
          const value = await AsyncStorage.getItem(KEY)
          if (value !== null) {
            console.log(JSON.parse(value));
            setDatalist(() => {
              return JSON.parse(value);
            })
          }
        } catch (e) {

        }
      }
    }
    getData();
  });


  const editLesson = async (edit) => {
    edit.key = current_key;
    setDatalist((currentData) => {
      currentData[current_key - 1] = edit
      if (edit.doubleLesson && currentData.length > current_key + 4) {
        currentData[current_key + 4] = edit
      }
      return currentData;
    });
    setModalOpen(false);
    await AsyncStorage.setItem(KEY, JSON.stringify(datalist));
  };

  const _renderItem = ({ item, index }) => {

    const pressHandler = (key) => {
      // hier code für gedrückte Stunden
      console.log(key);
      current_key = key;
      setModalOpen(true)
    }

    function itemStyle(myColor) {
      return {
        backgroundColor: myColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        flex: 1,
        margin: 1
      }
    }

    function textStyle(myColor) {
      return {
        marginTop: 2,
        color: '#ffffff',
        fontSize: 18
      }
    }

    function roomStyle(myColor) {
      return {
        marginTop: 2,
        color: '#ffffff',
        fontSize: 8
      }
    }

    if (item.lesson != "" && item.lesson != null) {
      return (
        <TouchableOpacity style={itemStyle(item.color)} onPress={() => pressHandler(item.key)}>
          <Text style={textStyle(item.color)} >{item.lesson}</Text>
          <Text style={roomStyle(item.color)} >{item.room}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.itemStyleEmpty} onPress={() => pressHandler(item.key)}>
        </TouchableOpacity>
      )
    }
  }

  return (
    <SafeAreaView>
      <View style={globalStyles.titlebar}>
        <Text style={globalStyles.title}>Dein Stundenplan</Text>
      </View>
      <FlatList
        data={weekdays}
        renderItem={_renderWeekdayItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={5} />
      <FlatList
        data={datalist}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={5}
      />

      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{alignContent: 'center', justifyContent: 'center'}}>
            <AddLessonForm editLesson={editLesson} />
            <TouchableOpacity style={{alignSelf: 'center', marginVertical: 5}} onPress={() => setModalOpen(false)}>
              <View style={{
                backgroundColor: '#BEBEBE', alignItems: 'center',
                justifyContent: 'center', borderRadius: 15, width: 300, height: 40
              }}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: '#C65C5C',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    flex: 1,
    margin: 1
  },
  itemWeekdayStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    flex: 1,
    margin: 1
  },
  itemStyleEmpty: {
    backgroundColor: '#E0E0E0',
    height: 45,
    flex: 1,
    margin: 1
  },
});
