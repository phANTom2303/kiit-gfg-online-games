// GameChat.jsx - Same as TicTacToe version
import React, { useState, useRef, useEffect } from "react";

const GameChat = ({ socket, gameState, messages = [] }) => {
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
  
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);
  
    const sendMessage = (e) => {
      e.preventDefault();
      if (newMessage.trim() && gameState?.id) {
        socket.emit("sendMessage", {
          gameId: gameState.id,
          message: newMessage.trim(),
        });
        setNewMessage("");
      }
    };
  
    return (
      <div className="h-[400px] w-full flex flex-col bg-white rounded-lg">
        <div className="p-4 border-b">
          <h3 className="text-lg font-bold">Game Chat</h3>
        </div>
  
        <div className="flex-1 overflow-hidden">
          <div className="h-[280px] overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <span className="font-semibold text-sm">{msg.sender}: </span>
                <span className="text-sm">{msg.content}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
  
        <div className="p-4 border-t">
          <form onSubmit={sendMessage} className="flex w-full gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default GameChat;
  