import { useState } from 'react';
import { Stage, Container, Text, Sprite } from '@pixi/react';
import Freddy from './Freddy';
import lapinKulta from '../assets/lapin-kulta.png';

const ScoreHeader = ({ score }) => {

  return (<p>The score: {score} </p>
  );
};


export const GameComponent = () => {
  const gameWidth = 400;
  const gameHeight = 600;
  const [clickEvent, setClickEvent] = useState({
    x: -1,
    y: -1,
    rectLeft: -1,
    rectTop: -1,
  });
  const [score, setScore] = useState(0);
  const [lapinKultaPosition, setLapinKultaPosition] = useState({ x: 300, y: 300 });

  // Function to handle click anywhere on the Stage
  const handleStageClick = (e) => {
    // console.log(`${lapinKultaPosition.x} ${lapinKultaPosition.y} - ${e.clientX} ${e.clientY} `);
    const rect = e.target.getBoundingClientRect();
    setClickEvent({
      x: e.clientX,
      y: e.clientY,
      rectLeft: rect.left,
      rectTop: rect.top,
    });
  };

  const incrementScoreAndUpdateBeer = () => {
    setScore((prevScore) => prevScore + 1);
    setLapinKultaPosition({
      x: Math.random() * (gameWidth - 40) + 20, // Ensure lapinKulta stays within bounds
      y: Math.random() * (gameHeight - 40) + 20,
    });
  };

  return (
    <div>
      <ScoreHeader
        score={score}
      />
      <Stage onClick={handleStageClick}>
        <Sprite
          image={lapinKulta}
          scale={0.04}
          x={lapinKultaPosition.x}
          y={lapinKultaPosition.y}
          anchor={{ x: 0.5, y: 0.5 }}
        />
        <Freddy
          clickEvent={clickEvent}
          beerPosition={lapinKultaPosition}
          incrementBeer={incrementScoreAndUpdateBeer}
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
