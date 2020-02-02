import React, { useState } from 'react';
import './App.css';

function Button() {
  const [counter, updateCounter] = useState(0)
  return <button onClick={()=>updateCounter(counter + 1)}>{counter}</button>
}

function App() {
  return <Button></Button>;
}

export default App;
