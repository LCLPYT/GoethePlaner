import * as React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  FlatList,
} from 'react-native';

class StundenplanScreen extends React.Component {

  _renderItem = ({item, index}) => {
    return(
        <View style={styles.itemStyle}>
          <Text>{item.name}</Text>
        </View>

    )
  }
  render(){
    return (
      <View style={styles.container}>
        <Text>Dein Stundenplan</Text>
        <FlatList
          data={datalist}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
        />

        {/* <Button
          title="Zurück"
          onPress={() => navigation.navigate('Home')} // or navigation.goBack()
        /> */}
      </View>
    );
  }
}