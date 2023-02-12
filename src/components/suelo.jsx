import { usePlane } from "@react-three/cannon";
import { woodTexture } from "../images/textures";
import { useStore } from "./hooks/useStore.js";

export function Ground() {

    // Usamos un modelo plano para el suelo

    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2,0,0],
        position: [0,4.5,0],
    }))

    /**
     * extraemos del useStore, el método addCube
     */
    const [addCube] = useStore(state => [state.addCube])
    woodTexture.repeat.set(1000, 1000)

    /**
     * Función que coloca los cubos en la posición donde está ocurriedo el evento
     * @param {event} event Evento definido desde el <mesh />, en este caso recibe onClick
     */
    const handleClickGround = event => {
        // Detenemos la propagación del evento para que no sobrepase las texturas
        event.stopPropagation()

        //! Como Vector3 es un Objeto, usamos Object.values para poder leer el evento y extraemos el evento del puntero
        const [x, y, z] = Object.values(event.point)
            .map(n => Math.ceil(n)) //* Hacemos un map con el Cubo de valor 'n' y que se coloce en la posición redondeada hacia arriba para que se ajuste a la cuadricula

        //? Ejecutamos el método addCube( con las coordenadas x,y,z )
        addCube(x, y, z)
    }

    return (
        <mesh 
            onClick={handleClickGround}
            ref={ref}
        >
            <planeGeometry attach="geometry" args={[1000, 1000]}/>
            <meshStandardMaterial attach='material' map={woodTexture}/>
        </mesh>
    )
}