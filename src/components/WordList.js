
import React from 'react';
import './WordList.css';

export default function WordList(props) {
    return (
        <div className="WordList">
            <ul>
                {props.listOfWordInputted.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </div>
    );
}
