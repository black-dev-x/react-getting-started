import React, { useState } from 'react';
import './App.css';

const StarMatch = () => {

  const [stars, setStars] = useState(utils.random(1,9))
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1,9))
  const [candidateNumbers, setCandidateNumbers] = useState([])

  const candidatesAreWrong = utils.sum(candidateNumbers) > stars;

  const numberStatus = number => {
    if(!availableNumbers.includes(number)){
      return 'used'
    }
    if(candidateNumbers.includes(number)){
      return candidatesAreWrong ? 'wrong' : 'candidate'
    }
    return 'available'
  }

  const onNumberClicked = (value, status) => {
    
    if(status === 'used') {
      return;
    }
    const newCandidateNumbs = status === 'available' ? 
      candidateNumbers.concat(value) :
      candidateNumbers.filter(n => value !== n)

      if(utils.sum(newCandidateNumbs) !== stars){
      setCandidateNumbers(newCandidateNumbs)
    } else {
      const newAvailableNumbers = availableNumbers.filter(n => !newCandidateNumbs.includes(n))
      setAvailableNumbers(newAvailableNumbers)
      setCandidateNumbers([])
      setStars(utils.randomSumIn(newAvailableNumbers, 9))
    }
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarsDisplay count={stars}></StarsDisplay>
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
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

const StarsDisplay = ({count}) => {
  return utils.range(1, count).map(starId => <div key={starId} className="star"/>);
}

const PlayNumber = (props) => (
  <button 
    className="number" 
    style={{backgroundColor: colors[props.status]}}
    onClick={() => props.onClick(props.value, props.status)}>
    {props.value}
  </button>
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
