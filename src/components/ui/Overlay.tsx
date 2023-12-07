interface Props {
  onClose: (e: React.MouseEvent) => void
  className?: string
}

export default function Overlay({ onClose, className }: Props) {
  return (
    <div
      className={`z-10 fixed inset-0 cursor-auto ${className}`}
      onClick={(e) => onClose(e)}
    ></div>
  )
}
