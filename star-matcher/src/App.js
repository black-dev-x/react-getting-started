import React, { useState, useEffect } from 'react';
import './App.css';

const useGameState = () => {

  const [stars, setStars] = useState(utils.random(1, 9))
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9))
  const [candidateNumbers, setCandidateNumbers] = useState([])
  const [secondsLeft, setSecondsLeft] = useState(10)

  useEffect(() => {
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000)
      return () => clearTimeout(timerId)
    }
  })

  const setGameState = (newCandidateNumbs) => {
    if (utils.sum(newCandidateNumbs) !== stars) {
      setCandidateNumbers(newCandidateNumbs)
    } else {
      const newAvailableNumbers = availableNumbers.filter(n => !newCandidateNumbs.includes(n))
      setAvailableNumbers(newAvailableNumbers)
      setCandidateNumbers([])
      setStars(utils.randomSumIn(newAvailableNumbers, 9))
    }
  }
  return { stars, availableNumbers, candidateNumbers, secondsLeft, setGameState }
}

const Game = (props) => {

  const {stars, availableNumbers, candidateNumbers, secondsLeft, setGameState} = useGameState();

  const gameStatus = availableNumbers.length === 0 ? 'won' :
    secondsLeft === 0 ? 'lost' : 'ongoing'

  const candidatesAreWrong = utils.sum(candidateNumbers) > stars

  const resetGame = () => {
    props.reset()
  }

  const numberStatus = number => {
    if (!availableNumbers.includes(number)) {
      return 'used'
    }
    if (candidateNumbers.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate'
    }
    return 'available'
  }

  const onNumberClicked = (value, status) => {

    if (status === 'used' || gameStatus !== 'ongoing') {
      return;
    }
    const newCandidateNumbs = status === 'available' ?
      candidateNumbers.concat(value) :
      candidateNumbers.filter(n => value !== n)

    setGameState(newCandidateNumbs)
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'ongoing' ?
            (<PlayAgain reset={resetGame} status={gameStatus}></PlayAgain>) :
            (<StarsDisplay count={stars}></StarsDisplay>)
          }
        </div>
        <div className="right">
          {utils.range(1, 9).map(value =>
            <PlayNumber
              key={value}
              status={numberStatus(value)}
              value={value}
              onClick={onNumberClicked}>
            </PlayNumber>)}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = () => {
  const [gameId, setGameId] = useState(1)
  const reset = () => setGameId(gameId + 1)
  return <Game key={gameId} reset={reset}></Game>
}

const StarsDisplay = ({ count }) => {
  return utils.range(1, count).map(starId => <div key={starId} className="star" />);
}

const PlayNumber = (props) => (
  <button
    className="number"
    style={{ backgroundColor: colors[props.status] }}
    onClick={() => props.onClick(props.value, props.status)}>
    {props.value}
  </button>
)

const PlayAgain = (props) => (
  <div className="game-done">
    <div className="message" style={{ color: props.status === 'lost' ? 'red' : 'green' }}>
      {props.status === 'lost' ? 'Game Over' : 'Nice!'}
    </div>
    <button onClick={props.reset}>Play Again</button>
  </div>
)

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default StarMatch;
