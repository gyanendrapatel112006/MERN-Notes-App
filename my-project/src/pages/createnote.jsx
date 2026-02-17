import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NoteContext } from '../context.api/noteContex.jsx'

const Createnote = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { createNote } = useContext(NoteContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createNote({ title, content })
      setTitle('')
      setContent('')
      navigate('/')
    } catch (error) {
      console.error('Error creating note:', error)
      alert('Error creating note')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Note</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-emerald-600 text-black px-6 py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Note'}
        </button>
      </form>
    </div>
  )
}

export default Createnote