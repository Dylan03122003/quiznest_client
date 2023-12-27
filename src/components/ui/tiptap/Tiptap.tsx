import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FormEvent, useState } from 'react'
import Button from '../Button'
import MenuBar from './MenuBar'
import './Tiptap.css'

interface TiptapProps {
  isLoading?: boolean
  className?: string
  editorWidth?: string
  editorHeight?: string
  label?: string
  submitText?: string
  isOptional?: boolean
  content?: string
  onSubmit?: (html: string) => void
  onCancel?: () => void
}

export default function Tiptap({
  className,
  editorWidth = 'w-full',
  editorHeight = 'min-h-[500px]',
  label = 'Enter something',
  submitText = 'Submit',
  content = '',
  isOptional = false,
  isLoading = false,
  onSubmit,
  onCancel,
}: TiptapProps) {
  const [html, setHTML] = useState(content)
  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    autofocus: true,
    content: content,
    editorProps: {
      attributes: {
        class: `${editorWidth} ${editorHeight} overflow-y-scroll w-full rounded-md border-[1px] border-solid border-gray-400 focus:border-blue-600 outline-none p-4 ${className}`,
      },
    },
    onUpdate({ editor }) {
      setHTML(editor.getHTML())
    },
  })
  const isEmpty = () => {
    return editor ? !editor.state.doc.textContent.trim().length : true
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit && onSubmit(html)
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <MenuBar editor={editor} />
      <p className="text-text-light dark:text-text-dark mb-2">{label}</p>
      <EditorContent className={'tiptap'} editor={editor} />
      <div className="flex items-center justify-end mt-4 gap-4">
        <Button
          onClick={onCancel}
          backgroundColor="bg-gray-100 dark:bg-primary-dark"
          textColor="text-primary-dark dark:text-primary-light"
        >
          Cancel
        </Button>
        <Button
          disabled={isOptional ? false : isEmpty() || isLoading}
          type="submit"
          disabledBgColor="disabled:opacity-40"
        >
          {submitText}
        </Button>
      </div>
    </form>
  )
}
