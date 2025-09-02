import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

type EventHandlers = {
  [event: string]: (payload: any) => void;
};

const useSocket = (
  isLoggedIn: boolean,
  userId: string | null,
  handlers: EventHandlers = {}
) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const hasSignedIn = useRef(false);
  const prevUserId = useRef<string | null>(null);

  // Establish and manage socket connection
  useEffect(() => {
    if (!isLoggedIn || !userId) {
      console.log("🛑 Not logged in or userId missing, disconnecting socket...");
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsConnected(false);
      hasSignedIn.current = false;
      return;
    }

    // Avoid reconnect if already connected with same user
    if (prevUserId.current === userId && socketRef.current) {
      console.log("✅ Socket already connected for this user.");
      return;
    }

    prevUserId.current = userId;
    const serverUrl = import.meta.env.VITE_SOCKET_URL;
    console.log("🌍 Connecting to socket server:", serverUrl);

    const socket = io(serverUrl, {
      autoConnect: true,
      reconnection: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      setIsConnected(true);
      socket.emit("sign-in", { user_id: userId });
      hasSignedIn.current = true;
    });

    socket.on("disconnect", (reason) => {
      console.log("⚠️ Disconnected:", reason);
      setIsConnected(false);
      hasSignedIn.current = false;
    });

    socket.on("reconnect", (attempt) => {
      console.log(`🔄 Reconnected after ${attempt} attempts`);
      setIsConnected(true);
      socket.emit("sign-in", { user_id: userId });
    });

    socket.on("error", (error) => {
      console.error("❌ Socket error:", error);
    });

    return () => {
      console.log("🧹 Cleaning up socket connection...");
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      hasSignedIn.current = false;
    };
  }, [isLoggedIn, userId]);

  // Bind handlers separately so they don't re-trigger the connection effect
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    for (const [event, callback] of Object.entries(handlers)) {
      socket.on(event, callback);
    }

    return () => {
      for (const event of Object.keys(handlers)) {
        socket.off(event);
      }
    };
  }, [handlers]);

  const emit = (event: string, payload: any) => {
    if (!socketRef.current) {
      console.error("🚨 Cannot emit: Socket not initialized.");
      return;
    }
    socketRef.current.emit(event, payload);
  };

  return { isConnected, emit };
};

export default useSocket;
