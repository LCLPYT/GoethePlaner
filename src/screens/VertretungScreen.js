import React, {useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, RefreshControl, FlatList, TouchableHighlight, Image } from 'react-native';
import { NavigationContainer,useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import { getLatestData } from '../util/dsbdata';
import Entry from './vertretungsplan/entry';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage'

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function VertretungScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [entries, setEntries] = React.useState([]);


  const insertEntries = (contents, filter) => {
    setEntries(prev => {
      let entries = [];
      var date;
      contents.forEach(content => {
        if(date !== content.date.toString()){
          entries.push({ key: Math.random().toString(), type: 'margin' });
          entries.push({ key: Math.random().toString(), type: 'date', date: content.date });
          entries.push({ key: Math.random().toString(), type: 'news', news: content.news });
          date = content.date.toString();
        }
        let added = 0;
        content.entries.forEach(entry => {
          if (filter !== undefined && !entry.classes.includes(filter)) return;
          added++;
          entries.push({ key: Math.random().toString(), type: 'change', entry: entry });
        });
          //if (added <= 0) entries.push({ key: Math.random().toString(), type: 'none', text: 'Keine Planänderungen' })
      });
      entries.push({ key: Math.random().toString(), type: 'margin' });
      return entries;
    });
  };

  async function load(){
    try {
      const value = await AsyncStorage.getItem('class');
      if (value !== null) {
        setRefreshing(true);

        getLatestData("311441", "endlichwieder").then(results => {
          setRefreshing(false);
          insertEntries(results, value);
        });
      }
    } catch (e) { }
  }

  useEffect(()=>{
    load();
  },[]);

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    load();
  }, []);

  const classes = [];
  [7, 8, 9, 10].forEach(x => {
    ['a', 'b', 'c', 'd', 'e'].forEach(y => classes.push({ label: `${x}${y}` }));
  });
  classes.push({ label: '11' });
  classes.push({ label: '12' });

  return (
    <SafeAreaView style={globalStyles.container}>
      {/*<View style={styles.classWrapper}>
        <Text style={styles.classText}>Klasse:</Text>
        <TouchableHighlight style={[styles.classSelector]} onPress={onChangeClass}>
            <Text style={styles.classText}>12</Text>
        </TouchableHighlight>
      </View>*/}
      <FlatList
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={entries}
        renderItem={({ item }) => (
          <Entry item={item} pressHandler={id => { }} />
        )} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center'
  },
  classWrapper: {
    padding: 4,
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
    paddingTop: 5
  },
  classSelInner: {

  },
});