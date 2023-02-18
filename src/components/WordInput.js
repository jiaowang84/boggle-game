import React from 'react';
import { Input } from 'antd';
import './WordInput.css';

const Search = Input.Search;

export default function WordInput(props) {
    return (
        <Search 
            className="WordInput" 
            placeholder="input your word here"
            enterButton="Submit"
            size="large"
            onSearch={props.onEnterWord}
            value={props.wordInputted}
            onChange={props.onChangeWord}
            disabled={props.isTimeUp}
        />
    );
}
