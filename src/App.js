import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Progress from "./components/progress";
import Footer from "./components/footer";
import "./App.css";

function App() {
  const [countdown, setCountdown] = useState(null);
  const [time, setTime] = useState(0);
  const [isShown, setIsShown] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [intervalId, setIntervalId] = useState(null);
  const [isInputActive, setIsInputActive] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [endTime, setEndTime] = useState(null);

  const setAmount = (e) => {
    setTime(e.target.value);
    setCountdown(e.target.value);
    setCompleted(false);
  };

  const startTimer = (e) => {
    e.preventDefault();
    if (!isRunning && time) {
      setIsRunning(true);
      setButtonText("End");
      setIsShown(true);
      setIsInputActive(false);
      const id = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      setIntervalId(id);
    } else {
      setIsRunning(false);
      setTime(null);
      setCountdown(null);
      document.querySelector("input").value = "";
      setButtonText("Start");
      clearInterval(intervalId);
      setCompleted(true);
      setEndTime(new Date());
    }

    setIsInputActive(true);
  };

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalId);
      setIsRunning(false);
      setButtonText("Start");
      document.querySelector("input").value = "";
      setIsInputActive(true);
      setCompleted(true);
      setEndTime(new Date());
    }
  }, [countdown, intervalId]);

  const formatTime = () => {
    if (endTime) {
      const hours = endTime.getHours();
      const minutes = endTime.getMinutes();
      const seconds = endTime.getSeconds();
      return `${hours}:${minutes}:${seconds}`;
    }
    return "";
  };

  return (
    <>
      <Header />
      <div className="appBlock">
        <div className="app">
          <div className="timerInput">
            <p className="label">Enter Number in seconds</p>
            <form onSubmit={startTimer}>
              <input
                type="number"
                onChange={setAmount}
                disabled={isRunning || !isInputActive}
              />
              <button type="submit">{buttonText}</button>
            </form>
          </div>
        </div>
        <div className="timer">
          {isShown && (
            <div className="countdownTimer">
              <hr />
              {countdown > 0 ? <h1>{countdown}</h1> : setIsShown(false)}
            </div>
          )}
          {completed && countdown === 0 ? (
            <div>
              <h1>Done</h1>
              <p>Timer ended at {formatTime()}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        {isShown && <Progress countdown={countdown} time={time} />}
      </div>
      <Footer />
    </>
  );
}

export default App;
