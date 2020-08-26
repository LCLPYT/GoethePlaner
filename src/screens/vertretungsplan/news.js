import React from 'react'
import {StyleSheet, Text} from 'react-native';

export default function NewsEntry({ news }) {
    let newsComponents = news.map(item => <Text key={Math.random().toString()}>{item}</Text>);
    return (
        newsComponents
    );
}

const styles = StyleSheet.create({
  item: {
  }
});
