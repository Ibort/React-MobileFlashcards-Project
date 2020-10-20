import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
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

function Deck({title, props}) {
    return (
       <TouchableOpacity onPress={() => deckNavigate(props,title)}>
            <View style={styles.container}>
                <Text style={styles.title}>{title} Deck</Text>
                <Text style={styles.subText}>X Cards</Text>
            </View>
      </TouchableOpacity> 
    );
  }

class DeckList extends React.Component {  
    componentDidMount(){   
        const { dispatch, navigation } = this.props

        navigation.addListener('focus', () => {            
            getDecks()
            .then(res => dispatch(receiveDecks(res)))
          });
    }
    
    render() {
        const { decks } = this.props
        return (
                <ScrollView>
                        {Object.keys(decks).map((deck) => {
                            return <Deck key={deck} title={deck} props={this.props} />
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
    },
    title: {
        fontSize: 40,
    },
    subText: {
        fontSize: 14,
        color:'gray'
    }
  });