import { getAcronymName } from '../../util/getAcronymName'

interface Props {
  name: string
  onOpenUserMenu?: () => void
  width?: string
  height?: string
  textSize?: string
}
const DefaultUserPhoto = ({
  name,
  onOpenUserMenu,
  width = 'w-[40px]',
  height = 'h-[40px]',
  textSize = 'text-base',
}: Props) => {
  return (
    <div
      onClick={onOpenUserMenu}
      className={`${width} ${height}  flex items-center justify-center rounded-full bg-card-dark dark:bg-card-light text-white dark:text-primary-dark cursor-pointer`}
    >
      <p className={`font-semibold ${textSize}`}>{getAcronymName(name)}</p>
    </div>
  )
}

export default DefaultUserPhoto
