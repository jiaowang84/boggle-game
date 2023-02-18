import React, { Component } from 'react';
import { Button, Alert } from 'antd';
import './App.css';
import axios from 'axios';

import Board from './components/Board';
import WordList from './components/WordList';
import Timer from './components/Timer';
import WordInput from './components/WordInput';

import { formatTimerString } from './utils/TimerUtil';
import { getShuffledLetters } from './utils/GameUtil';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: '00:00',
      boardLetters: [],
      listOfWordInputted: [],
      isTimeUp: false,
      loading: true,
      listOfValidWords: [],
      invalidWordFlag: false,
      timer: null,
      wordInputted: ''
    }
    this.startAGame = this.startAGame.bind(this);
    this.onEnterWord = this.onEnterWord.bind(this);
    this.getListOfValidWords = this.getListOfValidWords.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.onChangeWord = this.onChangeWord.bind(this);
  }

  componentWillMount() {
    this.setState({ boardLetters: ['T', 'A', 'P', '*', 'E', 'A', 'K', 'S', 'O', 'B', 'R', 'S', 'S', '*', 'X', 'D'] },
      () => {
        console.log('call get valid words');
        this.getListOfValidWords().then(() => {
          this.setState({ loading: false });
          this.startTimer();
        });
      });
  }

  startAGame() {
    this.clearContent();
    this.setState({ boardLetters: getShuffledLetters() }, () => {
      this.getListOfValidWords().then(() => {
        this.setState({ loading: false, invalidWordFlag: false, timeRemaining: '00:00' });
        this.clearTimer();
        this.startTimer();
      });
    });
  }

  clearContent() {
    this.setState({ listOfWordInputted: [], wordInputted: '' });
  }

  getListOfValidWords() {
    console.log(this.state.boardLetters);
    return axios.post('/getValidWordsFromBoardLetters', {
      boardLetters: this.state.boardLetters
    }).then((result) => {
      this.setState({ listOfValidWords: result.data });
    });
  }

  startTimer() {
    this.setState({ isTimeUp: false });
    let secondsRemaining = 120;
    let min = 0, sec = 0;
    let timer = setInterval(() => {
      secondsRemaining--;
      if (secondsRemaining <= 0) {
        this.setState({ timeRemaining: '00:00', isTimeUp: true });
        clearInterval(timer);
      }
      min = Math.floor(secondsRemaining / 60);
      sec = secondsRemaining - (min * 60);
      this.setState({ timeRemaining: formatTimerString(min, sec) });
    }, 1000);
    this.setState({ timer: timer });
  }

  clearTimer() {
    clearInterval(this.state.timer);
  }

  onEnterWord(value) {
    if (this.state.listOfValidWords.includes(value.toUpperCase())) {
      this.setState({ listOfWordInputted: [...this.state.listOfWordInputted, value], invalidWordFlag: false, wordInputted: '' });
    } else {
      this.setState({ invalidWordFlag: true, wordInputted: '' });
    }
  }

  onChangeWord(e){
    this.setState({wordInputted: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="AppHeader">
          Boggle Game
        </header>

        {this.state.isTimeUp && <Alert style={{ fontSize: '16px' }} message="Time Is Up!" type="success" />}
        {this.state.invalidWordFlag && <Alert style={{ fontSize: '16px' }} message="Invalid Word!" type="error" />}

        <div className="TopRow" >
          <Button icon="play-circle" onClick={this.startAGame}>New Game</Button>
          <Timer timeRemaining={this.state.timeRemaining} />
        </div>

        <div className="Canvas">
          <Board boardLetters={this.state.boardLetters} />
          <div className="AnswerSheet">
            <WordInput onEnterWord={this.onEnterWord} wordInputted={this.state.wordInputted} onChangeWord={this.onChangeWord} isTimeUp={this.state.isTimeUp} />
            <WordList listOfWordInputted={this.state.listOfWordInputted} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
