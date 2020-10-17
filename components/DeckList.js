import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { strongCyan } from '../utils/colors'


const title=['Lecso','Kolbász','Muzli','Lácso','Kőlbász','Mpzli', 'kenocs']

function Deck({title, props}) {
    return (
       <TouchableOpacity onPress={() => props.navigation.navigate(
           'DeckView'
       )}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subText}>X Cards</Text>
            </View>
      </TouchableOpacity> 
    );
  }

export default class DeckList extends React.Component {
    render() {
        return (
                <ScrollView>
                        {title.map((deck) => {
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
      paddingTop: StatusBar.currentHeight,
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