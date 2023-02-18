import React from 'react';
import Letter from './Letter';
import './Board.css';

export default function Board(props) {
    return (
        <div className="Board">
            {props.boardLetters.map((letter, index) => <Letter key={`letter${index}`} letter={letter} />)}
        </div>
    );
}