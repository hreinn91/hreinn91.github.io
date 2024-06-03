import { useState, useRef, useEffect } from 'react';
import { Stage, Sprite, Container, Text } from '@pixi/react';
import freddyImage from '../assets/bosshead.png';
import './style.css'
import '@pixi/events'; // Needed for Sprite interaction
import { SnakeSelect } from './SnakeSelect';
import { SnakeGame } from './SnakeGame';


export const Sanke = () => {
    const [isSelectMode, setIsSelectMode] = useState(true);
    const [isReset, setIsReset] = useState(false);
    const [headerText, setHeaderText] = useState("Choose your Douchebag");
    const [scale, setScale] = useState(0)
    const [headImage, setHeadImage] = useState(freddyImage);
    const [dimensions, setDimensions] =
        useState({ width: window.innerWidth, height: window.innerHeight });


    const handleStartGame = (image, scale) => {
        setIsSelectMode(false);
        setHeadImage(image);
        setScale(scale)
    };

    const handleButtonClick = () => {
        setIsReset(true);
    };

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
            <div className='header-container'>
                {headerText}
            </div>
            <div className='header-container'>
                <button
                    
                    onClick={handleButtonClick}>
                        Reset
                    </button>
            </div>
            <Stage
                width={dimensions.width}
                height={dimensions.height}
                options={{ backgroundColor: 0x1d2330 }}
            >
                {isSelectMode ? <SnakeSelect handleStartGame={handleStartGame} /> :
                    <SnakeGame
                        headImage={headImage}
                        scale={scale}
                        speed={1.2}
                        isReset={isReset}
                        setIsReset={setIsReset} />}
            </Stage>
        </div>
    );
}


export default Sanke;