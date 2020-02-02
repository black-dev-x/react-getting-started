import React, { useState } from 'react';
import './App.css';

function Button(props) {
  return (
  <button onClick={props.action}>
    +1
  </button>
  )
}

function Display(props) {
  return (
    <div>{props.message}</div>
  )
}

function App() {
  const [counter, setCounter] = useState(1)
  const incrementCounter = () => setCounter(counter + 1)
  return (
    <div>
      <Button action={incrementCounter}></Button>
      <Display message={counter}></Display>
    </div>
  )
}

export default App;
