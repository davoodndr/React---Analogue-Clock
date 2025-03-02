import React, {useState, useEffect} from "react";

function Clock(){

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });


  useEffect(() => {
    // Function to update the time
    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        milliseconds: now.getMilliseconds(),
      });
    };

    // Set an interval to update the time every 1ms
    const interval = setInterval(updateTime, 1);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []); 

  // Formatting the time (adding leading zeroes if necessary)
  const formatTime = (num) => (num < 10 ? `${num}` : num);

  function formatedHours(hour){
    if (hour === 0) {
      hour = 12; // Midnight is 12 AM
    } else if (hour > 12) {
      hour = hour - 12; // Convert to 12-hour format
    }
    return hour
  }

  return (
    
    <div className="clock-dial">
      <div className="center-point"></div>
      <div className="hand" style={{transform:`rotate(${(time.hours % 12) * 30 + (time.minutes / 2)}deg)`}}>
        <span className="hour-hand"></span>
        <span className="hours">{formatTime(formatedHours(time.hours))}</span>
      </div>
      <div className="hand" style={{transform:`rotate(${time.minutes * 6 + (time.seconds * 0.1)}deg)`}}>
        <span className="minute-hand"></span>
        <span className="minutes">{formatTime(time.minutes)}</span>
      </div>
      <div className="hand" style={{transform:`rotate(${time.seconds * 6 + (time.milliseconds / 166.66)}deg)`}}>
        <span className="seconds-hand"></span>
        <span className="seconds">{formatTime(time.seconds)}</span>
      </div>
    </div>
  );
};


export default Clock;