import { useState, useEffect, useRef } from 'react';
import { Sprite, useTick } from '@pixi/react';
import BagImage from '../assets/coke.png';

let index = 0;
let cds = 0;

const initial_state = [
    [150, 200],
    [200, 200],
    [250, 200],
    [300, 200],
    [350, 200],
    [400, 200],
    [450, 200],
    [500, 200],
];

export const SnakeGame = ({
    headImage,
    scale,
    speed,
    isReset,
    setIsReset,
}) => {

    const direction_states = [
        [speed, 0],
        [0, -1 * speed],
        [-1 * speed, 0],
        [0, speed]
    ];

    const [isFlipped, setIsFlipped] = useState(-1);
    const [angle, setAngle] = useState(0);
    //const [cds, setCDS] = useState(0)
    const [direction, setDirection] = useState([0.4, 0]);
    const [applePosition, setApplePosition] = useState([200, 200]);
    const [headQueue, setHeadQueue] = useState(initial_state);

    const handleClick = (e) => {
        const screenWidth = window.innerWidth;
        const clickX = e.clientX;
        if (clickX < screenWidth * 0.42) {
            cds = (cds + 1) % 4;
        } else {
            cds = (cds - 1 + 4) % 4;
        }
        console.log(`${cds}`);
        let newDirection = direction_states[cds]
        console.log(`${newDirection}`)
        setDirection(newDirection);
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    function updateHeadQueue() {
        setHeadQueue(prevQueue => {
            const newQueue = [...prevQueue];
            const newPosition = [headQueue[0][0] + direction[0], headQueue[0][1] + direction[1]];
            for (let i = newQueue.length - 1; i > 0; i--) {
                //newQueue[i] = newQueue[i - 1];
                newQueue[i] = getNextPosition(newQueue[i], newQueue[i - 1]);
            }
            newQueue[0] = newPosition;
            return newQueue;
        });
    }

    const getNextPosition = (pos_0, pos_1) => {
        let d_pos = [pos_1[0] - pos_0[0], pos_1[1] - pos_0[1]];
        let d_pos_norm = Math.sqrt(d_pos[0] * d_pos[0] + d_pos[1] * d_pos[1]);
        return [(speed / d_pos_norm) * d_pos[0] + pos_0[0], (speed / d_pos_norm) * d_pos[1] + pos_0[1]];
    };

    useTick(delta => {
        index = index + 1;
        /* if (index % 20 !== 0) {
            return;
        } */
        if (isReset) {
            setHeadQueue(initial_state);
            setIsReset(false);
        }
        updateHeadQueue();
    });

    return (
        <>
            <Sprite
                image={BagImage}
                scale={[0.06, 0.06]}
                rotation={0}
                x={applePosition[0]}
                y={applePosition[1]}
                anchor={0.5}
            />
            {headQueue.map((head, index) => (
                <Sprite
                    key={index}
                    image={headImage}
                    scale={[isFlipped * scale * 0.5, scale * 0.5]}
                    rotation={angle}
                    x={head[0]}
                    y={head[1]}
                    anchor={0.5} />
            ))}
        </>
    );
};
