import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useState, useEffect } from 'react'
import { Tile, planetContent } from './content/planetContent'

interface TileMapViewProps {
  planetId: string;
  onClose: () => void;
  layout: string[][];
  background: string;
  npcs: { x: number; y: number; id: string }[];
}

export function TileMapView({ planetId, onClose, layout, background, npcs }: TileMapViewProps) {
  const { currentTheme } = useTheme()
  const rows = layout.length
  const cols = layout[0].length
  const TILE_SIZE = 32
  // Player starts at center
  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number }>({ x: Math.floor(cols / 5), y: Math.floor(rows / 5) })
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null)
  const [isMoving, setIsMoving] = useState(false)

  // Get content for this planet
  const contentTiles = planetContent[planetId] || []
  // Map NPC positions to content
  const npcMap: Record<string, Tile | undefined> = {}
  npcs.forEach((npc, i) => {
    npcMap[`${npc.x},${npc.y}`] = contentTiles[i]
  })

  // Movement logic: only allow walkable tiles
  function isWalkable(x: number, y: number) {
    if (x < 0 || y < 0 || y >= rows || x >= cols) return false
    const t = layout[y][x]
    return t === 'G' || t === 'P' || npcMap[`${x},${y}`]
  }

  // Pathfinding (BFS)
  function findPath(start: { x: number; y: number }, end: { x: number; y: number }) {
    if (start.x === end.x && start.y === end.y) return [];
    const queue = [[start]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[start.y][start.x] = true;
    const directions = [
      { dx: 0, dy: -1 }, // up
      { dx: 0, dy: 1 },  // down
      { dx: -1, dy: 0 }, // left
      { dx: 1, dy: 0 },  // right
    ];
    while (queue.length) {
      const path = queue.shift();
      if (!path) break;
      const { x, y } = path[path.length - 1];
      if (x === end.x && y === end.y) return path;
      for (const { dx, dy } of directions) {
        const nx = x + dx, ny = y + dy;
        if (
          nx >= 0 && nx < cols && ny >= 0 && ny < rows &&
          !visited[ny][nx] && (layout[ny][nx] === 'G' || layout[ny][nx] === 'P')
        ) {
          visited[ny][nx] = true;
          queue.push([...path, { x: nx, y: ny }]);
        }
      }
    }
    return null; // No path
  }

  // Animate movement along a path
  let timeoutId: NodeJS.Timeout;
  function moveAlongPath(path: { x: number; y: number }[]) {
    if (!path || path.length < 2) return;
    let i = 1;
    clearTimeout(timeoutId);
    function step() {
      setPlayerPosition(path[i]);
      if (i < path.length - 1) {
        timeoutId = setTimeout(step, 100);
        i++;
      }
    }
    step();
  }

  // Handle tile click for auto-navigation
  function handleTileClick(x: number, y: number) {
    if ((layout[y][x] === 'G' || layout[y][x] === 'P') && !(playerPosition.x === x && playerPosition.y === y)) {
      const path = findPath(playerPosition, { x, y });
      if (path && path.length > 1) {
        moveAlongPath(path);
      }
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMoving) return
      let { x, y } = playerPosition
      let nx = x, ny = y
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': ny = y - 1; break
        case 'ArrowDown': case 's': case 'S': ny = y + 1; break
        case 'ArrowLeft': case 'a': case 'A': nx = x - 1; break
        case 'ArrowRight': case 'd': case 'D': nx = x + 1; break
        case 'Enter': case ' ': {
          const npc = npcMap[`${x},${y}`]
          if (npc) setSelectedTile(npc)
          break
        }
        case 'Escape':
          if (selectedTile) setSelectedTile(null)
          else onClose()
          break
        default: return
      }
      if ((nx !== x || ny !== y) && isWalkable(nx, ny)) {
        setIsMoving(true)
        setPlayerPosition({ x: nx, y: ny })
        setTimeout(() => setIsMoving(false), 120)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerPosition, isMoving, npcMap, selectedTile, onClose])

  // Helper: is player adjacent to a tile
  function isPlayerAdjacent(x: number, y: number) {
    const dx = Math.abs(playerPosition.x - x)
    const dy = Math.abs(playerPosition.y - y)
    return (dx + dy === 1)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="relative rounded-2xl overflow-hidden border-8 border-theme-accent/60 shadow-2xl game-card"
        style={{
          width: `${cols * TILE_SIZE}px`,
          height: `${rows * TILE_SIZE }px`,
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Info bar */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-theme-accent/30 border-b-4 border-theme-accent/60 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-bold text-theme-foreground font-game tracking-widest">
              {planetId.charAt(0).toUpperCase() + planetId.slice(1)} World
            </h2>
            <span className="text-xs text-theme-background bg-theme-accent/80 px-3 py-1 rounded font-game ml-4">
              Arrows/WASD: Move &nbsp;|&nbsp; Enter/Space: Interact &nbsp;|&nbsp; Esc: Close
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-theme-background bg-theme-accent/80 hover:bg-theme-accent transition-colors text-xl px-4 py-2 rounded font-game border-2 border-theme-accent/90"
          >
            ✕
          </button>
        </div>
        {/* Debug: Tile borders overlay with click handler */}
        <div
          className="absolute left-0 top-0 w-full h-full pointer-events-auto z-10"
        >
          {Array.from({ length: rows }).map((_, y) =>
            Array.from({ length: cols }).map((_, x) => (
              <div
                key={`debug-tile-${x}-${y}`}
                onClick={() => handleTileClick(x, y)}
                style={{
                  position: 'absolute',
                  left: x * TILE_SIZE,
                  top: y * TILE_SIZE,
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                //   border: '2px dashed rgba(0,0,0,1)',
                  boxSizing: 'border-box',
                  pointerEvents: 'auto',
                  cursor: (layout[y][x] === 'G' || layout[y][x] === 'P') ? 'pointer' : 'not-allowed',
                  color: '#888',
                  fontSize: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.01)',
                  userSelect: 'none',
                }}
                title={`(${x},${y})`}
              >
                {/* Optionally show tile type for debug: {layout[y][x]} */}
              </div>
            ))
          )}
        </div>
        {/* Overlay container for player and NPCs */}
        <div
          className="absolute left-0 top-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        >
          {/* NPCs/Places */}
          {npcs.map((npc, i) => {
            const tile = npcMap[`${npc.x},${npc.y}`]
            if (!tile) return null
            const isPlayerHere = playerPosition.x === npc.x && playerPosition.y === npc.y
            return (
              <motion.div
                key={npc.id}
                className="absolute flex flex-col items-center justify-center select-none"
                style={{
                  left: npc.x * TILE_SIZE,
                  top: npc.y * TILE_SIZE,
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  pointerEvents: 'auto',
                }}
                initial={{ y: 0 }}
                animate={{ y: [0, -6, 0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', delay: (i % 6) * 0.1 }}
              >
                <span className="text-3xl mb-1" role="img" aria-label={tile.title}>{tile.icon}</span>
                {/* Only show name if player is here */}
                {isPlayerHere && (
                  <span className="text-xs font-game text-theme-accent text-center max-w-[80px] truncate">{tile.title}</span>
                )}
                {/* Highlight if player is adjacent */}
                {isPlayerAdjacent(npc.x, npc.y) && !isPlayerHere && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-theme-background font-game text-xs px-2 py-1 rounded shadow-lg z-20 animate-bounce">!</span>
                )}
                {/* Interact hint if player is here */}
                {isPlayerHere && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-theme-accent/90 text-theme-background font-game text-xs px-2 py-1 rounded shadow-lg z-20">Press Enter/Space</span>
                )}
              </motion.div>
            )
          })}
          {/* Player */}
          <motion.div
            className="absolute z-10"
            style={{
              left: playerPosition.x * TILE_SIZE,
              top: playerPosition.y * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE,
              pointerEvents: 'none',
            }}
            initial={{ scale: 0.7, y: 0 }}
            animate={{ scale: [0.7, 1.1, 0.9, 1], y: [0, -8, 0, 4, 0] }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-8 h-8 bg-yellow-300 rounded-full border-2 border-yellow-500 shadow-lg mx-auto my-auto" />
          </motion.div>
        </div>
        {/* Game-like UI elements */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 z-20">
          <div className="bg-theme-accent/20 px-4 py-2 rounded-lg border-2 border-theme-accent/30">
            <span className="text-sm text-theme-foreground font-game">Position: {playerPosition.x + 1}, {playerPosition.y + 1}</span>
          </div>
        </div>
        {/* Game-like content overlay */}
        <AnimatePresence>
          {selectedTile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-theme-background/95 backdrop-blur-md p-8 flex items-center justify-center"
            >
              <div className="bg-theme-secondary/90 rounded-lg p-8 max-w-lg w-full shadow-2xl border-4 border-theme-accent/40 flex flex-col items-center">
                <span className="text-5xl mb-4" role="img" aria-label={selectedTile.title}>{selectedTile.icon}</span>
                <h2 className="text-2xl font-bold text-theme-accent font-game mb-2 text-center">{selectedTile.title}</h2>
                <p className="text-theme-foreground mb-6 text-center">{selectedTile.description}</p>
                {selectedTile.link && (
                  <a
                    href={selectedTile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-theme-accent/20 hover:bg-theme-accent/30 rounded-lg text-theme-accent transition-colors font-game text-sm"
                  >
                    <span>Explore Quest</span>
                    <span>→</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedTile(null)}
                  className="mt-6 px-4 py-2 bg-theme-accent/80 text-theme-background font-game rounded shadow hover:bg-theme-accent/90"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
