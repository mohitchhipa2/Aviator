import React, { useEffect,useState } from "react";
import { useSocket } from "./ContextAndHooks/SocketContext";

const HistoryTop = ({ allresults }) => {
  const socket = useSocket();
  const [history, setHistory] = useState([]);
  useEffect(() => {
    if (socket) {
      socket.on("lastCrashed", (data) => {
        setHistory(data.reverse());
      });
    }
  }, [socket, history]);

  return (
    <div className="history-top">
      <div className="stats">
        <div className="payouts-wrapper">
          <div className="payouts-block">
            {history &&
              history.map((item, index) => (
                <div key={index} className="bg1 custom-badge">
                  {item}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTop;
