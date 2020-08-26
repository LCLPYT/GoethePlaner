import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage'
import AddLessonForm from './AddLessonForm';
import FlatButton from '../shared/button';

//TODO: Neues Auswahl Icon, Einstellmöglichkeiten für Anzahl der Stunden, 

const Stack = createStackNavigator();

let current_key = 1;

const KEY = 'STUNDENPLAN_DATA'

_renderWeekdayItem = ({ item, index }) => {
  return (
    <View style={styles.itemWeekdayStyle}>
      <Text>{item.day}</Text>
    </View>
  )
}

let init = true;

export default function StundenplanScreen() {

  const [modalOpen, setModalOpen] = useState(false);

  const weekdays = [{ key: '1', day: "Mo" }, { key: '2', day: "Di" }, { key: '3', day: "Mi" }, { key: '4', day: "Do" }, { key: '5', day: "Fr" }]

  const [datalist, setDatalist] = useState([
    { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 },
    { key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }, { key: 10 },
    { key: 11 }, { key: 12 }, { key: 13 }, { key: 14 }, { key: 15 },
    { key: 16 }, { key: 17 }, { key: 18 }, { key: 19 }, { key: 20 },
    { key: 21 }, { key: 22 }, { key: 23 }, { key: 24 }, { key: 25 },
    { key: 26 }, { key: 27 }, { key: 28 }, { key: 29 }, { key: 30 },
    { key: 31 }, { key: 32 }, { key: 33 }, { key: 34 }, { key: 35 },
    { key: 36 }, { key: 37 }, { key: 38 }, { key: 39 }, { key: 40 },])

  useEffect(() => {
    async function getData() {
      if (init) {
        init = false;
        try {
          const value = await AsyncStorage.getItem(KEY)
          if (value !== null) {
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
      currentData[current_key - 1] = JSON.parse(JSON.stringify(edit));

      if (edit.doubleLesson && currentData.length > current_key + 4 && ((edit.key < 6) || (edit.key < 16 && edit.key > 10) || edit.key > 25)) {
        edit.key = (current_key+5);
        currentData[edit.key-1] = edit
      }
      return currentData;
    });
    setModalOpen(false);
    await AsyncStorage.setItem(KEY, JSON.stringify(datalist));
  };

  const _renderItem = ({ item, index }) => {

    const pressHandler = (key) => {
      current_key = key;
      setModalOpen(true)
    }

    function itemStyle(item) {
      let margin= 0;
      if(item.key>10 && item.key<16){
        margin= 2
      }else if(item.key>20 && item.key<26){
        margin= 3
      }else if(item.key>25 && item.key<31){
        margin= 5
      }else if(item.key>30){
        margin= 2
      }

      return {
        backgroundColor: item.color,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        flex: 1,
        marginHorizontal: 1,
        marginTop: margin,

      }
    }

    function itemEmptyStyle() {
      let margin= 0;
      if(item.key>10 && item.key<16){
        margin= 2
      }else if(item.key>20 && item.key<26){
        margin= 3
      }else if(item.key>25 && item.key<31){
        margin= 5
      }else if(item.key>30){
        margin= 2
      }
      return {
        backgroundColor: '#E0E0E0',
        height: 45,
        flex: 1,
        marginHorizontal: 1,
        marginTop: margin
      }
    }

    function textStyle() {
      let textColor = '#ffffff';
      if(item.darkText){
        textColor='#252526';
      }
      let size=15;
      if(item.lesson.length >6){
          size=13
      }
      return {
        marginTop: 0,
        color: textColor,
        fontSize: size
      }
    }

    function roomStyle() {
      let textColor = '#ffffff';
      if(item.darkText){
        textColor='#252526';
      }
      return {
        marginTop: 0,
        color: textColor,
        fontSize: 8
      }
    }

    if (item.lesson != "" && item.lesson != null) {
      return (
        <TouchableOpacity style={itemStyle(item)} onPress={() => pressHandler(item.key)}>
          <Text style={textStyle(item)} >{item.lesson}</Text>
          <Text style={roomStyle(item)} >{item.room}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={itemEmptyStyle(item.color)} onPress={() => pressHandler(item.key)}>
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
            <AddLessonForm editLesson={editLesson} title={datalist[current_key-1].lesson} room={datalist[current_key-1].room} color={datalist[current_key-1].color} doubleLesson={datalist[current_key-1].doubleLesson}/>
            <FlatButton text="Abbrechen" onPress={() => setModalOpen(false)}/>
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
