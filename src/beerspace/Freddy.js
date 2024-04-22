import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@pixi/react';
import freddyImageAlive from '../assets/freddy-head.png';
import freddyImageDead from '../assets/sleepy-freddy.png';
import fuckYouGuysImage from '../assets/fuck-you-guy.png';
import donaldKukstrom from '../assets/donald-kukstrom.png';
import ohhManImage from '../assets/ooh-man.png';
import BagImage from '../assets/coke.png';
import CrazyHeadImage from '../assets/bosshead.png';
import TobeBloomImage from '../assets/tobbe-bloom.png';
import TobeDahmerImage from '../assets/tobbe-dahlmer.png';

let i = 0;

const Freddy = ({ clickEvent, hp, beer, incrementBeer, lyft, incremenLyft, addScore, getScore, setDamage, setBackground }) => {
    const [scale, setScale] = useState(0.3);
    const [isFlipped, setIsFlipped] = useState(-1);
    const [angle, setAngle] = useState(0);
    const [x, setX] = useState(200);
    const [y, setY] = useState(200);
    const [vx, setVX] = useState(0);
    const [vy, setVY] = useState(0);
    const [speed, setSpeed] = useState(0.03);
    const [targetX, setTargetX] = useState(200);
    const [targetY, setTargetY] = useState(200);
    const [freddyImage, setFreddyImage] = useState(freddyImageAlive);

    const move = () => {
        const dx = x - targetX;
        const dy = y - targetY;
        const norm = Math.sqrt(dx * dx + dy * dy);
        if (norm > 10) {
            setX(x + vx);
            setY(y + vy);
        }
    };

    const handleMouseClick = (clickEvent) => {
        if (clickEvent.x === -1) {
            return;
        }
        const dx = clickEvent.x - clickEvent.rectLeft - x;
        const dy = clickEvent.y - clickEvent.rectTop - y;
        setTargetX(clickEvent.x - clickEvent.rectLeft);
        setTargetY(clickEvent.y - clickEvent.rectTop);
        handleRotation(dx, dy, setAngle, setIsFlipped);
        setVX(speed * dx);
        setVY(speed * dy);
    };

    const checkScore = () => {
        if (checkItemCollision(beer.x, beer.y, incrementBeer)) {
            setDamage(-1);
        };
        if (checkItemCollision(lyft.x, lyft.y, incremenLyft)) {
            setDamage(-50);
        };
    };

    const checkItemCollision = (targetX, targetY, trigger) => {
        const dx = x - targetX;
        const dy = y - targetY;
        if (dx * dx + dy * dy < 490) {
            trigger();
            return true;
        }
        return false;
    };

    const getPosition = () => ({ x: x, y: y });

    const setCrazy = () => {
        setFreddyImage(CrazyHeadImage);
        setSpeed(0.04);
        setDamage(-200);
        addScore(30);
    };

    useEffect(() => {
        handleMouseClick(clickEvent);
    }, [clickEvent]);


    useTick(delta => {
        i += 0.05 * delta;
        if (hp <= 0) {
            setFreddyImage(freddyImageDead);
            setScale(0.245);
            return;
        }
        move();
        checkScore();
        if (Math.floor(i) % 50 == 0) {
            setFreddyImage(freddyImageAlive);
        }
    });

    return (
        <>
            <TobbeDahmer
                getFreddyPosition={getPosition}
                setDamage={setDamage}
                getScore={getScore}
            />
            <TobbeBloom />
            <FuckYouGuy
                getFreddyPosition={getPosition}
                getScore={getScore}
                setDamage={setDamage}
            />
            <OhhMan
                getFreddyPosition={getPosition}
                setDamage={setDamage}
                getScore={getScore}
            />
            <Kukstrom1 />
            <Bag
                getFreddyPosition={getPosition}
                getScore={getScore}
                setCrazy={setCrazy}
            />
            <Sprite
                image={freddyImage}
                scale={[isFlipped * scale, scale]}
                rotation={angle}
                x={x}
                y={y}
                anchor={{ x: 0.5, y: 0.5 }}
            />
        </>
    );
}

const TobbeBloom = ({ }) => {
    const [scale, setScale] = useState(0.12);
    const [isFlipped, setIsFlipped] = useState(-1);
    const [x, setX] = useState(80);
    const [y, setY] = useState(600);

    return (
        <Sprite
            image={TobeBloomImage}
            scale={[-1 * isFlipped * scale, scale]}
            angle={0}
            x={x}
            y={y}
            anchor={0.5}
        />
    );
};

const TobbeDahmer = ({ getFreddyPosition, setDamage, getScore, isCrazy }) => {
    const [scale, setScale] = useState(0.2);
    const [isFlipped, setIsFlipped] = useState(-1);
    const [x, setX] = useState(-84);
    const [y, setY] = useState(350);

    const move = (dx, dy, norm) => {
        var speed = 0.02;
        if (norm < 150) {
            speed = 0.5;
        }
        if (norm > 20) {
            setX(x + dx * speed / norm);
            setY(y + dy * speed / norm);
        }
        turn(-1 * dx, dy, setIsFlipped)
    };

    useTick(delta => {
        if (getScore() > 40) {
            const dx = getFreddyPosition().x - x;
            const dy = getFreddyPosition().y - y;
            const norm = Math.sqrt(dx * dx + dy * dy);
            move(dx, dy, norm);
            if (norm < 110) {
                setDamage(0.05);
            }
            if (norm < 80) {
                setDamage(0.1);
            }
            if (norm < 40) {
                setDamage(5);
            }
        }
    });

    return (
        <Sprite
            image={TobeDahmerImage}
            scale={[-1 * isFlipped * scale, scale]}
            angle={0}
            x={x}
            y={y}
            anchor={0.5}
        />
    );
};

