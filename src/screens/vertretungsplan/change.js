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

function getInfo(entry) {
    if (entry.type === "Entfall") return entry.subject + " (" + entry.absent + ")";
    else if (entry.type === "Vertr."
            || entry.type === "S. Vertr."
            || entry.type === "Mitbetr."
            || entry.type === "Verlegung"
            || entry.type === "EVA"
            || entry.type === "Sondereins.")
        return entry.subject + " (" + entry.replacement + " statt " + entry.absent + ") in " + entry.room;
    else if (entry.type === "Raumänd."
            || entry.type === "Unterricht geändert")
        return entry.subject + " (" + entry.replacement + ") in " + entry.room;
    else if (entry.type === "Veranst.") return entry.extra + " (" + entry.replacement + ")";
    else if (entry.type === "findet statt") return entry.subject + " bei " + entry.replacement;
    else
        return entry.subject + " (" + entry.replacement + " statt " + entry.absent + ") in " + entry.room;
}

export default function ChangeEntry({ entry }) {
    return (
        <View style={[styles.container, {backgroundColor: getColorForChangeType(entry.type)}]}>
            <Text style={[styles.item]}>{entry.classes}</Text>
            <Text style={[styles.item]}>{entry.hour}</Text>
            <Text style={[styles.item, { fontWeight: 'bold' }]}>{entry.type}</Text>
            <Text style={[styles.item]}>{getInfo(entry)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 10,
    },
    item: {
        fontStyle: 'italic',
    },
});
