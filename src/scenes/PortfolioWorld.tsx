import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Line, Stars, Environment, Html, Float, Sphere, Ring, Billboard, Points, PointMaterial } from '@react-three/drei'
import { useStore } from '../store/useStore'
import { useTheme } from '../contexts/ThemeContext'
import * as THREE from 'three'

interface Planet {
    id: string
    name: string
    description: string
    icon: string
    position: [number, number, number]
    size: number
    color: string
    rotationSpeed: number
    orbitRadius: number
    orbitSpeed: number
}

type WorldTheme = 'space' | 'island'

const createSolarSystem = () => {
    const planets: Planet[] = [
        {
            id: 'profile',
            name: 'Professional Profile',
            description: 'My professional journey and expertise',
            icon: '👨‍💻',
            position: [0, 0, 0],
            size: 2,
            color: '#4A90E2',
            rotationSpeed: 0.9,
            orbitRadius: 0.1,
            orbitSpeed: 1,
        },
        {
            id: 'projects',
            name: 'Projects',
            description: 'My technical projects and achievements',
            icon: '🚀',
            position: [6, 0, 0],
            size: 2,
            color: '#E24A4A',
            rotationSpeed: 0.5,
            orbitRadius: 8,
            orbitSpeed: 1,
        },
        {
            id: 'hobbies',
            name: 'Hobbies',
            description: 'My creative and personal interests',
            icon: '🎨',
            position: [10, 0, 0],
            size: 2,
            color: '#4AE24A',
            rotationSpeed: 0.4,
            orbitRadius: 16,
            orbitSpeed: 0.6,
        },
        {
            id: 'skills',
            name: 'Skills',
            description: 'My technical expertise and capabilities',
            icon: '⚡',
            position: [14, 0, 0],
            size: 2,
            color: '#E2E24A',
            rotationSpeed: 0.3,
            orbitRadius: 22,
            orbitSpeed: 0.4,
        }
    ]

    return { planets }
}

