const DisplayBreak = ({breakDuration}) => {
    return (breakDuration <10) ? "0"+breakDuration+":00" : breakDuration+":00";
};

export default DisplayBreak;