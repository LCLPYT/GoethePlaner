import React from 'react'
import {StyleSheet, TouchableWithoutFeedback, Text} from 'react-native';
import DateEntry from './date';
import NewsEntry from './news';

export default function Entry({ pressHandler, item }) {
    if(item.type === "date") {
        return (
            <DateEntry date={item.date} />
        );
    }
    else if(item.type === "news") {
        return (
            <NewsEntry news={item.news} />
        );
    }
    else {
        return (
            <TouchableWithoutFeedback onPress={() => pressHandler(item.key)}>
                <Text style={styles.item}>{item.text}</Text>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  }
});
