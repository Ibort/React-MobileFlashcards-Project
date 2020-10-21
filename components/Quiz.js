import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 


export default class Quiz extends React.Component {
    state = {
        questNum: 1,
        maxQuest: 0,
        answerShown: 'question',
        questions: [],
        score: 0,
        quizFinish: false,
        height: new Animated.Value(0)
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
        const { score, questNum, maxQuest, height} = this.state
        const newScore = answ === 'correct' ? score+1 : score

        if( questNum === maxQuest) {
            this.setState({
                score:newScore,
                quizFinish: true
            })
            Animated.spring(height, {
                toValue: 1,
                speed:6, 
                useNativeDriver: true,
            }).start()  

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

    handleFinish = (chosen) => {
        const { height } = this.state

        if(chosen !== 'reset'){
            this.props.navigation.goBack()
        } else {
            this.setState({quizFinish: false, score: 0, questNum: 1})
            height.setValue(0)
        }
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
        const {maxQuest, score, height} = this.state
        const scorePercent = Math.round((score/maxQuest)*100)

        return(
            <Animated.View style={[styles.scoreContainer, {transform: [{scaleY:height}]}]}>
                <Text style={styles.qustTxt}>Your Score:</Text>
                <Text style={styles.qustTxt}>{score}/{maxQuest} </Text>
                <View style={styles.scoreFinal}>
                    <Text style={styles.scoreTxt}>{scorePercent}%</Text>
                    <AntDesign style={{zIndex:1}} name="star" size={250} color="goldenrod" />                    
                </View>
                <TouchableOpacity 
                    style={styles.BQbuttons} 
                    onPress={() => this.handleFinish('reset')}
                >
                    <Text style={styles.BQbuttonsTxt}>Reset Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.BQbuttons} 
                    onPress={this.handleFinish}
                >
                    <Text style={styles.BQbuttonsTxt}>Back</Text>
                </TouchableOpacity>
            </Animated.View>
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
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'hidden',
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
    BQbuttons: {
        backgroundColor: 'black',
        borderRadius: 20,   
        padding: 20, 
        width:200,
        marginTop: 10,    
    },
    BQbuttonsTxt: {
        alignSelf: 'center',
        fontSize: 25,
        color:'white'
    }
  });