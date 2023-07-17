import { OrbitControls, Stats } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import * as THREE from "three";
import Light from './Light';
import { Level } from './Level';

import { useGLTF } from '@react-three/drei';
import Player from './Player';

// const color = new THREE.Color("#222222");
// const colorArray = color.toArray();

export default function Game() {

  return <>
    <OrbitControls makeDefault />
    {/* <color attach="background" args={[colorArray[0], colorArray[1], colorArray[2]]} /> */}
    <Physics debug={true}>
      <Light />
      <Level />
      <Player />
    </Physics>
    <Stats />
  </>
}