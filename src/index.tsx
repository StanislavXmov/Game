import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Game from './components/Game';
import { KeyboardControls } from '@react-three/drei';
import { Controls } from './types';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <KeyboardControls
    map={ [
      { name: Controls.forward, keys: [ 'ArrowUp', 'KeyW' ] },
      { name: Controls.back, keys: [ 'ArrowDown', 'KeyS' ] },
      { name: Controls.left, keys: [ 'ArrowLeft', 'KeyA' ] },
      { name: Controls.right, keys: [ 'ArrowRight', 'KeyD' ] },
      { name: Controls.jump, keys: [ 'Space' ] },
    ] }
  >
    <Canvas
      shadows
      camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [ 2.5, 4, 6 ]
      }}
    >
      <Game />
    </Canvas>
  </KeyboardControls>
);
