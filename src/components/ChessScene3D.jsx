import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Floating Chess Piece Component
function FloatingChessPiece({ position, type, color, speed = 1 }) {
    const meshRef = useRef();
    const trailRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime * speed;

            // Orbital motion
            meshRef.current.position.x = position[0] + Math.sin(time * 0.5) * 2;
            meshRef.current.position.y = position[1] + Math.cos(time * 0.3) * 1.5;
            meshRef.current.position.z = position[2] + Math.sin(time * 0.4) * 2;

            // Rotation
            meshRef.current.rotation.x = time * 0.3;
            meshRef.current.rotation.y = time * 0.5;
            meshRef.current.rotation.z = time * 0.2;
        }
    });

    // Different shapes for different piece types
    const getPieceGeometry = () => {
        switch (type) {
            case 'king':
                return (
                    <group ref={meshRef}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.4, 0.5, 1.2, 8]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                        <mesh position={[0, 0.8, 0]} castShadow>
                            <sphereGeometry args={[0.4, 16, 16]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                        <mesh position={[0, 1.2, 0]} castShadow>
                            <boxGeometry args={[0.6, 0.1, 0.1]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                    </group>
                );
            case 'queen':
                return (
                    <group ref={meshRef}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.4, 0.5, 1, 8]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                        <mesh position={[0, 0.7, 0]} castShadow>
                            <coneGeometry args={[0.5, 0.8, 8]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                    </group>
                );
            case 'rook':
                return (
                    <group ref={meshRef}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.4, 0.5, 1, 4]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                        <mesh position={[0, 0.7, 0]} castShadow>
                            <boxGeometry args={[0.6, 0.4, 0.6]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                    </group>
                );
            case 'knight':
                return (
                    <mesh ref={meshRef} castShadow>
                        <torusKnotGeometry args={[0.4, 0.15, 64, 16]} />
                        <meshStandardMaterial
                            color={color}
                            metalness={0.8}
                            roughness={0.2}
                            emissive={color}
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                );
            case 'bishop':
                return (
                    <group ref={meshRef}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.3, 0.4, 0.8, 8]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                        <mesh position={[0, 0.6, 0]} castShadow>
                            <sphereGeometry args={[0.35, 16, 16]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                    </group>
                );
            default: // pawn
                return (
                    <group ref={meshRef}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.3, 0.35, 0.6, 8]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                        <mesh position={[0, 0.5, 0]} castShadow>
                            <sphereGeometry args={[0.3, 16, 16]} />
                            <meshStandardMaterial
                                color={color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                    </group>
                );
        }
    };

    return getPieceGeometry();
}

// Particle Field
function ParticleField() {
    const particlesRef = useRef();
    const particleCount = 200;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

        // Purple to blue gradient
        const color = new THREE.Color();
        color.setHSL(0.7 + Math.random() * 0.1, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Glowing Orb Background
function GlowingOrb({ position, color, scale = 1 }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime) * 0.1);
        }
    });

    return (
        <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.3}
            />
        </Sphere>
    );
}

// Main Scene
export default function FloatingChessScene3D() {
    const chessPieces = [
        { type: 'king', position: [0, 2, 0], color: '#8b5cf6', speed: 0.8 },
        { type: 'queen', position: [3, 0, 2], color: '#3b82f6', speed: 1.2 },
        { type: 'rook', position: [-3, 1, -2], color: '#ec4899', speed: 1.0 },
        { type: 'knight', position: [2, -1, -3], color: '#06b6d4', speed: 1.5 },
        { type: 'bishop', position: [-2, -2, 1], color: '#8b5cf6', speed: 0.9 },
        { type: 'pawn', position: [1, 3, 3], color: '#3b82f6', speed: 1.3 },
        { type: 'pawn', position: [-1, -3, -1], color: '#ec4899', speed: 1.1 },
        { type: 'knight', position: [4, 1, -1], color: '#06b6d4', speed: 0.7 },
    ];

    return (
        <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.3}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 2.5}
                />

                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <pointLight position={[-10, -10, -5]} intensity={0.8} color="#8b5cf6" />
                <pointLight position={[10, -10, 5]} intensity={0.8} color="#3b82f6" />
                <pointLight position={[0, 10, 0]} intensity={0.5} color="#ec4899" />

                {/* Glowing Orbs */}
                <GlowingOrb position={[-5, 3, -5]} color="#8b5cf6" scale={2} />
                <GlowingOrb position={[5, -3, -5]} color="#3b82f6" scale={1.5} />
                <GlowingOrb position={[0, 0, -8]} color="#ec4899" scale={2.5} />

                {/* Chess Pieces */}
                {chessPieces.map((piece, index) => (
                    <FloatingChessPiece
                        key={index}
                        position={piece.position}
                        type={piece.type}
                        color={piece.color}
                        speed={piece.speed}
                    />
                ))}

                {/* Particle Field */}
                <ParticleField />

                {/* Environment */}
                <Environment preset="night" />

                {/* Fog for depth */}
                <fog attach="fog" args={['#0a0a0f', 10, 30]} />
            </Canvas>
        </div>
    );
}
