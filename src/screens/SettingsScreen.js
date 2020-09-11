import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SettingsScreen() {

  const classes = [];
  [7, 8, 9, 10].forEach(x => {
    ['a', 'b', 'c', 'd', 'e'].forEach(y => classes.push({ label: `${x}${y}` }));
  });
  classes.push({ label: '11' });
  classes.push({ label: '12' });

  return (
    <View style={globalStyles.container}>
      <Text style={styles.text}>Klasse:</Text>
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
      <Text style={styles.text}>Stundenanzahl:</Text>
      <DropDownPicker
        items={[
          { label: '8' }, { label: '9' }, { label: '10' }, { label: '11' },
        ]}
        zIndex={500}
        containerStyle={{ height: 40, marginHorizontal: 10, marginVertical: 5, marginTop: 10 }}
        showArrow={true}
        customArrowUp={() => <Image source={require('../../src/images/arrow_up.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
        customArrowDown={() => <Image source={require('../../src/images/arrow_down.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />}
        style={{ backgroundColor: '#fafafa' }}
        dropDownMaxHeight={200}
        placeholder={"8"}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        onChangeItem={(item) => props.setFieldValue('lesson', item.label)}
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
  },
});