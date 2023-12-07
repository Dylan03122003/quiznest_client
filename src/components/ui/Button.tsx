import React from 'react'

interface ButtonProps {
  // Styles
  backgroundColor?: string
  hoverColor?: string
  textColor?: string
  rounded?: string
  paddingY?: string
  paddingX?: string
  disabledBgColor?: string
  width?: string
  borderColor?: string
  my?: string
  mt?: string
  isSecondaryBtn?: boolean
  // Other properties
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}

const Button = ({
  borderColor = 'border-transparent',
  backgroundColor = 'bg-[#334155] dark:bg-[#0EA5E9]',
  textColor = 'text-white',
  hoverColor = '',
  rounded = 'rounded-md',
  disabledBgColor = 'disabled:bg-gray-300',
  paddingX = 'px-4',
  paddingY = 'py-1',
  width,
  type = 'button',
  mt = '',
  my = '',
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`font-medium border border-solid ${borderColor}  ${width} ${backgroundColor} ${paddingY} ${paddingX} ${textColor} ${rounded} ${hoverColor} ${disabledBgColor} ${mt} ${my}`}
    >
      {children}
    </button>
  )
}

export default Button
