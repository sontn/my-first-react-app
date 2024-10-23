import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello, React!</h1>
      <Greeting name="Sơn" />
      <ClickCounter />
    </div>
  );
}

function Greeting(props) {
  return <h2>Welcome, {props.name}!</h2>;
}

function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {count > 5 && <p>You clicked more than 5 times</p>}
      <button onClick={() => setCount(count + 1)}>
        Click me {count} times
      </button>
    </div>
  );
}

export default App;
