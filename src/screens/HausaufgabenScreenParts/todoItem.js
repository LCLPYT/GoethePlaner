import React from 'react'
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';

export default function TodoItem({ pressHandler, item, state }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => pressHandler(item.key)}>
      <Image source={require('../../images/checkbox.png')} style={{ width: 25, height: 25, alignSelf: "center", }}/>
      <View style={{flex: 0.1}}/>
      <Text style={styles.text}>{item.text}</Text>
      <View style={{flex: 0.9}}/>
      <Text style={{fontSize: 15, alignSelf: "center",}}>{item.fach}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
    width: 350,
    height: 55,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
  }
});
