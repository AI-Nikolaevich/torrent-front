import './Header.css';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import RegisterWindow from '../Authentication/RegisterWindow';
import LoginWindow from '../Authentication/LoginWindow';
import Cookies from 'js-cookie';

export default function Header() {
    const [regModal, setRegModal] = useState(false);
    const [authModal, setAuthModal] = useState(false);
    const [userName, setUserName] = useState();
    
    const handleLogout = () => {
        Cookies.remove('userName');
        Cookies.remove('authToken');
        setUserName(null); // Обновляем состояние после удаления куки
    };

    useEffect(() => {
        // Получаем значения куки при монтировании компонента
        const name = Cookies.get('userName');
        setUserName(name);
    }, []);

    const handleCallback = (regData, logData) => {
        setRegModal(regData);
        setAuthModal(logData);
    };

    return (
        <div className="Header">
            {!userName && (
                <>
                    <button onClick={() => setAuthModal(true)} className="authButton">Sign In</button>
                    <button onClick={() => setRegModal(true)} className="regButton">Register</button>
                </>
            )}
            
            {userName && (
                <>
                    <div className="center">
                        <h1>Welcome, {userName}</h1>
                        <h4>Теперь ты можешь писать в чат.</h4>
                    </div>
                    <button onClick={handleLogout} className="regButton">Logout</button>
                </>
            )}

            {regModal && (
                <Modal open={regModal} onClose={() => setRegModal(false)}>
                    <RegisterWindow onCallback={handleCallback} />
                </Modal>
            )}

            {authModal && (
                <Modal open={authModal} onClose={() => setAuthModal(false)}>
                    <LoginWindow onCallback={handleCallback} />
                </Modal>
            )}
        </div>
    );
}
