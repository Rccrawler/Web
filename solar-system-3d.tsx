"use client"

import { useRef } from "react"
import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, useTexture, Stars, Html } from "@react-three/drei"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import * as THREE from 'three'

function SkyBox() {
  const texture = useTexture("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/milky-way-5295155_1280-okGXndVx929viq4DXywnueICzGV3gG.jpg")
  return (
    <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  )
}

function Planet({ position, size, textureUrl, name, url }) {
  const [texture] = useLoader(TextureLoader, [textureUrl])
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[size, 32, 32]}>
        <meshStandardMaterial map={texture} />
      </Sphere>
      <Html distanceFactor={15}>
        <div className="bg-black bg-opacity-50 text-white p-2 rounded cursor-pointer"
             onClick={() => window.open(url, "_blank")}>
          {name}
        </div>
      </Html>
    </group>
  )
}

function SolarSystem() {
  return (
    <>
      {/* Sol */}
      <group position={[0, 0, 0]}>
        <Sphere args={[2, 32, 32]}>
          <meshBasicMaterial color="#FDB813" />
        </Sphere>
        <Html distanceFactor={15}>
          <div className="bg-black bg-opacity-50 text-white p-2 rounded cursor-pointer"
               onClick={() => window.open("https://es.wikipedia.org/wiki/Sol", "_blank")}>
            Sol
          </div>
        </Html>
      </group>

      {/* Planetas */}
      <Planet position={[3, 0, 0]} size={0.08} textureUrl="/assets/3d/texture_earth.jpg" name="Mercurio" url="https://es.wikipedia.org/wiki/Mercurio_(planeta)" />
      <Planet position={[4, 0, 0]} size={0.1} textureUrl="/assets/3d/texture_earth.jpg" name="Venus" url="https://es.wikipedia.org/wiki/Venus_(planeta)" />
      <Planet position={[5, 0, 0]} size={0.1} textureUrl="/assets/3d/texture_earth.jpg" name="Tierra" url="https://es.wikipedia.org/wiki/Tierra" />
      <Planet position={[6, 0, 0]} size={0.08} textureUrl="/assets/3d/texture_earth.jpg" name="Marte" url="https://es.wikipedia.org/wiki/Marte_(planeta)" />
      <Planet position={[8, 0, 0]} size={0.4} textureUrl="/assets/3d/texture_earth.jpg" name="Júpiter" url="https://es.wikipedia.org/wiki/J%C3%BApiter_(planeta)" />
      <Planet position={[10, 0, 0]} size={0.3} textureUrl="/assets/3d/texture_earth.jpg" name="Saturno" url="https://es.wikipedia.org/wiki/Saturno_(planeta)" />
      <Planet position={[12, 0, 0]} size={0.2} textureUrl="/assets/3d/texture_earth.jpg" name="Urano" url="https://es.wikipedia.org/wiki/Urano_(planeta)" />
      <Planet position={[14, 0, 0]} size={0.2} textureUrl="/assets/3d/texture_earth.jpg" name="Neptuno" url="https://es.wikipedia.org/wiki/Neptuno_(planeta)" />
    </>
  )
}

export default function Component() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 10, 20], fov: 45 }}>
        <SkyBox />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true} />
        <SolarSystem />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}