import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  width?: string
  height?: string
  backgroundLight?: string
  backgroundDark?: string
  className?: string
}

export default function Skeloton({
  width = 'w-[100px]',
  height = 'h-[100px]',
  backgroundLight = 'bg-gray-200',
  backgroundDark = 'dark:bg-slate-800',
  className,
}: Props) {
  return (
    <div
      className={`animate-pulse ${backgroundLight}  ${backgroundDark} ${width} ${height} ${className}`}
    ></div>
  )
}
