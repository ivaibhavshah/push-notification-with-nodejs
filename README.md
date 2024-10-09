## Send Push Notifications using NodeJs and Firebase Cloud Messaging

**If you have web or mobile app and want to Integrate push notifications you can use firebase cloud messaging and send this notifications individually or multiple persons with different tokens or to a topic (group)**

*First we need to set project in firebase.*

[URL To create Firebase Project](https://console.firebase.google.com/)


*Register your mobile/web app and get json credential and set it in your app and generate a token through it*

*Go to Project Settings => Service Account and click on generate new private key as file will be downloaded rename and copy it to your clonned code directory.*

### We would Need to set some env variables for you to run this repo

> GOOGLE_APPLICATION_CREDENTIALS 
*This will referred as path of private key you downloaded*

> PROJECT_NAME
*This is referred as project name you set in firebase* 

### There are below mentioned routes which can be used to send notification with token generated from web/app.

- /singleSend
  In this you can only send to one token at once with body
  ```
  {
    fcm_token: "",
    title: "",
    body: ""
  }
  ```  
- /bulkSend
   In this you can only send to one token at once with body
  ```
  {
    fcm_tokens: [],
    title: "",
    body: ""
  }
  ```
### Command
1. To install all modules
    `npm install`


2. To run
    `node index.js`

### For more configurable notification you can refer template.js where you can see we can send many things configured to devices and customized like redirections, etc...