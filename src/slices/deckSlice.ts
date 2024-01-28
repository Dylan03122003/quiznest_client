import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { Deck } from '../types/deck.types'

interface DeckState {
  decks: Deck[]
  theme: 'dark' | 'light'
}

const initialState: DeckState = {
  decks: [],
  theme: 'light',
}

const cardSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    addDeck: (state, action: PayloadAction<Deck>) => {
      state.decks.push(action.payload)
    },
    loadDecks: (state, action: PayloadAction<Deck[]>) => {
      state.decks = action.payload
    },
    changeTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload
      console.log(state.theme)
    },
  },
})

export const useDeckReducers = () => {
  const dispatch = useDispatch()

  const changeTheme = (theme: 'light' | 'dark') => {
    dispatch(cardSlice.actions.changeTheme(theme))
  }

  return { changeTheme }
}

export const { addDeck, loadDecks } = cardSlice.actions

export default cardSlice.reducer
