// Nuestro lienzo de three

// Físicas
import './index.css'
import Game from './game/game'
import { Route, Routes } from 'react-router'
import Home from './components/menu'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </>
  )
}

export default App
