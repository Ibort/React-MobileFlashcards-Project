import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 


export default class Quiz extends React.Component {
    state = {
        questNum: 1,
        maxQuest: 0,
        answerShown: 'question',
        questions: [],
        score: 0,
        quizFinish: false
    }
    componentDidMount() {
        const { deck } = this.props.route.params
        const questNum = deck.questions.length
        this.setState({
            maxQuest: questNum,
            questions: deck.questions,             
        })
    }

    handleAnswer = (answ) => {
        const { score, questNum, maxQuest } = this.state
        const newScore = answ === 'correct' ? score+1 : score

        if( questNum === maxQuest) {
            this.setState({
                score:newScore,
                quizFinish: true
            })

        } else {
            this.setState({
                score:newScore,
                questNum: questNum+1
            })
        }       
    }

    showOher = () => {
        const { answerShown } = this.state
        const flip = answerShown === 'question' ? 'answer' : 'question'
        this.setState({
            answerShown:flip 
        })
    }

    QuizTime = () =>{
        const { questNum, maxQuest, questions, answerShown  } = this.state
        const q = questions.length !== 0 ? questions[questNum-1][answerShown] : ''
        const flipBtn = answerShown === 'question' ? 'Answer' : 'Question'

        return(
            <View style={styles.container}>
                <Text style={styles.quizNum}>{questNum}/{maxQuest}</Text>
                <View>
                    <Text style={styles.qustTxt}>{q}</Text>
                    <TouchableOpacity style={styles.answBtn} onPress={this.showOher}>
                        <Text style={styles.answTxt}>{flipBtn} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom:20}}>
                    <TouchableOpacity style={styles.corrBtn} onPress={() => this.handleAnswer('correct')}>
                        <Text style={styles.corrTxt}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.incorrBtn} onPress={() => this.handleAnswer('incorrect')}>
                        <Text style={styles.corrTxt}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    ScoreTime = () => {
        const {maxQuest, score} = this.state
        const scorePercent = Math.round((score/maxQuest)*100)

        return(
            <View style={styles.scoreContainer}>
                <Text style={styles.qustTxt}>Your Score:</Text>
                <Text style={styles.qustTxt}>{score}/{maxQuest} </Text>
                <View style={styles.scoreFinal}>
                    <Text style={styles.scoreTxt}>{scorePercent}%</Text>
                    <AntDesign style={{zIndex:1}} name="star" size={250} color="goldenrod" />                    
                </View>
                
            </View>
        )
    }

    render() {     
        const { quizFinish } = this.state   
        return(
            !quizFinish 
                ? (<this.QuizTime />)
                : (<this.ScoreTime/>)
            
        )
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    scoreContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    scoreFinal:{
        alignItems: 'center',
        justifyContent: 'center',
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
    scoreTxt: {
        fontSize: 50,
        textAlign: 'center',
        position: 'absolute',
        zIndex:2,
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