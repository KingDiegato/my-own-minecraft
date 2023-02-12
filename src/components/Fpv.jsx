import { PointerLockControls } from "@react-three/drei";
import { useThree } from '@react-three/fiber'

// definimos un punto de vista de primera persona con three drei
export function Fpv () {
    const { camera, gl } = useThree()

    return (
        <PointerLockControls args={[camera, gl.domElement]}/>
    )
}