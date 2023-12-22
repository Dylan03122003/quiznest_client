import Skeloton from '../../components/ui/Skeloton'

export default function DeckDetailLoading() {
  return (
    <div className="h-full w-full md:w-[700px] lg:w-[900px] mx-auto">
      <div className="h-[34px] flex items-center justify-between">
        <Skeloton width="w-[100px]" height="h-full" />
        <Skeloton width="w-[222px]" height="h-full" />
      </div>

      <Skeloton width="w-full" height="h-[500px]" className="mt-5" />

      <Skeloton width="w-full" height="h-[40px]" className="mt-5" />

      <Skeloton width="w-[250px]" height="h-[28px]" className="mt-40 mb-10" />

      <Skeloton width="w-full" height="h-[64px]" className="mb-5" />

      <Skeloton width="w-full" height="h-[64px]" className="mb-5" />

      <Skeloton width="w-full" height="h-[64px]" className="mb-5" />
    </div>
  )
}
