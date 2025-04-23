import React from 'react'
import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import { Dashboard } from './Components/Dashboard'
import {LoginPage} from './Components/LoginPage'
import { Header } from './Components/Header'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
