/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import {useState,  useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { gsap } from "gsap";

// import { EffectComposer, Outline, SelectiveBloom } from "@react-three/postprocessing";
// import { BlendFunction, Resizer, KernelSize } from "postprocessing";
// import state from "../state";

export function Asteroid(props) {
  const { nodes, materials } = useGLTF("/models/asteroid3.glb");

  const asteroidRef = useRef();
  const asteroidMeshRef = useRef();

  // const [isDestroyed, setIsDestroyed] = useState(false);

  // const { position } = useControls("Asteroid", {
  //   position: {
  //     value: [-9, 10, -12],
  //     step: 0.1,
  //     label: "Position",
  //   },
  // });

  useFrame((state, delta) => {
    asteroidRef.current.rotation.y += delta;
    asteroidRef.current.rotation.x += delta;

    asteroidRef.current.position.x =
      6 * Math.sin(state.clock.elapsedTime * 0.2);
    asteroidRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.35) * 2;
    asteroidRef.current.position.z =
      8 * Math.cos(state.clock.elapsedTime * 0.2);
  });

  // useEffect(() => {
  //   if (isDestroyed && asteroidMeshRef.current) {
  //     asteroidMeshRef.current.visible = false;
  //   }
  // }, [isDestroyed]);

  // const addExplosion = (e) => {
  //   setIsDestroyed(true);
  //   state.explosions.push({
  //     guid: Math.random(),
  //     offset: asteroidRef.current.position,
  //     scale: 0.1,
  //   });
  // }

  return (
    <>
        <group ref={asteroidRef} {...props} dispose={null} 
        // onClick={addExplosion}
        >
          <mesh
            ref={asteroidMeshRef}
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials.Material}
            scale={0.5}
            onPointerEnter={(e) => {
              gsap.to(e.object.scale, {
                x: 0.7,
                y: 0.7,
                z: 0.7,
                duration: 0.5,
              });
            }}
            onPointerLeave={(e) => {
              gsap.to(e.object.scale, {
                x: 0.5,
                y: 0.5,
                z: 0.5,
                duration: 0.5,
              });
            }}
          />
        </group>

    </>
  );
}

useGLTF.preload("/models.asteroid3.glb");
