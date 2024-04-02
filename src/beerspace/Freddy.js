import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@pixi/react';
import freddyImage from '../assets/freddy-head.png'

let i = 0;

const Freddy = () => {

    const [scaleFactor, setScaleFactor] = useState(0.3);
    const [isFlipped, setIsFlipped] = useState(-1)
    const [x, setX] = useState(200);
    const [y, setY] = useState(200);
    const [vx, setVX] = useState(0);
    const [vy, setVY] = useState(0);
    const [angle, setAngle] = useState(0);
    const [nx, setNX] = useState(-1);
    const [ny, setNY] = useState(-1);

    const move = () => {
        setX(x + vx);
        setY(y + vy);
    };

    const handleRotation = (dx, dy) => {
        let newAngle = Math.atan2(dy, dx);
        let isFlipped = -1;
        console.log(` newAngle ${(newAngle * 180) / Math.PI}`);
        
        if(newAngle < -0.5 * Math.PI || newAngle > 0.5 * Math.PI){
            isFlipped = 1;
            newAngle = newAngle - Math.PI;
        }

        setAngle(newAngle);
        setIsFlipped(isFlipped);
    };

    const handleMouseClick = (e) => {
        const dx = e.clientX - x;
        const dy = e.clientY - y;
        handleRotation(dx, dy);
    };

    useEffect(() => {
        window.addEventListener('click', handleMouseClick);
        return () => {
            window.removeEventListener('click', handleMouseClick);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount


    useTick(delta => {
        i += 0.05 * delta;
        move();
    });

    return (<Sprite
        image={freddyImage}
        scale={[isFlipped * scaleFactor, scaleFactor]}
        rotation={angle}
        x={x}
        y={y}
        anchor={{ x: 0.5, y: 0.5 }}
    />);
}

export default Freddy;
