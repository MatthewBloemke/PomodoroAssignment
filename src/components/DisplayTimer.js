import {secondsToDuration} from "../utils/duration"
import React from "react";

const DisplayTimer = ({breakTimerDuration, focusTimerDuration, onBreak}) => {
    return <p className="lead" data-testid="session-sub-title">
    {onBreak ? (secondsToDuration(breakTimerDuration)): (secondsToDuration(focusTimerDuration))} remaining
  </p>
}

export default DisplayTimer;