import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Deck, DeckState } from '../types/deckTypes'

const initialState: DeckState = {
  decks: [],
}

const cardSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    addDesk: (state, action: PayloadAction<Deck>) => {
      state.decks.push(action.payload)
    },
    loadDecks: (state, action: PayloadAction<Deck[]>) => {
      state.decks = action.payload
    },
  },
})

export const { addDesk, loadDecks } = cardSlice.actions

export default cardSlice.reducer
