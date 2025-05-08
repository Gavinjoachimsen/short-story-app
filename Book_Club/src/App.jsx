import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Routes, Route} from "react-router-dom"
import { Dashboard } from './Components/Dashboard'
import {LoginPage} from './Components/LoginPage'
import { Header } from './Components/Header'
import { CreateStory } from './Components/CreateStory'
import { MyStories } from './Components/MyStories'
import { ReadStory } from './Components/ReadStory'


function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/createStory/:id" element={<CreateStory/>}/>
        <Route path="/myStories/:id" element={<MyStories/>}/>
        <Route path="/readStory/:StoryId" element={<ReadStory/>}/>
        <Route path="/edit/:StoryId" element={<CreateStory/>}/>
      </Routes>
    </>
  )
}

export default App
