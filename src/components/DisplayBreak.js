import { minutesToDuration } from "../utils/duration";
import React from "react";

const DisplayBreak = ({breakDuration}) => {
    return <span className="input-group-text" data-testid="duration-break">Break Duration: {minutesToDuration(breakDuration)}</span>
}

export default DisplayBreak;