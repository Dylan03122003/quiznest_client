import Heading from '@tiptap/extension-heading'
import { Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

export default function TestComponent() {
  const [content, setContent] = useState('')

  return (
    <div>
      <Tiptap content={content} onChange={(richText) => setContent(richText)} />
    </div>
  )
}

interface TiptapProps {
  content: string
  onChange: (richText: string) => void
}

function Tiptap({ content, onChange }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: 'text-3xl font-bold',
          levels: [2],
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'rounded-md border border-solid border-gray-400 h-[200px]',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
      console.log('editor.getHTML(): ', editor.getHTML())
    },
  })
  return (
    <div>
      <Toolbar editor={editor} />
    </div>
  )
}

interface ToolbarProps {
  editor: Editor | null
}

function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null
  return (
    <div>
      <button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }}
      >
        H2
      </button>
    </div>
  )
}
