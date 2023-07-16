import { OrbitControls, Stats } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import * as THREE from "three";
import Light from './Light';
import { Level } from './Level';

import { useGLTF } from '@react-three/drei';

// const color = new THREE.Color("#222222");
// const colorArray = color.toArray();

export default function Game() {

  const ball = useGLTF('public/ball.glb');
  ball.scene.children.forEach((mesh) => mesh.castShadow = true);

  return <>
    <OrbitControls makeDefault />
    {/* <color attach="background" args={[colorArray[0], colorArray[1], colorArray[2]]} /> */}
    <Physics debug={false}>
      <Light />
      <Level />
      <primitive object={ball.scene} position={[0, 0.5, 0]} />
    </Physics>
    <Stats />
  </>
}