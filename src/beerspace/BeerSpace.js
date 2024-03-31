import { useMemo } from 'react';
import { BlurFilter } from 'pixi.js';
import { Stage, Container, Text } from '@pixi/react';
import Freddy from './Freddy';


export const GameComponent = () => {

  const blurFilter = useMemo(() => new BlurFilter(4), []);



  return (
    <Stage>
      <Freddy />
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
      <GameComponent />
    </div>);
}

export default BeerSpace;