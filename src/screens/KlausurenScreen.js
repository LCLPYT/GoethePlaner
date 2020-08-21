import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class SettingsScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Klausuren</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#14213D'
  },
});
