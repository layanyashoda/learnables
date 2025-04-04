"use client";

import { useEffect } from "react";

const DialogflowChatbot = () => {
  useEffect(() => {
    // Dynamically load the Dialogflow Messenger script
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script when the component unmounts
    };
  }, []);

  return (
    <>
      {/* Include Dialogflow Messenger's CSS */}
      <link
        rel="stylesheet"
        href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
      />

      {/* Add Dialogflow Messenger */}
      <df-messenger
        project-id="gen-lang-client-0467003185"
        agent-id="76f58565-a5f7-48ee-abb0-110ea32ee032"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="LearnBuddy Assistant" 
        chat-icon="https://storage.cloud.google.com/learndataforlogo/LearnBuddy%20with%20BG.png" chat-subtitle="Your Learning Companion" chat-title-icon="https://storage.cloud.google.com/learndataforlogo/LearnBuddy%20with%20BG.png"></df-messenger-chat-bubble>
      </df-messenger>

      {/* Styling for Dialogflow */}
      <style jsx global>{`
        df-messenger {
          z-index: 999;
          position: fixed;
          --df-messenger-font-color: #000;
          --df-messenger-font-family: Google Sans;
          --df-messenger-chat-background: #f6ecf8;
          --df-messenger-message-user-background: #d3e3fd;
          --df-messenger-message-bot-background: #fff;
          --df-messenger-icon-size: 32px;
          --df-messenger-chat-bubble-border-radius: 32px;
          --df-messenger-chat-border-radius: 10px;
          --df-messenger-chat-window-height: 600px;
          --df-messenger-chat-window-width: 300px;
          --df-messenger-chat-bubble-icon-color: purple;
          --df-messenger-titlebar-title-font-size: 18px;
          --df-messenger-titlebar-icon-width: 32px;
          --df-messenger-titlebar-icon-height: 32px;
          bottom: 24px;
          right: 24px;
        }
      `}</style>
    </>
  );
};

export default DialogflowChatbot;
