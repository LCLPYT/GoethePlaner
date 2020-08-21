import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default class VertretungScreen extends React.Component{
    render(){
      return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>Willkommen</Text>
        </SafeAreaView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    itemStyle: {
      backgroundColor: '#C65C5C',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      flex: 1,
      margin: 1
    },
    title: {
        fontSize: 40
    }
  });
  