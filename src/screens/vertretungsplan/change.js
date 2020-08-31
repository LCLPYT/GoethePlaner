import React from 'react'
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

function getColorForChangeType(type) {
    switch (type) {
        case "Vertr.":
        case "S. Vertr.":
        case "Mitbetr.":
            return '#00FFFF' // Cyan
        case "Entfall":
            return '#FF0000'; // Red
        case "Raumänd.":
        case "Verlegung":
            return '#FF00FF'; // Magenta
        case "Veranst.":
        case "Sondereins.":
            return '#FFFF00'; // Yellow
        case "EVA":
            return '#00C000'
        case "Unterricht geändert":
            return '#0000FF'; // Blue
        case "findet statt":
            return '#00FF00'; // Green
        default:
            return '#CCCCCC'; // Light Gray
    }
}

export default function ChangeEntry({ entry }) {
    return (
        <TouchableWithoutFeedback onPress={() => console.log("pressed entry (coming soon)")}>
            <Text style={[styles.item, { backgroundColor: getColorForChangeType(entry.type) }]}>{JSON.stringify(entry)}</Text>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 10,
    },
});
