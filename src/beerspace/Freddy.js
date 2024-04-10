import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@pixi/react';
import freddyImage from '../assets/freddy-head.png';
import fuckYouGuysImage from '../assets/fuck-you-guy.png';

let i = 0;

const Freddy = ({ clickEvent, beer, incrementBeer, lyft, incremenLyft, getScore }) => {
    const [scale, setScale] = useState(0.25);
    const [isFlipped, setIsFlipped] = useState(-1);
    const [angle, setAngle] = useState(0);
    const [x, setX] = useState(200);
    const [y, setY] = useState(200);
    const [vx, setVX] = useState(0);
    const [vy, setVY] = useState(0);
    const [targetX, setTargetX] = useState(200);
    const [targetY, setTargetY] = useState(200);
    const [isDead, setIsDead] = useState(false);

    const move = () => {
        if (Math.abs(x - targetX) > 1 || Math.abs(y - targetY) > 1) {
            setX(x + vx);
            setY(y + vy);
        }
    };

    const handleRotation = (dx, dy) => {
        let newAngle = Math.atan2(dy, dx);
        let isFlipped = -1;

        if (newAngle < -0.5 * Math.PI || newAngle > 0.5 * Math.PI) {
            isFlipped = 1;
            newAngle = newAngle - Math.PI;
        }
        setAngle(newAngle);
        setIsFlipped(isFlipped);
    };
    const handleMouseClick = (clickEvent) => {
        if (clickEvent.x == -1) {
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

    const checkScore = () => {
        checkCollision(beer.x, beer.y, incrementBeer);
        checkCollision(lyft.x, lyft.y, incremenLyft);
    };

    const checkCollision = (targetX, targetY, trigger) => {
        const dx = x - targetX;
        const dy = y - targetY;
        if (dx * dx + dy * dy < 490) {
            trigger();
            return true;
        }
        return false;
    };

    const getPosition = () => ({ x: x, y: y });

    useEffect(() => {
        handleMouseClick(clickEvent);
    }, [clickEvent]);


    useTick(delta => {
        i += 0.05 * delta;
        move();
        checkScore();
    });

    return (
        <>
            <Sprite
                image={freddyImage}
                scale={[isFlipped * scale, scale]}
                rotation={angle}
                x={x}
                y={y}
                anchor={{ x: 0.5, y: 0.5 }}
            />
            <FuckYouGuy
                getFreddyPosition={getPosition}
                setFreddyIsDead={setIsDead}
                getScore={getScore}
            />
        </>
    );
}



const FuckYouGuy = ({ getFreddyPosition, setFreddyIsDead, getScore }) => {

    const [scale, setScale] = useState(0.17);
    const [isFlipped, setIsFlipped] = useState(1);
    const [angle, setAngle] = useState(0);
    const [x, setX] = useState(Math.random() > 0.5 ? -50 : 600);
    const [y, setY] = useState(Math.random() > 0.5 ? -50 : 700);

    const move = () => {
        const speed = 0.0005 + 0.00005 * getScore();
        const dx = getFreddyPosition().x - x;
        const dy = getFreddyPosition().y - y;
        setX(x + dx * speed);
        setY(y + dy * speed);

        handleRotation(dx, dy);
    };

    const handleRotation = (dx, dy) => {
        let newAngle = Math.atan2(dy, dx);
        let isFlipped = 1;

        if (newAngle < -0.5 * Math.PI || newAngle > 0.5 * Math.PI) {
            isFlipped = -1;
            newAngle = newAngle - Math.PI;
        }
        setAngle(newAngle);
        setIsFlipped(isFlipped);
    };

    useTick(delta => {
        i += 0.05 * delta;
        if (getScore() > 0) {
            move();
        }
    });

    return (
        <Sprite
            image={fuckYouGuysImage}
            scale={[isFlipped * scale, scale]}
            angle={angle}
            x={x}
            y={y}
            anchor={0.5}
        />
    );

}

export default Freddy;
