import React from 'react';
import './Message.css'
export const Message = ({ messageInfo }) => {
    return (
        <div className="ourchat">
            <span> {messageInfo.userName} : {messageInfo.message}</span>
        </div>
    );
};