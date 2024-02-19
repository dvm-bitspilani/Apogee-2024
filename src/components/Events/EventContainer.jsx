import { useThree } from "@react-three/fiber";
import { Text, Image } from "@react-three/drei";

import { useControls } from "leva";
import OpenButton from "./OpenButton";

import placeholder from "@assets/events/event-cat-placeholder.png";
import { useEffect, useRef } from "react";

import * as THREE from "three";

export default function EventContainer(props) {
  const { position } = props;
  const { viewport } = useThree();

  const { xPercent, yPercent } = useControls("EventContainer", {
    xPercent: {
      value: 0.62,
      step: 0.01,
      min: 0,
      max: 1,
    },
    yPercent: {
      value: 0.54,
      step: 0.01,
      min: 0,
      max: 1,
    },
  });

  const { textPosition } = useControls("EventContainer", {
    textPosition: {
      value: [-0.45, 0.37, 0],
      step: 0.01,
    },
  });

  const imgRef = useRef();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(imgRef.current);
    const size = box.getSize(new THREE.Vector3());

    imgRef.current.position.x -= size.x / 2;
    imgRef.current.position.y -= size.y / 2;
  }, [viewport]);

  return (
    <group position={position}>
      <mesh>
        <planeGeometry
          attach="geometry"
          args={[xPercent * viewport.width, yPercent * viewport.height]}
        />
        <meshBasicMaterial
          attach="material"
          color="#314557"
          opacity={0.4}
          transparent
        />
      </mesh>
      <Text
        anchorX={"left"}
        position={[
          viewport.width * textPosition[0] * xPercent,
          viewport.height * textPosition[1] * yPercent,
          0,
        ]}
        font="/fonts/Alacrity Sans Bold.ttf"
        fontSize={Math.min(viewport.width * 0.04, 0.5)}
        maxWidth={viewport.width * 0.23}
      >
        Kernel
        <meshStandardMaterial
          attach="material"
          color={"#9AF0F4"}
          emissiveIntensity={1.5}
          emissive={"#9AF0F4"}
          toneMapped={false}
        />
      </Text>
      <Text
        anchorX={"left"}
        anchorY={"top"}
        position={[
          viewport.width * textPosition[0] * xPercent,
          viewport.height * textPosition[1] * yPercent - 0.4,
          // 0,
          0,
        ]}
        color={"#9AF0F4"}
        font="/fonts/Alacrity Sans Light.ttf"
        fontSize={Math.min(viewport.width * 0.0115, 0.2)}
        maxWidth={viewport.width * 0.23}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut
        nulla id tellus mattis tempor. Sed augue odio Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Quisque ut nulla id tellus mattis tempor.
        Sed augue
      </Text>
      <Image
        ref={imgRef}
        position={[
          -viewport.width * textPosition[0] * xPercent,
          viewport.height * textPosition[1] * yPercent,
          0,
        ]}
        url={placeholder}
        scale={[viewport.width * 0.3, viewport.height * 0.3, 1]}
        anchorX={"right"}
      />
      <OpenButton
        position={[
          // -viewport.width * textPosition[0] * xPercent,
          0,
          -viewport.height * textPosition[1] * yPercent,
          0,
        ]}
      />
    </group>
  );
}
