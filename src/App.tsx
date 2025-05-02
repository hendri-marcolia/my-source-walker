import { ThemeProvider } from './contexts/ThemeContext'
import { WorldMap } from './components/WorldMap'

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative">
        <WorldMap />
      </div>
    </ThemeProvider>
  )
}
/*

import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef } from 'react';
import * as THREE from 'three';

// Load PBR Textures
const rockTextures = {
  map: useLoader(TextureLoader, '/textures/rock/albedo.jpg'),
  normalMap: useLoader(TextureLoader, '/textures/rock/normal.jpg'),
  roughnessMap: useLoader(TextureLoader, '/textures/rock/roughness.jpg'),
};

const grassTextures = {
  map: useLoader(TextureLoader, '/textures/grass/albedo.jpg'),
  normalMap: useLoader(TextureLoader, '/textures/grass/normal.jpg'),
  roughnessMap: useLoader(TextureLoader, '/textures/grass/roughness.jpg'),
};

// Island Component
const FloatingIsland = ({ islandGeometryRef }) => {
  const meshRef = useRef();

  // Blend between rock & grass based on Y position (optional, advanced)
  const customMaterial = new THREE.MeshStandardMaterial({
    // Use one or the other here or write a shader to blend them
    map: grassTextures.map,
    normalMap: grassTextures.normalMap,
    roughnessMap: grassTextures.roughnessMap,
  });

  return (
    <mesh geometry={islandGeometryRef.current} ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      <primitive object={customMaterial} attach="material" />
    </mesh>
  );
};

export default FloatingIsland;
*/
