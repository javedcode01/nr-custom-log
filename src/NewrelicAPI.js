// import React, { useState } from "react";

// const NewRelicLogger = () => {
// //   const [message, setMessage] = useState("");

// //   const handleLogMessageChange = (event) => {
// //     setMessage(event.target.value);
// //   };

//   const sendLogToNewRelic = async () => {
//     const logPayload = [
//       {
//         message: "Testing new relic logs",
//         logtype: "frontend", // This is an example log type. You can choose based on your needs.
//         timestamp: new Date().toISOString(),
//         attributes: {
//           environment: "production",
//           user: "user123", // Optional, include more attributes if necessary
//             "log.level": "error",
//                 "customAttribute": "value",
//                 "browser.entity.name": "ConsumerHub/PRD/AccessoryEnvelopesUpsell",
//         },
//       },
//     ];

//     try {
//       const response = await fetch("https://log-api.newrelic.com/log/v1", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Api-Key": "41d51b1ece7e8d0d8e445d38a365137bFFFFNRAL", // Replace with your actual New Relic Insert API key
//         },
//         body: JSON.stringify(logPayload),
//       });

//       if (response.ok) {
//         console.log("Log sent successfully to New Relic");
//       } else {
//         console.error("Failed to send log", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error("Error sending log to New Relic:", error);
//     }
//   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     sendLogToNewRelic(message);
// //   };

//   return (
//     <div>
//       <h1> New Relic Test</h1>
//       <button onClick={sendLogToNewRelic}>Send logs to new relic</button>
//       {/* <form onSubmit={handleSubmit}>
//         <textarea
//           value={message}
//           onChange={handleLogMessageChange}
//           placeholder="Enter log message"
//           rows="4"
//           cols="50"
//         ></textarea>
//         <br /> */}
//         {/* <button type="submit">Send Log</button> */}
//       {/* </form> */}
//     </div>
//   );
// };

// export default NewRelicLogger;
