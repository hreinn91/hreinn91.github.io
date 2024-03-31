import { useMemo, useState } from 'react';
import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text, Graphics, useTick } from '@pixi/react';

let i = 0;

const Bunny = () => {

  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [rotation, setRotation] = useState(0);

  useTick(delta => {
    i += 0.05 * delta;

    setX(Math.sin(i) * 100 + 150); // Adjusted to keep the sprite within the container
    setY(Math.sin(i / 1.5) * 100 + 150); // Same here
    setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);
  });

  return (<Sprite
    image="https://pixijs.io/pixi-react/img/bunny.png"
    x={x}
    y={y}
    anchor={{ x: 0.5, y: 0.5 }}
  />);
}

export const MyComponent = () => {

  const blurFilter = useMemo(() => new BlurFilter(4), []);



  return (
    <Stage>
      <Bunny />
      <Container x={400} y={330}>
        <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
      </Container>
    </Stage>
  );
};



function BeerSpace() {
  return (
    <div>
      <p>See bunny bellow</p>
      <MyComponent />
    </div>);
}

export default BeerSpace;