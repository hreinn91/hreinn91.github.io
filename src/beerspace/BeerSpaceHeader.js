import { useState, useRef, useEffect } from 'react';
import './style.css'

const HealthBar = ({ maxHp = 100, hp = 100 } = {}) => {
    const barWidth = (hp / maxHp) * 100;
    return (
        <div>
            <div class="health-bar">
                <div class="bar" style={{ width: `${barWidth}%` }}></div>
                <div class="hit" style={{ width: `${0}%` }}></div>
                <div class="healthbartext">
                </div>
            </div>
        </div>
    );
};



const BeerSpaceHeader = ({ score, setDamage }) => {
    const maxHp = 100;
    const [hp, setHp] = useState(maxHp);

    return (
        <div className="header-container">
            <p className="score-text">The score: {score}</p>
            <HealthBar maxHp={maxHp} hp={25} />
        </div>
    );
};

export default BeerSpaceHeader;