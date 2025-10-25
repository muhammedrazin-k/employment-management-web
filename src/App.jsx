import { useState } from 'react'

import './App.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <>
      <div>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
        
      </div>
      
    </>
  )
}

export default App
