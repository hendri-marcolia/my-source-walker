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
    layout: [
      WALL_ROW, // Row 0 (top wall)
      WALL_ROW, // Row 1
      'WWWGGGWWWWWWWGWWWGGWWWWWWWWGGWWW', // Row 2
      'WWWWWGGGGWWWWGWWWGGWWWWWWWGGGWWW', // Row 3
      'WWGWWWGGWWWWWGWWGGGWWWWWWGGWWWWW', // Row 4
      'WWGWGGGWWWWWWGGGGGGWWWWWGGGWWWWW', // Row 5
      'WGGGGGGWWWWWWGGWWGGWWWWGGGWWWWWW', // Row 6
      'WWGGGGWWWWWWGGGWWWGGGWGGGWWWWWWW', // Row 7
      'WWWGGWWWWGGGGGWWWWWGGGGGWWWWWWWW', // Row 8
      'WWWWGGWWGGWWWWWWWWWGGWWGGGWWWWWW', // Row 9
      'WWWWWGGGGWWWWWWWWWGGGWWWGGGGWWWW', // Row 10
      'WWWWWGGGWWWWWWWWWGGGWWWWWWGGGGGW', // Row 11
      'WWWWWGGGWWWWWGGWGGGGWWWWWWGGGGGW', // Row 12
      'WWWWWGGGGGWWWGGWGGGGGGWWWGGWWWWW', // Row 13
      'WWWWWGGWGGGWWGGGWWWWGGGGGGGWWWWW', // Row 14
      'WWGWWWWWWWGGGGGWWWWWGGGGGGWWWWWW', // Row 15
      'WWWWWWWWWWWWWGWWWWGGGGGGGGWWWWWW', // Row 16
      'WWWWWWWWWWWWWWWWWWWGGWWWGGGWWWWW', // Row 17
      'WWWWWWWWWWWWWWWWWWGGGWWWWGGGGGGW', // Row 18
      'WWWWWWWWWWWWWWWWWWGGWWWWWGGGWWGW', // Row 19
      'WWWWWWWWWWWWWWWWWWGGGWWWWGGGGGGW', // Row 20
      WALL_ROW, // Row 21 (bottom wall)
    ].map(row => row.split('')),
    npcs: [
      { x: 5, y: 15, id: 'npc1' },
      { x: 25, y: 8, id: 'npc2' },
      { x: 13, y: 12, id: 'npc3' },
    ],
  },
  hobbies: {
    background: '/hobbies-world.webp',
    layout: [
      WALL_ROW, // Row 0 (top wall)
      'WWWGGGWWGGGGWWWGGGGWWWWWWWWWWGGG', // Row 1
      'WGGGWWWGGGWGGWWGGGGGGGWWWWWWWWWW', // Row 2
      'WGGWWWGGGWWWGGGGGGGGGGGGGGWWWWWW', // Row 3
      'WGWWGGGGGGGGGGGGGGGGGGGGGGGWWGWW', // Row 4
      'WWWGGGWWWGGGGGGGGGGGGGGGGGGWWGGW', // Row 5
      'WWWGGWWWWGGGGGGGGGGGGGGWWGGGGGGW', // Row 6
      'WWWWGGGGGGGGGGGGGGGGGGGGWWWWGGGW', // Row 7
      'WWWWWGGGGGGGGGGGGGGGGGGGWWWGGGGW', // Row 8
      'WWWWWGGWWGGWWWWGGGGGGGGWWWWGGGGW', // Row 9
      'WWWWWGWGGGGWWWWGGGWWGGGGGGGGGGGW', // Row 10
      'WGGGGGGGGGGWWWGGGGWWWGGGGGGGGGGW', // Row 11
      'WGGGWGGGGGGWWGGGGGWWGGGGGGGGGGGW', // Row 12
      'WWWWWWWWWWWWWGGGGGWWWGGGGGGGGGGW', // Row 13
      'WWWWWWWWWGGGGGGGGGWWWGGGWWWGGGGW', // Row 14
      'WWWWWWWWGGGGWWWGGGGGGGGGWWGGGGGW', // Row 15
      'WGGGGGGGGGGGWWWGGGGGGGGGGGGGGGGW', // Row 16
      'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGWWW', // Row 17
      'WWWGGGGGGGGGGGGGGGGGGGGGWWWWWWWW', // Row 18
      'WWWWGGWWWGGGGGGGGGGGGGGWWWWWWWWW', // Row 19
      'WWWWGGGWWWWWWWWWWWGGGGGGGGWWWWWW', // Row 20
      WALL_ROW, // Row 21 (bottom wall)
    ].map(row => row.split('')),
    npcs: [
      { x: 16, y: 12, id: 'npc1' },
    ],
  },
  skills: {
    background: '/skills-world.webp',
    layout: [
      WALL_ROW, // Row 0 (top wall)
      WALL_ROW, // Row 1
      'WWWWGGGWWGWGGGWWGGWGGGGGGGWWWWWW', // Row 2
      'WWWGGGGGGGWGGGGGGGGGGGWWGGGWWWWW', // Row 3
      'WWGGGWWGGWWGGGWGGWGGWGWWWWGGGGWW', // Row 4
      'WWWWWWWGGWWWWWWGGGGGGGWWWWWWGGGW', // Row 5
      'WWGGGWWGGWWWWWGGGWGGGGGGGGGWGGGW', // Row 6
      'WWGGGWWGGGGWWGGGGWGGGGGGGGGGGGGW', // Row 7
      'WWGGGGGGGGGGGGWWGWGGGGGGGGWGGGGW', // Row 8
      'WWGGWWWGGGGGGWWWGWWGGGGGGGGGGGGW', // Row 9
      'WWGGWWWGGGGGGGWWGGGGGGWGGGGGGGWW', // Row 10
      'WGGGGGGGGGGGGWWGGGGGGGGGGGGWGGWW', // Row 11
      'WGGGGGGGGGGGGGGGGGGGGGGGGWGGGGWW', // Row 12
      'WWWGGGGGGGGGGGGGGGGGGGGGGWWGGWWW', // Row 13
      'WWWGGWGGGGGGWWWGGGGGGGGGGGGWWWWW', // Row 14
      'WGGGGGGGGGGGWWWGGGGGGGGGGGWWWWWW', // Row 15
      'WGGGGGGGGGGGWWWGWGGGGGWWWGWWWWWW', // Row 16
      'WGGGGGGGGGGGGGGGWWWGGGWWWGGGGGWW', // Row 17
      'WWWGGGGGGWGGGGGGGWWWGGGGGGWWGGGW', // Row 18
      'WWWWGGWWGGGGGGGGGWWGGGGGWWWWGGGW', // Row 19
      'WWWWWGGGGGGGGGGGGGGGGGGWWWWWWWWW', // Row 20
      WALL_ROW, // Row 21 (bottom wall)
    ].map(row => row.split('')),
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