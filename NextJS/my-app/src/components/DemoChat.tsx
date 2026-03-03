"use client"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function DemoChat(){
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]) 

    useEffect(()=> {
        socket.on('receiveMessage', (data) => {
            setMessages((prev) => [...prev, data])
        })

        return () => {
            socket.off('reveiveMessage');
        }
    }, []);

    const sendMessage = () => {
        socket.emit("sendMessage", message);
        setMessage("");
    }
    return(
        <div>
            <h2>Chat</h2>
            {messages.map((msg, i) => (
                <p key={i}>{msg}</p>
            ))}

            <input value={message} onChange={(e) => setMessage(e.target.value)} />


            <button onClick={sendMessage}>Send</button>
        </div>
    )
}