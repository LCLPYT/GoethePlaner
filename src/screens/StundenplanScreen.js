import React ,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage'
import AddLessonForm from './AddLessonForm';

  const Stack = createStackNavigator();

  let current_key = 0;

  const KEY = 'STUNDENPLAN_DATA'

  _renderWeekdayItem = ({item, index}) => {

    return(
        <View style={styles.itemWeekdayStyle}>
            <Text>{item.day}</Text>
        </View>
    )

  }


  let init = true;

export default function StundenplanScreen ({navigaton}) {

  const [modalOpen, setModalOpen] = useState(false);

  const weekdays = [{key: '1', day: "Mo"}, {key: '2', day: "Di"}, {key: '3', day: "Mi"}, {key: '4', day: "Do"}, {key: '5', day: "Fr"}]

  const [datalist, setDatalist] = useState([{key: 1, lesson: "Ma", room: "K02", color: "#E0E0E0"},{key: 2, lesson: "En", room: "K02", color: "#E0E0E0"},{key: 3, lesson: "Pol", room: "K02", color: "#E0E0E0"},
  {key: 4, lesson: "De", room: "K02", color: "#E0E0E0"},{key: 5, lesson: "Ch", room: "K02", color: "#E0E0E0"},{key: 6, lesson: "Ma", room: "K02", color: "#E0E0E0"},
  {key: 7, lesson: "Ph", room: "K02", color: "#E0E0E0"},{key: 8, lesson: "Mu", room: "K02", color: "#E0E0E0"}])

  useEffect(() => {
      getData = async () =>{
        if(init){
          console.log(init);
          init=false;
          try{
            const value = await AsyncStorage.getItem(KEY)
            if(value!==null){
              console.log( JSON.parse(value));
              setDatalist(() => {
                return JSON.parse(value);
              })
            }
          }catch(e){

          }
      }
    }
      getData();
  });


  const editLesson = async (edit) => {
    edit.key = current_key;
    setDatalist((currentData) => {
      currentData[current_key-1] = edit
      return currentData;
    });
    setModalOpen(false);
    await AsyncStorage.setItem(KEY,  JSON.stringify(datalist));
  };


  const _renderItem = ({item, index}) => {

    const pressHandler = (key) => {
      // hier code für gedrückte Stunden
      console.log(key);
      current_key = key;
      setModalOpen(true)
    }

    // itemstyle = function(color) {
    //   return {
    //     backgroundColor: color,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: 50,
    //     flex: 1,
    //     margin: 1
    //   }
    // }

    if(item.lesson != ""){
    return(
        <TouchableOpacity style={styles.itemStyle} onPress={() => pressHandler(item.key)}>
            <Text>{item.lesson}</Text>
        </TouchableOpacity>
    )
    }else{
      return(
        <View style={styles.itemStyleEmpty}>
        </View>
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
          numColumns={5}/>
        <FlatList
          data={datalist}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
        />

        <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={globalStyles.modalContent}>
                    <AddLessonForm editLesson={editLesson} />
                    <Button
                      title="Cancel"
                      color='#E0E0E0'
                      onPress={() => setModalOpen(false)} 
                    />
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
    height: 50,
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
    height: 50,
    flex: 1,
    margin: 1
  },
});
