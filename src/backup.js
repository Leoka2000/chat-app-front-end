import React, { useState, useEffect } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import { AiFillSetting } from 'react-icons/ai'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import './chat.css'


function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]); //is passing an empty array

    const sendMessage = async () => { // whenever someone types a message, they emit the send message event. Async means that we are going to wait until the data is acquired, only after that execute functions
        if (currentMessage !== "") {
            const messageData = {
                room: room, // we are sending this object to the backend
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]); // the last component "messageData is responsible for hte"
            setCurrentMessage("");
            console.log(currentMessage)
        } 
        // console.log(messageList) quando eu logo isso, aparece um monte de numero, tipo 1, 2, 3, 4
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
            console.log(messageList)
        });
    }, [socket]);// THIS MEans that we want to call the socket function whenever this useEffect is called


    return (
        <div className='chat-grandpa'>
            <div className='chat-parent'>

                <header className='header'>
                    <div className='header-symbols'>
                        <BsFillChatDotsFill />
                        <p>Simplechat</p>

                    </div>
                    <AiFillSetting />
                </header>
                <main className='main'>
                    <div className='message-container'>
                        <span className='picture-wrapper'>
                            <CgProfile />
                        </span>
                        <ScrollToBottom className="message-bubble">
                            {messageList.map((messageContent) => {
                                return (
                                    <div className='bubble-parent'>
                                        <div className='name-wrapper-bubble'>
                                            <h3></h3>
                                            <p>{messageContent.time}</p>
                                        </div>

                                        <p className='msg-p'>{messageContent.message}</p>

                                    </div>
                                );
                            })};
                        </ScrollToBottom>

                    </div>
                </main>
                <div className='form'>
                    <input className='effect-10' type="text"
                        value={currentMessage}
                        placeholder="Hey..."
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                    ></input>
                    <button onClick={sendMessage}>Bottao</button>
                </div>

            </div>
        </div>
    )
}

export default Chat
