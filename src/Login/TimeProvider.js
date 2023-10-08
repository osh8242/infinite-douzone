import { createContext, useContext, useState } from "react";

const TimeContext = createContext();

const TimeProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const timeInfo = {
    currentTime,
    setCurrentTime,
  };

  return (
    <TimeContext.Provider value={timeInfo}>{children}</TimeContext.Provider>
  );
};

export { TimeProvider, TimeContext };
export default TimeProvider;

export const useCurrTime = () => {
  const { currentTime } = useContext(TimeContext);
  return { currentTime, formattedTime: formatDate(currentTime) };
};

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // JS months are zero-based
  const dd = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;
};
