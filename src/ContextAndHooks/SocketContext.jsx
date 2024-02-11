import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { baseURL } from "../api/ClientFunction";
import { useAuth } from "./AuthContext";
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (user && user?.phone) {
      setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    const newSocket = io(baseURL, {
      query: { clientId: phone },
    }); // Replace with your server URL
    setSocket(newSocket);

    return () => newSocket.close();
  }, [phone]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
