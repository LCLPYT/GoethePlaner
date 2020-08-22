import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



  const Stack = createStackNavigator();


export default class StundenplanScreen extends React.Component {

  _renderItem = ({item, index}) => {

    const pressHandler = (key) => {
      // hier code für gedrückte Stunden
      console.log(key)
    }

    if(item.lesson != ""){
    return(
        <TouchableOpacity style={styles.itemStyle} onPress={() => pressHandler(item.key)}>
            <Text>{item.lesson}</Text>
        </TouchableOpacity>
    )
    }else{
      return(
        <TouchableOpacity style={styles.itemStyleEmpty} onPress={() => pressHandler(item.key)}>
      </TouchableOpacity>
      )
    }
  }

  _renderWeekdayItem = ({item, index}) => {

    return(
        <View style={styles.itemWeekdayStyle}>
            <Text>{item.day}</Text>
        </View>
    )

  }


  render(){
    return (
      <SafeAreaView>
        <View style={styles.titlebar}>
        <Text style={styles.title}>Dein Stundenplan</Text>
        </View>
        <FlatList
          data={weekdays}
          renderItem={this._renderWeekdayItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}/>
        <FlatList
          data={datalist}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
        />
      </SafeAreaView>
    );
  }
}

const datalist = [{key: '1', lesson: "Ma"},{key: '2', lesson: "En"},{key: '3', lesson: "Pol"},{key: '4', lesson: "De"},{key: '5', lesson: "Ch"},{key: '6', lesson: "Ma"},
{key: '7', lesson: "Ph"},{key: '8', lesson: "Mu"},{key: '9', lesson: "Bio"},{key: '10', lesson: "Inf"},{key: '11', lesson: "Ph"},{key: '12', lesson: "Inf"},{key: '13', lesson: "Ch"},{key: '14', lesson: ""},
{key: '15', lesson: "Ph"},{key: '16', lesson: "Mu"},{key: '17', lesson: ""},{key: '18', lesson: "Bio"},{key: '19', lesson: ""},{key: '20', lesson: "Mu"},{key: '21', lesson: ""},{key: '22', lesson: ""}]

const weekdays = [{key: '1', day: "Mo"}, {key: '2', day: "Di"}, {key: '3', day: "Mi"}, {key: '4', day: "Do"}, {key: '5', day: "Fr"}]

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
