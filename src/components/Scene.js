import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";

const Model = ({ url, scale = 1 }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
};

const Scene = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        {/* Vous pouvez ajuster l'échelle ici, par exemple scale={0.5} pour réduire de moitié la taille */}
        <Model url="/assets/model/model.glb" scale={1} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
