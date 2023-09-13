import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Deck, DeckState } from './deckTypes'

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
  },
})

export const { addDesk } = cardSlice.actions

export default cardSlice.reducer
