import React from 'react'
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';

export default function TodoItem({ pressHandler, item, state }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => pressHandler(item.key)}>
      <Image source={state ? Images[1] : Images[2]} style={{ width: 25, height: 25, alignSelf: "center", }}/>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={{fontSize: 15, flex: 0.2, textAlignVertical: "bottom", color: "#333333"}}>{item.fach}</Text>
    </TouchableOpacity>
  )
}

var Images = [
  require('../../images/checkbox_checked.png'),
  require('../../images/checkbox.png'),
];

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
    width: 350,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  text: {
    marginHorizontal: 7,
    marginVertical: 1,
    fontSize: 16,
    alignSelf: "center",
    flex: 0.85,
  }
});
