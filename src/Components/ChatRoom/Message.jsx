import React from 'react';

function Message({ timestamp, content }) {//,fileName,audioData
    return (
       <div>             
            <p>{content}</p>
            <span><strong> {timestamp}</strong></span>
        </div>
    );
}

export default Message;
