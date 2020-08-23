import React ,{useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddLessonForm from './AddLessonForm';


  const Stack = createStackNavigator();

  let current_key = 0;



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
  {key: 7, lesson: "Ph"},{key: 8, lesson: "Mu"},{key: 9, lesson: "Bio"},{key: 10, lesson: "Inf"}])

  const editLesson = (edit) => {
    edit.key = current_key;
    setDatalist((currentReviews) => {
      currentReviews[current_key-1] = edit
      return currentReviews;
    });
    setModalOpen(false);
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
        <View style={styles.titlebar}>
        <Text style={styles.title}>Dein Stundenplan</Text>
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
                  <View style={styles.modalContent}>
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
  container: {
    flex: 1
  },
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
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#14213D'
  },
  titlebar: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    elevation: 10,
    shadowOffset: { width: 0, height: 3 },
  }
});
