import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BlockProps } from "../../types";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { boxGeometry, floor1Material, obstacleMaterial } from './bloks';

export const BlockSpinnerBridge: React.FC<BlockProps> = ({position = [0, 0, 0]}) => {
  const obstacle = useRef<RapierRigidBody>(null);
  const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

  useFrame(({clock}) => {
    const time = clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current?.setNextKinematicRotation(rotation);
  }); 

  return (
    <group position={position}>
      <RigidBody 
        ref={obstacle}
        type='kinematicPosition'
        position={[0, 0, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh 
          geometry={boxGeometry} 
          scale={[3.5, 0.3, 1]}
          receiveShadow
          castShadow
        >
          {obstacleMaterial}
        </mesh>
      </RigidBody>
      
    </group>
  );
}