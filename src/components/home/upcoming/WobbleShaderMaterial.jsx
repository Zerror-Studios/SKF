import React, { useRef, useMemo } from "react";
import { useFrame, useLoader, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

const WobbleShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
  },
  `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float wobbleStrength = smoothstep(0.9, 0.0, vUv.y); 
      float wobble = sin((pos.x + uTime * 0.3) * 5.0) * 0.3;
      pos.z += wobble * wobbleStrength;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `
);

extend({ WobbleShaderMaterial });

const WobbleImageMesh = () => {
  const materialRef = useRef();
  const texture = useLoader(
    THREE.TextureLoader,
    "/images/home/upcoming-rel.png"
  );
  const { viewport } = useThree();

  // Calculate aspect ratio once
  const aspect = useMemo(
    () => texture.image.width / texture.image.height,
    [texture]
  );

  // Dynamic scale for full width, keeping aspect ratio
  const scale = [viewport.width * 0.95, (viewport.width * 0.94) / aspect, 1];

  useFrame((state) => {
    if (materialRef.current)
      materialRef.current.uTime = state.clock.getElapsedTime();
  });

  return (
    <mesh scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <wobbleShaderMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
};

export default WobbleImageMesh;
