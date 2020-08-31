import React from 'react'
import {StyleSheet, TouchableWithoutFeedback, Text, View} from 'react-native';
import DateEntry from './date';
import NewsEntry from './news';
import ChangeEntry from './change';

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
    else if(item.type === 'change') {
        return (
            <ChangeEntry entry={item.entry} />
        );
    }
    else if(item.type === 'margin') {
        return (
            <View style={styles.marg} />
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
  },
  marg: {
    marginBottom: 16
  },
});
