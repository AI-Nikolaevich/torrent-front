import React from 'react';
import "./OutputWindow.css";

const getEnding = (count, words) => {
    const cases = [2, 0, 1, 1, 1, 2];
    const index = (count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5];
    return words[index];
};

const ComponentEnd = ({ items }) => {
    const words = ['раздача', 'раздачи', 'раздач'];
    const ending = getEnding(items, words);

    return (
        <div>
            <span >Найдено {items} {ending}.</span>
        </div>
    );
};

export default ComponentEnd;
