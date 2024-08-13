import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import News from './components/news'
import Layoults from './components/Layoult/Layoults'
import Navbar from './components/Header/Navbar'
import Home from './components/home'

function App() {


  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />

    </Routes>
   
  )
}

export default App
