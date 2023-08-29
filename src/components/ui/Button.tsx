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
  // Other properties
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}

const Button = ({
  backgroundColor = 'bg-blue-500',
  textColor = 'text-blue-50',
  hoverColor = 'hover:bg-blue-400',
  rounded = 'rounded-sm',
  disabledBgColor = 'disabled:bg-gray-300',
  paddingX = 'px-4',
  paddingY = 'py-1',
  width,
  type = 'button',
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${width} ${backgroundColor} ${paddingY} ${paddingX} ${textColor} ${rounded} ${hoverColor} ${disabledBgColor}`}
    >
      {children}
    </button>
  )
}

export default Button
