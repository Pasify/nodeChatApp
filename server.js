const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("node:http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

let DBurl = `mongodb+srv://paskkal:paskkal@learning-node.9dazh.mongodb.net/?retryWrites=true&w=majority&appName=learning-node`;

app.use(express.static(__dirname));
// parsing the request body to be uderstood by node
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let messages = [
  { name: "Jon Snow", message: "Winter is Coming..." },
  { name: "Tom Cat", message: "Is you is, or is you ain`t my baby?" },
];

app.get("/messages", (request, response) => {
  response.send(messages);
});

app.post("/messages", (request, response) => {
  console.log(request.body);
  messages.push(request.body);
  io.emit("message", request.body);
  response.sendStatus(200);
});

io.on("connection", (socket) => console.log(`user connected`));

mongoose.connect(DBurl).then(
  () => console.log(`connected successfully`),
  (err) => {
    console.log(`connection error:`, err);
  }
);
let server = http.listen(3000, () => {
  console.log(`server is listening on port ${server.address().port}`);
});
