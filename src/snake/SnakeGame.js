import { useState } from 'react';
import { Sprite, useTick } from '@pixi/react';

export const SnakeGame = ({ headImage, scale }) => {
    
    const [angle, setAngle] = useState(0);

    return (
        <>
            <Sprite
                image={headImage}
                scale={[1*scale, scale]}
                rotation={angle}
                x={100}
                y={100}
                anchor={0.5} />
        </>
    );
};