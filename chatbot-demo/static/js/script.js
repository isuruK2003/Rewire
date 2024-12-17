const socket = io();
const messagesContainer = document.getElementById("messages-container");

function sendMessage() {
    const inputField = document.getElementById('message');
    const message = inputField.value;
    if (message.trim() !== "") {
        socket.send(message);
        inputField.value = ""; // Clear the input
    }
}

function connect() {
    socket.on('connect', () => {
        console.log("CONNECTED");
    });
    socket.on('connect_error', (error) => {
        console.error("Connection error:", error);
    });
}

function disconnect() {
    socket.on('disconnect', () => {
        console.log("DISCONNECTED");
    });
}

function subscribeToChatbot() {
    socket.on('message', (recieved_message) => {
        console.log(recieved_message);
        messagesContainer.innerHTML += `<p>${recieved_message}</p>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    connect();
    subscribeToChatbot();
    document.getElementById('send-button').addEventListener('click', sendMessage);
});