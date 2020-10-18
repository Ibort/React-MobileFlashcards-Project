import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'

export default class Quiz extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.quizNum}>2/2</Text>
                <View>
                    <Text style={styles.qustTxt}>Press ? to show a list of all available commands?</Text>
                    <TouchableOpacity style={styles.answBtn}>
                        <Text style={styles.answTxt}>Answer</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom:20}}>
                    <TouchableOpacity style={styles.corrBtn}>
                        <Text style={styles.corrTxt}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.incorrBtn}>
                        <Text style={styles.corrTxt}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    quizNum:{
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 20,
    },
    qustTxt: {
        fontSize: 50,
        textAlign: 'center',

    },
    answBtn: {
        margin: 10,
    },
    answTxt: {
        fontSize: 30,
        color: 'darkred',
        textAlign: 'center',
    },
    corrBtn: {
        width: 200,
        margin: 10,
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'green',

    },
    corrTxt: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
    },
    incorrBtn: {
        width: 200,
        margin: 10,
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'crimson',

    },
  });