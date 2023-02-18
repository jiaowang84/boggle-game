import React from 'react';
import './Timer.css';

export default function Timer(props) {
    return (
        <div className="Timer">{props.timeRemaining}</div>
    );
}
