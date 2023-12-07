// export interface User {
//   user_id: string
//   name: string
//   email: string
//   role: string
//   photo: string
// }

import { Deck } from '../deck/deckTypes'

// User Type
export interface User {
  userID: string
  name: string
  email: string
  password: string
  photo?: string | null
  role: Role
  createdAt: Date
  builtDecks: Deck[]
}

// Role Enum
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface SignUp {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface LogIn {
  email: string
  password: string
}
