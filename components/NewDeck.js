import React from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { strongCyan } from '../utils/colors'

export default class NewDeck extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>What is the Title of your new deck?</Text>
                <TextInput 
                    style={styles.inputField} 
                    multiline={true}
                />
                <TouchableOpacity style={styles.subBtn}>
                    <Text style={styles.subBtnTxt}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:  {        
      backgroundColor: '#fff',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    title: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 35,
        textAlign: 'center',
    },
    inputField: {
        marginLeft: 50,
        marginRight: 50,
        fontSize: 25,
        borderWidth: 2,
        alignSelf:'stretch',
        maxHeight: 100,
    },
    subBtn: {
        backgroundColor: 'black',
        borderRadius: 20,   
        padding: 20, 
        width:200,    
    },
    subBtnTxt: {
        alignSelf: 'center',
        fontSize: 25,
        color:'white'
    }
  });