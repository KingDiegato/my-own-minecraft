import { useStore } from "./hooks/useStore";
import { Cube } from "./Cube.jsx";

/**
 * creamos un array de cubos para poder hacer un map y pintarlos en función de su id, posición y textura
 * los cubos serán traidos del store, tanto los definidos como los creados por métodos
 * @returns Los Cubos que existen y existirán canvas para que se rendericen
 */
export const Cubes = () => {
    const [cubes] = useStore(state => [state.cubes])

    return cubes.map(({ id, pos, texture }) => {
        return (
        <Cube
            key={id}
            position={pos}
            texture={texture}
        />
        )
    })
}