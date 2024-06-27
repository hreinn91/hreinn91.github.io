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
    appleImage,
    deadImage,
    scale,
    speed,
    isReset,
    setIsReset,
}) => {

    const directionStates = [
        [1, 0],
        [0, -1],
        [-1, 0],
        [0, 1]
    ];

    const [headImg, setHeadImage] = useState(headImage);
    const [isDead, setIsDead] = useState(false);
    const [isFlipped, setIsFlipped] = useState(-1);
    const [angle, setAngle] = useState(0);
    const [headDirection, setHeadDirection] = useState(directionStates[2]);
    const [applePosition, setApplePosition] = useState([200, 200]);
    const [headQueue, setHeadQueue] = useState(initialState);
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

    useTick(delta => {
        if(isDead){
            return;
        }
        index = index + 1;
        const now = Date.now();
        const deltaMillis = (now - lastUpdateTime);
        if (deltaMillis < 200) {
            return;
        }
        setLastUpdateTime(now);
        if(checkAndSetDead()) {
            return;
        }
        setHeadQueue(getNextQueue(headQueue, headDirection));
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
        setHeadDirection(newDirection);
    };

    const handleKeyDown = (e) => {
        const key = e.key;
        if (key === "ArrowRight") {
            setHeadDirection([1, 0]);
        }
        if (key === "ArrowLeft") {
            setHeadDirection([-1, 0]);
        }
        if (key === "ArrowUp") {
            setHeadDirection([0, -1]);
        }
        if (key === "ArrowDown") {
            setHeadDirection([0, 1]);
        }
    };

    const checkAndSetDead = () => {
        const headPos = headQueue[0];
        for(let i=1; i<headQueue.length; i++){
            let pos = headQueue[i];
            if(headPos[0] == pos[0] && headPos[1] == pos[1]){
                setIsDead(true);
                setHeadImage(deadImage);
                return true;
            }
        }
        return false;
    }

    const getNextQueue = (oldQueue, direction) => {
        const step = 45;
        const newQueue = [...oldQueue];
        const newPosition = [oldQueue[0][0] + direction[0] * step, oldQueue[0][1] + direction[1] * step];
        newQueue.unshift(newPosition);
        if (!isAppleOverlap(newPosition)) {
            newQueue.pop();
        } else {
            updateApplePosition()
        }
        return newQueue;
    }
    
    const isAppleOverlap = (headPos) => {
        const dx = applePosition[0] - headPos[0];
        const dy = applePosition[1] - headPos[1];
        const norm = Math.sqrt(dx * dx + dy * dy);
        if (norm < 40) {
            return true;
        }
        return false;
    }

    const updateApplePosition = () => {
        setApplePosition([randomSpan(10, gameWidth), randomSpan(10, gameHeight)]);

    };

    return (
        <>
            <Sprite
                image={appleImage}
                scale={[0.1, 0.1]}
                rotation={0}
                x={applePosition[0]}
                y={applePosition[1]}
                anchor={0.5}
            />
            {headQueue.slice().reverse().map((headPosition, index) => (
                <Sprite
                    key={index}
                    image={headImg}
                    scale={[isFlipped * scale * 0.5, scale * 0.5]}
                    rotation={angle}
                    x={headPosition[0]}
                    y={headPosition[1]}
                    anchor={0.5} />
            ))}
        </>
    );
};

const sub = (v1, v2) => {
    return [v1[0] - v2[0], v1[1] - v2[1]];
}

const randomSpan = (lower, upper) => { return lower + (upper - lower) * Math.random(); };
const last = (arr) => { return arr[arr.length - 1]; }