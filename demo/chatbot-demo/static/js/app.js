var senderName = "User";

const messagesContainerElement = document.getElementById("messages");
const errorsContainerElement = document.getElementById("errors");
const senderNameInputElement = document.getElementById("sender-name");
const contentInputElement = document.getElementById("content");
const sendButtonElement = document.getElementById("send-button");
const connectButtonElement = document.getElementById("connect-button");
const avatarButtonlElement = document.getElementById("avatar-button");
const changeThemeButtonElement = document.getElementById("change-theme-button");
const themeStylesheetLinkElement = document.getElementById("theme-stylesheet");
const menuElement = document.getElementById("menu");

const DARK_THEME_STYLESHEET = "{{ url_for('static', filename='css/theme-dark.css') }}";
const LIGHT_THEME_STYLESHEET = "{{ url_for('static', filename='css/theme-light.css') }}";

const socket = io();

function sendMessage() {
    if (socket === null) {
        displayErrorMessage("Not connected to server. Check your internet connection");
        return;
    }
    try {
        const message = readMessage();
        displayMessage({"sender":senderName, "content":message});
        socket.send(message);
        clearMessage();
    } catch (error) {
        displayErrorMessage(error)
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
        console.log(recieved_message.reply);
        
        displayMessage({"sender":"ReBot", "content":JSON.parse(recieved_message).reply});
    });
}


function readMessage() {
    let content = contentInputElement.value.trim();
    if (content === "") {
        throw "Empty Content";
    }
    return content;
}

function clearMessage() {
    contentInputElement.value = "";
}

function autoScroll(scrollAnyway = false) {
    const scrolledAmount = messagesContainerElement.scrollHeight
        - (messagesContainerElement.scrollTop + messagesContainerElement.clientHeight);

    const isNearBottom = scrolledAmount < 200;

    if (isNearBottom || scrollAnyway) {
        messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
    }
}

function displayMessage(messageObj) {
    let messageClass = messageObj.sender === senderName ? 'this-user' : '';
    messagesContainerElement.innerHTML +=
        `<div class="message ${messageClass}">
            <span class="sender">${messageObj.sender}</span>
            <span class="content">${messageObj.content}</span>
        </div>`;
    autoScroll(senderName === messageObj.sender);
}

function displayErrorMessage(errorMessage) {
    let errorId = `error-${Date.now()}`; // generates unique error id
    messagesContainerElement.innerHTML +=
        `<div class="error" id="${errorId}" onclick="closeDisplayedErrorMessage('${errorId}')">
             <span>${errorMessage}</span>
             <button class="button-close">
                 &#10005;
             </button>
         </div>`;
    autoScroll(true)
}

function closeDisplayedErrorMessage(errorId) {
    document.getElementById(errorId).remove();
}

function toggleTheme(newTheme) {
    if (newTheme === "dark") {
        themeStylesheetLinkElement.href = DARK_THEME_STYLESHEET;
    } else if (newTheme === "light") {
        themeStylesheetLinkElement.href = LIGHT_THEME_STYLESHEET;
    }
}

function toggleThemeToDeviceTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        toggleTheme("dark");
    } else {
        toggleTheme("light");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    sendButtonElement.addEventListener("click", sendMessage);

    connect();
    subscribeToChatbot();
    messagesContainerElement.innerHTML = '';

    contentInputElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter") sendMessage();
    });

    changeThemeButtonElement.addEventListener("click", () => {
        const href = themeStylesheetLinkElement.href;
        if (href.includes("dark")) {
            toggleTheme("light")
        } else if (href.includes("light")) {
            toggleTheme("dark")
        }
    });

    avatarButtonlElement.addEventListener("click", () => {
        if (["none", ""].includes(menuElement.style.display)) {
            menuElement.style.display = "inline-block";
        } else {
            menuElement.style.display = "none";
        }
    });

    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change',({ matches }) => {
            toggleThemeToDeviceTheme();
    });
});