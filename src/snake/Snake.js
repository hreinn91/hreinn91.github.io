import { useState, useEffect } from 'react';
import { Stage } from '@pixi/react';
import './style.css';
import '@pixi/events'; // Needed for Sprite interaction
import { SnakeSelect } from './SnakeSelect';
import { SnakeGame } from './SnakeGame';


let gameWidth = 700;
let gameHeight = 700;

export const Snake = () => {
    const [isSelectMode, setIsSelectMode] = useState(true);
    const [isReset, setIsReset] = useState(false);
    const [headerText, setHeaderText] = useState("Choose your character");
    const [scale, setScale] = useState(1);
    const [headImage, setHeadImage] = useState(null);
    const [appleImage, setAppleImage] = useState(null);
    const [deadImage, setDeadImage] = useState(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const handleStartGame = (headImage, appleImg, deadImg, selectedScale) => {
        setHeadImage(headImage);
        /* setDeadImage() */
        setScale(selectedScale);
        setAppleImage(appleImg);
        setDeadImage(deadImg);
        setIsSelectMode(false);
        setHeaderText("Your Game is Running");
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

    useEffect(() => {
        if (isReset) {
            setIsReset(false);
            setIsSelectMode(true);
            setHeaderText("Choose your character");
        }
    }, [isReset]);

    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
            <div className='header-container'>
                {headerText}
            </div>
            <div className='header-container'>
                <button onClick={handleButtonClick}>
                    Reset
                </button>
            </div>
            <Stage width={gameWidth} height={gameHeight} options={{ backgroundColor: 0x1d2330 }}>
                {isSelectMode ? (
                    <SnakeSelect handleStartGame={handleStartGame} />
                ) : (
                    <SnakeGame
                        gameWidth={gameWidth}
                        gameHeight={gameHeight}
                        headImage={headImage}
                        appleImage={appleImage}
                        deadImage={deadImage}
                        scale={scale}
                        speed={10}
                        isReset={isReset}
                        setIsReset={setIsReset}
                    />
                )}
            </Stage>
        </div>
    );
};

export default Snake;
