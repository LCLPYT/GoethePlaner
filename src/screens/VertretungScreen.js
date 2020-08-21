import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default class VertretungScreen extends React.Component{
    render(){
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.titlebar}>
          {/* <TouchableOpacity style={{flex: 1, padding: 50}}  onPress={() => navigation.openDrawer()}>
            <Image source={require('../../src/images/clock.png')}
            resizeMode='contain'
            style={{width: 30, height: 30}} />
            </TouchableOpacity> */}

            <Text style={styles.title}>Willkommen</Text>
          </View>
        </SafeAreaView>
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
      color: '#14213D',
      flex: 1
    },
    titlebar: {
      backgroundColor: '#f2f2f2',
      paddingVertical: 10,
      shadowRadius: 5,
      shadowColor: 'black',
      shadowOpacity: 0.25,
      elevation: 10,
      shadowOffset: { width: 0, height: 3 },

      flexDirection: 'row', alignItems:'center'
    }

  });
  