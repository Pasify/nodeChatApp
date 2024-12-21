document.addEventListener("DOMContentLoaded", function () {
  let sendButton = document.querySelector("#send");
  let nameInput = document.querySelector("#name");
  let messageInput = document.querySelector("#message");

  sendButton.addEventListener("click", () => {
    let message = {
      name: nameInput.value,
      message: messageInput.value,
    };
    postMessages(message);
  });
  getMessages();
});
function addMessages(message) {
  let messageBox = document.querySelector("#messages");
  let messageContent = `
    <h4>${message.name}</h4>
    <p>${message.message}</p>
    `;
  messageBox.insertAdjacentHTML("beforeend", messageContent);
}
function getMessages() {
  let response = fetch("http://localhost:3000/messages");
  response
    .then((data) => data.json())
    .then((data) => data.forEach(addMessages));
}
function postMessages(message) {
  let response = fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  response
    .then((response) => {
      if (!response) {
        throw new Error("HTTP error, status: " + response.status);
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
