import { useState, useEffect } from 'react';
import { Sprite, useTick, Text } from '@pixi/react';
import { TextStyle, BlurFilter } from 'pixi.js';
import freddyImage from '../assets/bosshead.png';
import tobbeImage from '../assets/jimmy-tobbesson-head.png';
import aquaslashIamge from '../assets/aquaslash.png';
import moneyImage from '../assets/money.png';
import deadFreddy from '../assets/sleepy-freddy.png';
import deadTobbe from '../assets/tobbe-what.png'
import ringGrey from '../assets/ring-grey.png'
import hreinnImage from '../assets/hreinn-russian.png'
import hreinnDeadImage from '../assets/hreinn-3-head.png'
import hreinnApple from '../assets/hreinn-apple.png'




export const SelectHead = ({ headImage, deadImage, appleImage, xPos, yPos, scale, handleStartGame, isFlipped, displayScale }) => {
    const [angle, setAngle] = useState(0);

    useTick(delta => {
        setAngle(angle + 2 * Math.PI / 120);
    });

    const handleOnClick = (event) => {
        event.stopPropagation();
        handleStartGame(headImage, appleImage, deadImage, displayScale);
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

export const SelectSpeed = ({ setGameSpeed }) => {
    const baseSize = 0.3;
    const baseSpeed = 150;

    const [size, setSize] = useState(baseSize);
    const [selectedSpeed, setSelectedSpeed] = useState(baseSpeed);

    useEffect(() => {
        setGameSpeed(baseSpeed);
    }, []);



    const handleOnPointDown = (event) => {
        console.log(`Click`);
        tmi = (tmi + 1) % 6;
        let newSize = size * 1.2;
        let newSpeed = selectedSpeed * 0.75;
        if (tmi == 0) {
            newSize = baseSize;
            newSpeed = baseSpeed;
        }
        setSize(newSize);
        setSelectedSpeed(newSpeed);
        setGameSpeed(newSpeed);
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

export const SnakeSelect = ({ handleStartGame, setSpeed }) => {
    return (
        <>
            <SelectSpeed setGameSpeed={setSpeed} />
            <SelectHead
                headImage={freddyImage}
                deadImage={deadFreddy}
                appleImage={moneyImage}
                xPos={100}
                yPos={100}
                displayScale={0.8}
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
                displayScale={0.35}
                scale={0.35}
                isFlipped={-1}
                handleStartGame={handleStartGame}
            />
            <SelectHead
                headImage={hreinnImage}
                deadImage={hreinnDeadImage}
                appleImage={hreinnApple}
                xPos={60}
                yPos={280}
                displayScale={0.35}
                scale={0.04}
                isFlipped={-1}
                handleStartGame={handleStartGame}
            />
        </>
    );
}