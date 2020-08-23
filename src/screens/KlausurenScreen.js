import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global';

export default class SettingsScreen extends React.Component {
  render(){
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.titlebar}>
          <Text style={globalStyles.title}>Klausuren</Text>
        </View>
      </View>
    );
  }
}

