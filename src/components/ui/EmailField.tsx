import React, { useState } from 'react'

interface EmailFieldProps {
  // STYLES
  width?: string
  textErrorColor?: string
  textLabelColor?: string
  borderErrorColor?: string
  borderColor?: string
  rounded?: string
  textInputColor?: string
  //OTHERS
  label: string
  value?: string
  name?: string
  emptyErrorMessage?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const EmailField = ({
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
}: EmailFieldProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false)
  const [email, setEmail] = useState<string>(value)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event)
    setIsTouched(true)
    setEmail(event.target.value)
  }

  function hasError() {
    return isTouched && email?.trim() === ''
  }

  return (
    <div className={`${width}`}>
      <label
        className={`${hasError() ? `${textErrorColor}` : `${textLabelColor}`} `}
        htmlFor="email"
      >
        {label}
      </label>
      <input
        value={email}
        id="email"
        type="email"
        name={name}
        onChange={handleChange}
        className={`px-2 py-1 mt-2 outline-none border border-solid ${
          hasError() ? `${borderErrorColor}` : `${borderColor}`
        }  ${rounded} ${textInputColor}  w-full`}
      />
      <p className={`mt-2 ${textErrorColor} h-[24px]`}>
        {hasError() ? emptyErrorMessage : ''}
      </p>
    </div>
  )
}

export default EmailField
