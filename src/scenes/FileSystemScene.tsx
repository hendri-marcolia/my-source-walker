import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text, Line, useTexture, Stars, Environment } from '@react-three/drei'
import { useStore } from '../store/useStore'
import { useTheme } from '../contexts/ThemeContext'
import * as THREE from 'three'

interface FileNode {
  id: string
  name: string
  type: 'file' | 'directory'
  children?: FileNode[]
  position: [number, number, number]
}

const createFileSystem = (): FileNode[] => {
  return [
    {
      id: 'about',
      name: 'About',
      type: 'directory',
      position: [0, 2, 0],
      children: [
        {
          id: 'about-me',
          name: 'About Me',
          type: 'file',
          position: [-1, 1, 0],
        },
        {
          id: 'experience',
          name: 'Experience',
          type: 'file',
          position: [1, 1, 0],
        },
      ],
    },
    {
      id: 'projects',
      name: 'Projects',
      type: 'directory',
      position: [2, 0, 0],
      children: [
        {
          id: 'project1',
          name: 'Project 1',
          type: 'file',
          position: [3, 1, 0],
        },
        {
          id: 'project2',
          name: 'Project 2',
          type: 'file',
          position: [3, -1, 0],
        },
      ],
    },
    {
      id: 'skills',
      name: 'Skills',
      type: 'directory',
      position: [-2, 0, 0],
      children: [
        {
          id: 'frontend',
          name: 'Frontend',
          type: 'file',
          position: [-3, 1, 0],
        },
        {
          id: 'backend',
          name: 'Backend',
          type: 'file',
          position: [-3, -1, 0],
        },
      ],
    },
    {
      id: 'contact',
      name: 'Contact',
      type: 'directory',
      position: [0, -2, 0],
      children: [
        {
          id: 'email',
          name: 'Email',
          type: 'file',
          position: [-1, -3, 0],
        },
        {
          id: 'social',
          name: 'Social',
          type: 'file',
          position: [1, -3, 0],
        },
      ],
    },
  ]
}

function Particles({ count = 100, color }: { count?: number; color: string }) {
  const points = useRef<THREE.Points>(null)
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function ConnectionLine({ start, end, color, progress = 1 }: { start: [number, number, number]; end: [number, number, number]; color: string; progress?: number }) {
  const points = useMemo(() => {
    const mid: [number, number, number] = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 0.5,
      (start[2] + end[2]) / 2,
    ]
    return [start, mid, end] as const
  }, [start, end])

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      dashed={false}
      opacity={0.5 * progress}
      transparent
    />
  )
}

function FileNode({ node, onClick, isSelected = false }: { node: FileNode; onClick: (node: FileNode) => void; isSelected?: boolean }) {
  const { currentTheme } = useTheme()
  const isDarkMode = useStore((state) => state.isDarkMode)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [scale, setScale] = useState(1)

  const color = useMemo(() => {
    if (isSelected) return currentTheme.colors.accent
    if (node.type === 'directory') {
      return isDarkMode ? currentTheme.colors.primary : currentTheme.colors.secondary
    }
    return isDarkMode ? currentTheme.colors.accent : currentTheme.colors.primary
  }, [node.type, isDarkMode, currentTheme, isSelected])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
      if (hovered) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
      }
      // Smooth scale transition
      const targetScale = hovered || isSelected ? 1.2 : 1
      setScale(THREE.MathUtils.lerp(scale, targetScale, delta * 5))
    }
  })

  return (
    <group position={node.position} scale={scale}>
      <Box
        ref={meshRef}
        args={[0.5, 0.5, 0.5]}
        onClick={() => onClick(node)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhysicalMaterial 
          color={color}
          wireframe={node.type === 'directory'}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
          emissive={hovered || isSelected ? color : '#000000'}
          emissiveIntensity={hovered || isSelected ? 0.5 : 0}
        />
      </Box>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color={isDarkMode ? currentTheme.colors.foreground : currentTheme.colors.background}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={isDarkMode ? currentTheme.colors.background : currentTheme.colors.foreground}
      >
        {node.name}
      </Text>
      {node.children?.map((child) => (
        <ConnectionLine
          key={child.id}
          start={node.position}
          end={child.position}
          color={color}
        />
      ))}
    </group>
  )
}

export function FileSystemScene() {
  const fileSystem = useMemo(() => createFileSystem(), [])
  const selectedNode = useStore((state) => state.selectedNode as FileNode | null)
  const { currentTheme } = useTheme()
  const isDarkMode = useStore((state) => state.isDarkMode)

  const handleNodeClick = (node: FileNode) => {
    console.log('Clicked node:', node)
    // Handle node selection here
  }

  return (
    <>
      {/* Background Elements */}
      <color attach="background" args={[isDarkMode ? currentTheme.colors.background : currentTheme.colors.foreground]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Particles color={currentTheme.colors.accent} />
      <Environment preset="night" />
      
      {/* Main Scene */}
      <group>
        {fileSystem.map((node) => (
          <FileNode 
            key={node.id} 
            node={node} 
            onClick={handleNodeClick}
            isSelected={selectedNode?.id === node.id}
          />
        ))}
      </group>
    </>
  )
} 