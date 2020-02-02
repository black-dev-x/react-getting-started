import React, { useState } from 'react';
import './App.css';

function Button() {
  const [counter, setCounter] = useState(5)
  const handleClick = _ => setCounter(counter*2)
  return (
  <button onClick={handleClick}>
    {counter}
  </button>
  )
}

function Display() {
  return (
    <div>....</div>
  )
}

function App() {
  return (
    <div>
      <Button></Button>
      <Display></Display>
    </div>
  )
}

export default App;
