import {secondsToDuration} from "../utils/duration"

const DisplayFocusTimer = ({focusTimerDuration}) => {
    return secondsToDuration(focusTimerDuration)
}

export default DisplayFocusTimer;