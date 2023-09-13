import React, { useState } from 'react'

interface ModernEmailFieldProps {
  // STYLES
  width?: string
  px?: string
  py?: string
  textErrorColor?: string
  textLabelColor?: string
  borderErrorColor?: string
  borderColor?: string
  rounded?: string
  textInputColor?: string
  bgColorInput?: string
  //OTHERS
  label?: string
  value?: string
  name?: string
  emptyErrorMessage?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ModernEmailField = ({
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
  px = 'px-2',
  py = 'py-1',
  bgColorInput,
}: ModernEmailFieldProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [email, setEmail] = useState<string>(value)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event)
    setIsTouched(true)
    setEmail(event.target.value)
  }

  function hasError() {
    return isTouched && email?.trim() === ''
  }

  function inputClassName() {
    return ` border border-solid ${label ? 'mt-2' : ''} ${px} ${py} ${
      hasError()
        ? `${borderErrorColor}`
        : `${isActive ? 'border-blue-500' : `${borderColor}`} `
    }  ${rounded}  ${bgColorInput}`
  }

  return (
    <div className={`${width}`}>
      <label
        className={`${hasError() ? `${textErrorColor}` : `${textLabelColor}`} `}
        htmlFor="email"
      >
        {label}
      </label>
      <div
        className={`relative flex items-center justify-center ${inputClassName()}`}
      >
        <input
          value={email}
          id="email"
          type="email"
          name={name}
          onChange={handleChange}
          className={`w-full outline-none ${bgColorInput} ${textInputColor}`}
          onFocus={() => setIsActive(true)}
        />
        <div
          className={`absolute ${
            isActive
              ? '-top-[25%] bg-white text-blue-500 text-sm'
              : 'top-[50%] -translate-y-[50%] text-gray-500 text-base'
          } left-4  transition-all ease-in-out`}
        >
          Email
        </div>
        <p
          className={`text-xl  font-medium ${
            isActive ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          @
        </p>
      </div>
      <p className={`mt-2 ${textErrorColor} h-[24px]`}>
        {hasError() ? emptyErrorMessage : ''}
      </p>
    </div>
  )
}

export default ModernEmailField
