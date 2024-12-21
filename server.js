let express = require("express");
let app = express();
app.use(express.static(__dirname));
let messages = [
  { name: "Jonny Bravo", message: "I look so sexy" },
  { name: "Tom Cat", message: "Is you is, or is you ain`t my baby" },
];

app.get("/messages", (request, response) => {
  response.send(messages);
});

let server = app.listen(3000, () => {
  console.log(`server is listening on port ${server.address().port}`);
});
