import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshBasicMaterial, SphereGeometry, Clock } from 'three';
import { useEffect, useState } from 'react';

interface ThreeBackgroundProps {
  darkMode: boolean;
}

function Model() {
  const gltf = useLoader(GLTFLoader, '/scene.gltf');
  const scale = window.innerHeight / 400;
  const clock = new Clock();

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    gltf.scene.rotation.y = -elapsedTime / 5;
  });

  return (
    <primitive
      object={gltf.scene}
      scale={[scale, scale, scale]}
      position={[window.innerWidth / 2, 0, 0]}
    />
  );
}

function Stars() {
  const material = new MeshBasicMaterial({ color: 0xffffff });
  const geometry = new SphereGeometry(1, 32, 32);
  const stars = [];

  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * window.innerWidth - window.innerWidth / 2;
    const y = Math.random() * window.innerHeight - window.innerHeight / 2;
    const z = Math.random() * 1600 - 800;
    stars.push(
      <mesh
        key={i}
        position={[x, y, z - 10000]}
        material={material}
        geometry={geometry}
      />
    );
  }

  return stars;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ darkMode }) => {
  const [, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isWebGLSupported =
    !!window.WebGLRenderingContext &&
    !!document.createElement('canvas').getContext('webgl');

  if (!isWebGLSupported) {
    return null;
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        backgroundColor: 'transparent',
        zIndex: 1,
      }}
    >
      <Canvas
        orthographic
        camera={{
          near: -10000,
          far: 10000,
        }}
        style={{ pointerEvents: 'none' }}
      >
        <directionalLight
          intensity={1.5}
          position={[-3.3, -1.0, 4.4]}
          castShadow
        />
        <Model />
        {darkMode && <Stars />}
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
