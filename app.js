document.addEventListener("DOMContentLoaded", function () {
  let sendButton = document.querySelector("#send");
  sendButton.addEventListener("click", () => {
    addMessages({ name: "billy Jekins", message: "Whats up my boy" });
  });
});
function addMessages(message) {
  let messageBox = document.querySelector("#messages");
  let messageContent = `
    <h4>${message.name}</h4>
    <p>${message.message}</p>
    `;
  messageBox.insertAdjacentHTML("afterbegin", messageContent);
}
