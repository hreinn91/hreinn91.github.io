import { useState, useEffect, useRef } from 'react';
import { Sprite, useTick } from '@pixi/react';
import BagImage from '../assets/coke.png';

let index = 0;
let cds = 0;
const headDistance = 30;

const initialState = [
    [150, 200],
];

export const SnakeGame = ({
    gameWidth,
    gameHeight,
    headImage,
    scale,
    speed,
    isReset,
    setIsReset,
}) => {

    const directionStates = [
        [speed, 0],
        [0, -1 * speed],
        [-1 * speed, 0],
        [0, speed]
    ];

    const [isFlipped, setIsFlipped] = useState(-1);
    const [angle, setAngle] = useState(0);
    const [direction, setDirection] = useState(directionStates[2]);
    const [applePosition, setApplePosition] = useState([200, 200]);
    const [headQueue, setHeadQueue] = useState(initialState);
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

    useTick(delta => {
        index = index + 1;
        const now = Date.now();
        const deltaMillis = (now - lastUpdateTime);
        if (deltaMillis < 200){
            return;
        }
        setLastUpdateTime(now);
        
        if (isReset) {
            setHeadQueue(initialState);
            setIsReset(false);
        }
        updateHeadQueue();
    });

    useEffect(() => {
        document.addEventListener('click', handleMousclick);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('click', handleMousclick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleMousclick = (e) => {
        cds = (cds + 1) % 4;
        let newDirection = directionStates[cds];
        setDirection(newDirection);
    };

    const handleKeyDown = (e) => {
        const key = e.key;
        if (key === "ArrowRight") {
            setDirection([speed, 0]);
        }
        if (key === "ArrowLeft") {
            setDirection([-1 * speed, 0]);
        }
        if (key === "ArrowUp") {
            setDirection([0, -1 * speed]);
        }
        if (key === "ArrowDown") {
            setDirection([0, speed]);
        }
    };

    function updateHeadQueue() {
        setHeadQueue(prevQueue => {
            const newQueue = [...prevQueue];
            const newPosition = [headQueue[0][0] + direction[0], headQueue[0][1] + direction[1]];
            const lastPosition = newQueue[newQueue.length - 1];
            for (let i = newQueue.length - 1; i > 0; i--) {
                newQueue[i] = getNextPos(newQueue[i], newQueue[i - 1]);
            }
            newQueue[0] = newPosition;
            if (isAppleOverlap(newPosition)) {
                addNewHead(newQueue, lastPosition);
            }
            return newQueue;
        });
    }

    const getNextPos = (pos0, pos1) => {
        const dist = 10;
        let x0 = pos0[0];
        let y0 = pos0[1];
        let x1 = pos1[0];
        let y1 = pos1[1];
        if (x0 == x1) {
            if (y1 > y0) {
                return [x1, y1 - dist];
            } else {
                return [x1, y1 + dist];
            }
        }
        if(y0 == y1) {
            if (x1 > x0) {
                return [x1 - dist, y1];
            } else {
                return [x1 + dist, y1];
            }
        }
        return pos1;
    };

    const isAppleOverlap = (headPos) => {
        const dx = applePosition[0] - headPos[0];
        const dy = applePosition[1] - headPos[1];
        const norm = Math.sqrt(dx * dx + dy * dy);
        if (norm < 20) {
            return true;
        }
        return false;
    }

    const addNewHead = (newQueue, lastPosition) => {
        console.log(`EAT EAT EAT APPLE`);
        if (newQueue.length == 1) {
            let headPos = newQueue[0];
            let newHeadPosition = sub(headPos, direction);
            newQueue.push(newHeadPosition);
        } else {
            newQueue.push(lastPosition);
        }
        updateApplePosition();
    }

    const updateApplePosition = () => {
        setApplePosition([randomSpan(10, gameWidth), randomSpan(10, gameHeight)]);

    };

    return (
        <>
            <Sprite
                image={BagImage}
                scale={[0.04, 0.04]}
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

const sub = (v1, v2) => {
    return [v1[0] - v2[0], v1[1] - v2[1]];
}

const randomSpan = (lower, upper) => { return lower + (upper - lower) * Math.random(); };