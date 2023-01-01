import React, { useState } from 'react';
import Header from './components/header';
import Progress from './components/progress';
import Footer from './components/footer';
import './App.css';

function App() {

  const [countdown, setCountdown] = useState();
  const [time, setTime] = useState();
  const [isShown, setIsShown] = useState(false);

  const setAmount = (e) => {
    setTime(e.target.value)
    setCountdown(e.target.value)
  }

  const startTimer = (e) => {
    e.preventDefault()
    e.target.reset()
    setIsShown(!isShown)
    for (let i = 0; i <= countdown; i++) {
      setTimeout(() => {
      setCountdown(countdown - i)
      }, 1000 * i);
    }
  }
   
  return (
    <>
    <Header />
    <div className="app">
      <div className="timerInput">
        <p className="label">Enter Number in seconds</p>
        <form onSubmit={startTimer}>
          <input type="number" onChange={setAmount}/>
          <button type="submit">Start</button>
        </form>
      </div>
    </div>
    <div className="timer">
        {isShown && <div className="countdownTimer">
        <hr/>
        {countdown > 0 ? <h1>{countdown}</h1> : setIsShown(!isShown)}
        </div>}
      </div>
      {isShown && <Progress countdown={countdown} time={time} />}
    <Footer />
    </>
  );
}

export default App;