function PlanetNode({ planet, onSelect, theme, isTransitioning }: {
    planet: Planet;
    onSelect: (planet: Planet) => void;
    theme: WorldTheme;
    isTransitioning: boolean;
}) {
    const { currentTheme } = useTheme()
    const [hovered, setHovered] = useState(false)
    const meshRef = useRef<THREE.Mesh>(null)
    const groupRef = useRef<THREE.Group>(null)
    const [transitionProgress, setTransitionProgress] = useState(0)
    const initialPosition = useRef<THREE.Vector3>(new THREE.Vector3())
    const targetPosition = useRef<THREE.Vector3>(new THREE.Vector3())
    const lastOrbitalAngle = useRef(Math.random() * Math.PI * 2)
    const fixedIslandPosition = useRef<THREE.Vector3>(new THREE.Vector3())
    const islandGeometryRef = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry())

    // Smooth easing function
    const easeInOutCubic = (x: number): number => {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }
    useEffect(() => {
        const baseGeo = new THREE.IcosahedronGeometry(3, 4);
        const position = baseGeo.attributes.position;
        const vertex = new THREE.Vector3();
    
        for (let i = 0; i < position.count; i++) {
          vertex.fromBufferAttribute(position, i);
    
          // Flatten top to create terrain cap
          if (vertex.y > 0.5) vertex.y = 0.45;
    
          // Elongate bottom to create floating effect
          if (vertex.y < 0) vertex.y *= 1.25;
    
          // Add noise
        //   const noise = (Math.random() - 0.5) * 0.01;
        //   vertex.x += noise;
        //   vertex.y += noise * 0.1;
        //   vertex.z += noise;

          // Add random terrain like effect
          const terrain = Math.sin(vertex.x * 10) * Math.cos(vertex.z * 10) * Math.random() * 1.5;
          vertex.y += terrain * 0.5;
    
          position.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
    
        position.needsUpdate = true;
        baseGeo.computeVertexNormals();
    
        // Assign to geometry ref
        islandGeometryRef.current = baseGeo;
      }, []);
      

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += planet.rotationSpeed * 0.01
        }

        if (groupRef.current && planet.orbitRadius > 0) {
            if (isTransitioning) {
                // Store initial position when transition starts
                if (transitionProgress === 0) {
                    const x = Math.cos(lastOrbitalAngle.current) * planet.orbitRadius
                    const z = Math.sin(lastOrbitalAngle.current) * planet.orbitRadius
                    initialPosition.current.set(x, groupRef.current.position.y, z)
                    targetPosition.current.set(x, theme === 'space' ? 0 : -2, z)

                    // Store the final island position when transitioning to island theme
                    if (theme === 'island') {
                        fixedIslandPosition.current.set(x, -2, z)
                    }
                }

                // Use smooth easing
                const easedProgress = easeInOutCubic(transitionProgress)

                // Calculate target angle based on theme
                const targetAngle = theme === 'space'
                    ? lastOrbitalAngle.current + 0.01 * planet.orbitSpeed * (1 - easedProgress)
                    : lastOrbitalAngle.current

                // Interpolate between current and target angles with easing
                const interpolatedAngle = THREE.MathUtils.lerp(
                    lastOrbitalAngle.current,
                    targetAngle,
                    easedProgress
                )

                // Update last orbital angle
                lastOrbitalAngle.current = interpolatedAngle

                // Calculate position with eased height transition
                const x = Math.cos(interpolatedAngle) * planet.orbitRadius
                const z = Math.sin(interpolatedAngle) * planet.orbitRadius
                const newY = THREE.MathUtils.lerp(
                    initialPosition.current.y,
                    targetPosition.current.y,
                    easedProgress
                )

                groupRef.current.position.set(x, newY, z)

            } else {
                if (theme === 'space') {
                    // Only update orbital angle if not hovered
                    if (!hovered) {
                        lastOrbitalAngle.current += 0.01 * planet.orbitSpeed
                        lastOrbitalAngle.current %= Math.PI * 2
                    }
                    const x = Math.cos(lastOrbitalAngle.current) * planet.orbitRadius
                    const z = Math.sin(lastOrbitalAngle.current) * planet.orbitRadius
                    groupRef.current.position.set(x, 0, z)
                } else {
                    // In island theme, use fixed position with small wave motion
                    const waveY = Math.sin(0.01 * 0.5) * 0.1 // Reduced wave height
                    groupRef.current.position.set(
                        fixedIslandPosition.current.x,
                        fixedIslandPosition.current.y + waveY,
                        fixedIslandPosition.current.z
                    )
                }
            }
        }
    })

    const getMaterial = () => {
        if (theme === 'space') {
            return (
                <meshPhysicalMaterial
                    color={planet.color}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={hovered ? planet.color : '#000000'}
                    emissiveIntensity={hovered ? 0.5 : 0}
                    transparent
                    opacity={0.9}
                />
            )
        } else {
            return (
                <meshStandardMaterial
                    color={planet.id === 'profile' ? '#4CAF50' : '#FFC107'} // Green for main island, yellow for others
                    roughness={0.8}
                    metalness={0.2}
                />
            )
        }
    }

    return (
        <Float
            speed={theme === 'space' ? 1.2 : 0.5}
            rotationIntensity={theme === 'space' ? 0.2 : 0.1}
            floatIntensity={theme === 'space' ? 0.2 : 0.1}
        >
            <group 
                ref={groupRef} 
                position={planet.orbitRadius === 0 ? planet.position : [0, 0, 0]}
                onClick={() => onSelect(planet)}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {theme === 'space' ? (
                    <Sphere args={[planet.size, 32, 32]} ref={meshRef}>
                        {getMaterial()}
                    </Sphere>
                ) : (
                    <mesh geometry={islandGeometryRef.current} ref={meshRef}>
                        {getMaterial()}
                    </mesh>
                )}
                {theme === 'space' && (
                    <Ring args={[planet.size + 0.2, planet.size + 0.4, 32]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshBasicMaterial
                            color={planet.color}
                            transparent
                            opacity={0.3}
                        />
                    </Ring>
                )}
                <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                    <Text
                        position={[0, planet.size + 0.5, 0]}
                        fontSize={0.5}
                        color={currentTheme.colors.foreground}
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.02}
                        outlineColor={currentTheme.colors.background}
                    >
                        {planet.name}
                    </Text>
                </Billboard>
                {hovered && (
                    <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                        <Html position={[0, planet.size + 5.5, 0]} center>
                            <div className="bg-theme-background/90 p-4 rounded-lg shadow-lg max-w-xs border border-theme-accent/20">
                                <h3 className="text-theme-foreground font-bold text-lg">{planet.name}</h3>
                                <p className="text-theme-muted text-sm mt-2">{planet.description}</p>
                            </div>
                        </Html>
                    </Billboard>
                )}
            </group>
        </Float>
    )
}

