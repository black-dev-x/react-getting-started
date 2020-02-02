import React, { useState } from 'react';
import './App.css';

function Button() {
  const [counter, setCounter] = useState(0)
  return <button onClick={()=>setCounter(counter + 1)}>{counter}</button>
}

function App() {
  return <Button></Button>;
}

export default App;
