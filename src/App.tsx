import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import News from './components/news/News'
import Home from './components/home/Home'
import Current from './components/graphs/currentPrices/Current'
import Predictions from './components/graphs/predictions/Predictions'

function App() {


  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        //dark: '#002884',
        dark: '#002D62',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  return (

    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/graphs/current" element={<Current />} />
        <Route path="/graphs/predictions" element={<Predictions />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
