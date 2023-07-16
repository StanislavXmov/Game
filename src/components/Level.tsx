import * as THREE from 'three';
import { useRef, useState, useMemo } from 'react';
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, CuboidCollider } from '@react-three/rapier';
import { useGLTF, Float, Text } from '@react-three/drei';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = <meshStandardMaterial color="#3a3a3a" />;

type BlockProps = {
  position?: [number, number, number];
}

type BlockBoundProps = {
  position?: [number, number, number];
  length?: number;
}

const BlockStart: React.FC<BlockProps> = ({position = [0, 0, 0]}) => {
  return (
    <group position={position}>
      <mesh 
        geometry={boxGeometry} 
        position={[0, -0.1, 0]} 
        scale={[4, 0.2, 4]}
        receiveShadow
      >
        {floor1Material}
      </mesh>
    </group>
  );
}

type BlockTypes = React.FC<BlockProps>[];
type LevelProps = {
  count?: number; 
  types?: BlockTypes;
  seed?: number;
}

export const Level:React.FC<LevelProps> = ({
  count = 5,
  types = [],
  seed = 0,
}) => {

  return <>
    <BlockStart position={[0, 0, 0]} />
  </>
}