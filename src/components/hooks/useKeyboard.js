import { useState, useEffect } from "react"

//* definiendo las funciones de algunas keys del teclado
const KEYBOARD_MAP = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
    Digit1: 'dirt',
    Digit2: 'grass',
    Digit3: 'glass',
    Digit4: 'wood',
    digit5: 'log',
    ShiftLeft: 'accelerate'
}

/**
 * useState for define the initial state of any action
 * useEffect to Toggle true/false the actions mapped 
 * @returns mapped actions like movement, jump, place cubes.
 */
export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt: false,
        grass: false,
        glass: false,
        wood: false,
        log: false,
        accelerate: false,
    })

    useEffect(() => {
        // if (actions[action]) return
        const handleKeyDown = event => {
            const { code } = event
            const action = KEYBOARD_MAP[code]
            console.log(code)
            
            if(action) {
                setActions(prevActions => ({
                    ...prevActions,
                    [action]: true
                }))
            }
        }

        const handleKeyUp = event => {
            const { code } = event
            const action = KEYBOARD_MAP[code]
            
            if(action) {
                setActions(prevActions => ({
                    ...prevActions,
                    [action]: false
                }))
            }
        }
        // uso de javaScript para leer cuando las teclas de presionan y se sueltan.
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        // Removemos la pulsación de las teclas para que no siga aplicando el efecto
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return actions
}
