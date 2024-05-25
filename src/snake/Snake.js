import { useState, useRef, useEffect } from 'react';
import { Stage, Sprite, Container, Text } from '@pixi/react';
import freddyImage from '../assets/freddy-head.png';
import tobbeImage from '../assets/jimmy-tobbesson-head.png';
import './style.css'
import '@pixi/events'; // Needed for Sprite interaction
import { SnakeSelect } from './SnakeSelect';


export const Sanke = () => {
    const [startGame, setStartGame] = useState(false);
    const [headerText, setHeaderText] = useState("Choose your Douchebag");
    const [scale, setScale] = useState(0)
    const [headImage, setHeadImage] = useState(freddyImage);

    const handleStartGame = (image, scale) => {
        setStartGame(true)
        setHeadImage(image);
        setScale(scale)
    };

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
            <div className='header-container'>
                {headerText}
            </div>
            <Stage>
                {<SnakeSelect handleStartGame={handleStartGame} />}
            </Stage>
        </div>
    );
}


export default Sanke;