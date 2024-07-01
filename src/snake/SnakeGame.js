import { useState, useEffect, useRef } from 'react';
import { Sprite, useTick } from '@pixi/react';
import BagImage from '../assets/coke.png';

let index = 0;
let cds = 0;
const step = 40;

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

    const allCoords = getAllCoords(20, gameWidth - 20, 20, gameHeight - 20, step);
    const Nx = (gameWidth - 40) / step + 1;
    const Ny = (gameHeight - 20) / step + 1;
    const occupiedCoordinates = [Math.floor(allCoords.length / 2)];

    const [headImg, setHeadImage] = useState(headImage);
    const [isDead, setIsDead] = useState(false);
    const [isFlipped, setIsFlipped] = useState(-1);
    const [angle, setAngle] = useState(0);
    const [headDirection, setHeadDirection] = useState(directionStates[3]);
    const [applePosition, setApplePosition] = useState([Math.floor(allCoords.length / 4)]);
    const [headQueue, setHeadQueue] = useState([Math.floor(allCoords.length / 1.5)]);
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

    useTick(delta => {
        if (isDead) {
            return;
        }
        index = index + 1;
        const now = Date.now();
        const deltaMillis = (now - lastUpdateTime);
        if (deltaMillis < 200) {
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
            if (headPos == pos) {
                setDead();
                return true;
            }
        }
        return false;
    }

    const setDead = () => {
        setIsDead(true);
        setHeadImage(deadImage);
    };

    const getNextQueue = (oldQueue, direction) => {
        const newQueue = [...oldQueue];
        const newPosition = oldQueue[0] + direction[0] + direction[1] * Nx;
        if(isOutofBounds(newPosition, oldQueue[0], direction)){
            setDead();
            return oldQueue;
        }
        newQueue.unshift(newPosition);
        if (!isAppleOverlap(newPosition)) {
            newQueue.pop();
        } else {
            updateApplePosition(newQueue);
            incrementScore();
        }
        return newQueue;
    }

    const isOutofBounds = (newPosition, head, direction) => {
        return newPosition >= allCoords.length  || newPosition < 0 || 
        (direction[0] == -1 && head%Nx == 0) || (direction[0] == 1 && head%Nx == Nx - 1); 
    }

    const isAppleOverlap = (pos) => {
        const dx = allCoords[applePosition][0] - allCoords[pos][0];
        const dy = allCoords[applePosition][1] - allCoords[pos][1];
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
        let pos = Math.floor(allCoords.length * Math.random());
        return pos;
    };

    return (
        <>
            <Sprite
                image={appleImage}
                scale={[0.1, 0.1]}
                rotation={0}
                x={allCoords[applePosition][0]}
                y={allCoords[applePosition][1]}
                anchor={0.5}
            />
            {headQueue.slice().reverse().map((headPosition, index) => (
                <Sprite
                    key={index}
                    image={headImg}
                    scale={[isFlipped * scale * 0.5, scale * 0.5]}
                    rotation={angle}
                    x={allCoords[headPosition][0]}
                    y={allCoords[headPosition][1]}
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


const getAllCoords = (xMin, xMax, yMin, yMax, stepSize) => {
    let res = [];
    for (let y = yMin; y <= yMax; y = y + stepSize) {
        for (let x = xMin; x <= xMax; x = x + stepSize) {
            res.push([x, y]);
        }
    }
    return res;
}