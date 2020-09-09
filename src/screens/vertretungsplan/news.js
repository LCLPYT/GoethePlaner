import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

export default function NewsEntry({ news }) {
  let newsComponents = [];
  for (let i = 0; i < news.length; i++) {
    newsComponents.push(<Text key={Math.random().toString()} style={styles.newsParagraph}>{news[i]}</Text>);
    if (i < news.length - 1) newsComponents.push(<View style={styles.hr} key={Math.random().toString()} />);
  }

  if (news.length == 0) {
    return (<View></View>);
  } else {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={[styles.headline, styles.newsParagraph]}>News</Text>
          <View style={styles.hr} />
          {newsComponents}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    //paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4
  },
  headline: {
    fontWeight: 'bold',
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 5
  },
  newsParagraph: {
    marginHorizontal: 10,
  },
});
