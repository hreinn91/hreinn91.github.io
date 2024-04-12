import { useState, useRef, useEffect } from 'react';
import './style.css'

const HealthBar = ({ maxHp = 100, hp = 100 } = {}) => {
    const barWidth = (hp / maxHp) * 100;
    return (
        <div>
            <div class="health-bar">
                <div class="bar" style={{ width: `${barWidth}%` }}></div>
                <div class="healthbartext">
                </div>
            </div>
        </div>
    );
};



const BeerSpaceHeader = ({ score, hp }) => {
    const maxHp = 100;

    return (
        <div className="header-container">
            <p className="score-text">{score}</p>
            <HealthBar maxHp={maxHp} hp={hp}/>
        </div>
    );
};

export default BeerSpaceHeader;