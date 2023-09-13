import { useState } from 'react'
import Button from '../ui/Button'
import TextField from '../ui/TextField'

interface DeckTitleFormProps {
  availableTitle: string
  onSubmitTitle: (title: string) => void
}

const DeckTitleForm = ({
  onSubmitTitle,
  availableTitle = '',
}: DeckTitleFormProps) => {
  const [title, setTitle] = useState(availableTitle)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmitTitle(title)
  }
  return (
    <div>
      <h2 className="text-2xl mb-2">Welcome to the Deck Creation Process!</h2>
      <p className="text-gray-600 mb-6">
        Creating a deck is your gateway to curating, organizing, and sharing
        your knowledge in a way that suits your needs. Whether you're a student
        preparing for exams, a professional organizing resources, or simply a
        curious learner, this page empowers you to craft your unique learning
        experience.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-end gap-12"
      >
        <TextField
          label="Enter deck title"
          width="w-full"
          value={title}
          rounded="rounded-md"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" disabled={!title}>
          Next
        </Button>
      </form>
    </div>
  )
}

export default DeckTitleForm
