import AsyncStorage from '@react-native-community/async-storage'

const MOBILE_FLASHCARDS_KEY = 'MobileFlashscards:decks'

export function saveDeck (entry) {
    return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_KEY,JSON.stringify(entry))
  }

export function getDecks () {      
    return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then(res => {
        if( res === null) {
            return {}
        } else {
            return JSON.parse(res)
        }                            
    })
}

export function removeDeck (key) {
    return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(MOBILE_FLASHCARDS_KEY, JSON.stringify(data))
      })
  }