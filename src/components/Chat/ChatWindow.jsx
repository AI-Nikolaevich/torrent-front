import './ChatWindow.css';
import chat_img from '../images/chat.png';
import ChatModal from './ChatModal';
import React, { useEffect, useState } from 'react';

export default function ChatWindow() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [startChat, setStartChat] = useState([]);

    const openChat = () => {
        setIsChatOpen(true);
        fetchData();
    };

    const closeChat = () => setIsChatOpen(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://chat.freetor.ru/chat`);

            const chat = await response.json();
            const sortedChat = chat.slice().reverse();
            setStartChat(sortedChat);
        } catch (error) {
            console.error('Ошибка при запросе данных:', error);
        }
    };


    return (
        <div className="chat">
            <img className="chat_image" src={chat_img} onClick={openChat} alt="Chat" />
            {isChatOpen && (
                <ChatModal onClose={closeChat} startChat={startChat} />
            )}
        </div>
    );
}
