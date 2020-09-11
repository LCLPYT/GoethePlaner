import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { globalStyles } from '../styles/global';
// import Pdf from 'react-native-pdf';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={globalStyles.container}>
{/* 
            <Pdf
              source={{uri:'http://www.goethe-gymnasium-lichterfelde.de/files/klausurplan_q2_neu_23.4.2020.pdf', cache: true}}
              onLoadComplete={(numberOfPages,filePath)=>{
                console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages)=>{
                console.log(`current page: ${page}`);
            }}
            onError={(error)=>{
                console.log(error);
            }}
            onPressLink={(uri)=>{
                console.log(`Link presse: ${uri}`)
            }}
              style={styles.pdf} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  }
});