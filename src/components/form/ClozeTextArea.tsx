import { ChangeEvent, useState } from 'react'
import { replaceWord } from '../../util/replaceWord'

interface ClozeTextAreaProps {
  // Styles
  borderColor?: string
  borderErrorColor?: string
  rounded?: string
  textInputColor?: string
  textLabelColor?: string
  textErrorColor?: string
  width?: string
  bgInputColor?: string
  //Other properties
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onMouseUp?: (selectedText: string) => void
  onGetClozeCard: (content: string, answers: string[]) => void
  placeholder?: string
  value?: string
  emptyErrorMessage?: string
  label: string
  name?: string
}

const ClozeTextArea = ({
  borderColor = 'border-gray-500',
  rounded = 'rounded-sm',
  textInputColor = 'text-gray-700',
  textLabelColor = 'text-gray-600',
  textErrorColor = 'text-red-400',
  borderErrorColor = 'border-red-400',
  bgInputColor = '',
  onChange,
  onGetClozeCard,
  placeholder,
  name,
  value = '',
  emptyErrorMessage = "Can't be empty",
  label,
  width = 'w-[300px]',
}: ClozeTextAreaProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false)
  const [text, setText] = useState<string>(value)
  //   const [selectedText, setSelectedText] = useState<string>()
  const [answers, setAnswers] = useState<string[]>([])

  function handleAutoResize(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = `70px`
    const scHeight = event.target.scrollHeight
    event.target.style.height = `${scHeight}px`
    onChange && onChange(event)
    onGetClozeCard && onGetClozeCard(text, answers)
    setIsTouched(true)
    setText(event.target.value)
  }
  //   const handleTextSelect = () => {
  //     const selection = window.getSelection()
  //     const selectedContent = selection?.toString()
  //     if (selectedContent?.trim()) {
  //       setSelectedText(selectedContent)
  //     }
  //   }

  const handleCloze = () => {
    const selection = window.getSelection()
    const selectedContent = selection?.toString()
    if (selectedContent) {
      const newAnswers = [...answers, selectedContent.trim()]
      setAnswers(newAnswers)
      const replacedText = replaceWord(text.trim(), selectedContent.trim())
      setText(replacedText)
      onGetClozeCard && onGetClozeCard(replacedText, newAnswers)
    }
  }

  function hasError() {
    return isTouched && text?.trim() === ''
  }

  return (
    <div className={`${width}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor="textarea"
          className={`${
            hasError() ? `${textErrorColor}` : `${textLabelColor}`
          } `}
        >
          {label}
        </label>
        <button onClick={handleCloze} type="button">
          Cloze
        </button>
      </div>
      <textarea
        value={text}
        id="textarea"
        name={name}
        onChange={(e) => handleAutoResize(e)}
        // onMouseUp={handleTextSelect}
        placeholder={placeholder}
        className={`border border-solid w-full p-2 mt-2 outline-none ${bgInputColor} ${rounded} ${textInputColor} ${
          hasError() ? `${borderErrorColor}` : `${borderColor}`
        }`}
      ></textarea>

      <p className={`mt-2 ${textErrorColor} h-[24px]`}>
        {hasError() ? emptyErrorMessage : ''}
      </p>
    </div>
  )
}

export default ClozeTextArea
