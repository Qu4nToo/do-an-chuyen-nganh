// /components/chatbotbubble.js
import React, { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    window.embeddedChatbotConfig = {
      chatbotId: "V38ht80CgFKI4l_rYsvb-",
      domain: "www.chatbase.co",
    };

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default ChatBot;
