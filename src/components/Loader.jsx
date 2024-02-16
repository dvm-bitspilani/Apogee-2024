import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  // console.log(progress);
  return (
    <Html center fullscreen>
      {progress} % loaded
    </Html>
  );
}
