import { useState } from 'react';

import { Stage, Container, Sprite, useTick } from '@inlet/react-pixi';

let i = 0;

const Bunny = () => {
  // states
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotation, setRotation] = useState(0);

  // custom ticker
  useTick(delta => {
    i += 0.05 * delta;

    setX(Math.sin(i) * 100 + 150); // Adjusted to keep the sprite within the container
    setY(Math.sin(i / 1.5) * 100 + 150); // Same here
    setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);
  });

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      anchor={0.5}
      x={x}
      y={y}
      rotation={rotation}
    />
  );
};

const App = () => (
  <Stage width={300} height={300} options={{ backgroundColor: 0x01262a }}>
    <Container>
      <Bunny />
    </Container>
  </Stage>
);

function BeerSpace() {
  return (
    <div>
      <p>Hello </p>
      <Bunny />
    </div>
  );
}

export default BeerSpace;
