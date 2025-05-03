export interface PlanetNPC {
  x: number;
  y: number;
  id: string; // Should match the id in your planetContent
}

export interface PlanetMapData {
  background: string;
  layout: string[][];
  npcs: PlanetNPC[];
}

const BLANK_ROW = 'W' + 'G'.repeat(30) + 'W';
const WALL_ROW = 'W'.repeat(32);

// Simple placeholder layouts for each planet (32x22)
const defaultLayout = [
  WALL_ROW,
  ...Array(20).fill(BLANK_ROW),
  WALL_ROW,
].map(row => row.split(''));

export const PLANET_MAPS: Record<string, PlanetMapData> = {
  profile: {
    background: '/porto-world.webp',
    layout: [
      WALL_ROW, // Row 0 (top wall)
      'WGWWGGGGWWWWGGGWWWWGGGWWGGGWWWW', // Row 1 (32 chars)
      'WGWWGGWWWWWWGGGWWWWGGGWWGGGWWWW', // Row 2 (32 chars)
      'WGWWGGWWWWWWGGGGGWWGGGWWGGGGGGW', // Row 3 (32 chars)
      'WGWWGGGGWWWWGGGGGWWGGGGGGGGGGGW', // Row 4 (32 chars)
      'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW', // Row 5 (32 chars)
      'WGGGWGGGGGGGGGGWGGWWWWWGGGGGWWW', // Row 6 (32 chars)
      'WGWWWWWGGGGGGGGWGGGWWWWGGGGGWWW', // Row 7 (32 chars)
      'WGWWWWWGGGGWWWWWWGGWWWWGGGGGWWW', // Row 8 (32 chars)
      'WGWWWWWGGGGWWWWWWGGWWWWGGGGGWWW', // Row 9 (32 chars)
      'WGGGGGGGGGGWWWGWWGGGWWWWWGGGGGW', // Row 10 (32 chars)
      'WGGGGGGGGGGWWWWWWGGGWWWWWGGGGGW', // Row 11 (32 chars)
      'WGGGGGGGGGGGGGGGGGGGWWWWWGGGGGW', // Row 12 (32 chars)
      'WGWWGGGGGGWWGGGGGGGGGGGGGGGWWWW', // Row 13 (32 chars)
      'WGWWGWWWGGWWGGGGGGGGGGGGGGGWWWW', // Row 14 (32 chars)
      'WGWWGWWWGGWWGGGGGGGGGGGGGGGWWWW', // Row 15 (32 chars)
      'WGGGGWWWGGWWGGGGGGGGGGGGGGGGGGW', // Row 16 (32 chars)
      'WWWGGGGGGGGGGGGGWWGGGGGGWWGGGWW', // Row 17 (32 chars)
      'WWWGWWWWWWGGGGGWWWGGGGGGWWWGGWW', // Row 18 (32 chars)
      'WWWGWWWWWWGGGGGWWWGGGGGGWWWGGWW', // Row 19 (32 chars)
      'WGGGWWWWWWWWGGGWWWWGGGWWGGGWWWW', // Row 20 (32 chars)
      WALL_ROW, // Row 21 (bottom wall)
    ].map(row => row.split('')),
    npcs: [
      { x: 10, y: 5, id: 'npc1' },
      { x: 20, y: 10, id: 'npc2' },
    ],
  },
  projects: {
    background: '/project-world.webp',
    layout: defaultLayout,
    npcs: [
      { x: 5, y: 15, id: 'npc1' },
      { x: 25, y: 8, id: 'npc2' },
      { x: 13, y: 12, id: 'npc3' },
    ],
  },
  hobbies: {
    background: '/hobbies-world.webp',
    layout: defaultLayout,
    npcs: [
      { x: 16, y: 12, id: 'npc1' },
    ],
  },
  skills: {
    background: '/skills-world.webp',
    layout: defaultLayout,
    npcs: [
      { x: 28, y: 18, id: 'npc1' },
    ],
  },
  default: {
    background: '/default-bg.webp',
    layout: defaultLayout,
    npcs: [],
  },
}; 