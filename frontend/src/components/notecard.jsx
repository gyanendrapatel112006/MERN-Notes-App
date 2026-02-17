import React, { useContext, useState } from 'react'
import { NoteContext } from '../context.api/noteContex.jsx'

const NoteCard = ({ note }) => {
  const { deleteNote, updateNote } = useContext(NoteContext)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(note.title)
  const [editedContent, setEditedContent] = useState(note.content)

  const handleUpdate = () => {
    updateNote(note._id, { title: editedTitle, content: editedContent })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(note.title)
    setEditedContent(note.content)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note._id)
    }
  }

  const formatDate = (date) => {
    try {
      if (!date) return 'No date'
      const dateObj = typeof date === 'string' ? new Date(date.trim()) : new Date(date)
      
      if (isNaN(dateObj.getTime())) {
        return 'No date'
      }
      
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return 'No date'
    }
  }

  return (
    <div className={`${isEditing ? 'bg-white border-2 border-indigo-500' : 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-indigo-200'} rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300`}>
      {isEditing ? (
        <div className="space-y-2">
          <div className="bg-indigo-50 p-2 rounded border-l-4 border-indigo-500">
            <p className="text-xs text-indigo-600 font-semibold mb-2">Editing mode</p>
          </div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-2 py-1 text-sm text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Note title"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full px-2 py-1 text-sm text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
            placeholder="Note content"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs transition-colors font-semibold"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-md text-xs transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-1 truncate">{note.title}</h2>
          <p className="text-gray-700 mb-2 text-sm line-clamp-3">{note.content}</p>
          <div className="flex justify-between items-center pt-2 border-t border-indigo-200">
            <span className="text-xs text-gray-500">{formatDate(note.createdAt)}</span>
            <div className="flex gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors font-semibold"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteCard