import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

function getColorForChangeType(type) {
    switch (type) {
        case "Vertr.":
            return '#4DB6AC'//green
        case "S. Vertr.":
            return '#4DB6AC' //green
        case "Mitbetr.":
            return '#4FC3F7'; // Light Gray
        case "Entfall":
            return '#81C784'; // Red
        case "Raumänd.":
            return '#4DD0E1' //cyan
        case "Verlegung":
            return '#CCCCCC'; // Light Gray
        case "Veranst.":
            return '#CCCCCC'; // Light Gray
        case "Sondereins.":
            return '#CCCCCC'; // Light Gray
        case "EVA":
            return '#81C784' // green
        case "Unterricht geändert":
        case "findet statt":
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
        <View style={[styles.container, { backgroundColor: getColorForChangeType(entry.type) }]}>
            <Text style={[styles.classes]}>{entry.classes}</Text>
            <Text style={[styles.hour]}>{entry.hour}</Text>
            <View style={[styles.infoContainer]}>
                <Text style={[{ fontWeight: 'bold' }]}>{entry.type}</Text>
                <Text style={[]}>{getInfo(entry)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '89%',
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation: 2,
        shadowOffset: { width: 1, height: 2 },
    },
    classes: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft: 12,
        paddingEnd: 4,
        flex: 0.5,
    },
    hour: {
        width: 75,
        fontSize: 35,
        textAlign: 'center',
        flex: 2.5,
    },
    infoContainer: {
        marginHorizontal: 5,
        flex: 4
    },
});
