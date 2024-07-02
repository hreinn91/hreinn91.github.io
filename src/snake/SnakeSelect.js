import { useState } from 'react';
import { Sprite, useTick, Text } from '@pixi/react';
import { TextStyle, BlurFilter } from 'pixi.js';
import freddyImage from '../assets/bosshead.png';
import tobbeImage from '../assets/jimmy-tobbesson-head.png';
import aquaslashIamge from '../assets/aquaslash.png';
import moneyImage from '../assets/money.png';
import deadFreddy from '../assets/sleepy-freddy.png';
import deadTobbe from '../assets/tobbe-what.png'
import ringGrey from '../assets/ring-grey.png'


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

let tmi = 0;
const textMap = ["SLOW", "MEH", "FAST", "HARD", "FUCK", "LOL"];

export const SelectSpeed = ({ }) => {
    const baseSize = 0.3;

    const [size, setSize] = useState(baseSize);
    const [speed, setSpeed] = useState(200);
    
    const handleOnPointDown = (event) => {
        console.log(`Click`);
        tmi = (tmi+1) % 6;
        let newSize = size * 1.2;
        if(newSize > 0.8) {
            newSize = baseSize;
        }
        setSize(newSize);
    };

    return (
        <>
            <Sprite
            interactive={true}
            eventMode={'static'}
                image={ringGrey}
                pointerdown={handleOnPointDown}
                scale={size}
                x={280}
                y={320}
                anchor={0.5}
            />
            <Text
                text={textMap[tmi]}
                x={240}
                y={300}
                scale={size * 1.1}
                anchor={0}
                style={
                    new TextStyle({
                        align: 'center',
                        fill: '0xffffff',
                        fontSize: 60,
                        letterSpacing: 2,
                        dropShadow: true,
                        dropShadowColor: '#E72264',
                        dropShadowDistance: 6,
                    })
                }
            />
        </>
    );
};

export const SnakeSelect = ({ handleStartGame }) => {
    return (
        <>
            <SelectSpeed />
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
                xPos={280}
                yPos={110}
                scale={0.35}
                isFlipped={-1}
                handleStartGame={handleStartGame}
            />
        </>
    );
}