import React from 'react'
import {StyleSheet, Text} from 'react-native';

/**
 * @param {Date} date The date.
 */
function getDateString(date) {
    let mappings = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    return `${mappings[date.getDay() - 1]}, ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export default function DateEntry({ date }) {
    return (
        <Text style={styles.item}>{getDateString(date)}</Text>
    );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 18
  }
});
