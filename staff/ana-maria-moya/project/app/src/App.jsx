import React from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Recurses from './pages/Recurses.jsx'
import Donate from './pages/Donate.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import logic from './logic'
import { useState, useEffect } from 'react'
import { errors } from 'com'
const { TypeError, RangeError, ContentError } = errors


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      try {
        logic.retrieveUser()
          .then(user => setUser(user))
          .catch(error => {
            console.error(error.message)

            let feedback = error.message

            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
              feedback = `${feedback}, please correct it`
            else if (error instanceof MatchError)
              feedback = `${feedback}, please verify user`
            else
              feedback = 'sorry, there was an error, please try again later'

            alert(feedback)

          })
      } catch (error) {
        console.error(error.message)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
          feedback = `${feedback}, please correct it`
        else
          feedback = 'sorry, there was an error, please try again later'

        alert(feedback)
      }
    }
  }, [logic.isUserLoggedIn()])

  const navigate = useNavigate()

  const handleLogout = () => {
    logic.logoutUser()

    setUser(null)

    navigate('/login')
  }

  const handleUserRegistered = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleLoginClick = () => navigate('/login')


  const handleRecursesClick = () => navigate('/recurses')

  const handleDonateClick = () => navigate('/donate')

  const handleGalleryClick = () => navigate('/gallery')

  const handleContactClick = () => navigate('/contact')

  console.debug('App render')
  return <>
    <header className=" flex justify-between items-center border-b-2 bg-emerald-700 border-white fixed top-0 w-full h-15 box-border">
      <div className='class= object-contain h-30 w-40 '>
        <img src="/src/assets/Logotipo_MSM_03.png" />
      </div>
      {!user && (
        <>
          <button className="px-3 text-white" onClick={handleRegisterClick}>Register</button>
          <button className="px-3 text-white" onClick={handleLoginClick}>Login</button>
        </>
      )}

      {user && (
        <h1 className='text-white'>Hello, {user.name}!</h1>
      )}

      <button className="px-3 text-white" onClick={handleRecursesClick}>Recursos</button>
      <button className="px-3 text-white" onClick={handleDonateClick}>Donaciones</button>
      <button className="px-3 text-white" onClick={handleGalleryClick}>Galería</button>
      <button className="px-3 text-white" onClick={handleContactClick}>Contacto</button>

      {user && (
        <button className="px-3" id="logout-button" onClick={handleLogout}>🚪</button>
      )}
    </header>
    <main >
    </main>
    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onUserLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onUserRegistered={() => handleUserRegistered()} onLoginClick={handleLoginClick} />} />
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery userRole={user?.role} onGalleryIn={handleGalleryClick} />} />
      <Route path="/recurses" element={<Recurses onRecursesIn={handleRecursesClick} />} />
      <Route path="/donate" element={<Donate onRecursesIn={handleDonateClick} />} />
      <Route path="/contact" element={<Contact onContactIn={handleContactClick} />} />

    </Routes>
    <footer className="flex justify-center items-center border-t-2 bg-emerald-700 border-black fixed bottom-0 w-full  h-12 px-2 box-border align-end">


    </footer>
  </>
}

export default App

