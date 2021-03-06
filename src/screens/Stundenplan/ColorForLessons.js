import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { NavigationContainer, useLinkProps, useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import AsyncStorage from '@react-native-community/async-storage'
import FlatButton from '../../shared/button';

import { useNavigation } from '@react-navigation/native';

export default function StundenplanScreen() {
    const [refresh, setRefresh] = useState(false);

    const navigation = useNavigation();

    const KEY = 'COLOR_DATA';

    const [datalist, setDatalist] = useState([{ lesson: 'Mathe', color: '#4c46e1'}, { lesson: 'Deutsch', color: '#ba3b3b'  }, { lesson: 'Physik', color: '#4fcaf8' }, 
    { lesson: 'Biologie', color: '#5d9d4d' }, { lesson: 'Chemie', color: '#e89e11' }, { lesson: 'Geschichte', color: '#2e2e2e' }, { lesson: 'Erdkunde', color: '#471011' }, { lesson: 'Sport', color:'#4ac97b' }, 
    { lesson: 'Englisch', color: '#177823' }, { lesson: 'Französisch', color: '#9c36fc' }, { lesson: 'Philosophie', color: '#dfbc4e' }, { lesson: 'Informatik', color: '#000000' }, { lesson: 'Politik',  color: '#c4c4c4'},]);

    useFocusEffect(
        React.useCallback(() => {
            getColorData();
        }, [])
    );


    async function getColorData() {
        try {
            const value = await AsyncStorage.getItem(KEY)
            if (value !== null) {
                setDatalist(() => {
                    return JSON.parse(value);
                });
                setRefresh(!refresh);
            }else{
                await AsyncStorage.setItem(KEY, JSON.stringify(datalist));
            }
        } catch (e) {}
    }

    const _renderItem = ({ item, index }) => {

        const pressHandler = (lesson) => {
            navigation.navigate('ColorForm', {
                lesson: lesson,
            });
        }

        return (
            <TouchableOpacity style={styles.itemStyle} onPress={() => pressHandler(item.lesson)}>
                <View style={[styles.color, { backgroundColor: item.color }]}></View>
                <Text style={styles.text}>{item.lesson}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <FlatList
            style={{backgroundColor: '#ffffff'}}
                data={datalist}
                extraData={refresh}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    itemStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 55,
        flex: 1,
        borderColor: '#E0E0E0',
        borderWidth: 0.5,
        paddingVertical: 30,
    },
    text: {
        fontSize: 14,
        flex: 1,
        marginStart: 20,
    },
    color: {
        height: 40,
        width: 40,
        borderColor: '#ffffff',
        borderRadius: 200,
        marginStart: 40,
        marginEnd: 10,
    }
});
