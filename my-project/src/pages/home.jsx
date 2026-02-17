import React, { useContext } from 'react'
import { NoteContext } from '../context.api/noteContex.jsx'
import NoteCard from '../components/notecard.jsx'

function Home() {

  const {notes, loading} = useContext(NoteContext)
  console.log(notes)

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-xl text-gray-700">Loading notes...</p>
    </div>
  }

  if (!Array.isArray(notes) || notes.length === 0) {
    return <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
      <div className="text-center">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-2xl font-bold text-white mb-2">No notes yet!</p>
        <p className="text-lg text-gray-300 mb-6">Create your first note to get started</p>
        <a href="/create" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          ✍️ Create Note
        </a>
      </div>
    </div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  )
}
  
export default Home