import React, { useState } from "react";
import { useAuth } from "./ContextAndHooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-modal";
import HowToPlay from "./Pages/HowToPlay";

const HeaderBottom = () => {
  const { user } = useAuth();
 const  navigate= useNavigate()

 const [isModalOpen, setIsModalOpen] = useState(false);
 const handleHowToPlayClick = () => {
  // setIsModalOpen(true);
  setIsModalOpen((prev) => !prev);
};

  return (
    <div className="header-bottom">
      <div className="header-left">
        <img src="images/logo.svg" alt="Logo" className="logo" />
      </div>
      <div className="header-right d-flex align-items-center">
        {/* data-bs-toggle="modal" data-bs-target="#how-to-play" */}
        <button  onClick={handleHowToPlayClick} className="btn btn-warning m-font-0 rounded-pill py-1 px-2 f-14 d-flex align-items-center h-26">
          <span className="material-symbols-outlined f-18 me-1">help</span> How
          to Play
        </button>
        {isModalOpen && <HowToPlay onClose={() => setIsModalOpen(false)} />}
        <div className="wallet-balance h-26">
          <span id="wallet_balance">
            ₹{user?.money}
            {/* You may render wallet balance dynamically here */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
