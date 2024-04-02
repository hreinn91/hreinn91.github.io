import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@pixi/react';
import freddyImage from '../assets/freddy-head.png';

let i = 0;

const Freddy = () => {
    const [scaleFactor, setScaleFactor] = useState(0.3);
    const [isFlipped, setIsFlipped] = useState(-1);
    const [x, setX] = useState(200);
    const [y, setY] = useState(200);
    const [vx, setVX] = useState(0);
    const [vy, setVY] = useState(0);
    const [angle, setAngle] = useState(0);
    const [targetX, setTargetX] = useState(200); // Target x position
    const [targetY, setTargetY] = useState(200); // Target y position

    const move = () => {
        if (Math.abs(x - targetX) > 1 || Math.abs(y - targetY) > 1) { // Check if Freddy is close to the target
            setX(x + vx);
            setY(y + vy);
        }
    };

    const handleRotation = (dx, dy) => {
        let newAngle = Math.atan2(dy, dx);
        let isFlipped = -1;
        
        if(newAngle < -0.5 * Math.PI || newAngle > 0.5 * Math.PI){
            isFlipped = 1;
            newAngle = newAngle - Math.PI;
        }

        setAngle(newAngle);
        setIsFlipped(isFlipped);
    };

    const handleMouseClick = (e) => {
        const rect = e.target.getBoundingClientRect(); // Get the bounding rectangle of the target element
        const dx = e.clientX - rect.left - x;
        const dy = e.clientY - rect.top - y;
        setTargetX(e.clientX - rect.left); // Update target x position
        setTargetY(e.clientY - rect.top); // Update target y position
        handleRotation(dx, dy);
        
        // Calculate the velocity to move Freddy towards the clicked position
        // The speed can be adjusted by changing the divisor
        const speed = 0.02; // Speed modifier
        setVX(speed * dx);
        setVY(speed * dy);
    };

    useEffect(() => {
        window.addEventListener('click', handleMouseClick);
        return () => {
            window.removeEventListener('click', handleMouseClick);
        };
    }, [x, y]); // Add x and y to the dependency array to update the event listener with the current positions

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
