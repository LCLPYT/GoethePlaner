import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { globalStyles } from '../styles/global';

export default function FlatButton({ text, onPress, stylez}) {
  return (
    <TouchableOpacity style={[globalStyles.button, stylez]} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
})