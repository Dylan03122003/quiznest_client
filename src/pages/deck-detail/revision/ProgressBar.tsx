interface Props {
  className?: string
  progress: number
}

export default function ProgressBar({ className, progress }: Props) {
  return (
    <>
      <div className={`${className}`}>
        <div
          style={{
            width: `${progress}%`,
          }}
          className={` h-full bg-blue-500 rounded-full`}
        ></div>
      </div>
    </>
  )
}
