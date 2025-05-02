import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useState } from 'react'
import { ContentTile } from './tiles/ContentTile'
import { Tile, planetContent } from './content/planetContent'

interface TileMapViewProps {
  planetId: string
  onClose: () => void
}

export function TileMapView({ planetId, onClose }: TileMapViewProps) {
  const { currentTheme } = useTheme()
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null)
  const [hoveredTile, setHoveredTile] = useState<string | null>(null)

  const tiles = planetContent[planetId] || []

  const handleTileClick = (tile: Tile) => {
    if (tile.type === 'content') {
      setSelectedTile(tile)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-[800px] h-[600px] bg-theme-background/90 backdrop-blur-md rounded-lg overflow-hidden border border-theme-accent/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-theme-foreground hover:text-theme-accent transition-colors"
        >
          ✕
        </button>

        {/* Planet title */}
        <h2 className="absolute top-4 left-4 text-2xl font-bold text-theme-foreground">
          {planetId.charAt(0).toUpperCase() + planetId.slice(1)}
        </h2>

        {/* Tilemap container */}
        <div className="w-full h-full p-8">
          <div className="w-full h-full bg-theme-secondary/20 rounded-lg overflow-hidden">
            {/* Grid of tiles */}
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-full p-4">
              {tiles.map((tile) => (
                tile.type === 'content' ? (
                  <ContentTile
                    key={tile.id}
                    id={tile.id}
                    icon={tile.icon!}
                    title={tile.title!}
                    description={tile.description!}
                    link={tile.link}
                    onSelect={() => handleTileClick(tile)}
                    isHovered={hoveredTile === tile.id}
                    onHoverStart={() => setHoveredTile(tile.id)}
                    onHoverEnd={() => setHoveredTile(null)}
                  />
                ) : (
                  <div
                    key={tile.id}
                    className="bg-theme-secondary/10 rounded-lg"
                  />
                )
              ))}
            </div>
          </div>
        </div>

        {/* Selected tile content overlay */}
        <AnimatePresence>
          {selectedTile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-theme-background/95 backdrop-blur-md p-8"
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-4xl mr-4">{selectedTile.icon}</span>
                    <h2 className="text-2xl font-bold text-theme-accent inline-block">
                      {selectedTile.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedTile(null)}
                    className="text-theme-foreground hover:text-theme-accent transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <p className="text-theme-foreground mb-4">{selectedTile.description}</p>
                  {selectedTile.link && (
                    <a
                      href={selectedTile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-theme-accent hover:text-theme-accent/80"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
} 