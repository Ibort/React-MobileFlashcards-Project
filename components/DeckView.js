import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { strongCyan } from '../utils/colors'

export default class DeckView extends React.Component {
    componentDidMount(){
        const { navigation, route } = this.props
        navigation.setOptions({
            title:`${route.params.title} Deck`
        })
    }

    startQuiz = () => {
        this.props.navigation.navigate('Quiz')  
    }

    addCard = () => {
        this.props.navigation.navigate('AddCard')    
    }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.deckTextCont}>
                        <Text style={styles.title}>Deck</Text>
                        <Text style={styles.subText}>X Cards</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.addBtn} onPress={() => this.addCard()}>
                            <Text>Add Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quizBtn} onPress={() => this.startQuiz()}>
                            <Text style={{color: 'white'}}>Start Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.delBtn}>
                            <Text style={{color: 'darkred'}}>Delete Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderBottomColor: strongCyan,
      borderBottomWidth: 2,
    },
    title: {
        fontSize: 70,
    },
    subText: {
        fontSize: 20,
        color:'gray'
    },
    deckTextCont: {
        alignItems: 'center',
    },
    addBtn:{
        width: 200,
        padding: 30,
        margin: 10,
        borderWidth: 2,
        alignItems: 'center'
    },
    quizBtn:{
        width: 200,
        padding: 30,
        margin: 10,
        borderWidth: 2,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    delBtn: {
        alignItems: 'center',
        margin: 30, 
    }
  });