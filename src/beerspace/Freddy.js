import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@pixi/react';
import freddyImage from '../assets/freddy-head.png'

let i = 0;

const Freddy = () => {

    const [scaleFactor, setScaleFactor] = useState(0.5);
    const [isFlipped, setIsFlipped] = useState(-1)
    const [x, setX] = useState(100);
    const [y, setY] = useState(100);
    const [dx, setDX] = useState(1);
    const [rotation, setRotation] = useState(0);

    const moveX = () => {
        if(x > 300){
            setDX(-1);
            setRotation(rotation + Math.PI * 0.5);
            // setIsFlipped(isFlipped * -1);
        }
        if(x < 100){
            setDX(1);
            // setRotation(rotation + Math.PI * 0.5);
            // setIsFlipped(isFlipped * -1);
        }
        setX(x + dx);
    }

    // Function to print the location of the cursor
    const printCursorPosition = (e) => {
        console.log(`Cursor Position - X: ${e.clientX}, Y: ${e.clientY}`);
    };

    // useEffect to add and remove the event listener
    useEffect(() => {
        // Add event listener when the component mounts
        window.addEventListener('click', printCursorPosition);

        // Remove event listener when the component unmounts
        return () => {
            window.removeEventListener('click', printCursorPosition);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount


    useTick(delta => {
        i += 0.05 * delta;

        // moveX();
        
        // setX(Math.sin(i) * 100 + 150); // Adjusted to keep the sprite within the container
        // setY(Math.sin(i / 1.5) * 100 + 150); // Same here
        // setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);
        // setRotation(rotation + 10);
    });

    return (<Sprite
        image={freddyImage}
        scale={[isFlipped * scaleFactor, scaleFactor]}
        rotation={rotation}
        x={x}
        y={y}
        anchor={{ x: 0.5, y: 0.5 }}
    />);
}

export default Freddy;
