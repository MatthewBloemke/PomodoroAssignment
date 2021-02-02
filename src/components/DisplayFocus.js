import { minutesToDuration } from "../utils/duration";
import React from "react";

const DisplayFocus = ({focusDuration}) => {
    return <span className="input-group-text" data-testid="duration-focus">Focus Duration: {minutesToDuration(focusDuration)}</span> 
};

export default DisplayFocus;