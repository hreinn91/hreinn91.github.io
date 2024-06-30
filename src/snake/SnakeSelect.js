import { useState } from 'react';
import { Sprite, useTick } from '@pixi/react';
import freddyImage from '../assets/bosshead.png';
import tobbeImage from '../assets/jimmy-tobbesson-head.png';
import aquaslashIamge from '../assets/aquaslash.png';
import moneyImage from '../assets/money.png';
import deadFreddy from '../assets/sleepy-freddy.png';
import deadTobbe from '../assets/tobbe-what.png'


export const SelectHead = ({ headImage, deadImage, appleImage, xPos, yPos, scale, handleStartGame, isFlipped }) => {
    const [angle, setAngle] = useState(0);

    useTick(delta => {
        setAngle(angle + 2 * Math.PI / 120);
    });

    const handleOnClick = (event) => {
        event.stopPropagation();
        handleStartGame(headImage, appleImage, deadImage, scale);
    };

    return (
        <>
            <Sprite
                interactive={true}
                eventMode={'static'}
                pointerdown={handleOnClick}
                image={headImage}
                scale={[isFlipped * scale, scale]}
                rotation={angle}
                x={xPos}
                y={yPos}
                anchor={0.5} />
        </>
    );
};

// Slider here
export const SnakeSelect = ({ handleStartGame }) => {
    return (
        <>
            <SelectHead
                headImage={freddyImage}
                deadImage={deadFreddy}
                appleImage={moneyImage}
                xPos={100}
                yPos={100}
                scale={0.8}
                isFlipped={1}
                handleStartGame={handleStartGame}
            />
            <SelectHead
                headImage={tobbeImage}
                deadImage={deadTobbe}
                appleImage={aquaslashIamge}
                xPos={250}
                yPos={250}
                scale={0.35}
                isFlipped={-1}
                handleStartGame={handleStartGame}
            />
        </>
    );
}