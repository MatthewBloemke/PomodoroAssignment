const DisplayFocus = ({focusDuration}) => {
    return (focusDuration < 10) ? "0"+focusDuration+":00" : focusDuration+":00";
};

export default DisplayFocus;