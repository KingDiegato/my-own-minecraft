import { nanoid } from 'nanoid'
import {create} from 'zustand'

//? Es un Store que nos permite realizar distintas funciones con los eventos dentro del canvas, agnóstico a librerías

export const useStore = create(set => ({
    texture: 'grass',
    cubes: [{
        id: nanoid(),
        pos: [6, 6, 1],
        texture: 'log',
    },
    ],
    addCube: (x, y, z) => {
        set(state => ({
            cubes: [...state.cubes, {
                id: nanoid(),
                texture: state.texture,
                pos: [ x, y, z ]
            }]
        }))
    },
    removeCube: () => {},
    setTexture: () => {},
}))
