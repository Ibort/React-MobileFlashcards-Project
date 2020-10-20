import React from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { addCard } from '../actions'
import { connect } from 'react-redux'


class AddCard extends React.Component {
    state = {
        question: '',
        answer: '',
    }


    handleChange = (e, field) => {
        this.setState({
            [field]:e
        })
        
    }

    handleSubmit = () => {
        const { dispatch } = this.props
        const { title } = this.props.route.params
        const { question, answer } = this.state
        const newCard = {
            question,
            answer
        }


        dispatch(addCard(newCard,title))

        this.setState({
            question: '',
            answer: ''
        })

        this.props.navigation.goBack()
    }

    render() {
        const { answer, question} = this.state
        const btnDisabled = (answer !== '' && question  !== '')? false : true

        return(
            <View style={styles.container}>
                <Text style={styles.title}>Add your Card!</Text>
                <TextInput 
                    style={styles.inputField} 
                    placeholder='Add the Question'
                    value={this.state.question}
                    onChangeText={(e) => this.handleChange(e, 'question')}
                    
                />
                <TextInput 
                    style={styles.inputField} 
                    placeholder='Add the Answer'
                    value={this.state.answer}
                    onChangeText={(e) => this.handleChange(e, 'answer')}
                />
                <TouchableOpacity 
                    style={!btnDisabled ? styles.subBtn : styles.subBtnDis}
                    disabled={btnDisabled}
                    onPress={() => this.handleSubmit()}
                >
                    <Text style={styles.subBtnTxt}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps (decks) { 
    return decks
  }

export default connect(mapStateToProps)(AddCard)

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
    subBtnDis: {
        opacity: 0.5,
        backgroundColor: 'gray',
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