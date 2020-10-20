export const RECEIVE_DECKS = 'RECEIVE_ENTRIES'
export const ADD_DECK = 'ADD_ENTRY'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck, id) {
  return {
    type: ADD_DECK,
    deck,
    id
  }
}

export function addCard (cardQ, id) {
    return {
      type: ADD_CARD,
      cardQ,
      id,
    }
  }