import {Modal, StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, TextInput, Button} from 'react-native'
import React, {useState} from 'react'

let text = "";

const changeHandler = (val) => {
    text = val;
}

const deviceHeight = Dimensions.get("window").height
export class BottomPopUp extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            show: false,
        }
    }


    show = () => {
        this.setState({show: true})
    }

    close = () => {
        this.setState({show: false})
    }

    renderOutsideTouchable(onTouch){
        const view = <View style={{flex: 1, width: '100%'}}/>
        if(!onTouch) return view

        return(
            <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: '100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    render(){
        let {show} = this.state
        const {onTouchOutside, title} = this.props

        return(
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}>
                <View style={{flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end'}}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        width: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 10,
                        maxHeight: deviceHeight * 0.4
                    }}>
                        <View>
                            <Text style={{
                                color: '#182E44',
                                fontSize: 20,
                                fontWeight: '500',
                                margin: 15,
                                textAlign: 'center'
                            }}
                            >
                                {title}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    input: {
        borderWidth: 0.5,
        borderColor: '#777',
        borderRadius: 5,
        padding: 3,
        marginBottom: 10,
        marginHorizontal: 5,
        height: 35,
        fontSize: 20
    },
    button:{
        marginBottom: 10
    }
  });
  