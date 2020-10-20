import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { strongCyan } from '../utils/colors'
import { removeDeck } from '../utils/api'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

class DeckView extends React.Component {
    componentDidMount(){
        const { navigation, route, dispatch } = this.props
        navigation.setOptions({
            title:`${route.params.title} Deck`
        })

        navigation.addListener('focus', () => {   
            getDecks()
            .then(res => dispatch(receiveDecks(res)))
        })
    }

    startQuiz = (title) => {
        const deck = this.props.decks[title]
        this.props.navigation.navigate('Quiz', {
            deck
        })  
    }

    addCard = () => {
        const { title } = this.props.route.params
        this.props.navigation.navigate('AddCard', {title})    
    }

    delDeck = () => {
        const { title } = this.props.route.params
        removeDeck(title)
        .then(() => this.props.navigation.goBack())
    }

    render() {
        console.log(this.props);

        const { title } = this.props.route.params
        const cardNum = !this.props.decks[title] ? 0 : this.props.decks[title].questions.length
        const btnDisabled = cardNum === 0 ? true : false

        return (
                <View style={styles.container}>
                    <View style={styles.deckTextCont}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subText}>{cardNum} Cards</Text>
                    </View>
                    <View>
                        <TouchableOpacity 
                            style={styles.addBtn} 
                            onPress={() => this.addCard()}
                        >
                            <Text>Add Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={!btnDisabled ? styles.quizBtn : styles.quiztnDis} 
                            onPress={() => this.startQuiz(title)}
                            disabled={btnDisabled}
                        >
                            <Text style={{color: 'white'}}>Start Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.delBtn} 
                            onPress={() => this.delDeck()}
                        >
                            <Text style={{color: 'darkred'}}>Delete Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
  }

  function mapStateToProps (decks) { 
    return decks
  }


  export default connect(mapStateToProps)(DeckView)

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
    },
    quiztnDis: {
        opacity: 0.5,
        backgroundColor: 'gray',
        width: 200,
        padding: 30,
        margin: 10,
        borderWidth: 2,
        alignItems: 'center',
    },
  });