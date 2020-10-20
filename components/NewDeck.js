import React from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class NewDeck extends React.Component {
    state = {
        value: ''
    }
    handleChange = (e) => {
        this.setState({
            value:e.target.value
        })
        
    }

    handleSubmit = () => {
        const {value } = this.state
        const deck = {[value]: {
                        title: value,
                        questions: []
                    }}
                    
        saveDeck(deck, value)
        this.props.dispatch(addDeck(deck,value))
        
        this.setState({
            value: ''
        })
        this.props.navigation.goBack()
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>What is the Title of your new deck?</Text>
                <TextInput 
                    style={styles.inputField} 
                    multiline={true}
                    value={this.state.value}
                    onChange={(e) => this.handleChange(e)}
                />
                <TouchableOpacity style={styles.subBtn} onPress={this.handleSubmit}>
                    <Text style={styles.subBtnTxt}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default connect()(NewDeck)

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
