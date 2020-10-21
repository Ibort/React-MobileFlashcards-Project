import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Animated} from 'react-native'
import { strongCyan } from '../utils/colors'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

const data=['Lecso','Kolbász','Muzli','Lácso','Kőlbász','Mpzli', 'kenocs']

function deckNavigate(props, title) {
   props.navigation.navigate(
        'DeckView',{
            title,
            
        })
}

function Deck({title, props, cardNum, width}) {
    return (
       <TouchableOpacity onPress={() => deckNavigate(props,title)}>
            <Animated.View style={[styles.container, {transform: [{scaleX:width}]}]}>
                <Text style={styles.title}>{title} Deck</Text>
                <Text style={styles.subText}>{cardNum} Cards</Text>
            </Animated.View>
      </TouchableOpacity> 
    );
  }

class DeckList extends React.Component {  
    state = {
        width: new Animated.Value(0),
    }

    componentDidMount(){  
        const { width } = this.state
        const { dispatch, navigation } = this.props

        navigation.addListener('focus', () => {          
            getDecks()
            .then(res => {dispatch(receiveDecks(res))})    

            Animated.spring(width, {
                toValue: 1,
                speed:5, 
                useNativeDriver: true,
            }).start()   
        });
        navigation.addListener('blur', () => {       
            width.setValue(0)
        });
    }
    
    render() {
        const { decks } = this.props
        const { width } = this.state
        return (
                <ScrollView>
                        {Object.keys(decks).map((deck) => {
                            const qNum = decks[deck].questions ? decks[deck].questions.length : 0
                            return <Deck 
                                        key={deck} 
                                        title={deck} 
                                        props={this.props} 
                                        cardNum={qNum} 
                                        width={width} 
                                    />
                        })}
                </ScrollView>
        )
    }
}

function mapStateToProps (decks) { 
    return decks
  }

export default connect(mapStateToProps)(DeckList)


const styles = StyleSheet.create({
    container: {
      height:200,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: strongCyan,
      borderBottomWidth: 2,
      overflow: 'hidden',
    },
    title: {
        fontSize: 40,
    },
    subText: {
        fontSize: 14,
        color:'gray'
    }
  });