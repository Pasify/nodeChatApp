const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("node:http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

let DBurl = `mongodb+srv://paskkal:paskkal@learning-node.9dazh.mongodb.net/?retryWrites=true&w=majority&appName=learning-node`;
let messageModel = mongoose.model("message", {
  name: String,
  message: String,
});

app.use(express.static(__dirname));
// parsing the request body to be uderstood by node
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/messages", (request, response) => {
  // response.send(messages);
  messageModel
    .find({})
    .then((messageData) => {
      response.send(messageData);
      console.log(
        `response form the db contianing the message data: `,
        messageData
      );
    })
    .catch((err) =>
      console.log(`error while retriving the  message data: `, err)
    );
});

app.post("/messages", (request, response) => {
  let message = new messageModel(request.body);

  message
    .save()
    .then((response) => {
      io.emit("message", request.body);
      response.sendStatus(200);
      console.log(`response from DB: `, response);
    })
    .catch((err) => {
      if (err) response.sendStatus(500);
    });
});

io.on("connection", (socket) => console.log(`user connected`));

mongoose.connect(DBurl).then(
  () => console.log(`✔✔✔ connected successfully`),
  (err) => {
    console.log(`🚩🚩🚩 connection error:`, err);
  }
);
let server = http.listen(3000, () => {
  console.log(`server is listening on port ${server.address().port}`);
});
