"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

// Montaña / cerro estilizado (piramide natural)
function Mountain() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.15;
    }
  });

  return (
    <group ref={group} position={[0, -1.2, 0]}>
      {/* Cerro principal */}
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[1.6, 2.4, 4, 1]} />
        <meshStandardMaterial
          color="#3a4d24"
          roughness={0.85}
          flatShading
        />
      </mesh>
      {/* Capa de niebla / luz */}
      <mesh position={[0, 1.6, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.7, 0.9, 4, 1]} />
        <meshStandardMaterial color="#c9a227" roughness={0.6} flatShading />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[2.2, 2.6, 0.6, 6]} />
        <meshStandardMaterial color="#273617" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

// Partículas flotantes (energía / bienestar)
function Particles() {
  const points = useRef<THREE.Points>(null);
  const count = 400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#e0c25a"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 2]} intensity={1.2} color="#fff8e7" />
          <pointLight position={[-3, 1, -2]} intensity={0.6} color="#c9a227" />
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
            <Mountain />
          </Float>
          <Particles />
          <Stars radius={30} depth={20} count={800} factor={2} fade speed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
