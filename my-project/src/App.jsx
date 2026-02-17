import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import Createnote from './pages/createnote'
import { Routes, Route } from 'react-router-dom'  


const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-white">
      {/* Navbar */}
      <Navbar/>
      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Createnote />} />
        </Routes>
      </main>
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default App