import React, {useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, RefreshControl, FlatList, TouchableHighlight, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
      contents.forEach(content => {
        entries.push({ key: Math.random().toString(), type: 'date', date: content.date });
        entries.push({ key: Math.random().toString(), type: 'news', news: content.news });
        let added = 0;
        content.entries.forEach(entry => {
          if (filter !== undefined && !entry.classes.includes(filter)) return;
          added++;
          entries.push({ key: Math.random().toString(), type: 'change', entry: entry });
        });
        if (added <= 0) entries.push({ key: Math.random().toString(), type: 'none', text: 'Keine Planänderungen' })
        entries.push({ key: Math.random().toString(), type: 'margin' });
      });
      return entries;
    });
  };

  async function load(){
    try {
      const value = await AsyncStorage.getItem('class');
      if (value !== null) {
        onRefresh(value);
      }
    } catch (e) { }
  }

  useEffect(()=>{
    load();
  },[]);


  const onRefresh = React.useCallback((label) => {
    setRefreshing(true);

    getLatestData("311441", "endlichwieder").then(results => {
      setRefreshing(false);
      insertEntries(results, label);
    });
  }, []);

  const onChangeClass = (item) => {
    AsyncStorage.setItem('class', item.label);
    onRefresh(item.label);
  };

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
      <DropDownPicker
        items={classes}
        zIndex={500}
        containerStyle={{ height: 40, marginHorizontal: 10, marginVertical: 5, marginTop: 10 }}
        showArrow={true}
        customArrowUp={() => <Image source={require('../../src/images/arrow_up.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
        customArrowDown={() => <Image source={require('../../src/images/arrow_down.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
        style={{ backgroundColor: '#fafafa' }}
        dropDownMaxHeight={200}
        placeholder={'Klasse auswählen'}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        onChangeItem={(item) => onChangeClass(item)}
        searchable={true}
        searchablePlaceholder="Suchen"
        searchablePlaceholderTextColor="gray"
        searchableError={() => <Text>Nicht gefunden</Text>}
        zIndex={1000}
      />
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