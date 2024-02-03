import React, { useState } from "react";

export default function Therapy() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      try {
        // Make a POST request to your Express backend endpoint "/messages"
        const response = await fetch("http://localhost:5000/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: input }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        // Parse the response and update the frontend state with the chatbot's response
        const result = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: input, sender: "user" },
          { text: result.text, sender: "chatbot" },
        ]);

        setInput("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen pt-24 p-10 bg-gradient-to-tl from-green-400 via-gray-50 to-teal-300">
      <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-md ml-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
