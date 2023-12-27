import { Editor } from '@tiptap/react'
import { BsBlockquoteRight, BsTypeBold } from 'react-icons/bs'
import { IoCodeSlash } from 'react-icons/io5'
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuListOrdered,
} from 'react-icons/lu'
import { MdFormatItalic } from 'react-icons/md'
import { PiListBulletsBold } from 'react-icons/pi'
import { RiText } from 'react-icons/ri'

interface MenuBarProps {
  editor: Editor | null
}
export default function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null
  }

  const activeClass = 'bg-gray-200 dark:bg-slate-700'

  return (
    <div className="flex items-center flex-wrap gap-4 text-2xl p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${
          editor.isActive('bold') ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <BsTypeBold className="text-gray-800 dark:text-gray-200" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive('italic') ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <MdFormatItalic className="text-gray-800 dark:text-gray-200" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`${
          editor.isActive('code') ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <IoCodeSlash className="text-gray-800 dark:text-gray-200" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive('blockquote') ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <BsBlockquoteRight className="text-gray-800 dark:text-gray-200" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${
          editor.isActive('paragraph') ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <RiText className="text-gray-800 dark:text-gray-200" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${
          editor.isActive('heading', { level: 1 }) ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <LuHeading1 className="text-gray-800 dark:text-gray-200" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          editor.isActive('heading', { level: 2 }) ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <LuHeading2 className="text-gray-800 dark:text-gray-200" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive('heading', { level: 3 }) ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <LuHeading3 className="text-gray-800 dark:text-gray-200" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive('bulletList') ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <PiListBulletsBold className="text-gray-800 dark:text-gray-200" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive('orderedList') ? `${activeClass}` : ''
        } p-1 rounded-md`}
      >
        <LuListOrdered className="text-gray-800 dark:text-gray-200" />
      </button>
    </div>
  )
}
