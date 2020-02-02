import React, { useState } from 'react';
import './App.css';

function Button(props) {

  const click = () => props.action(props.increment)
  
  return (
  <button onClick={click}>
    +{props.increment}
  </button>
  )
}

function Display(props) {
  return (
    <div>{props.message}</div>
  )
}

function App() {
  const [counter, setCounter] = useState(0)
  const incrementCounter = (value) => setCounter(counter + value)
  return (
    <div>
      <Button action={incrementCounter} increment={1}></Button>
      <Button action={incrementCounter} increment={5}></Button>
      <Button action={incrementCounter} increment={10}></Button>
      <Button action={incrementCounter} increment={100}></Button>
      <Display message={counter}></Display>
    </div>
  )
}

export default App;
