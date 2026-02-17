import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  
  return (
    <nav className={`${isHome ? 'bg-emerald-600' : 'bg-gray-900'} text-white p-4 transition-colors duration-300`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
          📝 Notes App
        </Link>
        <div className="space-x-6 flex items-center">
          <Link 
            to="/" 
            className={`${isHome ? 'text-white font-semibold' : 'text-gray-300'} hover:text-white transition-colors`}
          >
            Home
          </Link>
          <Link 
            to="/create" 
            className={`${!isHome ? 'bg-blue-600 px-4 py-2 rounded-lg font-semibold' : 'text-white font-semibold'} hover:opacity-80 transition-opacity`}
          >
            ✍️ Create Note
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar