import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { BlockProps } from "../../types";
import { boxGeometry, floor1Material } from "./bloks";
import { useGame } from "../../store/useGame";

export const BlockEnd: React.FC<BlockProps> = ({position = [0, 0, 0]}) => {
  const restart = useGame((state) => state.restart);

  return (
    <RigidBody
      type='fixed'
      position={position}
      restitution={0.2}
      friction={0}
      // userData={{blockType: 'end'}}
    >
      <mesh 
        geometry={boxGeometry} 
        position={[0, -0.1, 0]} 
        scale={[2, 0.2, 2]}
        receiveShadow
      >
        {floor1Material}
      </mesh>
      <CuboidCollider
        position={[0, 0.1, 0]}
        args={[1, 0.1, 1]}
        sensor
        onIntersectionEnter={() => restart()}
        // onIntersectionExit={() => console.log('EXIT')}
      />
    </RigidBody>
  );
}