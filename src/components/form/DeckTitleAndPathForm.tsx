import { FormEvent, useState } from 'react'
import { IoFolderOutline } from 'react-icons/io5'
import { useMutation, useQueryClient } from 'react-query'
import { QUERY_KEYS, createDeckAPI } from '../../api/deck'
import { useTokenQuery } from '../../react_query/auth.tanstack'
import { useChildDecksQuery } from '../../react_query/deck.tanstack'
import { Deck } from '../../types/deck.types'
import Button from '../ui/Button'
import Skeloton from '../ui/Skeloton'
import TextField from '../ui/TextField'
import { FormProcess } from './DeckForm'
interface DeckPath {
  pathName: string
  deckID: string | null
}

interface Props {
  onClose: () => void
  onSetProcess: (process: FormProcess) => void
  onGetCreatedDeckID: (createdDeckID: string) => void
}

const DeckTitleAndPathForm = ({
  onClose,
  onSetProcess,
  onGetCreatedDeckID,
}: Props) => {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState<string>('')
  const [deckPaths, setDeckPaths] = useState<DeckPath[]>([
    { pathName: 'All', deckID: null },
  ])
  const [parentDeckID, setParentDeckID] = useState<string | null>(null)

  const { data: token } = useTokenQuery()
  const { data, isLoading } = useChildDecksQuery(parentDeckID, token || '')

  const mutation = useMutation({
    mutationFn: createDeckAPI,

    onSuccess(data) {
      onGetCreatedDeckID(data.data.deckID)
      onSetProcess('CREATE_QUESTION')
      queryClient.invalidateQueries([QUERY_KEYS.DECKS])
      // TODO -> Show success toast
    },
  })

  const handleDeckPathChange = (path: DeckPath) => {
    const pathIndex = deckPaths.findIndex((p) => p.deckID === path.deckID)
    setDeckPaths(deckPaths.slice(0, pathIndex + 1))
    setParentDeckID(path.deckID)
  }

  const handleDeckSelected = (deck: Deck) => {
    setDeckPaths((prevPaths) => [
      ...prevPaths,
      { pathName: deck.title, deckID: deck.deckID },
    ])
    setParentDeckID(deck.deckID)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    mutation.mutate({ title, parentDeckID, token: token || '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl text-center font-semibold text-title-light dark:text-text-dark mb-2">
        Create new deck
      </h2>
      <TextField
        label="Title"
        width="w-full"
        textLabelColor="text-title-light dark:text-text-dark"
        bgInputColor="bg-white dark:bg-card-dark"
        emptyErrorMessage="Title can't be empty"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex items-center justify-start gap-4 my-4">
        <p className="text-text-light dark:text-text-dark font-medium">
          Save to
        </p>
        <div className="flex items-center justify-start gap-2">
          {deckPaths.map((path, index) => (
            <div
              key={index}
              className={`flex items-center justify-start gap-1 ${
                index === deckPaths.length - 1
                  ? 'text-text-light dark:text-text-dark font-medium'
                  : 'text-gray-400 dark:text-gray-600'
              } `}
            >
              <button
                className=""
                type="button"
                onClick={() => handleDeckPathChange(path)}
                key={index}
              >
                {path.pathName}
              </button>
              {index !== deckPaths.length - 1 && <p>/</p>}
            </div>
          ))}
        </div>
      </div>

      {isLoading && <DecksLoading />}
      {!isLoading && (
        <div className="h-[200px] overflow-y-auto ">
          {data &&
            data.data.map((deck) => (
              <div
                className="flex items-center justify-start gap-2 p-2 mb-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-sm"
                key={deck.deckID}
                onClick={() => handleDeckSelected(deck)}
              >
                <IoFolderOutline className="text-text-light dark:text-text-dark" />
                <p className="text-text-light dark:text-text-dark font-medium">
                  {deck.title}
                </p>
              </div>
            ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-14">
        <Button
          onClick={onClose}
          backgroundColor="bg-gray-100 dark:bg-primary-dark"
          textColor="text-primary-dark dark:text-primary-light"
        >
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
  )
}

export default DeckTitleAndPathForm

function DecksLoading() {
  return (
    <div className="h-[200px]">
      <Skeloton
        width="w-full"
        height="h-[40px]"
        className="mb-2 rounded-sm"
        backgroundDark="dark:bg-slate-700"
      />
      <Skeloton
        width="w-full"
        height="h-[40px]"
        className="mb-2 rounded-sm"
        backgroundDark="dark:bg-slate-700"
      />
      <Skeloton
        width="w-full"
        height="h-[40px]"
        className="mb-2 rounded-sm"
        backgroundDark="dark:bg-slate-700"
      />
      <Skeloton
        width="w-full"
        height="h-[40px]"
        className="mb-2 rounded-sm"
        backgroundDark="dark:bg-slate-700"
      />
    </div>
  )
}
