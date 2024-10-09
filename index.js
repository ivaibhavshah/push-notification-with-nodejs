import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import admin from "firebase-admin";
import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { Notification } from "./template.js";
import dotenv from "dotenv";
dotenv.config();
// const variable = "./key.json"
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.PROJECT_NAME,
});

app.post("/singleSend", function (req, res) {
  if (req.body.fcm_token === null || req.body.fcm_token === undefined) {
    return res.status(400).send({ message: "Missing fcm_token" });
  }
  const message = Notification({
    title: req.body?.title,
    body: req.body?.body,
    token: req.body?.fcm_token,
  });
  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.status(200).json({
        message: "Successfully sent message",
        token: response,
      });
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});

app.post("/bulkSend", function (req, res) {
  if ( req.body.fcm_tokens === null || req.body.fcm_tokens === undefined || req.body.fcm_tokens.length === 0 ) {
    return res.status(400).send({ message: "Missing fcm_tokens" });
  }
  const message = ApprovalNotification({
    title: req.body?.title,
    body: req.body?.body,
    tokens: req.body?.fcm_tokens,
  });

  getMessaging()
    .sendEachForMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          console.log(resp.error);
          if (!resp.success) {
            failedTokens.push(fcm_token[idx]);
          }
        });
        console.log("List of tokens that caused failures: " + failedTokens);
      }
      return res.status(200).send({ message: "Successfully sent message" });
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
