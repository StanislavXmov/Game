import { RigidBody } from "@react-three/rapier";
import { BlockProps } from "../../types";
import { boxGeometry, floor1Material } from "./bloks";

export const BlockStart: React.FC<BlockProps> = ({position = [0, 0, 0]}) => {
  return (
    <RigidBody
      type='fixed'
      position={position}
      restitution={0.2}
      friction={0}
    >
      <mesh 
        geometry={boxGeometry} 
        position={[0, -0.1, 0]} 
        scale={[4, 0.2, 4]}
        receiveShadow
      >
        {floor1Material}
      </mesh>
    </RigidBody>
  );
}