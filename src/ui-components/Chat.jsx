import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket-io";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const targetUserId = useParams().targetUserId;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const userFirstName = user?.firstName;

  useEffect(() => {
    if (!userId || !targetUserId || !userFirstName) return;
    // Join the chat room when the component mounts
    const socket = createSocketConnection();
    socket.emit("joinChat", { userFirstName, userId, targetUserId });
    fetchUserChatMessages();

    socket.on("messageReceived", ({ userFirstName, text }) => {
      setMessages((messages) => [...messages, { userFirstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, userFirstName]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (!newMessage) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      userFirstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  if (!targetUserId) {
    return <h1 className="text-center my-10 text-xl">No User Selected</h1>;
  }

  const fetchUserChatMessages = async ()=>{
    try{
      const response = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {withCredentials: true});

      const chatMessages = response?.data?.message.map((msg) => ({
        userFirstName: msg?.sender?.firstName,
        text: msg?.text,
      }));
      setMessages(chatMessages);
    }catch(err)
    {
      console.log(`Error fetching chat messages: ${err.message}`)
    }
  }

  return (
    <div className="w-1/2 mx-auto m-5 h-[75.5vh] bg-gray-300 rounded-lg flex flex-col">
      <h1 className="flex font-bold justify-center py-4 px-6 border-b text-xl bg-gray-200 rounded-t-lg">
        Chat
      </h1>

      <div className="flex-1 overflow-y-scroll p-6 space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No messages yet</p>
        ) : (
          messages.map((msg, index) => {
            return (
              <div key={index} className={"chat"+ (user.firstName === msg.userFirstName ? " chat-start" : " chat-end")}>
              <div className="chat-header text-base font-semibold">
                 {msg.userFirstName}
              </div>
              <div className={"chat-bubble text-lg py-3 px-4 break-words " + (user.firstName === msg.userFirstName ? "chat-bubble-neutral" : "chat-bubble-info")}>{msg.text}</div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-gray-400 flex items-center gap-3 bg-gray-200 rounded-b-lg">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type your message..."
          className="border p-3 rounded-lg flex-1 text-black text-lg"
        />
        <button
          onClick={() => {
            handleSendMessage();
          }}
          className="btn btn-primary text-lg px-5 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
