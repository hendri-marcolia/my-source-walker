import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { PortfolioWorld } from '../../scenes/PortfolioWorld'
import { TileMapView } from './TileMapView'

interface WorldMapProps {
  onPlanetClick?: (planetId: string) => void
}

export function WorldMap({ onPlanetClick }: WorldMapProps) {
  const [activePlanet, setActivePlanet] = useState<string | null>(null)
  
  const handlePlanetClick = (planetId: string) => {
    setActivePlanet(planetId)
    onPlanetClick?.(planetId)
  }

  const handleCloseTileMap = () => {
    setActivePlanet(null)
  }

  return (
    <div className="w-full h-screen relative">
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
        <PortfolioWorld onPlanetClick={handlePlanetClick} />
      </Canvas>

      {activePlanet && (
        <TileMapView 
          planetId={activePlanet} 
          onClose={handleCloseTileMap} 
        />
      )}
    </div>
  )
} 