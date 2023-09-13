import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
type ModalProps = {
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const dropIn = {
  hidden: {
    y: '0',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '0',
    opacity: 0,
  },
}

const Modal = ({ onClose, children, className }: ModalProps) => {
  return (
    <Backdrop onClick={onClose}>
      <motion.div
        className={`w-[500px] h-[300px] bg-white rounded-md p-5 ${className}`}
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </Backdrop>
  )
}

export default Modal
