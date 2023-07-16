import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';

import './index.scss';
import Game from './components/Game';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
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
);
