import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>
          Goethe Planer
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}