export function PortfolioWorld({ onPlanetClick }: { onPlanetClick?: (planetId: string) => void }) {
    const { planets } = useMemo(() => createSolarSystem(), [])
    const { currentTheme } = useTheme()
    const isDarkMode = useStore((state) => state.isDarkMode)
    const [worldTheme, setWorldTheme] = useState<WorldTheme>('space')
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [transitionProgress, setTransitionProgress] = useState(0)
    const seaPlaneRef = useRef<THREE.Mesh>(null)
    const [showSeaPlane, setShowSeaPlane] = useState(false)
    

    // Generate random points for particles
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 50
            const y = (Math.random() - 0.5) * 50
            const z = (Math.random() - 0.5) * 50
            temp.push(x, y, z)
        }
        return new Float32Array(temp)
    }, [])

    // Smooth easing function
    const easeInOutCubic = (x: number): number => {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }

    const updateInterval = 5; // Update every 5 frames
    const frameCounter = useRef(0);

    useFrame(() => {
        frameCounter.current++;

        if (frameCounter.current % updateInterval === 0) {
            frameCounter.current = 0;

            // Update transition progress with smoother timing
            if (isTransitioning) {
                setTransitionProgress(prev => {
                    const newProgress = Math.min(prev + 0.005, 1) // Slower transition
                    return newProgress
                })
            } else {
                setTransitionProgress(0)
            }

            // Animate sea plane
            if (seaPlaneRef.current) {
                const targetY = worldTheme === 'space' ? -20 : -3
                const currentY = seaPlaneRef.current.position.y
                const easedProgress = easeInOutCubic(transitionProgress)
                
                if (isTransitioning) {
                    seaPlaneRef.current.position.y = THREE.MathUtils.lerp(
                        currentY,
                        targetY,
                        easedProgress
                    )

                    // Update sea plane visibility
                    if (worldTheme === 'space' && transitionProgress > 0.9) {
                        setShowSeaPlane(false)
                    } else if (worldTheme === 'island' && transitionProgress > 0.1) {
                        setShowSeaPlane(true)
                    }
                } else {
                    seaPlaneRef.current.position.y = targetY
                    setShowSeaPlane(worldTheme === 'island')
                }
            }
        }
    })

    const handleThemeSwitch = () => {
        setIsTransitioning(true)
        setWorldTheme(prev => prev === 'space' ? 'island' : 'space')
        // Reset transition state after animation
        setTimeout(() => setIsTransitioning(false), 4000)
    }

    return (
        <>
            {/* Background Elements */}
            <color attach="background" args={[isDarkMode ? currentTheme.colors.background : currentTheme.colors.foreground]} />
            {worldTheme === 'space' ? (
                <>
                    <Stars radius={100} depth={25} count={1000} factor={4} saturation={0.2} fade speed={1} />
                    <Environment preset="night" />
                </>
            ) : (
                <>
                    <Environment preset="sunset" />
                </>
            )}
            {/* Sea plane is always rendered but controlled by visibility */}
            <mesh 
                ref={seaPlaneRef}
                rotation={[-Math.PI / 2, 0, 0]} 
                position={[0, -20, 0]} // Start from below
                visible={showSeaPlane}
            >
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                    
                    color="#2196F3" // Blue water color
                    roughness={0.1}
                    metalness={0.2}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <fog attach="fog" args={[currentTheme.colors.background, 30, 100]} />

            {/* Main Scene */}
            <group>
                {/* Planets/Islands */}
                {planets.map((planet) => (
                    <group key={planet.id}>
                        <PlanetNode
                            planet={planet}
                            onSelect={(planet) => onPlanetClick?.(planet.id)}
                            theme={worldTheme}
                            isTransitioning={isTransitioning}
                        />

                        {/* Orbit Ring/Water Ripple */}
                        {planet.orbitRadius > 0 && (
                            <Ring
                                args={[planet.orbitRadius - 0.1, planet.orbitRadius + 0.1, 128]}
                                rotation={[Math.PI / 2, 0, 0]}
                            >
                                <meshBasicMaterial
                                    color={worldTheme === 'space' ? planet.color : '#2196F3'}
                                    transparent
                                    opacity={0.1}
                                />
                            </Ring>
                        )}
                    </group>
                ))}

                {/* Orbital Paths/Water Currents */}
                {planets.map((planet) => (
                    planet.orbitRadius > 0 && (
                        <Line
                            key={`orbit-${planet.id}`}
                            points={Array.from({ length: 64 }, (_, i) => {
                                const angle = (i / 64) * Math.PI * 2
                                return [
                                    Math.cos(angle) * planet.orbitRadius,
                                    0,
                                    Math.sin(angle) * planet.orbitRadius
                                ]
                            })}
                            color={worldTheme === 'space' ? planet.color : '#2196F3'}
                            lineWidth={1}
                            opacity={0.2}
                            transparent
                            dashed
                            dashScale={2}
                            dashSize={0.5}
                            gapSize={0.5}
                        />
                    )
                ))}

                {/* Connection Lines/Water Paths */}
                {planets.map((planet) => (
                    planet.id !== 'profile' && currentTheme.name === 'space' && (
                        <Line
                            key={`connection-${planet.id}`}
                            points={[[0, 0, 0], planet.position]}
                            color={worldTheme === 'space' ? planet.color : '#2196F3'}
                            lineWidth={1}
                            opacity={0.2}
                            transparent
                            dashed
                            dashScale={2}
                            dashSize={0.5}
                            gapSize={0.5}
                        />
                    )
                ))}

                {/* Ambient Particles/Bubbles */}
                <Points>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[particles, 3]}
                        />
                    </bufferGeometry>
                    <PointMaterial
                        transparent
                        color={worldTheme === 'space' ? currentTheme.colors.accent : '#2196F3'}
                        size={0.02}
                        sizeAttenuation
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </Points>

                {/* Theme Switcher */}
                <group position={[0, 10, 0]}>
                    <Html
                        transform
                        distanceFactor={25}
                        style={{
                            transition: 'all 0.2s',
                            opacity: 1,
                            transform: 'scale(1)',
                        }}
                    >
                        <button
                            onClick={handleThemeSwitch}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full transition-all backdrop-blur-md border border-white/20 shadow-lg"
                            style={{
                                fontFamily: 'system-ui, sans-serif',
                                fontSize: '0.875rem',
                                letterSpacing: '0.025em',
                                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.1)',
                                zIndex: -999
                            }}
                        >
                            Switch to {worldTheme === 'space' ? 'Island' : 'Space'} Theme
                        </button>
                    </Html>
                </group>
            </group>
        </>
    )
}
