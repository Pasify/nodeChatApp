let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.use(express.static(__dirname));
// parsing the request body to be uderstood by node
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let messages = [
  { name: "Jonny Bravo", message: "I look so sexy" },
  { name: "Tom Cat", message: "Is you is, or is you ain`t my baby" },
];

app.get("/messages", (request, response) => {
  response.send(messages);
});

app.post("/messages", (request, response) => {
  console.log(request.body);
  messages.push(request.body);
  response.sendStatus(200);
});

let server = app.listen(3000, () => {
  console.log(`server is listening on port ${server.address().port}`);
});
