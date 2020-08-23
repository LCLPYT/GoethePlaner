import React ,{useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from '../styles/global';
import { AsyncStorage } from '@react-native-community/async-storage'
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

export default function StundenplanScreen ({navigaton}) {

  

  const [modalOpen, setModalOpen] = useState(false);

  const weekdays = [{key: '1', day: "Mo"}, {key: '2', day: "Di"}, {key: '3', day: "Mi"}, {key: '4', day: "Do"}, {key: '5', day: "Fr"}]

  const [datalist, setDatalist] = useState([{key: 1, lesson: "Ma", room: "K02"},{key: 2, lesson: "En"},{key: 3, lesson: "Pol"},{key: 4, lesson: "De"},{key: 5, lesson: "Ch"},{key: 6, lesson: "Ma"},
  {key: 7, lesson: "Ph"},{key: 8, lesson: "Mu"},{key: 9, lesson: "Bio"},{key: 10, lesson: "Inf"},  {key: 11, lesson: "Ph"},{key: 12, lesson: "Mu"},{key: 13, lesson: "Bio"},{key: 14, lesson: "Inf"},  
  {key: 15, lesson: "Ph"},{key: 16, lesson: "Mu"},{key: 17, lesson: "Bio"},{key: 18, lesson: "Inf"},  {key: 19, lesson: "Ph"},{key: 20, lesson: "Mu"},{key: 21, lesson: "Bio"},{key: 22, lesson: "Inf"},
  {key: 23, lesson: "Ph"},{key: 24, lesson: "Mu"},{key: 25, lesson: "Bio"},{key: 26, lesson: "Inf"},  {key: 27, lesson: "Ph"},{key: 28, lesson: "Mu"},{key: 29, lesson: "Bio"},{key: 30, lesson: "Inf"},
  {key: 31, lesson: "Ph"},{key: 32, lesson: "Mu"},{key: 33, lesson: "Bio"},{key: 34, lesson: ""},  {key: 35, lesson: "Ph"},{key: 36, lesson: "Mu"},{key: 37, lesson: ""},{key: 38, lesson: "Inf"}, 
  {key: 39, lesson: ""},{key: 40, lesson: "Mu"}])

  /*AsyncStorage.getItem(KEY).then(asyncStorageRes => {
    console.log(JSON.parse(asyncStorageRes))
    });*/

  const editLesson = (edit) => {
    edit.key = current_key;
    setDatalist((currentReviews) => {
      currentReviews[current_key-1] = edit
      return currentReviews;
    });
    setModalOpen(false);
    AsyncStorage.setItem(KEY,  JSON.stringify(datalist));
  };


  const _renderItem = ({item, index}) => {

    const pressHandler = (key) => {
      // hier code für gedrückte Stunden
      console.log(key);
      current_key = key;
      setModalOpen(true)
    }

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
