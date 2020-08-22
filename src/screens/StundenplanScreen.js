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



    return(
        <TouchableOpacity style={styles.itemStyle} onPress={() => pressHandler(item.key)}>
            <Text>{item.lesson}</Text>
        </TouchableOpacity>
    )
  }



  render(){
    return (
      <SafeAreaView style={styles.container}>
        <Text>Dein Stundenplan</Text>
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

const datalist = [{key: '1', lesson: "Ma"},{key: '2', lesson: "En"},{key: '3', lesson: "Pol"},{key: '4', lesson: "De"},{key: '5', lesson: "Ch"},{key: '6', lesson: "Ma"},{key: '7', lesson: "Ph"},{key: '8', lesson: "Mu"},{key: '9', lesson: ""},{key: '10', lesson: ""}]

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
});
