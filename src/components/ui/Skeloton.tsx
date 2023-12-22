import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  width?: string
  height?: string
  className?: string
}

export default function Skeloton({
  width = 'w-[100px]',
  height = 'h-[100px]',
  className,
}: Props) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-slate-800 ${width} ${height} ${className}`}
    ></div>
  )
}
