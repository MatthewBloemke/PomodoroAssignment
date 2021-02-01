import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import DisplayFocus from "../components/DisplayFocus"
import DisplayBreak from "../components/DisplayBreak"
import DisplayFocusTimer from "../components/DisplayFocusTimer"
import DisplayBreakTimer from "../components/DisplayBreakTimer.js"

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [breakTimerDuration, setBreakTimerDuration] = useState(300);
  const [focusTimerDuration, setFocusTimerDuration] = useState(1500);
  useInterval(
    () => {
      if (focusTimerDuration > 0) {
        setFocusTimerDuration(focusTimerDuration-1);
        if (focusTimerDuration === 1) {
          console.log(focusTimerDuration)
          new Audio("https://bigsoundbank.com/UPLOAD/mp3/2115.mp3").play();
        }
      } else {
        setBreakTimerDuration(breakTimerDuration-1);
      }
      if (breakTimerDuration === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1796.mp3").play();
        setFocusTimerDuration(focusDuration*60);
      }
      

    },
    isTimerRunning ? 1000 : null
  );
  const increaseFocus = () => {
    if (focusDuration < 60) {
      
      setFocusDuration(focusDuration+5);
      setFocusTimerDuration(focusTimerDuration+300);
    };
  };
  const decreaseFocus = () => {
    if (focusDuration > 5) {
      setFocusDuration(focusDuration-5);
      setFocusTimerDuration(focusTimerDuration-300);
    };
  };
  const increaseBreak = () => {
    if (breakDuration < 15) {
      setBreakDuration(breakDuration+1);
      setBreakTimerDuration(breakTimerDuration+60);
    };
  };
  const decreaseBreak = () => {
    if (breakDuration > 1) {
      setBreakDuration(breakDuration-1);
      setBreakTimerDuration(breakTimerDuration-60);
    };
  };
  
  const progressUpdate = (currentFocusTime, startFocusTime, currentBreakTime,startBreakTime) => {
    return focusTimerDuration>0 ? ((startFocusTime-currentFocusTime)/startFocusTime)*100 : ((startBreakTime-currentBreakTime)/startBreakTime)*100;
  }
  const stopButtonPressed = () => {
    setIsTimerRunning(false);
    setFocusTimerDuration(1500);
    setFocusDuration(25);
    setBreakTimerDuration(300);
    setBreakDuration(5);
  };
  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  };

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: <DisplayFocus focusDuration = {focusDuration}/>
            </span>
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
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: <DisplayBreak breakDuration={breakDuration} />
              </span>
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
            {focusTimerDuration > 0 ? 
            (<h2 data-testid="session-title">Focusing for <DisplayFocus focusDuration = {focusDuration}/> minutes</h2>) : 
            (<h2 data-testid="session-title">On Break for <DisplayBreak breakDuration = {breakDuration}/> minutes</h2>)}
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            
            {/* TODO: Update message below to include time remaining in the current session */}
            {focusTimerDuration > 0 ? 
            (<p className="lead" data-testid="session-sub-title">
              <DisplayFocusTimer focusTimerDuration={focusTimerDuration} /> remaining
            </p>) : 
            (<p className="lead" data-testid="session-sub-title">
            <DisplayBreakTimer breakTimerDuration={breakTimerDuration} /> remaining
          </p>)}
            
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
                aria-valuenow= {progressUpdate(focusTimerDuration, (focusDuration*60), breakTimerDuration, (breakDuration*60))} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${progressUpdate(focusTimerDuration, (focusDuration*60), breakTimerDuration, (breakDuration*60))}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
