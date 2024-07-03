import { useState, useEffect } from 'react';
import { Stage } from '@pixi/react';
import './style.css';
import '@pixi/events'; // Needed for Sprite interaction
import { SnakeSelect } from './SnakeSelect';
import { SnakeGame } from './SnakeGame';


let gameWidth = 400;
let gameHeight = 480;

export const SnakeMenu = () => {
    const [isSelectMode, setIsSelectMode] = useState(true);
    const [isReset, setIsReset] = useState(false);
    const [gameState, setGameState] = useState(0);
    const [headerText, setHeaderText] = useState("Choose your douchebag");
    const [scale, setScale] = useState(1);
    const [speed, setSpeed] = useState(200);
    const [score, setScore] = useState(0);
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
        setHeaderText("Score: 0");
    };

    const handleButtonClick = () => {
        setIsReset(true);
    };

    const incrementScore = () => {
        let newScore = score + 1;
        setScore(newScore);
        setHeaderText(`Score: ${newScore}`);
    }

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
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
            <div className='header-container'>
                {headerText}
            </div>
            <Stage width={gameWidth} height={gameHeight} options={{ backgroundColor: 0x1d2330 }}>
                {isSelectMode ? (
                    <SnakeSelect handleStartGame={handleStartGame} setSpeed={setSpeed} />
                ) : (
                    <SnakeGame
                        gameWidth={gameWidth}
                        gameHeight={gameHeight}
                        headImage={headImage}
                        appleImage={appleImage}
                        deadImage={deadImage}
                        scale={scale}
                        speed={speed}
                        isReset={isReset}
                        setIsReset={setIsReset}
                        incrementScore={incrementScore}
                    />
                )}
            </Stage>
        </div>
    );
};

export default SnakeMenu;
