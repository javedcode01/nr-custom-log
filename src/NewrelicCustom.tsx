import React from "react";
import { logger } from "./logger.ts";

const NewRelicCustomLogger = () => {

  const sendLogToNewRelic = async () => {

    console.log('button clicked to send logs')
    
    try {
      logger.info("Testing new relic logs")
    } catch (error) {
      console.error("Error sending custom log to New Relic:", error);
    }
  };

  return (
    <div>
      <h1> New Relic Custome log Test</h1>
      <button onClick={sendLogToNewRelic}>Send custom log to new relic</button>

    </div>
  );
};

export default NewRelicCustomLogger;
