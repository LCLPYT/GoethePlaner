import React from 'react';
import { StyleSheet, Text, View, Image, addons } from 'react-native';
import { globalStyles } from '../styles/global';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage'

export default function SettingsScreen() {

  const classes = [];
  [7, 8, 9, 10].forEach(x => {
    ['a', 'b', 'c', 'd', 'e'].forEach(y => classes.push({ label: `${x}${y}`, value: `${x}${y}`}));
  });
  classes.push({ label: '11', value: '11' });
  classes.push({ label: '12', value: '12' });

  async function getData(hours) {
    let hoursPerWeek = 5*parseInt(hours);
    try {
      let value = [{key: 1}];
      value = JSON.parse(await AsyncStorage.getItem("STUNDENPLAN_DATA"));
      if (value !== null) {
        if (hoursPerWeek > value.length) {
          for (let i = value.length+1; i <= hoursPerWeek; i++) {
            value.push({ key: i });
          }
        } else {
          for (let i = value.length; i > hoursPerWeek; i--) {
            value.pop();
          }
          for(let i = value.length-5; i > hoursPerWeek-5; i--){
            value[i].doubleLesson = false;
          }
        }
        console.log(value);
        await AsyncStorage.setItem("STUNDENPLAN_DATA", JSON.stringify(value));
      }
    } catch (e) {console.log(e) }
  }

  const onChangeClass = (item) => {
    AsyncStorage.setItem('class', item.value);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.text}>Klasse:</Text>
      <DropDownPicker
        items={classes}
        // defaultValue={async() => JSON.parse(await AsyncStorage.getItem('class'))}
        zIndex={500}
        containerStyle={{ height: 40, marginHorizontal: 10, marginVertical: 5, marginTop: 10 }}
        showArrow={true}
        customArrowUp={() => <Image source={require('../../src/images/arrow_up.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
        customArrowDown={() => <Image source={require('../../src/images/arrow_down.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
        style={{ backgroundColor: '#fafafa' }}
        dropDownMaxHeight={200}
        placeholder={'Klasse ändern'}
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
      <Text style={styles.text}>Stundenanzahl:</Text>
      <DropDownPicker
        items={[
          { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '10', value: '10' }, { label: '11', value: '11' },
        ]}
        zIndex={500}
        containerStyle={{ height: 40, marginHorizontal: 10, marginVertical: 5, marginTop: 10 }}
        showArrow={true}
        customArrowUp={() => <Image source={require('../../src/images/arrow_up.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
        customArrowDown={() => <Image source={require('../../src/images/arrow_down.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
        style={{ backgroundColor: '#fafafa' }}
        dropDownMaxHeight={200}
        placeholder={"Späteste Stunde ändern"}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        onChangeItem={(item) => getData(item.label)}
        searchable={true}
        searchablePlaceholder="Suchen"
        searchablePlaceholderTextColor="gray"
        searchableError={() => <Text>Nicht gefunden</Text>}
        zIndex={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    margin: 4,
    textAlign: "center",
    marginTop: 18,
  },
});