import React from 'react'
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

export default function NewsEntry({ news }) {
    let newsComponents = [];
    for (let i = 0; i < news.length; i++) {
      newsComponents.push(<Text key={Math.random().toString()}>{news[i]}</Text>);
      if(i < news.length - 1) newsComponents.push(<View style={styles.hr} key={Math.random().toString()} />);
    }
    return (
      <TouchableWithoutFeedback style={styles.touchable}>
        <View style={styles.container}>
          <Text style={styles.headline}>News</Text>
          <View style={styles.hr}/>
          {newsComponents}
        </View>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  touchable: {

  },
  container: {
    alignContent: "center",
    padding: 10,
    marginHorizontal: 20,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20
  },
  headline: {
    fontWeight: 'bold',
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 5
  },
});
