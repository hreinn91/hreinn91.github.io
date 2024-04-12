import { useState, useRef, useEffect } from 'react';
import { Stage, Container, Text, Sprite } from '@pixi/react';
import Freddy from './Freddy';
import lapinKulta from '../assets/lapin-kulta.png';
import lyftImage from '../assets/lyft-citrus.png';
import stinsenImage from '../assets/stinsen-1.png';
import BeerSpaceHeader from './BeerSpaceHeader';

export const GameComponent = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 400,
    height: 600
  });
  const [clickEvent, setClickEvent] = useState({
    x: -1,
    y: -1,
    rectLeft: -1,
    rectTop: -1,
  });
  const [score, setScore] = useState(0);
  const [beer, setBeer] = useState({ x: 300, y: 300, width: 0, height: 0 });
  const [lyft, setLyft] = useState({ x: -100, y: -100, isSpawned: -1 });

  const handleStageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setClickEvent({
      x: e.clientX,
      y: e.clientY,
      rectLeft: rect.left,
      rectTop: rect.top,
    });
  };

  const incrementBeer = () => {
    setScore((prevScore) => prevScore + 1);
    setBeerPosition();
  };

  const setBeerPosition = () => {
    setBeer({
      x: getInBoundValue(windowDimensions.width),
      y: getInBoundValue(windowDimensions.height),
    });
  };

  const incrementLyft = () => {
    despawnLyft();
    setScore((prevScore) => prevScore + 10);
  };

  const spawnLyft = () => {
    setLyft({
      isSpawned: 1,
      x: getInBoundValue(windowDimensions.width),
      y: getInBoundValue(windowDimensions.height),
    });

  };

  const getInBoundValue = (length) => {
    const value = Math.random() * (length - 40) + 20;
    console.log(`${value}`);
    return value;
  };

  const despawnLyft = () => {
    setLyft({
      isSpawned: -1,
      x: -500,
      y: -500,
    });
  };

  function getScore() {
    return score;
  }

  useEffect(() => {
    if (score > 1) {
      if (lyft.isSpawned === -1 && Math.random() > 0.9) {
        spawnLyft();
      }
    }
  }, [score]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <BeerSpaceHeader
        score={score}
      />
      <Stage
        onClick={handleStageClick}>
        <Sprite
          image={stinsenImage}
          scale={0.99}
        />
        <Sprite
          image={lapinKulta}
          scale={0.04}
          x={beer.x}
          y={beer.y}
          anchor={{ x: 0.5, y: 0.5 }}
        />
        <Sprite
          image={lyftImage}
          x={lyft.x}
          y={lyft.y}
          scale={0.06}
          anchor={0.5}
        />
        <Freddy
          clickEvent={clickEvent}
          beer={beer}
          incrementBeer={incrementBeer}
          lyft={lyft}
          incremenLyft={incrementLyft}
          getScore={getScore}
        />
      </Stage>
    </div>
  );
};

function BeerSpace() {
  return (
    <div>
      <GameComponent />
    </div>
  );
}

export default BeerSpace;
