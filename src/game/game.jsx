import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Cubes } from '../components/Cubes'
import { Fpv } from '../components/Fpv'
import { Player } from '../components/Jugador'
import { Ground } from '../components/suelo'

export default function Game() {
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
