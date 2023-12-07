import { FormEvent, useState } from 'react'
import { TiTick } from 'react-icons/ti'
import { useMutation, useQueryClient } from 'react-query'
import { QUERY_KEYS, createQuestionForAnAvailableDeck } from '../../api/deck'
import { QuestionType } from '../../slices/deck/deckTypes'
import ClozeTextArea from '../form/ClozeTextArea'
import Button from '../ui/Button'
import SelectField from '../ui/SelectField'
import TextArea from '../ui/TextArea'
import TextField from '../ui/TextField'

export type InputQuestion =
  | InputClozeCard
  | InputFlashCard
  | InputMultipleChoice

export interface InputClozeCard {
  type: QuestionType.CLOZE_CARD
  content: string
  answers: string[]
}

export interface InputFlashCard {
  type: QuestionType.FLASHCARD
  content: string
  back: string
}

export interface InputMultipleChoice {
  type: QuestionType.MULTIPLE_CHOICE
  content: string
  choices: string[]
  answers: string[]
}

interface Props {
  deckID: string
}

const QuestionForm = ({ deckID }: Props) => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<InputQuestion>({
    type: QuestionType.FLASHCARD,
    content: '',
    back: '',
  })

  const { mutate: createQuestionMutation } = useMutation({
    mutationFn: createQuestionForAnAvailableDeck,
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.DECKS])
      switch (formData.type) {
        case QuestionType.CLOZE_CARD:
          setFormData((prevOne) => ({ ...prevOne, answers: [], content: '' }))
          break
        case QuestionType.FLASHCARD:
          setFormData((prevOne) => ({ ...prevOne, content: '', back: '' }))
          break
        case QuestionType.MULTIPLE_CHOICE:
          setFormData((prevOne) => ({
            ...prevOne,
            content: '',
            choices: [],
            answers: [],
          }))
          break
        default:
          break
      }
    },
  })

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData((prevData) => {
      return { ...prevData, [`${e.target.name}`]: e.target.value }
    })
  }

  const handleChoiceChange = (choiceContent: string, choiceNum: number) => {
    setFormData((prevOne) => {
      let newAnswers: string[] = []
      if (prevOne.type === QuestionType.MULTIPLE_CHOICE) {
        newAnswers = prevOne.answers ? [...prevOne.answers] : []
        newAnswers[choiceNum - 1] = choiceContent
      }

      return {
        ...prevOne,
        answers: newAnswers,
      }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    createQuestionMutation({ deckID, inputQuestion: formData })
  }
  const renderInputFields = () => {
    switch (formData.type) {
      case QuestionType.CLOZE_CARD:
        return (
          <>
            <ClozeTextArea
              label="Content"
              textLabelColor="text-text-light dark:text-text-dark"
              textInputColor="text-text-light dark:text-text-dark"
              width="w-full"
              bgInputColor="bg-white dark:bg-card-dark"
              name="content"
              value={formData.content}
              onGetClozeCard={(content, answers) => {
                setFormData((prevOne) => ({
                  ...prevOne,
                  type: QuestionType.CLOZE_CARD,
                  content,
                  answers,
                }))
              }}
            />
          </>
        )
      case QuestionType.FLASHCARD:
        return (
          <>
            <TextArea
              textLabelColor="text-text-light dark:text-text-dark"
              bgInputColor="bg-white dark:bg-card-dark"
              textInputColor="text-text-light dark:text-text-dark"
              label="Front"
              width="w-full"
              name="content"
              mb="mb-4"
              value={formData.content}
              onChange={(e) => handleChange(e)}
            />
            <TextArea
              textLabelColor="text-text-light dark:text-text-dark"
              textInputColor="text-text-light dark:text-text-dark"
              bgInputColor="bg-white dark:bg-card-dark"
              label="Back"
              width="w-full"
              name="back"
              value={formData.back}
              onChange={(e) => handleChange(e)}
            />
          </>
        )
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <>
            <TextField
              textLabelColor="text-text-light dark:text-text-dark"
              textInputColor="text-text-light dark:text-text-dark"
              bgInputColor="bg-white dark:bg-card-dark"
              label="Question"
              width="w-full"
              name="content"
              value={formData.content}
              onChange={(e) => handleChange(e)}
            />

            <div className="flex items-end gap-4 my-4">
              <TextField
                textLabelColor="text-text-light dark:text-text-dark"
                textInputColor="text-text-light dark:text-text-dark"
                bgInputColor="bg-white dark:bg-card-dark"
                label="Choice 1"
                width="w-full"
                value={formData.choices && formData.choices[0]}
                onChange={(e) => handleChoiceChange(e.target.value, 1)}
              />
              <button
                type="button"
                className="flex items-center justify-center p-1 bg-gray-200 dark:bg-gray-600 rounded-sm"
              >
                <TiTick className="w-7 h-7  text-gray-600  dark:text-gray-200 " />
              </button>
            </div>
            <div className="flex items-end gap-4 mb-4">
              <TextField
                textLabelColor="text-text-light dark:text-text-dark"
                textInputColor="text-text-light dark:text-text-dark"
                bgInputColor="bg-white dark:bg-card-dark"
                label="Choice 2"
                width="w-full"
                value={formData.choices && formData.choices[1]}
                onChange={(e) => handleChoiceChange(e.target.value, 2)}
              />
              <button
                type="button"
                className="flex items-center justify-center p-1 bg-gray-200 dark:bg-gray-600 rounded-sm"
              >
                <TiTick className="w-7 h-7 text-gray-600  dark:text-gray-200" />
              </button>
            </div>
            <div className="flex items-end gap-4 mb-4">
              <TextField
                textLabelColor="text-text-light dark:text-text-dark"
                textInputColor="text-text-light dark:text-text-dark"
                bgInputColor="bg-white dark:bg-card-dark"
                label="Choice 3"
                width="w-full"
                value={formData.choices && formData.choices[2]}
                onChange={(e) => handleChoiceChange(e.target.value, 3)}
              />
              <button
                type="button"
                className="flex items-center justify-center p-1 bg-gray-200 dark:bg-gray-600 rounded-sm"
              >
                <TiTick className="w-7 h-7 text-gray-600 dark:text-gray-200" />
              </button>
            </div>
            <div className="flex items-end gap-4 mb-4">
              <TextField
                textLabelColor="text-text-light dark:text-text-dark"
                textInputColor="text-text-light dark:text-text-dark"
                bgInputColor="bg-white dark:bg-card-dark"
                label="Choice 4"
                width="w-full"
                value={formData.choices && formData.choices[3]}
                onChange={(e) => handleChoiceChange(e.target.value, 4)}
              />
              <button
                type="button"
                className="flex items-center justify-center p-1 bg-gray-200 dark:bg-gray-600 rounded-sm"
              >
                <TiTick className="w-7 h-7 text-gray-600 dark:text-gray-200" />
              </button>
            </div>
          </>
        )
      default:
        return (
          <div>
            <TextField
              textLabelColor="text-text-light dark:text-text-dark"
              label="Front"
              width="w-full"
              mb="mb-4"
              bgInputColor="bg-white dark:bg-card-dark"
            />
            <TextField
              textLabelColor="text-text-light dark:text-text-dark"
              label="Back"
              width="w-full"
            />
          </div>
        )
    }
  }

  return (
    <form className="" onSubmit={handleSubmit}>
      <SelectField
        label="Select a type"
        width="w-full"
        textLabelColor="text-text-light dark:text-text-dark"
        selectedTagTextColor="text-text-light dark:text-text-dark"
        optionTextColor="text-text-light dark:text-text-dark"
        menuBgColor="bg-white dark:bg-card-dark"
        optionHoverColor="hover:bg-gray-100 dark:hover:bg-gray-700"
        marginBottom="mb-5"
        options={[
          QuestionType.CLOZE_CARD,
          QuestionType.FLASHCARD,
          QuestionType.MULTIPLE_CHOICE,
        ]}
        onChange={(tag) =>
          setFormData(
            (prevData) =>
              ({
                ...prevData,
                type: tag as QuestionType,
              } as InputQuestion),
          )
        }
        value={formData.type}
      />

      {renderInputFields()}

      <div className="flex items-center justify-end">
        <Button type="submit" mt="mt-5">
          Create
        </Button>
      </div>
    </form>
  )
}

export default QuestionForm
