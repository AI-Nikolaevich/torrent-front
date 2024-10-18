import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './ChatModal.css'
import close from '../images/Close.png'
import { Message } from './Message.jsx'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Cookies from 'js-cookie';

export default function ChatModal(props) {
    const { onClose, startChat } = props;
    const [userName, setUserName] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(''); // Добавлено состояние для сообщения
    const [connection, setConnection] = useState(null); // Добавлено состояние для connection
    const connectionRef = useRef(null); // Используем useRef для хранения соединения
    const messagesEndRef = useRef(null); // Используем useRef для ссылки на последнее сообщение

    const [authen, setAuthen] = useState(false);

    useEffect(() => {
        // Получаем значения куки при монтировании компонента
        const name = Cookies.get('userName');
        setUserName(name);
    }, []);

    useEffect(() => {
        if (userName) {
            setAuthen(true)
            joinChat();
        }

        // Функция очистки для закрытия соединения при размонтировании компонента
        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop().catch(error => console.error('Ошибка при закрытии соединения:', error));
            }
        };
    }, [userName]);

    useEffect(() => {
        // Прокрутка вниз при добавлении нового сообщения
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleCloseModel = () => {
        onClose(true);
    };

    const onSendMessage = async () => {
        sendMessage(message);
        setMessage(''); // Очистка поля ввода после отправки сообщения
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            handleCloseModel();
        }
    };

    const sendMessage = async (message) => {
        try {
            await connectionRef.current.invoke("SendMessage", userName, message);
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
        }
    };

    const joinChat = async () => {
        if (connectionRef.current) {
            return; // Если соединение уже существует, не создавайте новое
        }

        const connect = new HubConnectionBuilder()
            .withUrl('https://auth.freetor.ru/chat', {
                withCredentials: true // Убедитесь, что это значение соответствует вашей конфигурации CORS
            })
            .configureLogging(LogLevel.Information)
            .build();

        connect.on('ReceiveMessage', (userName, message) => {
            setMessages((prevMessages) => [...prevMessages, { userName, message }]);
        });

        try {
            await connect.start();
            await connect.invoke('JoinChat', userName);
            connectionRef.current = connect;
            setConnection(connect);
        } catch (error) {
            console.log(error);
            setTimeout(joinChat, 5000); // Повторная попытка соединения через 5 секунд
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return ReactDOM.createPortal(

        (
            <form onSubmit={onSubmit}>
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <img src={close} alt="" className='closer' onClick={handleCloseModel} />
                        <div className="border">
                            <h2>Chat </h2>
                            <div className="chat-messages" >
                                {startChat.map((userName, index) => (
                                    <Message messageInfo={userName} key={index} />
                                ))}
                                {messages.map((messageInfo, index) => (
                                    <Message messageInfo={messageInfo} key={index} />
                                ))}
                                <div ref={messagesEndRef}></div> {/* Пустой div для ссылки на последнее сообщение */}
                            </div>

                            {authen && (
                                <div className="inputbox">
                                    <input
                                        id="message-input"
                                        type="text"
                                        placeholder="Write Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />

                                    <button id="send-button" onClick={onSendMessage}>Send</button>
                                </div>
                            )}
                            {!authen && (
                                <div className="inputbox">
                                    <h2>Что бы отправить сообщение нужно авторизоваться</h2>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </form >)

        ,
        document.getElementById('modal-root')
    );
};
