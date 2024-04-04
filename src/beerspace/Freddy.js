import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@pixi/react';
import freddyImage from '../assets/freddy-head.png';

let i = 0;

const Freddy = ({ clickEvent, beerPosition, incrementBeer }) => {
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
    const handleMouseClick = (clickEvent) => {
        if(clickEvent.x == -1){
            return;
        }
        const dx = clickEvent.x - clickEvent.rectLeft - x;
        const dy = clickEvent.y - clickEvent.rectTop - y;
        setTargetX(clickEvent.x - clickEvent.rectLeft);
        setTargetY(clickEvent.y - clickEvent.rectTop);
        handleRotation(dx, dy);
        
        const speed = 0.02;
        setVX(speed * dx);
        setVY(speed * dy);
    };

    const checkForScore = () => {
        const dx = x - beerPosition.x;
        const dy = y - beerPosition.y;
        if(dx*dx + dy*dy < 150){
            console.log(`Score`);
            incrementBeer();
        }
        // console.log(`beerPosition ${beerPosition.x} ${beerPosition.y} ${x}  ${y} `)
    };

    useEffect(() => {
        handleMouseClick(clickEvent);
    }, [clickEvent]);


    useTick(delta => {
        i += 0.05 * delta;
        move();
        checkForScore();
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
