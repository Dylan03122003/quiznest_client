import React, { useState } from 'react'
import { TiTick } from 'react-icons/ti'
import { QuestionType } from '../../../types/deckTypes'
import Button from '../../ui/Button'
import TextArea from '../../ui/TextArea'
import TextField from '../../ui/TextField'
import { InputMultipleChoice } from './QuestionForm'

interface CreateProps {
  usedFor: 'create'
}

interface UpdateProps {
  usedFor: 'update'
  oldMultipleChoice: InputMultipleChoice
}

interface Props {
  isLoading?: boolean
  otherProps?: CreateProps | UpdateProps
  onSubmit: (multipleChoice: InputMultipleChoice) => void
  onClose?: () => void
}
export default function MultipleChoiceForm({
  onSubmit,
  isLoading,
  onClose,
  otherProps,
}: Props) {
  const [multipleChoice, setMultipleChoice] = useState<InputMultipleChoice>(
    otherProps && otherProps.usedFor === 'update'
      ? otherProps.oldMultipleChoice
      : {
          type: QuestionType.MULTIPLE_CHOICE,
          answers: [],
          choices: [],
          content: '',
        },
  )

  const getButtonText = () => {
    if (isLoading)
      return otherProps?.usedFor === 'update' ? 'Updating...' : 'Creating...'
    return otherProps?.usedFor === 'update' ? 'Update' : 'Create'
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMultipleChoice((prevData) => {
      return { ...prevData, [`${e.target.name}`]: e.target.value }
    })
  }

  const handleChoiceChange = (choiceContent: string, choiceNum: number) => {
    setMultipleChoice((prevOne) => {
      let newChoices: string[] = []
      if (prevOne.type === QuestionType.MULTIPLE_CHOICE) {
        newChoices = prevOne.choices ? [...prevOne.choices] : []
        newChoices[choiceNum - 1] = choiceContent
      }

      return {
        ...prevOne,
        choices: newChoices,
      }
    })
  }

  const handleChooseAnswer = (answer: string) => {
    if (!answer) return
    setMultipleChoice((prevOne) => {
      if (prevOne.answers.includes(answer)) {
        return {
          ...prevOne,
          answers: prevOne.answers.filter((a) => a !== answer),
        }
      }
      return { ...prevOne, answers: [...prevOne.answers, answer] }
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(multipleChoice)
  }
  const isDisabledBtn = () => {
    const noContent =
      !multipleChoice.content || multipleChoice.content.trim().length === 0

    if (noContent) return true

    const noChoices =
      !multipleChoice.choices ||
      multipleChoice.choices.length !== 4 ||
      multipleChoice.choices.some((c) => c.trim().length === 0)

    if (noChoices) return true

    const hasAtLeastOneAnswer = multipleChoice.answers.length >= 1

    if (!hasAtLeastOneAnswer) return true

    return false
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextArea
        textLabelColor="text-text-light dark:text-text-dark"
        textInputColor="text-text-light dark:text-text-dark"
        bgInputColor="bg-white dark:bg-card-dark"
        label="Question"
        width="w-full"
        name="content"
        value={multipleChoice.content}
        onChange={(e) => handleChange(e)}
      />

      <div className="flex items-end gap-4 my-4">
        <TextField
          textLabelColor="text-text-light dark:text-text-dark"
          textInputColor="text-text-light dark:text-text-dark"
          bgInputColor="bg-white dark:bg-card-dark"
          label="Choice 1"
          width="w-full"
          value={multipleChoice.choices && multipleChoice.choices[0]}
          onChange={(e) => handleChoiceChange(e.target.value, 1)}
        />
        <button
          onClick={() => {
            handleChooseAnswer(multipleChoice.choices[0])
          }}
          type="button"
          className={`flex items-center justify-center p-1 ${
            multipleChoice.answers.includes(multipleChoice.choices[0])
              ? 'bg-green-200 dark:bg-green-600'
              : 'bg-gray-200 dark:bg-gray-600'
          }  rounded-sm`}
        >
          <TiTick
            className={`w-7 h-7 ${
              multipleChoice.answers.includes(multipleChoice.choices[0])
                ? 'text-green-600  dark:text-green-200'
                : 'text-gray-600  dark:text-gray-200'
            }  `}
          />
        </button>
      </div>
      <div className="flex items-end gap-4 mb-4">
        <TextField
          textLabelColor="text-text-light dark:text-text-dark"
          textInputColor="text-text-light dark:text-text-dark"
          bgInputColor="bg-white dark:bg-card-dark"
          label="Choice 2"
          width="w-full"
          value={multipleChoice.choices && multipleChoice.choices[1]}
          onChange={(e) => handleChoiceChange(e.target.value, 2)}
        />
        <button
          onClick={() => {
            handleChooseAnswer(multipleChoice.choices[1])
          }}
          type="button"
          className={`flex items-center justify-center p-1 ${
            multipleChoice.answers.includes(multipleChoice.choices[1])
              ? 'bg-green-200 dark:bg-green-600'
              : 'bg-gray-200 dark:bg-gray-600'
          }  rounded-sm`}
        >
          <TiTick
            className={`w-7 h-7 ${
              multipleChoice.answers.includes(multipleChoice.choices[1])
                ? 'text-green-600  dark:text-green-200'
                : 'text-gray-600  dark:text-gray-200'
            }  `}
          />
        </button>
      </div>
      <div className="flex items-end gap-4 mb-4">
        <TextField
          textLabelColor="text-text-light dark:text-text-dark"
          textInputColor="text-text-light dark:text-text-dark"
          bgInputColor="bg-white dark:bg-card-dark"
          label="Choice 3"
          width="w-full"
          value={multipleChoice.choices && multipleChoice.choices[2]}
          onChange={(e) => handleChoiceChange(e.target.value, 3)}
        />
        <button
          onClick={() => {
            handleChooseAnswer(multipleChoice.choices[2])
          }}
          type="button"
          className={`flex items-center justify-center p-1 ${
            multipleChoice.answers.includes(multipleChoice.choices[2])
              ? 'bg-green-200 dark:bg-green-600'
              : 'bg-gray-200 dark:bg-gray-600'
          }  rounded-sm`}
        >
          <TiTick
            className={`w-7 h-7 ${
              multipleChoice.answers.includes(multipleChoice.choices[2])
                ? 'text-green-600  dark:text-green-200'
                : 'text-gray-600  dark:text-gray-200'
            }  `}
          />
        </button>
      </div>
      <div className="flex items-end gap-4 mb-4">
        <TextField
          textLabelColor="text-text-light dark:text-text-dark"
          textInputColor="text-text-light dark:text-text-dark"
          bgInputColor="bg-white dark:bg-card-dark"
          label="Choice 4"
          width="w-full"
          value={multipleChoice.choices && multipleChoice.choices[3]}
          onChange={(e) => handleChoiceChange(e.target.value, 4)}
        />
        <button
          onClick={() => {
            handleChooseAnswer(multipleChoice.choices[3])
          }}
          type="button"
          className={`flex items-center justify-center p-1 ${
            multipleChoice.answers.includes(multipleChoice.choices[3])
              ? 'bg-green-200 dark:bg-green-600'
              : 'bg-gray-200 dark:bg-gray-600'
          }  rounded-sm`}
        >
          <TiTick
            className={`w-7 h-7 ${
              multipleChoice.answers.includes(multipleChoice.choices[3])
                ? 'text-green-600  dark:text-green-200'
                : 'text-gray-600  dark:text-gray-200'
            }  `}
          />
        </button>
      </div>

      <div className="flex items-center justify-end gap-4 mt-5 ">
        <Button
          onClick={onClose}
          backgroundColor="bg-gray-100 dark:bg-primary-dark"
          textColor="text-primary-dark dark:text-primary-light"
        >
          Cancel
        </Button>
        <Button
          disabled={isDisabledBtn() || isLoading}
          type="submit"
          disabledBgColor="disabled:opacity-40"
        >
          {getButtonText()}
        </Button>
      </div>
    </form>
  )
}
