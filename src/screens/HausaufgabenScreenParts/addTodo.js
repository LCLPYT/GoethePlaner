import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Button from 'react-native-buttonex'

export default function AddTodo({ submitHandler }) {
  [text, setText] = useState('');

  const changeHandler = (val) => {
    setText(val);
  };

  return (
    <View styles={styles.largeButton}>
      <TouchableOpacity>
        <Button title="Hi" bordered />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  largeButton: {
    padding: 50,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  }
});
