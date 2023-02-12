// Nuestro lienzo de three
import {Canvas} from '@react-three/fiber'
import { Sky } from '@react-three/drei'

// Físicas
import { Physics } from '@react-three/cannon'

import { Ground } from './components/suelo'
import { Fpv } from './components/Fpv'
import { Cubes } from './components/Cubes'
import { Player } from './components/Jugador'
import './index.css'

function App() {
  return (
    <>
      <Canvas>
          <Sky sunPosition={[1250,100,20]}/>
          <ambientLight intensity={0.7}/>
          <Fpv />
          <Physics>
            <Player/>
            <Cubes/>
            <Ground/>
          </Physics>
      </Canvas>
      <div className='pointer'>+</div>
    </>
  )
}

export default App
