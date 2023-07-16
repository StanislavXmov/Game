import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Light from './components/Light';

import './index.scss';

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
    <Light />
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  </Canvas>
);
