import { minutesToDuration } from "../utils/duration";
import React from "react";

const SessionTitle = ({focusDuration, breakDuration, onBreak}) => {
    return !onBreak ? (<h2 data-testid="session-title">Focusing for {minutesToDuration(focusDuration)} minutes</h2>) : (<h2 data-testid="session-title">On Break for {minutesToDuration(breakDuration)} minutes</h2>);
}

export default SessionTitle