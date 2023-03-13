import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

//? Vector tridimensional
import { Vector3 } from 'three';

//? Map del teclado
import { useKeyboard } from './hooks/useKeyboard';

// Velocidad del personaje
const CHARACTER_SPEED = 5;
// impulso del salto del personaje
const CHARACTER_JUMP = 7;

/**
 * Personaje que podrá explorar por todo el suelo del canvas, posee físicas y tiene una forma esférica
 * @returns Jugador
 */
export const Player = () => {
  // Las constantes con los movimientos dle personaje
  const { moveBackward, moveForward, moveLeft, moveRight, jump, accelerate } =
    useKeyboard();

  // para situar la cámara en el pearsonaje
  const { camera } = useThree();

  // La forma del jugador
  // Es Dynamic para que pueda moverse,
  // mass 1 para la fuerza que aplicará la física de la gravedad sobre el
  // La position define el spawn
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 5.5, 0]
  }));

  /**
   * nos subscribimos a la posición del jugador para actualizar la vista de la cámara
   */
  const pos = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);

  /**
   * nos subscribimos a la velocidad del jugador para actualizar la velocidad de la cámara
   */
  const vel = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((p) => {
      vel.current = p;
    });
  }, [api.velocity]);

  /**
   * copiamos la posición del jugador con la cámara para que se muevan de manera sincrona
   */
  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );

    //class Vector3, un vector de 3 dimensiones x,y,z
    const direction = new Vector3();

    // Valor del movimiento frontal
    //? 1 = true, 0 = false, la resta es para que se anulen en caso de pulsar ambas teclas contrarias al mismo tiempo
    const frontVector = new Vector3(
      0, // x
      0, // y
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0) // z
    );

    //Valor del movimiento Lateral
    //? 1 = true, 0 = false, la resta es para que se anulen en caso de pulsar ambas teclas contrarias al mismo tiempo
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    //! Magia negra
    // aplicamos métodos del Vector3 para poder ejecutar las funciones de movimiento correctamente
    direction
      .subVectors(frontVector, sideVector) // creamos un vector paralelo que nos permite movernos en el plano
      .normalize() // normalizamos el vector para que no tenga errores de presskey
      .multiplyScalar(CHARACTER_SPEED) // hace un calculo escalar para definir la rapidez del personaje
      .applyEuler(camera.rotation); // ajusta los valores frontales a la dirección de la mira

    // Definimos las velocidades en los tres ejes del Vector3 desde la api de la forma del personaje
    // aplicamos el método set y le pasamos los valores x,y,z
    api.velocity.set(direction.x, vel.current[1], direction.z);
  });

  //? y si saltamos que?
  // vemos si se activa la acción de saltar y si la velocidad actual es menor a 0.05
  //! si no se evalua el valor absoluto de la velocidad y se compara con un valor pequeño, podrías saltar infinitamente
  if (jump && Math.abs(vel.current[1]) < 0.05) {
    api.velocity.set(vel.current[0], CHARACTER_JUMP, vel.current[2]);
  }

  if (accelerate) {
    api.velocity.set(vel.current[0] * 2, vel.current[1], vel.current[2] * 2);
  }

  return <mesh ref={ref} />;
};
