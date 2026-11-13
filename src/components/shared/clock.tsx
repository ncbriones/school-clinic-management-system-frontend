import { useEffect, useState } from "react";

const LiveClock = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 0);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="text-white flex-col items-start justify-start h-full">
      <p>Time: {formattedTime}</p>
    </div>
  );
};

export default LiveClock;
