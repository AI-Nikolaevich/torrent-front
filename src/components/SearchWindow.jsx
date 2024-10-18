import './SearchWindow.css'
import logo from './images/logo2.png'
import axios from 'axios'
import React, { useState } from 'react';

export default function SearchWindow(props) {
    const { onCallback } = props;
    const [torrent, setTorrents] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleClickSearch = async () => {
        onCallback(true, []);

        try {
            const response = await axios.get(`https://api.freetor.ru/search=${inputValue}`);

            setTorrents(response.data);
            onCallback(false, response.data);
        } catch (error) {
            console.error('Ошибка при запросе данных:', error);
            onCallback(false, []);
        }
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <div className="SearchWindow">
            <img id="logo" src={logo} alt="Logo" />
            <input
                id="searchInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleClickSearch} className="searchBtn">Freetor Search</button>
        </div>
    )
}