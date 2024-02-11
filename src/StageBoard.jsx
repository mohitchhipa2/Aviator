import React, { useRef, useEffect } from "react";
import CanvasAnimation from "./Canvas";
import { useBetContext } from "./ContextAndHooks/BetContext";
import { useSocket } from "./ContextAndHooks/SocketContext";
import ReactAudioPlayer from "react-audio-player";
import backgroundSound from "./sound/background.mp3";
import { useSettingContext } from "./ContextAndHooks/SettingContext";
import { deleteData } from "./api/ClientFunction";
import "./styles.css"
const StageBoard = () => {
  const stateRef = useRef(null);
  const socket = useSocket();
  const { state, dispatch } = useBetContext();
  const { planeCrashed, gameStarted, planeValue } = state;
  const { sound } = useSettingContext().state;

  useEffect(() => {
    if (socket) {
      socket.on("planeCounter", async (value) => {
        if (value !== 0) {
          dispatch({ type: "planeValue", payload: value });
        } else {
          await deleteData("/user/deleteallbets");
          dispatch({ type: "planeCrashed", payload: true });
        }
      });
    }
  }, [socket]);

  return (
    <div className="stage-board" ref={stateRef}>
      <div className="counter-num text-center" id="auto_increment_number_div">
        {planeCrashed && (
          <div
            className="secondary-font f-40 flew_away_section mb-2"
            style={{ fontWeight: "bold", fontFamily: "sans-serif" }}
          >
            FLEW AWAY!
          </div>
        )}
        {gameStarted && (
          <>
            <div
              id="auto_increment_number"
              className={`${planeCrashed ? "text-danger" : ""}`}
            >
              {planeValue}
              <span>X</span>
            </div>
            {sound && (
              <ReactAudioPlayer
                src={backgroundSound}
                autoPlay={true}
                // controls
              />
            )}
          </>
        )}
      </div>
      <img src="images/bg-rotate-old.svg" className="rotateimage" />
      <CanvasAnimation stateRef={stateRef} />
    </div>
  );
};

export default StageBoard;