const Bag = ({ getScore, getFreddyPosition, setCrazy }) => {
    const [scale, setScale] = useState(0.07);
    const [x, setX] = useState(-200);
    const [y, setY] = useState(-200);

    function spawnBag() {
        if (x === -200) {
            setX(randomSpan(20, 360));
            setY(randomSpan(50, 550));
        }
    }

    function handleCollision() {
        const dx = getFreddyPosition().x - x;
        const dy = getFreddyPosition().y - y;
        const norm = Math.sqrt(dx * dx + dy * dy);
        if (norm < 30) {
            console.log(`check`);
            setX(-200);
            setY(-200);
            setCrazy();
        }
    }

    useTick(delta => {
        if (getScore() > 50 && Math.floor(i) % 40 == 0) {
            spawnBag();
        }
        handleCollision();
    });

    return (<Sprite
        image={BagImage}
        scale={scale}
        rotation={20}
        x={x}
        y={y}
        anchor={0.5}
    />);
};



const FuckYouGuy = ({ getFreddyPosition, getScore, setDamage }) => {
    const [scale, setScale] = useState(0.17);
    const [isFlipped, setIsFlipped] = useState(1);
    const [angle, setAngle] = useState(0);
    const [x, setX] = useState(Math.random() > 0.5 ? -20 : 600);
    const [y, setY] = useState(Math.random() > 0.5 ? -20 : 600);

    const move = () => {
        const speed = 0.028 + 0.005 * getScore();
        const dx = getFreddyPosition().x - x;
        const dy = getFreddyPosition().y - y;
        const norm = Math.sqrt(dx * dx + dy * dy);

        if (norm < 40) {
            setDamage(0.3);
        }
        if (norm < 30) {
            setDamage(1);
        }
        if (norm > 20) {
            setX(x + dx * speed / norm);
            setY(y + dy * speed / norm);
            handleRotation(dx, dy, setAngle, setIsFlipped);
        }
    };

    useTick(delta => {
        if (getScore() > 0) {
            move();
        }
    });

    return (
        <Sprite
            image={fuckYouGuysImage}
            scale={[-1 * isFlipped * scale, scale]}
            angle={angle}
            x={x}
            y={y}
            anchor={0.5}
        />
    );
}

const Kukstrom1 = ({ }) => {

    const [scale, setScale] = useState(0.05);
    const [isFlipped, setIsFlipped] = useState(1);
    const [angle, setAngle] = useState(0);
    const [x, setX] = useState(Math.random() > 0.5 ? -50 : 600);
    const [y, setY] = useState(Math.random() > 0.5 ? -50 : 700);

    return (
        <Sprite
            image={donaldKukstrom}
            scale={[-1 * isFlipped * scale, scale]}
            x={x}
            y={y}
            angle={angle}
            anchor={0.5}
        />
    )
};

const OhhMan = ({ getFreddyPosition, setDamage, getScore }) => {
    const [scale, setScale] = useState(0.04);
    const [speed, setSpeed] = useState(0.2);
    const [isFlipped, setIsFlipped] = useState(-1);
    const [x, setX] = useState(-200);
    const [y, setY] = useState(randomSpan(20, 600));

    const move = () => {
        setX(x + speed);
        const dx = getFreddyPosition().x - x;
        const dy = getFreddyPosition().y - y;
        const norm = Math.sqrt(dx * dx + dy * dy);
        if (norm < 30) {
            setDamage(2 + 0.1 * getScore());
        }
        turn(dx, dy, setIsFlipped);
    };

    function respawn() {
        setY(randomSpan(50, 550));
        if (Math.random() > 0.5) {
            setSpeed(speed + 0.01 * getScore());
            setX(-300);
        } else {
            setSpeed((speed + 0.01 * getScore()) * -1);
            setX(1000);
        }
    };

    useTick(delta => {
        if (x > -400 && x < 1200) {
            move();
        } else {
            if (Math.random() > 0.1) {
                respawn();
            }
        }
    });

    return (
        <Sprite
            image={ohhManImage}
            scale={[-1 * isFlipped * scale, scale]}
            angle={0}
            x={x}
            y={y}
            anchor={0.5}
        />
    );
};

const handleRotation = (dx, dy, setAngle, setIsFlipped) => {
    let newAngle = Math.atan2(dy, dx);
    let isFlipped = -1;

    if (newAngle < -0.5 * Math.PI || newAngle > 0.5 * Math.PI) {
        isFlipped = 1;
        newAngle = newAngle - Math.PI;
    }
    setAngle(newAngle);
    setIsFlipped(isFlipped);
};

function turn(dx, dy, setIsFlipped) {
    let newAngle = Math.atan2(dy, dx);
    let isFlipped = -1;
    if (newAngle < -0.5 * Math.PI || newAngle > 0.5 * Math.PI) {
        isFlipped = 1;
    }
    setIsFlipped(isFlipped);
}

const randomSpan = (lower, upper) => { return lower + (upper - lower) * Math.random(); };

export default Freddy;
