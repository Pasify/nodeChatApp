document.addEventListener("DOMContentLoaded", function () {
  let sendButton = document.querySelector("#send");
  sendButton.addEventListener("click", () => {
    addMessages({ name: "billy Jekins", message: "Whats up my boy" });
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
