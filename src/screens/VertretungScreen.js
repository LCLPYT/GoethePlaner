import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { getLatestData } from '../util/dsbdata';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function VertretungScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getLatestData("311441", "endlichwieder").then(results => {
      console.log(results);
      setRefreshing(false);
    });
  }, []);

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
      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <Text>Pull down to refresh.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});