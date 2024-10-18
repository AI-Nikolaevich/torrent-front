import React, { useState, useEffect } from 'react';
import './RegisterWindow.css';
import x from '../images/Close.png';

export default function RegisterWindow(props) {
   const [userName, setUserName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [password2, setPassword2] = useState('');
   const [error, setError] = useState('');
   const [responseOk, setresponseOk] = useState(false)
   const { onCallback } = props;



   const handleCloseModel = () => {
      onCallback(false);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);

      if (password !== password2) {
         setError('Passwords do not match');
         return;
      }

      const data = {
         userName,
         email,
         password
      };

      try {
         const response = await fetch('https://auth.freetor.ru/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
         }

         const result = await response.json();

         if (result.message === 'Registration successful') {
            setresponseOk(true);
         } else {
            setError(true);
            setresponseOk(false)
         }
      } catch (error) {
         console.error('Error:', error);
         setError('Registration failed. Please try again.');
      }
   };


   const handleInputChangeName = (event) => {
      setUserName(event.target.value);
   };

   const handleInputChangeEmail = (event) => {
      setEmail(event.target.value);
   };

   const handleInputChangePassword = (event) => {
      setPassword(event.target.value);
   };

   const handleInputChangePassword2 = (event) => {
      setPassword2(event.target.value);
   };

   return (
      <div className="register">
         <img src={x} alt="" className="close" onClick={handleCloseModel} />

         <h2 id="txt">Register</h2>
         <div className="inputBox">
            <input id="userq" onChange={handleInputChangeName} type="text" placeholder="Username" required />
         </div>
         <div className="inputBox">
            <input id="emailss" onChange={handleInputChangeEmail} type="email" placeholder="Email" required />
         </div>
         <div className="inputBox">
            <input id="password" onChange={handleInputChangePassword} type="password" placeholder="Password" required />
         </div>
         <div className="inputBox">
            <input id="password2" onChange={handleInputChangePassword2} type="password" placeholder="Confirm password" required />
         </div>
         <div className="inputBox">
            <input type="submit" onClick={handleSubmit} value="Register" id="btn" className="btn" />
         </div>
         {error && (<h4 className='h4Ok'>Что-то пошло не так. Может данные не корректны, а может сервер не отвечает, когда-нибудь пофиксю.</h4>)}
         {responseOk && !error && (
            <h4 className='h4noOk'>  Регистрация прошла успешно, пожалуйста авторизуйтесь.</h4>

         )}
      </div>
   );
}
