import { useEffect, useRef} from "react";
import { useThree, useFrame } from "@react-three/fiber";

import { useControls } from "leva";

// Styles
// import * as hudStyles from "@styles/HUD.module.scss";

import { gsapOnRender } from "./gsapOnRender";
import Earth from "./Earth";
import AlienPlanet from "../Models/AlienPlanet";
import { AlienPlanetGLB } from "../Models/AlienPlanet";
import AlienPlanetGLTF from "../Models/AlienPlanetGLTF";
import ProceduralPlanet from "../Models/ProceduralPlanet";

import gsap from "gsap/gsap-core";
import { gsapOnMenu } from "./gsapOnMenu";

import state from "../state";
import { useSnapshot } from "valtio";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { Asteroid } from "../Models/Asteroid";
import Explosions from "../Models/Explosion";

export function Scene() {
  const { camera } = useThree();

  const menuPos = [-2, -1.5, -0];
  const menuRot = [0, -1.9, 0];

  const { position, rotation } = useControls("Camera", {
    position: {
      value: [...menuPos],
      step: 0.1,
      min: -10,
      max: 10,
    },
    rotation: {
      value: [...menuRot],
      step: 0.1,
      min: -Math.PI * 2,
      max: Math.PI * 2,
    },
  });

  useFrame(() => {
    // camera.position.set(...position);
    // camera.rotation.set(...rotation);
    // console.log(camera.position);
  });

  function rotationUpdateOnMouseMove(e, cameraPos) {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const center = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    const maxRotate = Math.PI / 16;
    // const { innerWidth, innerHeight } = window;

    const y = (center.x - clientX) / innerWidth;
    const x = (center.y - clientY) / innerHeight;

    // console.log(cameraPos);

    gsap.to(camera.rotation, {
      x: cameraPos[0] + x * maxRotate,
      y: cameraPos[1] + y * maxRotate,
      ease: "power2.out",
    });
  }

  const snap = useSnapshot(state);

  const rotationUpdateOnMouseMoveHandler = (e) =>
    rotationUpdateOnMouseMove(e, [0, 0, 0]);
  const rotationUpdateOnMouseMoveHandler2 = (e) =>
    rotationUpdateOnMouseMove(e, menuRot);

  useEffect(() => {
    gsapOnRender(camera, rotationUpdateOnMouseMoveHandler);

    gsap.to(camera.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      delay: 2,
      ease: "power2.inOut",
    });

    return () => {
      window?.removeEventListener(
        "mousemove",
        rotationUpdateOnMouseMoveHandler
      );
    };
  }, [camera]);

  const hamMenuButton = document.querySelector("#ham-menu-button");
  // console.log("hello");

  useEffect(() => {
    const gsapOnMenuHandler = () =>
      gsapOnMenu(
        camera,
        menuPos,
        menuRot,
        state.isHamOpen,
        rotationUpdateOnMouseMoveHandler
      );

    hamMenuButton.addEventListener("click", gsapOnMenuHandler);

    return () => {
      window?.removeEventListener(
        "mousemove",
        rotationUpdateOnMouseMoveHandler2
      );
    };
  }, [snap.isHamOpen, camera]);

  const { lightPos, lightColor, intensity } = useControls("Light on planet from menu open", {
    lightPos: {
      value: [4, -1, 5],
      step: 1,
      min: -1000,
      max: 1000,
    },
    lightColor: {
      value: "#be3d2d",
    },
    intensity: {
      value: 0,
      step: 0.1,
      min: 0,
      max: 10,
    },
  });

  const lightRef = useRef();
  // useHelper(lightRef, DirectionalLightHelper, 2, "hotpink");

  useEffect(() => {
    // lightRef.current.target = state.alienPlanet;
    // console.log(state.alienPlanet);
  }, [snap.alienPlanet]);

  return (
    <>
      {/* <axesHelper args={[5]} /> */}
      {/* <Earth /> */}
      {/* <AlienPlanet /> */}
      {/* <AlienPlanetGLB /> */}
      <AlienPlanetGLTF />
      {/* <ProceduralPlanet /> */}
      <directionalLight
        ref={lightRef}
        position={lightPos}
        intensity={intensity}
        color={Number(lightColor.replace("#", "0x"))}
      />
      <Asteroid />
      <Explosions />
    </>
  );
}
