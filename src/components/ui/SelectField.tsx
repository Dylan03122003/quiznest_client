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
  // Other properties
  onChange?: (tag: string) => void
  value?: string
  options: string[]
}

const SelectField = ({
  borderColor = 'border-gray-500',
  rounded = 'rounded-sm',
  textLabelColor = 'text-gray-600',
  marginBottom,
  width = 'w-[300px]',
  onChange,
  value = '',
  options,
}: SelectFieldProps) => {
  const [open, setOpen] = useState(false)

  function handleTagChange(option: string) {
    onChange && onChange(option)
    setOpen(false)
  }

  return (
    <div className={`${width} ${marginBottom} relative `}>
      <p className={`mb-2 ${textLabelColor}`}>Select</p>
      <div
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        className={`flex items-center justify-between cursor-pointer px-2 py-1 border border-solid ${borderColor} ${rounded}`}
      >
        <p>{value}</p>
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
            className=" bg-white absolute w-full p-2 rounded-sm border border-solid border-gray-300"
          >
            {options.map((option, i) => (
              <div
                key={i}
                className="p-2 cursor-pointer hover:bg-blue-50 rounded-sm"
                onClick={() => handleTagChange(option)}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SelectField
