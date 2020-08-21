import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AboutScreen extends React.Component {
  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.title}>
        Entstanden in Zusammmenarbeit von:
        </Text>
        <Text style={styles.subtitle}>
          Name1, Name2 und Name3
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    backgroundColor: 'orange'
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 45,
    marginTop: 120
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
}