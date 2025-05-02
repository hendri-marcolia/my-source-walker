import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useStore } from './store/useStore'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { PortfolioWorld } from './scenes/PortfolioWorld'
import { useState } from 'react'

function ThemeSwitcher() {
  const { currentTheme, setTheme, availableThemes } = useTheme()
  
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {availableThemes.map((themeName) => (
        <button
          key={themeName}
          onClick={() => setTheme(themeName)}
          className={`px-4 py-2 rounded-lg transition-all ${
            currentTheme.name === themeName
              ? 'bg-theme-accent text-white'
              : 'bg-theme-muted hover:bg-theme-secondary'
          }`}
        >
          {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
        </button>
      ))}
    </div>
  )
}

function ProgressOverlay() {
  const [achievements, _] = useState<string[]>([])
  const totalAchievements = 2 // Update this based on your total achievements

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-theme-background backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <h3 className="text-theme-foreground font-bold mb-2">Progress</h3>
      <div className="flex items-center gap-2">
        <div className="w-32 h-2 bg-theme-muted rounded-full">
          <div
            className="h-full bg-theme-accent rounded-full transition-all duration-300"
            style={{ width: `${(achievements.length / totalAchievements) * 100}%` }}
          />
        </div>
        <span className="text-theme-foreground text-sm">
          {achievements.length}/{totalAchievements}
        </span>
      </div>
    </div>
  )
}

function AppContent() {
  const { currentTheme } = useTheme()
  const { isDarkMode, toggleDarkMode } = useStore()

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div
        className="fixed inset-0 bg-theme-background"
        style={{
          backgroundImage: currentTheme.assets.backgrounds.main,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Portfolio Explorer
          </h1>
          <button
            style={{ display: 'none' }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
            }`}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </nav>
      <ThemeSwitcher />
      <ProgressOverlay />
      <main className="pt-16 h-screen">
        <Canvas camera={{ position: [0, 20, 30], fov: 45 }}>
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={15}
            maxDistance={50}
            target={[0, 0, 0]}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <PortfolioWorld />
        </Canvas>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
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
