import { useState, useEffect, useRef } from 'react';
import { Sprite, useTick } from '@pixi/react';
import BagImage from '../assets/coke.png';

let index = 0;
let cds = 0;

const initialState = [
    [180, 190],
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
    incrementScore,
}) => {

    const directionStates = [
        [1, 0],
        [0, -1],
        [-1, 0],
        [0, 1]
    ];

    const [step, setStep] = useState(40);
    const [headImg, setHeadImage] = useState(headImage);
    const [isDead, setIsDead] = useState(false);
    const [isFlipped, setIsFlipped] = useState(-1);
    const [angle, setAngle] = useState(0);
    const [headDirection, setHeadDirection] = useState(directionStates[2]);
    const [applePosition, setApplePosition] = useState([200, 200]);
    const [headQueue, setHeadQueue] = useState(initialState);
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

    useTick(delta => {
        if (isDead) {
            return;
        }
        index = index + 1;
        const now = Date.now();
        const deltaMillis = (now - lastUpdateTime);
        if (deltaMillis < 100) {
            return;
        }
        setLastUpdateTime(now);
        if (checkAndSetDead()) {
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
        for (let i = 1; i < headQueue.length; i++) {
            let pos = headQueue[i];
            if (headPos[0] == pos[0] && headPos[1] == pos[1]) {
                setIsDead(true);
                setHeadImage(deadImage);
                return true;
            }
        }
        return false;
    }

    const getNextQueue = (oldQueue, direction) => {
        const newQueue = [...oldQueue];
        const newPosition = [oldQueue[0][0] + direction[0] * step, oldQueue[0][1] + direction[1] * step];
        newQueue.unshift(newPosition);
        if (!isAppleOverlap(newPosition)) {
            newQueue.pop();
        } else {
            updateApplePosition(newQueue);
            incrementScore();
        }
        return newQueue;
    }

    const isAppleOverlap = (pos) => {
        const dx = applePosition[0] - pos[0];
        const dy = applePosition[1] - pos[1];
        const norm = Math.sqrt(dx * dx + dy * dy);
        if (norm < 40) {
            return true;
        }
        return false;
    }

    const updateApplePosition = (newQueue) => {
        let applePosition = newApplePos(newQueue);
        setApplePosition(applePosition);
    };

    const newApplePos = (newQueue) => {
        let pos = [randomInterval(15, gameWidth - 15, step), randomInterval(15, gameHeight - 15, step)];
        for (let i = 1; i < newQueue.length; i++) {
            if (isAppleOverlap(newQueue[i])) {
                return newApplePos(newQueue);
            }
        }
        return pos;
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
const randomInterval = (min, max, interval) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let res = Math.floor(Math.random() * (max - min + 1)) + min;
    res = Math.ceil(res / interval) - 1;
    return res * interval;
};
const last = (arr) => { return arr[arr.length - 1]; }


const getAllCoords = (xMin, xMax, yMin, yMax, stepSize) =>  {
    let res = [];
    for (let y=yMin; y<=yMax; y=y+stepSize){
        for(let x=xMin; x<=xMax; x=x+stepSize){
            res.push([x, y]);
        }
    }
    return res;
}