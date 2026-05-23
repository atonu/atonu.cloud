'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

// Compact 3D workstation for About section
function Room() {
  return (
    <group rotation={[0.12, -0.5, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.5,0]} receiveShadow>
        <planeGeometry args={[7,7]} />
        <meshStandardMaterial color="#c8b99a" roughness={0.8} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0,1,-3]} receiveShadow>
        <boxGeometry args={[7,5.5,0.1]} />
        <meshStandardMaterial color="#5a7a9c" roughness={0.9} />
      </mesh>
      {/* Side wall */}
      <mesh position={[-3,1,0]} rotation={[0,Math.PI/2,0]} receiveShadow>
        <boxGeometry args={[7,5.5,0.1]} />
        <meshStandardMaterial color="#4e6e8a" roughness={0.9} />
      </mesh>
      {/* Desk */}
      <mesh position={[0,-0.6,-0.4]} castShadow receiveShadow>
        <boxGeometry args={[3,0.1,1.3]} />
        <meshStandardMaterial color="#a0785a" roughness={0.7} />
      </mesh>
      {/* Desk legs */}
      {([[-1.35,-1.15,0.5],[1.35,-1.15,0.5],[-1.35,-1.15,-0.5],[1.35,-1.15,-0.5]] as [number,number,number][]).map((p,i)=>(
        <mesh key={i} position={p}><boxGeometry args={[0.08,1.1,0.08]} /><meshStandardMaterial color="#7a5a3a" roughness={0.8} /></mesh>
      ))}
      {/* Monitor */}
      <mesh position={[0,0.2,-0.75]} castShadow>
        <boxGeometry args={[1.2,0.78,0.05]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0,0.2,-0.72]}>
        <boxGeometry args={[1.1,0.68,0.01]} />
        <meshStandardMaterial color="#0d1b2a" emissive="#1a3a5c" emissiveIntensity={0.7} />
      </mesh>
      {/* Code lines on monitor */}
      {[0.18,0.08,-0.02,-0.12].map((y,i)=>(
        <mesh key={i} position={[-0.1+i*0.04, y, -0.71]}>
          <boxGeometry args={[0.35-i*0.05,0.022,0.001]} />
          <meshStandardMaterial color={['#4ec9b0','#ce9178','#569cd6','#4ec9b0'][i]} emissive={['#4ec9b0','#ce9178','#569cd6','#4ec9b0'][i]} emissiveIntensity={1} />
        </mesh>
      ))}
      {/* Monitor stand */}
      <mesh position={[0,-0.25,-0.72]}>
        <boxGeometry args={[0.06,0.1,0.06]} />
        <meshStandardMaterial color="#333" metalness={0.6} />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0,-0.52,0.3]}>
        <boxGeometry args={[0.7,0.03,0.25]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Chair */}
      <group position={[0.3,-0.9,0.85]}>
        <mesh castShadow><boxGeometry args={[0.65,0.09,0.6]} /><meshStandardMaterial color="#3a6ea5" roughness={0.7} /></mesh>
        <mesh position={[0,0.42,-0.26]} castShadow><boxGeometry args={[0.6,0.85,0.09]} /><meshStandardMaterial color="#2d5a8a" roughness={0.7} /></mesh>
        <mesh position={[0,-0.28,0]}><cylinderGeometry args={[0.055,0.055,0.5,10]} /><meshStandardMaterial color="#222" metalness={0.7} /></mesh>
        <mesh position={[0,-0.58,0]}><cylinderGeometry args={[0.26,0.26,0.055,5]} /><meshStandardMaterial color="#333" metalness={0.5} /></mesh>
      </group>
      {/* Plant */}
      <group position={[2.2,-0.85,-2.6]}>
        <mesh castShadow><cylinderGeometry args={[0.18,0.14,0.32,14]} /><meshStandardMaterial color="#e8e8e0" roughness={0.9} /></mesh>
        {[0,1.6,3.2,4.8].map((a,i)=>(
          <mesh key={i} position={[Math.cos(a)*0.2,0.42+i*0.02,Math.sin(a)*0.2]} rotation={[0.3,a,0.4]}>
            <sphereGeometry args={[0.16,7,7]} />
            <meshStandardMaterial color="#3a7a2a" roughness={0.9} />
          </mesh>
        ))}
      </group>
      {/* Lamp */}
      <group position={[-0.9,-0.25,-0.8]}>
        <mesh castShadow><cylinderGeometry args={[0.12,0.12,0.05,14]} /><meshStandardMaterial color="#c8a850" roughness={0.4} metalness={0.5} /></mesh>
        <mesh position={[0,0.32,0]} rotation={[0.4,0,0.2]} castShadow><cylinderGeometry args={[0.022,0.022,0.6,7]} /><meshStandardMaterial color="#c8a850" roughness={0.4} metalness={0.5} /></mesh>
        <mesh position={[0.1,0.63,-0.12]} rotation={[0.8,0,0]}>
          <coneGeometry args={[0.16,0.22,14,1,true]} />
          <meshStandardMaterial color="#f0c040" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0.1,0.56,-0.12]} intensity={0.9} color="#ffdd88" distance={2.2} />
      </group>
      {/* Mug */}
      <group position={[0.8,-0.5,-0.5]}>
        <mesh castShadow><cylinderGeometry args={[0.07,0.06,0.14,14]} /><meshStandardMaterial color="#1a1a2e" roughness={0.7} /></mesh>
        <mesh position={[0,0.06,0]}><cylinderGeometry args={[0.064,0.064,0.01,14]} /><meshStandardMaterial color="#3d1c02" roughness={0.9} /></mesh>
      </group>
      {/* Rug */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0.3,-1.49,0.5]} receiveShadow>
        <planeGeometry args={[2.8,2.2]} />
        <meshStandardMaterial color="#9a7a5a" roughness={0.95} />
      </mesh>
      {/* Window */}
      <group position={[1.2,1.0,-2.95]}>
        <mesh><boxGeometry args={[1.3,1.1,0.05]} /><meshStandardMaterial color="#8b6914" roughness={0.8} /></mesh>
        <mesh position={[0,0,0.04]}><planeGeometry args={[1.15,0.95]} /><meshStandardMaterial color="#87ceeb" transparent opacity={0.35} /></mesh>
        <pointLight position={[0,0,0.8]} intensity={0.5} color="#fff5e0" distance={3.5} />
      </group>
    </group>
  );
}

function AutoRotate() {
  const { camera } = useThree();
  const t = useRef(0);
  useFrame((_, delta) => {
    t.current += delta * 0.15;
    camera.position.x = 4 + Math.sin(t.current) * 0.3;
    camera.position.y = 3.5 + Math.cos(t.current * 0.7) * 0.15;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function AboutThreeScene() {
  return (
    <Canvas shadows gl={{ antialias: true, alpha: true }} style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <PerspectiveCamera makeDefault position={[4, 3.5, 5]} fov={44} />
      <AutoRotate />
      <ambientLight intensity={0.5} color="#fff5e0" />
      <directionalLight position={[5,8,5]} intensity={1.3} castShadow color="#fffaf0" />
      <pointLight position={[-3,3,2]} intensity={0.35} color="#4f6ef7" />
      <Float floatIntensity={0.2} speed={1.0} rotationIntensity={0.06}>
        <Room />
      </Float>
    </Canvas>
  );
}
