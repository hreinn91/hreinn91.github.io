import { useState } from 'react';
import { Sprite, useTick } from '@pixi/react';
import freddyImage from '../assets/bosshead.png';
import tobbeImage from '../assets/jimmy-tobbesson-head.png';

export const SelectHead = ({ headImage, xPos, yPos, scale, handleStartGame, isFlipped }) => {
    const [angle, setAngle] = useState(0);

    useTick(delta => {
        setAngle(angle + 2 * Math.PI / 120);
    });

    const handleOnClick = () => {
        handleStartGame(headImage, scale);
    };

    return (
        <>
            <Sprite
                interactive={true}
                eventMode={'static'}
                onclick={handleOnClick}
                image={headImage}
                scale={[isFlipped * scale * 1.5, scale * 1.5]}
                rotation={angle}
                x={xPos}
                y={yPos}
                anchor={0.4} />
        </>
    );
};


export const SnakeSelect = ({ handleStartGame }) => {
    return (
        <>
            <SelectHead
                headImage={freddyImage}
                xPos={100}
                yPos={100}
                scale={0.6}
                isFlipped={1}
                handleStartGame={handleStartGame}
            />
            <SelectHead
                headImage={tobbeImage}
                xPos={250}
                yPos={250}
                scale={0.35}
                isFlipped={-1}
                handleStartGame={handleStartGame}
            />
        </>
    );
}