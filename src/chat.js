import React, { useState, useEffect } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import { AiFillSetting } from 'react-icons/ai'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import './chat.css'


function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]); //is passing an empty array

    const sendMessage = async () => { // whenever someone types a message, they emit the send message event. Async means that we are going to wait until the data is acquired, only after that execute functions
        if (currentMessage !== "") {
            const messageData = {
                room: room, 
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]); 
            setCurrentMessage("");
            console.log(currentMessage)
        }
  
    };

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {  // THIS SOLVED MY BUG!! https://www.youtube.com/watch?v=BcsXgFyFbuY
            setMessageList((list) => [...list, data]);
            console.log(messageList)
        });
    }, [socket]);


    return (
        <div className='chat-grandpa'>
            <div className='chat-parent'>

                <header className='header'>
                    <div className='header-symbols'>
                        <BsFillChatDotsFill />
                        <p>Leo's chat</p>

                    </div>
                    <AiFillSetting />
                </header>
                <main className='main'>
                    <div className='message-container'>
                        <span className='picture-wrapper'>

                        </span>
                        <ScrollToBottom className="message-bubble">
                            {messageList.map((messageContent) => {
                                return (
                                    
                                    <div id={username === messageContent.author ? "you-adjuster" : "other-adjuster"}>
                                        <div
                                            id={username === messageContent.author ? "you" : "other"}
                                            className='bubble-parent'>
                                            <div className='name-wrapper-bubble'>
                                                <h3>{messageContent.author}</h3>
                                                <p>{messageContent.time}</p>
                                            </div>

                                            <p className='msg-p'>{messageContent.message}</p>

                                        </div>
                                        </div>
                                    
                                )
                            })}
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
                    <button className='chat-button' onClick={sendMessage}><BiSend/></button>
                </div>

            </div>
        </div>
    )
}

export default Chat
