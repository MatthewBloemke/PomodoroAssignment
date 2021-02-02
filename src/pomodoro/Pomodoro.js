import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import SessionTitle from "../components/SessionTitle"
import DisplayTimer from "../components/DisplayTimer"
import DisplayFocus from "../components/DisplayFocus"
import DisplayBreak from "../components/DisplayBreak"

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [focusTimerDuration, setFocusTimer] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(5);
  const [breakTimerDuration, setBreakTimer] = useState(300);
  const [onBreak, setOnBreak] = useState(false);
  useInterval(
    () => {
      if (focusTimerDuration >= 0) {
        setFocusTimer((focusTimerDuration) => focusTimerDuration-1);
        if (focusTimerDuration === 0) {
          setOnBreak((onBreak)=>(!onBreak));
          new Audio("https://bigsoundbank.com/UPLOAD/mp3/2115.mp3").play();
        }
      } else {
        setBreakTimer((breakTimerDuration) => breakTimerDuration-1);
      }
      if (breakTimerDuration === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1796.mp3").play();
        let resetFocusTimer = focusDuration *60;
        let resetBreakTimer = breakDuration *60;
        setBreakTimer(resetBreakTimer)
        setFocusTimer(resetFocusTimer)
        setOnBreak((onBreak)=>!onBreak)
      }
      

    },
    isTimerRunning ? 1000 : null
  );
  const increaseFocus = () => {
    if (focusDuration < 60) {
      setFocusDuration((focusDuration) =>focusDuration+5);
      setFocusTimer((focusTimerDuration) => focusTimerDuration+300)
    };
  };
  const decreaseFocus = () => {
    if (focusDuration > 5) {
      setFocusDuration((focusDuration) => focusDuration-5);
      setFocusTimer((focusTimerDuration) => focusTimerDuration-300)
    };
  };
  const increaseBreak = () => {
    if (breakDuration < 15) {
      setBreakDuration((breakDuration) => breakDuration+1);
      setBreakTimer((breakTimerDuration) => breakTimerDuration+60);
    };
  };
  const decreaseBreak = () => {
    if (breakDuration > 1) {
      setBreakDuration((breakDuration) => breakDuration-1);
      setBreakTimer((breakTimerDuration) => breakTimerDuration-60);
    };
  };
  
  const progressUpdate = (currentFocusTime, startFocusTime, currentBreakTime,startBreakTime) => {
    startFocusTime = startFocusTime*60;
    startBreakTime = startBreakTime*60
    return !onBreak ? ((startFocusTime-currentFocusTime)/startFocusTime)*100 : ((startBreakTime-currentBreakTime)/startBreakTime)*100;
  }
  const stopButtonPressed = () => {
    setIsTimerRunning(false);
    setFocusDuration(25);
    setBreakDuration(5);
    setFocusTimer(1500);
    setBreakTimer(300);
    if (onBreak) {
      (setOnBreak((onBreak) => !onBreak))
    };
  };
  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  };

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <DisplayFocus focusDuration={focusDuration}/>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick = {decreaseFocus}
                disabled={isTimerRunning}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick = {increaseFocus}
                disabled={isTimerRunning}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <DisplayBreak breakDuration={breakDuration} />
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick = {decreaseBreak}
                  disabled={isTimerRunning}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={increaseBreak}
                  disabled={isTimerRunning}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              disabled={!isTimerRunning}
              onClick={stopButtonPressed}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            <SessionTitle focusDuration = {focusDuration} breakDuration = {breakDuration} onBreak={onBreak}/>
            <DisplayTimer focusTimerDuration={focusTimerDuration} breakTimerDuration={breakTimerDuration} onBreak={onBreak}/>
            
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow= {progressUpdate(focusTimerDuration, focusDuration, breakTimerDuration, breakDuration)} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${progressUpdate(focusTimerDuration, focusDuration, breakTimerDuration, breakDuration)}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
