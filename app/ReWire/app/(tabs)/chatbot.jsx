import '@/assets/chatbot/css/base.css';
import '@/assets/chatbot/css/mobile.css';
import '@/assets/chatbot/css/theme-dark.css';

import join_group_icon from '@/assets/chatbot/icons/join_group_icon.png';
import send_icon from '@/assets/chatbot/icons/send_icon.svg';

import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import { Image } from  'react-native';

const socket = io.connect("http://localhost:5000");

socket.on('connect', () => {
    console.log("CONNECTED");
});

socket.on('connect_error', (error) => {
    console.error("Connection error:", error);
});

export default function ChatBot() {
    const [senderName, setSenderName] = useState("User");
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");

    useEffect(() => {
        const messageHandler = (receivedMessage) => {
            try {
                const parsedMessage = JSON.parse(receivedMessage);
                const message = { sender: "ReBot", content: parsedMessage.reply };
                setMessages((prevMessages) => [...prevMessages, message]);
                setTimeout(() => { autoScroll(true) }, 100);
            } catch (error) {
                console.error("Failed to parse message:", error);
            }
        };

        socket.on('message', messageHandler);

        return () => {
            socket.off('message', messageHandler);
        };
    }, []);


    const sendMessage = () => {
        if (messageContent.trim()) {
            const newMessage = { sender: senderName, content: messageContent };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            socket.send(messageContent);
            setMessageContent("");
            console.log(messages)
        }
    };

    const autoScroll = (scrollAnyway = false) => {

        const messagesContainerElement = document.getElementById("message-container");
        const scrolledAmount = messagesContainerElement.scrollHeight
            - (messagesContainerElement.scrollTop + messagesContainerElement.clientHeight);
    
        const isNearBottom = scrolledAmount < 200;
    
        if (isNearBottom || scrollAnyway) {
            messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
        }
    }

    return (
        <div className="message-interface-wrap">
            <div className="message-interface">
                <div className="message-interface-head">
                    <div className="avatar">
                        <span id="avatar-button">#</span>
                        <div id="menu" className="menu">
                            <ul className="menu-list">
                                <li className="menu-item" id="change-theme-button">Switch Theme</li>
                            </ul>
                        </div>
                    </div>
                    <input
                        type="text"
                        id="sender-name"
                        placeholder="Enter your name"
                        autoComplete="off"
                        autoFocus
                        spellCheck="false"
                        value={senderName}
                        onChange={(event) => setSenderName(event.target.value)}
                    />
                    <button className="icon" id="connect-button">
                        {/* <img className="icon" src={join_group_icon} alt="Join" /> */}
                        <Image source={join_group_icon} style={{width: 24, height: 24}} />
                    </button>
                </div>
                <div className="message-container" id="message-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === senderName ? "this-user" : ""}`}>
                            <span className="sender">{msg.sender}</span>
                            <span className="content">{msg.content}</span>
                        </div>
                    ))}
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        id="content"
                        placeholder="Enter your message"
                        autoComplete="off"
                        spellCheck="true"
                        value={messageContent}
                        onChange={(event) => setMessageContent(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                sendMessage();
                                autoScroll();
                            }
                        }}
                    />
                    <button
                        className="icon"
                        onClick={
                            () => {
                                sendMessage();
                                autoScroll();
                            }
                        }>
                        {/* <img src={send_icon} alt="send" /> */}
                        <Image source={send_icon} style={{width: 24, height: 24}} />
                    </button>
                </div>
            </div>
        </div>
    );
}