import { ChangeEvent, useState } from 'react'

interface TextAreaProps {
  // Styles
  borderColor?: string
  borderErrorColor?: string
  rounded?: string
  textInputColor?: string
  textLabelColor?: string
  textErrorColor?: string
  width?: string
  bgInputColor?: string
  mb?: string
  //Other properties
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onMouseUp?: (selectedText: string) => void
  placeholder?: string
  value?: string
  emptyErrorMessage?: string
  label: string
  name?: string
  maxHeight?: number
}

const TextArea = ({
  borderColor = 'border-gray-500',
  rounded = 'rounded-sm',
  textInputColor = 'text-gray-700',
  textLabelColor = 'text-gray-600',
  textErrorColor = 'text-red-400',
  borderErrorColor = 'border-red-400',
  mb,
  bgInputColor = '',
  onChange,
  onMouseUp,
  placeholder,
  name,
  value = '',
  emptyErrorMessage = "Can't be empty",
  label,
  width = 'w-[300px]',
  maxHeight = 200,
}: TextAreaProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false)
  const [text, setText] = useState<string>(value)

  function handleAutoResize(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = `70px`
    let scHeight = event.target.scrollHeight
    if (scHeight >= maxHeight) {
      scHeight = maxHeight
    }
    event.target.style.height = `${scHeight}px`
    onChange && onChange(event)
    setIsTouched(true)
    setText(event.target.value)
  }
  const handleTextSelect = () => {
    const selection = window.getSelection()
    const selectedContent = selection?.toString()
    if (selectedContent?.trim()) {
      onMouseUp && onMouseUp(selectedContent)
    }
  }
  function hasError() {
    return isTouched && text?.trim() === ''
  }

  return (
    <div className={`${width} ${mb} `}>
      <label
        htmlFor="textarea"
        className={`${hasError() ? `${textErrorColor}` : `${textLabelColor}`} `}
      >
        {label}
      </label>
      <textarea
        value={value} // I hope this works
        id="textarea"
        name={name}
        onChange={(e) => handleAutoResize(e)}
        onMouseUp={handleTextSelect}
        placeholder={placeholder}
        className={`border border-solid w-full p-2 mt-2 outline-none  ${bgInputColor} ${rounded} ${textInputColor} ${
          hasError() ? `${borderErrorColor}` : `${borderColor}`
        }`}
      ></textarea>

      {hasError() && (
        <p className={`mt-2 ${textErrorColor} h-[24px]`}>{emptyErrorMessage}</p>
      )}
    </div>
  )
}

export default TextArea
