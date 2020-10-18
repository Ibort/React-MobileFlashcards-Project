import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { strongCyan } from '../utils/colors'


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

export default class DeckList extends React.Component {
    render() {
        return (
                <ScrollView>
                        {data.map((deck) => {
                            return <Deck key={deck} title={deck} props={this.props} />
                        })}
                </ScrollView>
        )
    }
}


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