"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Core({ state }: { state: "idle" | "listening" | "thinking" }) {
  const mesh = useRef<THREE.Mesh>(null);
  const distort = state === "thinking" ? 0.55 : state === "listening" ? 0.4 : 0.3;
  const speed = state === "thinking" ? 3.0 : state === "listening" ? 2.0 : 1.4;

  useFrame((_, dt) => {
    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.15;
      mesh.current.rotation.x += dt * 0.04;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={mesh} scale={1.6}>
        <icosahedronGeometry args={[1, 48]} />
        <MeshDistortMaterial
          color="#C8C8D0"
          emissive="#7C5CFF"
          emissiveIntensity={0.12}
          roughness={0.18}
          metalness={0.95}
          distort={distort}
          speed={speed}
        />
      </mesh>
    </Float>
  );
}

function Halo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.12;
  });
  return (
    <mesh ref={ref} position={[0, 0, -0.5]}>
      <torusGeometry args={[2.1, 0.015, 16, 200]} />
      <meshBasicMaterial color="#7C5CFF" transparent opacity={0.35} />
    </mesh>
  );
}

function Particles({ count = 300 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#E8E8EC" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export function Orb3D({
  state = "idle",
  size = 420,
}: {
  state?: "idle" | "listening" | "thinking";
  size?: number;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);

  if (reduced) {
    return (
      <div
        className="mx-auto rounded-full bg-orb-grad shadow-glow"
        style={{ width: size * 0.7, height: size * 0.7 }}
        aria-hidden
      />
    );
  }

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.55) 0%, rgba(124,92,255,0) 65%)",
        }}
      />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} color="#F5F5F7" />
          <pointLight position={[-3, -2, -2]} intensity={0.8} color="#7C5CFF" />
          <Core state={state} />
          <Halo />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
