import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

interface SelectFieldProps {
  // Styles
  width?: string
  borderColor?: string
  rounded?: string
  textLabelColor?: string
  marginBottom?: string
  fontLabel?: string
  selectedTagTextColor?: string
  optionTextColor?: string
  optionHoverColor?: string
  menuBgColor?: string
  // Other properties
  onChange?: (tag: string) => void
  value?: string
  options: string[]
  label?: string
}

const SelectField = ({
  fontLabel = '',
  borderColor = 'border-gray-500',
  rounded = 'rounded-sm',
  textLabelColor = 'text-gray-600',
  marginBottom,
  width = 'w-[300px]',
  selectedTagTextColor = 'text-gray-600',
  optionTextColor = 'text-gray-600',
  menuBgColor = 'bg-white',
  optionHoverColor = 'hover:bg-gray-100',
  onChange,
  value = '',
  options,
  label = 'Select',
}: SelectFieldProps) => {
  const [open, setOpen] = useState(false)

  function handleTagChange(option: string) {
    onChange && onChange(option)
    setOpen(false)
  }

  return (
    <div className={`${width} ${marginBottom} relative `}>
      <p className={`mb-2 ${textLabelColor} ${fontLabel}`}>{label}</p>
      <div
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        className={`flex items-center justify-between cursor-pointer px-2 py-1 border border-solid ${borderColor} ${rounded}`}
      >
        <p className={`${selectedTagTextColor}`}>{value}</p>
        <MdOutlineKeyboardArrowDown
          className={`h-6 w-6 text-gray-600 transition-all  ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={`${menuBgColor} z-10 absolute w-full p-2 rounded-sm border border-solid border-gray-300`}
          >
            {options.map((option, i) => (
              <div
                key={i}
                className={`p-2 cursor-pointer  rounded-sm ${optionHoverColor}`}
                onClick={() => handleTagChange(option)}
              >
                <p className={`${optionTextColor}`}>{option}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SelectField
