import React, { useState } from "react";
import Cookies from 'js-cookie';
import './LoginWindow.css';
import x from '../images/Close.png';

export default function LoginWindow(props) {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChangeLogin = (event) => {
        const value = event.target.value;
        if (isValidEmail(value)) {
            setEmail(value);
            setUserName('');
        } else {
            setUserName(value);
            setEmail('');
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const { onCallback } = props;

    const handleCloseModel = () => {
        onCallback(false);
    };

    const data = {
        userName,
        email,
        password
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://auth.freetor.ru/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const data = await response.json();
                Cookies.set('authToken', data.token, { expires: 1 }); // Сохраняем куки
                Cookies.set('userName', data.userName, { expires: 1 }); // Сохраняем имя
                window.location.reload(); // Перезагружаем страницу для обновления состояния
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login">
            <img src={x} alt="" className="close" onClick={() => handleCloseModel()} />

            <h2 id="txt">Login</h2>
            <div className="inputBox">
                <input id="sds" onChange={handleInputChangeLogin} type="text" placeholder="Username / email" required />
            </div>
            <div className="inputBox">
                <input id="asd" onChange={handleInputChangePassword} type="password" placeholder="Password" required />
            </div>
            <div className="inputBox">
                <input onClick={handleLogin} type="submit" value="Login" id="btn" />
            </div>
            <div className="group">
                <a href="">Forget Password</a>
            </div>
        </div>
    );
}
