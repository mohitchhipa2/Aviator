import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetchData } from "./api/ClientFunction";
import { useAuth } from "./ContextAndHooks/AuthContext";
const LeftSidebar = () => {
  const { user } = useAuth();
  const [betType, setBetType] = useState(0);
  const [userBet, setUserBet] = useState([]);
  const [allBet, setAllBet] = useState([]);
  const handleBetTypeChange = (type) => {
    setBetType(type);
  };
  const { data, error, mutate } = useSWR(
    `/user/getmybets?phone=${user?.phone}`,
    fetchData,
    {
      refreshInterval: 20000, // Set the refresh interval to 20 seconds
    }
  );
  const { data: allbetData } = useSWR(`/user/getallbets`, fetchData, {
    refreshInterval: 100,
  });
  useEffect(() => {
    if (data && data.data) {
      setUserBet(data.data);
    }
  }, [data]);
  useEffect(() => {
    if (allbetData && allbetData.data) {
      setAllBet(allbetData.data);
    }
  }, [allbetData]);
  function formatDate(inputDate) {
    // Parse the input date string
    const dateObject = new Date(inputDate);

    // Format the date in the desired format
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  return (
    <div className="left-sidebar">
      <div className="tabs-navs">
        <div className="navigation">
          <div className="navigation-switcher">
            <div
              className={`slider  bet-btn ${betType === 0 ? "active" : ""}`}
              onClick={() => handleBetTypeChange(0)}
            >
              All Bets
            </div>
            <div
              className={`slider auto-btn ${betType === 1 ? "active" : ""}`}
              onClick={() => handleBetTypeChange(1)}
            >
              My Bets
            </div>
            <span className="active-line"></span>
          </div>
        </div>
      </div>
      <div className="contents-blocks">
        <div>
          {/* left All Bets Code.... */}
          {betType === 0 && (
            <div style={{ overflowY: "scroll" }}>
              <div className="list-data-tbl mt-2">
                <div className="list-header">
                  <div className="column-1">Date</div>
                  <div className="column-2">Bet</div>
                  <div className="column-3">Mult.</div>
                  <div className="column-4">Cash out</div>
                  <div className="ps-2"></div>
                </div>
                <div className="list-body scroll-div list-body1">
                  {allBet.map((item, index) => (
                    <div className="list-items" key={index}>
                      <div className="column-1 users fw-normal">
                        {formatDate(item?.betTime)}
                      </div>
                      <div className="column-2">
                        <button className="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                          {item?.betAmount}₹
                        </button>
                      </div>
                      <div className="column-3">
                        <div className="bg3 custom-badge mx-auto">
                          {item?.multiplier}x
                        </div>
                      </div>
                      <div className="column-2">
                        <button className="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                          {item?.withdrawAmount || 0}₹
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* right My Bets Code.... */}
          {betType === 1 && (
            <div style={{ overflowY: "scroll" }}>
              <div className="list-data-tbl mt-2">
                <div className="list-header">
                  <div className="column-1">Date</div>
                  <div className="column-2">Bet</div>
                  <div className="column-3">Mult.</div>
                  <div className="column-4">Cash out</div>
                  <div className="ps-2"></div>
                </div>
                <div className="list-body scroll-div list-body1">
                  {userBet.map((item, index) => (
                    <div className="list-items" key={index}>
                      <div className="column-1 users fw-normal">
                        {formatDate(item?.betTime)}
                      </div>
                      <div className="column-2">
                        <button className="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                          {item?.betAmount}₹
                        </button>
                      </div>
                      <div className="column-3">
                        <div className="bg3 custom-badge mx-auto">
                          {item?.multiplier}x
                        </div>
                      </div>
                      <div className="column-2">
                        <button className="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                          {item?.withdrawAmount || 0}₹
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
