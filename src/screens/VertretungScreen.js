import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, RefreshControl, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { getLatestData } from '../util/dsbdata';
import Entry from './vertretungsplan/entry';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function VertretungScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [entries, setEntries] = React.useState([]);

  const insertEntries = contents => {
    setEntries(prev => {
      let entries = [];
      contents.forEach(content => {
        entries.push({ key: Math.random().toString(), type: 'date', date: content.date });
        entries.push({ key: Math.random().toString(), type: 'news', news: content.news });
        content.entries.forEach(entry => {
          entries.push({ key: Math.random().toString(), type: 'change', entry: entry });
        });
        if(content.entries.length <= 0) entries.push({ key: Math.random().toString(), type: 'none', text: 'Keine Planänderungen' })
        entries.push({ key: Math.random().toString(), type: 'margin' });
      });
      return entries;
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getLatestData("311441", "endlichwieder").then(results => {
      setRefreshing(false);
      insertEntries(results);
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
      <View style={styles.classWrapper}>
        <Text style={styles.classText}>Klasse:</Text>
        <Text style={[styles.classText, styles.classSelector]}>12</Text>
      </View>
      <FlatList 
        contentContainerStyle={styles.scrollView} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={entries}
        renderItem={({ item }) => (
          <Entry item={item} pressHandler={id => {}} />
        )} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center'
  },
  classWrapper: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classText: {
    fontSize: 18,
  },
  classSelector: {
    backgroundColor: '#0f0',
    padding: 5,
    borderRadius: 5,
    borderColor: '#090',
    borderWidth: 2,
    textAlign: "center",
    paddingTop: 7
  },
});