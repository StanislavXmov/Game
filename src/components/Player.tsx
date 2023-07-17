import * as THREE from 'three';
import { useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, useRapier } from '@react-three/rapier';
import { useRef, useEffect, useState } from 'react';
import { useGame } from '../store/useGame';
import { Phase } from '../types';

const Player = () => {

  const ball = useGLTF('public/ball.glb');
  ball.scene.children.forEach((mesh) => mesh.castShadow = true);

  const body = useRef<RapierRigidBody>(null);
  const [subsribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const jump = () => {
    const origin = body.current?.translation();
    const direction = {x: 0, y: -1, z: 0};
    if (origin) {
      origin.y -= 0.31;
      const ray = new rapier.Ray(origin, direction);
      const hit = world.castRay(ray, 10, true);
      
      if (hit?.toi! < 0.15) {
        body.current?.applyImpulse({x: 0, y: 0.5, z: 0}, true);
      }
    }
  }

  const reset = () => {
    if (body.current) {
      body.current.setTranslation({x: 0, y: 1, z: 0}, true);
      body.current.setLinvel({x: 0, y: 0, z: 0}, true);
      body.current.setAngvel({x: 0, y: 0, z: 0}, true);
    }
  }

  useEffect(() => {

    const unsubsribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === Phase.ready) {
          reset();
        }
      }
    );

    const unsubsribeKeys = subsribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unsubsribeAnyKeys = subsribeKeys(() => {
      start();
    });

    return () => {
      unsubsribeReset();
      unsubsribeKeys();
      unsubsribeAnyKeys();
    }
  }, []);

  useFrame((state, delta) => {
    const {
      forward,
      back,
      left,
      right,
    } = getKeys();
    const impulse = {x: 0, y: 0, z: 0};
    const torque = {x: 0, y: 0, z: 0};

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (back) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    body.current?.applyImpulse(impulse, true);
    body.current?.applyTorqueImpulse(torque, true);

    if (body.current) {
      const bodyPosition = body.current.translation();
      const bodyPositionVector3 = new THREE.Vector3(bodyPosition.x, bodyPosition.y, bodyPosition.z);
      const cameraPosition = new THREE.Vector3();
      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(bodyPositionVector3);
      cameraPosition.copy(bodyPositionVector3);
      cameraPosition.z += 2.25;
      cameraPosition.y += 0.65;
      cameraTarget.y += 0.25;

      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);

      // if (bodyPosition.z < - (blocksCount * 4 + 2)) {
      //   end();
      // }

      if (bodyPosition.y < - 4) {
        restart();
      }
    }
  });
  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders='ball'
      position={[0, 1, 0]}
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <primitive object={ball.scene} position={[0, 0.0, 0]} />
    </RigidBody>
  );
}

export default Player;