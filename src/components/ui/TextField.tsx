import React, { useState } from 'react'

interface TextFieldProps {
  // STYLES
  width?: string
  textErrorColor?: string
  textLabelColor?: string
  fontLabel?: string
  borderErrorColor?: string
  borderColor?: string
  rounded?: string
  textInputColor?: string
  borderFocusColor?: string
  bgInputColor?: string
  borderSize?: string
  mb?: string
  //OTHERS
  label: string
  value?: string
  name?: string
  emptyErrorMessage?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isSubmited?: boolean
}

const TextField = ({
  isSubmited = false,
  label,
  onChange,
  value = '',
  name,
  emptyErrorMessage = "Can't be empty",
  textErrorColor = 'text-red-400',
  textLabelColor = 'text-gray-600',
  borderErrorColor = 'border-red-400',
  borderColor = 'border-gray-500',
  rounded = 'rounded-sm',
  textInputColor = 'text-gray-700',
  width = 'w-[300px]',
  borderFocusColor = 'focus:border-blue-500',
  fontLabel = '',
  bgInputColor = 'bg-white',
  borderSize = 'border',
  mb,
}: TextFieldProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false)
  const [text, setText] = useState<string>(value)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event)
    setIsTouched(true)
    setText(event.target.value)
  }

  function hasError() {
    return isTouched && text?.trim() === ''
  }

  return (
    <div className={`${width} ${mb}`}>
      <label
        className={`${
          hasError() ? `${textErrorColor}` : `${textLabelColor} `
        } ${fontLabel}`}
        htmlFor="text"
      >
        {label}
      </label>
      <input
        value={isSubmited ? '' : text}
        id="text"
        type="text"
        name={name}
        onChange={handleChange}
        className={`px-2 py-1 mt-2 outline-none ${borderSize} border-solid ${bgInputColor} ${
          hasError()
            ? `${borderErrorColor}`
            : `${borderColor} ${borderFocusColor}`
        }  ${rounded} ${textInputColor}   w-full`}
      />
      {hasError() && (
        <p className={`mt-2 ${textErrorColor} h-[24px]`}>
          {hasError() ? emptyErrorMessage : ''}
        </p>
      )}
    </div>
  )
}

export default TextField
