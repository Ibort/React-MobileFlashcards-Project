import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'
import { saveDeck } from '../utils/api'

function entries (state = {decks:{}}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks:{...action.decks}
      }
    case ADD_DECK :
        const deck = {decks: {
            ...state.decks,
            [action.id]: action.deck
        }}
      return {
        ...state,
        ...deck
      }
      case ADD_CARD :
        const { id, cardQ } = action
        const question = { decks: {
                        ...state.decks,
                        [id]: {
                            ...state.decks[id],
                            questions: state.decks[id].questions.concat(cardQ)
                        }
                    }                    
        }

        const newDeck = {[id]: {
            title: id,
            questions: state.decks[id].questions.concat(cardQ)
        }}
         
        saveDeck(newDeck, id)
        return {
            ...state,
            ...question
        }
    default :
      return state
  }
}

export default entries