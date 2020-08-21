import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';


export default class StundenplanScreen extends React.Component {

  _renderItem = ({item, index}) => {
    return(
        <View style={styles.itemStyle}>
          <Text>{item.lesson}</Text>
        </View>
    )
  }
  render(){
    return (
      <View style={styles.container}>
        <Text>Dein Stundenplan</Text>
        <FlatList
          data={datalist}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
        />
      </View>
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
