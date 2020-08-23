import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { getLatestData } from '../util/dsbdata';

export default class VertretungScreen extends React.Component{
    render(){
      return (
        <SafeAreaView style={globalStyles.container}>
          <View style={globalStyles.titlebar}>
          {/* <TouchableOpacity style={{flex: 1, padding: 50}}  onPress={() => navigation.openDrawer()}>
            <Image source={require('../../src/images/clock.png')}
            resizeMode='contain'
            style={{width: 30, height: 30}} />
            </TouchableOpacity> */}

            <Text style={globalStyles.title}>Willkommen</Text>
          </View>
          <Button title="Test" onPress={event => {
            getLatestData("311441", "endlichwieder")
              .then(contents => console.log(contents));
          }}></Button>
        </SafeAreaView>
      );
    }
  }
