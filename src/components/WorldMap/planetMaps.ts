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
      WALL_ROW,
      'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', // Row 2
    'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', // Row 3
    'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', // Row 4
    'WGGGGGGWWWWWGGGGGGGWGGGGGGGGGGGG', // Row 5
    'WGGGGGWGWWWGGGGGGGWGGGGGGGGGGGGW', // Row 6
    'WGGGGGWGWWWGGGGGGGWWGGGGGGGGGGGW', // Row 7
    'WGGGGGGGGGWWWWWWWGGGWWGGGGGGGGGW', // Row 8
    'WGGGGGGGGGGWGWWWWWWWWWWGGGGGGGGW', // Row 9
    'WWWWWWWWWWGGGGWWWWWWWWWWGGGGGGGG', // Row 10
    'WWWWWWWWWWGGGGWWWWWWWWWWGGGGGGGG', // Row 11
    'WWWWWWWWWWGGGWWWWWWWWWWGGGGGGGGW', // Row 12
    'WWWWGGGGGGWWGWWWWWWWGGGGGGGGGGGW', // Row 13
    'WWGGGGGGGGGWWWWWWWWWWGGGGGGGGGGW', // Row 14
    'WWGGGGGGGGWWWWWWWWWWGGGGGGGGGGWW', // Row 15
    'WWGGGGGWWWWWGGGGWWWWGGGGGGGGWWGW', // Row 16
    'WWGGGGGWWWGGGGGGGGGGGGGGGGGWWGGW', // Row 17
    'WWGGGGGGGGGGGGGGGGGGGGGGGGGGWWWGGW', // Row 18
    'WGGGGGGWWWWWWGGGGGGWWWWWWGGGGGGGW', // Row 19
    'WGGGGWWWWWWGGGGGGGGWWWWWWWWGGGGGW', // Row 20
    'WGGGGWWWWWWGGGGGGGGWWWWWWWWGGGGGW', // Row 21
      WALL_ROW,
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