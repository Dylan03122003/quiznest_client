import Button from './Button'
import Modal from './Modal'

interface Props {
  deletedID: string
  title?: string
  description?: string
  onClose: () => void
  onDelete: (deletedID: string) => void
}
export default function ConfirmModal({
  onClose,
  onDelete,
  deletedID,
  title = 'Delete this?',
  description,
}: Props) {
  return (
    <Modal className="w-full sm:w-[600px]" onClose={onClose}>
      <div className="bg-card-light dark:bg-card-dark rounded-md">
        <h2 className="p-6 text-xl border-b-[1px] border-gray-400 border-solid font-semibold text-title-light dark:text-title-dark mb-2">
          {title}
        </h2>
        <div className="p-6">
          <p className="text-text-light dark:text-text-dark font-medium mb-5">
            {description}
          </p>
          <div className="flex items-center justify-end gap-4">
            <Button
              backgroundColor="bg-gray-600"
              textColor="text-white"
              hoverColor="hover:bg-gray-500"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              backgroundColor="bg-red-500"
              textColor="text-white"
              hoverColor="hover:bg-red-400"
              type="button"
              onClick={() => onDelete(deletedID)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
