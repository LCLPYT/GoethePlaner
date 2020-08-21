import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class SettingsScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Einstellungen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#14213D',
  },
});
