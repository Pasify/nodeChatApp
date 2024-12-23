let socket = io();
document.addEventListener("DOMContentLoaded", function () {
  let sendButton = document.querySelector("#send");
  let nameInput = document.querySelector("#name");
  let messageInput = document.querySelector("#message");

  sendButton.addEventListener("click", () => {
    let message = {
      name: nameInput.value,
      message: messageInput.value,
    };
    postMessage(message);
  });
  getMessages();
});
socket.on("message", addMessage);
function addMessage(message) {
  let messageBox = document.querySelector("#messages");
  let messageContent = `
    <div class="d-flex flex-column text-white gap-2" >
      <div class="d-flex gap-2 align-items-center">
          <div class="bg-success-subtle bg-gradient text-success rounded w-auto h-auto p-2 fw-semibold">
            ${message.name.match(/\b\w/g).join("").toUpperCase()}
          </div>
          <span class="text-black fw-semibold fs-6">${message.name}</span>
        </div>
     <p class="rounded w-auto h-auto bg-success bg-gradient p-2 fw-semibold align-self-start ms-4 fst-italic">${
       message.message
     }</p>
    </div>
   
    `;
  messageBox.insertAdjacentHTML("beforeend", messageContent);
}
function getMessages() {
  let response = fetch("http://localhost:3000/messages");
  response.then((data) => data.json()).then((data) => data.forEach(addMessage));
}
function postMessage(message) {
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
