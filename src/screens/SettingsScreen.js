import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class SettingsScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.titlebar}>
          <Text style={styles.title}>Einstellungen</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#14213D',
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
