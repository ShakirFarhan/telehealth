"use client";
import React, { useRef, useState } from 'react';
import styles from "./Chatbox.module.css";

// React Icons
import { SiChatbot } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";

import Chance from "chance";

const Chatbot = () => {

    let chance = new Chance();

    const [allMessages, setAllMessages] = useState<{messageType: 'request' | 'response', message: string, id: number}[]>([{
        messageType: 'response', message: 'Hello! I am Medi AI. Will help you with medications.', id: chance.integer({ min: 0, max: 9007199254740991 })}]);

    const [messageInput, setMessageInput] = useState('');

    const [ activeChat, setActiveChat ] = useState(false);

    const chatScreenRef = useRef<HTMLDivElement | null>(null);
    
    const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        setAllMessages((prev) => [...prev, {messageType: 'request', message: messageInput, id: chance.integer({ min: 0, max: 9007199254740991 })}]);
        
        const newQuery = {
            query: messageInput
        }

        setMessageInput('');

        const messageResponse = await fetch('https://chat-997f.onrender.com/medicine/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuery)
        });

        const messageData: { response: string } = await messageResponse.json();        
        setAllMessages((prev) => [...prev, {messageType: 'response', message: messageData.response, id: chance.integer({ min: 0, max: 9007199254740991 }) }]);
    }



  return (
    <div className={styles.app__chatbot}>

        <div className={`${styles.chat__screen} ${activeChat && styles.active__chat}`}>

            <div className={styles.chat__session} ref={chatScreenRef}>
                {
                    allMessages.map((message) => {
                        return (
                            <div key={message.id} className={message.messageType === 'request' ? styles.chat__req : styles.chat__res}><p>{message.message}</p></div>
                        )
                    })
                }
            </div>
            
            <form className={styles.message__input} onSubmit={(e) => {handleMessageSend(e)}}>
                <input type="text" placeholder='Talk about medications' value={messageInput} onChange={(e) => {setMessageInput(e.target.value)}} />
                <button type='submit' title='Send'><RiSendPlaneLine/></button>
            </form>
        </div>
        
        <button type='button' title='Toggle Chatbot' onClick={() => {
            setActiveChat(!activeChat)
        }}>{ activeChat ? <IoClose fontSize={36} /> : <SiChatbot fontSize={36}/>}</button>


    </div>
  )
}

export default Chatbot