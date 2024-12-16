// /components/chatbotbubble.js
import { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    window.embeddedChatbotConfig = {
      chatbotId: "HgkpakXU3xmH0yoAOKRU7",
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
