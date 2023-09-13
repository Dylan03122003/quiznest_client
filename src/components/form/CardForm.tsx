import React, { useState } from 'react'
import {
  CardType,
  FlashCard,
  NewCard,
  ReversedCard,
} from '../../slices/deck/deckTypes'
import Button from '../ui/Button'
import SelectField from '../ui/SelectField'
import TextField from '../ui/TextField'

interface CardFormProps {
  onCancel: () => void
  onBack: () => void
  onSubmitCard: (card: NewCard) => void
}

const CardForm = ({ onCancel, onBack, onSubmitCard }: CardFormProps) => {
  const [selectedCardType, setSelectedCardType] = useState<CardType>(
    CardType.FlashCard,
  )
  const [formData, setFormData] = useState<NewCard | null>(null)

  function handleCardTypeChange(cardType: CardType) {
    setSelectedCardType(cardType)
    // Reset formData when the quiz type changes
    setFormData(null)
  }

  function disabledButton() {
    if (selectedCardType === CardType.FlashCard) {
      const flashCard = formData as FlashCard
      return !flashCard || !flashCard.answer || !flashCard.question
    } else if (selectedCardType === CardType.ReversedCard) {
      const reversedCard = formData as ReversedCard
      return !reversedCard || !reversedCard.front || !reversedCard.back
    }

    return false
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    formData && onSubmitCard(formData)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    if (selectedCardType === CardType.FlashCard) {
      setFormData({
        type: selectedCardType,
        ...formData,
        [name]: value,
      } as FlashCard)
    } else if (selectedCardType === CardType.ReversedCard) {
      setFormData({
        type: selectedCardType,
        ...formData,
        [name]: value,
      } as ReversedCard)
    }
  }

  return (
    <div className="">
      <h2 className="text-2xl mb-4">Create a Quiz</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          width="w-full"
          options={[CardType.FlashCard, CardType.ReversedCard]}
          onChange={(type) => handleCardTypeChange(type as CardType)}
          value={selectedCardType}
          marginBottom="mb-8"
        />

        {selectedCardType === CardType.FlashCard && (
          <>
            <TextField
              width="w-full"
              name="question"
              onChange={handleInputChange}
              label="Enter question"
            />
            <TextField
              width="w-full"
              name="answer"
              onChange={handleInputChange}
              label="Enter answer"
            />
          </>
        )}

        {selectedCardType === CardType.ReversedCard && (
          <>
            <TextField
              width="w-full"
              name="front"
              onChange={handleInputChange}
              label="Enter front card"
            />
            <TextField
              width="w-full"
              name="back"
              onChange={handleInputChange}
              label="Enter back card"
            />
          </>
        )}
        <div className="flex justify-between items-center">
          <Button
            onClick={onBack}
            backgroundColor="bg-gray-300"
            hoverColor="hover:bg-gray-400"
          >
            Back
          </Button>
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={onCancel}
              backgroundColor="bg-gray-300"
              hoverColor="hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={disabledButton()}>
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CardForm
