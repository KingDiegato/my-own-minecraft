import { useBox } from "@react-three/cannon";
import * as textures from '../images/textures.js'

/**
 * Función donde generamos los cubos usando cannon y con una textura de imagen plana
 * @param {Object} param0 {id, [x,y,z], texture: value<String>}
 * @returns un Cubo con la textura definida en los parámetros, en la posición que apuntamos y con un id generado por nanoid()
 */
export const Cube = ({id, position, texture}) => {

    // guardamos en un array de referencias el tipo de física que le afectará al cúbo {case<Static>}
    // y la posición, luego suscribimos el mesh con ref={ref} para pintarlos en el canvas
    const [ref] = useBox(()=> ({
        type: 'Static',
        position
    }))
    
    const activeTexture = textures[texture + 'Texture']
    return (
        <mesh ref={ref}>
            <boxGeometry attach='geometry'></boxGeometry>
            <meshStandardMaterial map={activeTexture} attach='material'></meshStandardMaterial>
        </mesh>
    )
}
