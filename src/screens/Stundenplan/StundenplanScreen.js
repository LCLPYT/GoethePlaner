import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { NavigationContainer, useLinkProps, useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import AsyncStorage from '@react-native-community/async-storage'
import FlatButton from '../../shared/button';
import { set } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';

const STORAGE_KEY = 'STUNDENPLAN_DATA'

const STORAGE_KEY_2 = 'STUNDENPLAN_DATA_EDIT'

export default function StundenplanScreen({ route }) {

  const weekdays = [{ key: '1', day: "Mo" }, { key: '2', day: "Di" }, { key: '3', day: "Mi" }, { key: '4', day: "Do" }, { key: '5', day: "Fr" }]

  let init = true;

  const [refresh, setRefresh] = useState(false);

  const [datalist, setDatalist] = React.useState([
    { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 },
    { key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }, { key: 10 },
    { key: 11 }, { key: 12 }, { key: 13 }, { key: 14 }, { key: 15 },
    { key: 16 }, { key: 17 }, { key: 18 }, { key: 19 }, { key: 20 },
    { key: 21 }, { key: 22 }, { key: 23 }, { key: 24 }, { key: 25 },
    { key: 26 }, { key: 27 }, { key: 28 }, { key: 29 }, { key: 30 },
    { key: 31 }, { key: 32 }, { key: 33 }, { key: 34 }, { key: 35 },
    { key: 36 }, { key: 37 }, { key: 38 }, { key: 39 }, { key: 40 },]);

  const navigation = useNavigation();

  const { changedColors } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      editLesson()
    }, [])
  );

  var val = "";

  const editLesson = async () => {
    if (init) {
      init = false;
      getData();
    } else {
      await getData();
      try {
        if (val != await AsyncStorage.getItem(STORAGE_KEY_2) && await AsyncStorage.getItem(STORAGE_KEY_2) != null) {
          val = await AsyncStorage.getItem(STORAGE_KEY_2);
          const edit = JSON.parse(val);
          setDatalist((currentData) => {
            currentData[edit.key-1] = JSON.parse(JSON.stringify(edit));

            let edit2 = JSON.parse(JSON.stringify(edit));
            if (edit.doubleLesson) {
              if (edit.key + 4 < currentData.length) {
                  edit2.key = edit.key + 5;
                  edit2.doubleLesson = false;
                  currentData[edit.key+4] = edit2;
              }else {
                currentData[edit.key-1].doubleLesson = false;
              }
            } else {
              if (datalist[edit.key-6].doubleLesson) {
                edit2 = datalist[edit.key - 6];
                edit2.doubleLesson = false;
                currentData[edit.key-6] = edit2;
              }
              if (datalist[edit.key-1].doubleLesson && datalist[edit.key+4].lesson == datalist[edit.key-1].lesson) {
                console.log("case 4");
                let edit3 = JSON.parse(JSON.stringify(edit));
                edit3.lesson = null;
                currentData[edit.key+4] = edit3;
              }
            }
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
            getData();
            return currentData;
          });
        }
      } catch (e) { }
    }
  };

  async function getData() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      if (value !== null) {
        setDatalist(() => {
          return JSON.parse(value);
        })
        setRefresh(!refresh);
      }
    } catch (e) { }
  }


  const _renderWeekdayItem = ({ item, index }) => {
    return (
      <View style={styles.itemWeekdayStyle}>
        <Text>{item.day}</Text>
      </View>
    )
  }

  const _renderItem = ({ item, index }) => {

    const pressHandler = (key) => {
      navigation.navigate('EditLesson', {
        title: datalist[key - 1].lesson, room: datalist[key - 1].room, doubleLesson: datalist[key - 1].doubleLesson, darkText: datalist[key - 1].darkText, key: key
      });
    }

    function itemStyle(item) {
      let margin = 0;
      if (item.key > 10 && item.key <= 15) {
        margin = 3;
      }
      if (item.key > 20 && item.key <= 25) {
        margin = 3;
      }
      if (item.key > 25 && item.key <= 30) {
        margin = 5;
      }
      if (item.key > 30) {
        margin = 2;
      }
      return {
        backgroundColor: item.bg_color,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        flex: 1,
        marginHorizontal: 1,
        marginTop: margin,
        marginBottom: 0

      }
    }

    function itemEmptyStyle() {
      let margin = 0;
      if (item.key > 10 && item.key <= 15) {
        margin = 3;
      }
      if (item.key > 20 && item.key <= 25) {
        margin = 3;
      }
      if (item.key > 25 && item.key <= 30) {
        margin = 5;
      }
      if (item.key > 30) {
        margin = 2;
      }
      return {
        backgroundColor: '#E0E0E0',
        height: 45,
        flex: 1,
        marginHorizontal: 1,
        marginTop: margin,
        marginBottom: 0
      }
    }

    function textStyle() {
      let textColor = '#ffffff';
      if (item.darkText) {
        textColor = '#252526';
      }
      let size = 15;
      if (item.lesson.length > 6) {
        size = 13
      }
      return {
        marginTop: 0,
        color: textColor,
        fontSize: size
      }
    }

    function roomStyle() {
      let textColor = '#ffffff';
      if (item.darkText) {
        textColor = '#252526';
      }
      return {
        color: textColor,
        marginTop: 0,
        fontSize: 9
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
        <TouchableOpacity style={itemEmptyStyle(item.bg_color)} onPress={() => pressHandler(item.key)}>
        </TouchableOpacity>
      )
    }
  }

  return (
    <SafeAreaView>
      <FlatList
        data={weekdays}
        renderItem={_renderWeekdayItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={5} />
      <FlatList
        data={datalist}
        extraData={refresh}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={5}
      />

      {/* <Modal visible={modalOpen} animationType='slide' onRequestClose={() => {setModalOpen(false);}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{alignContent: 'center', justifyContent: 'center'}}>
            <AddLessonForm editLesson={editLesson} title={datalist[current_key-1].lesson} room={datalist[current_key-1].room} bg_color={datalist[current_key-1].bg_color} doubleLesson={datalist[current_key-1].doubleLesson}/>
            <FlatButton text="Abbrechen" stylez={{flex: 1 }} onPress={() => setModalOpen(false)}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  itemWeekdayStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    flex: 1,
    margin: 1
  },
});
