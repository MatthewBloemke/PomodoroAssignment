import {secondsToDuration} from "../utils/duration"


const DisplayBreakTimer = ({breakTimerDuration}) => {
    return secondsToDuration(breakTimerDuration);
}

export default DisplayBreakTimer;