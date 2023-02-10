/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCardFooter
} from "mdb-react-ui-kit";

import styled, { css } from 'styled-components'
import axios from "axios";
import EmojiPicker from 'emoji-picker-react'
import {BsEmojiSmileFill} from 'react-icons/bs'
// import { v4 as uuidv4} from "uuid";

import { getAllMessagesRoute, sendMessageRoute, removeMessageRoute, recommendRoute, updateMessageRoute, host } from '../../utils/apiRoutes'

export default function MessageList({target, backTo, currentUser, socket}) {

    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [updatedMessage, setUpdateMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const [bReply, toggleReply] = useState(false);
    const [pMessage, setPointMessage] = useState({});
    const [editable, setEditable] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    useEffect( () => {
        const fetchMessages = async () => {
            if (currentUser) {
                const response = await axios.post(getAllMessagesRoute, {
                  sender: target._id,
                  receiver: currentUser._id
                });
                setMessages( response.data);
            }
        }
        fetchMessages()
    }, [currentUser])
    
    useEffect(()=>{
        if(updatedMessage) {
            let msgs = messages.slice();
            let search = msgs.find(o => o._id == updatedMessage._id);
            updatedMessage.recommend? search.recommend = updatedMessage.recommend : search.message = updatedMessage.message;
            search.message = updatedMessage.message;
            setMessages(msgs);   
        }
    },[updatedMessage]); 
      
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener("click", handleClick);
        return () => {
          window.removeEventListener("click", handleClick);
        };
    }, []);

    const handleRecommendMsg = async () => {
        const recommendMessage = async () => {
            if (pMessage) {
                const response = await axios.post(recommendRoute + pMessage._id);
                socket.current.emit("update-msg", {
                    _id: pMessage._id,
                    sender: currentUser._id,
                    receiver: target._id,
                    message: pMessage.message,
                    time: pMessage.time,
                    recommend: true
                });
                fetchMessages();
            }
        }
        recommendMessage()

        const fetchMessages = async () => {
            if (currentUser) {
                const response = await axios.post(getAllMessagesRoute, {
                  sender: target._id,
                  receiver: currentUser._id
                });
                setMessages( response.data);
            }
        }            
    }

    const handleSendMsg = async (msg) => {
        if(editable) {
            const updateMessage = async () => {
                if (pMessage) {
                    const response = await axios.post(updateMessageRoute + pMessage._id, {
                        message: msg,
                        time: Date.now(),
                    });
                    socket.current.emit("update-msg", {
                        _id: pMessage._id,
                        sender: currentUser._id,
                        receiver: target._id,
                        message: msg,
                        time: Date.now(),
                        recommend: false
                    });                    
                    fetchMessages();
                }
            }
            updateMessage()
    
            const fetchMessages = async () => {
                if (currentUser) {
                    const response = await axios.post(getAllMessagesRoute, {
                      sender: target._id,
                      receiver: currentUser._id
                    });
                    setMessages( response.data);
                }
            }               
        } else {
            if(bReply) {
                const response = await axios.post(sendMessageRoute, {
                    sender: currentUser._id,
                    receiver: target._id,
                    message: msg,
                    time: Date.now(),
                    reply: pMessage
                });
                socket.current.emit("send-msg", {
                    sender: currentUser._id,
                    receiver: target._id,
                    message: { text: msg },
                    time: Date.now(),
                    reply: pMessage
                });
                setMessages(response.data);
            } else {
                const response = await axios.post(sendMessageRoute, {
                    sender: currentUser._id,
                    receiver: target._id,
                    message: msg,
                    time: Date.now(),
                    reply: null
                });
                socket.current.emit("send-msg", {
                    sender: currentUser._id,
                    receiver: target._id,
                    message: { text: msg },
                    time: Date.now(),
                    reply: null
                });                
                setMessages(response.data);
            }
        }        
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("add-msg-recieved", (msg) => setMessages([...messages, msg]));
            socket.current.on("update-msg-recieved", (msg) =>  setUpdateMessage({
                _id: msg._id,
                message: { text: msg.message },
                time: msg.time,
                recommend: msg.recommend
            }))}
    }, [socket.current, messages]);

    const handleEmojiPickerHideShow = ()=>{
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (e,emoji)=>{
        let message= msg;
        message += e.emoji;
        setMsg(message);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendChat(event)
        } 
        if (event.key === 'Escape') {
            setMsg('');
            event.target.blur();
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        } 
    };

    const sendChat = (e)=>{
        e.preventDefault();
        if(showEmojiPicker)
            setShowEmojiPicker(!showEmojiPicker);
        if(msg != ''){
            handleSendMsg(msg);
            setMsg('');
            toggleReply(false);
            setEditable(false);
        }
    }

    const goRecommend = () => {
        handleRecommendMsg()
    }

    const goBack = () => {
        backTo();
    }

    const goReply = () => {
        toggleReply(true);
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const goEdit = () => {
        setMsg(pMessage.message.text);
        setEditable(true);
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const output = (ones) => {
        if(ones.length > 0) {
            let last = ones[ones.length - 1];
            return last.message ? last.message.text : ''
        }
    }

    const goRemove = () => {
        const removeMessage = async () => {
            if (pMessage) {
                const response = await axios.delete(removeMessageRoute + pMessage._id);
                fetchMessages();
            }
        }
        removeMessage()

        const fetchMessages = async () => {
            if (currentUser) {
                const response = await axios.post(getAllMessagesRoute, {
                  sender: target._id,
                  receiver: currentUser._id
                });
                setMessages( response.data);
            }
        }        
    }

    const timeFormat = (time) => {
        var date = new Date(time);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime
    }

    const diffTime = (time) => {
        let d = new Date();
        d.setHours(0,0,0);
        var Difference_In_Days = (d.getTime() - time) / (1000 * 3600 * 24);
        return Math.floor(Difference_In_Days) < 0 ? 'today' : Math.floor(Difference_In_Days) + 1 + ' days ago'
    }

    return (
        <Container>
        <MDBRow>
            <MDBCol md="12">
                <MDBCard style={{border: 'solid 1px', marginBottom: '5px'}}>
                    <div className="d-flex flex-row p-2">
                        <div className="col-md-4 d-flex justify-content-between align-items-center">
                            <i className="fas fa-angle-left" style={{cursor: 'pointer'}} onClick={goBack}></i>
                            <img
                                src="/images/user2.png"
                                alt="avatar"
                                className="d-flex align-self-center me-3"
                                style={{ width: "40px", height: "40px" }}
                            />
                        </div>
                        <div className="pt-1 col-md-8">
                            <p className="fw-bold mb-0 ellipsis">{target.username}</p>
                            <p className="small text-muted ellipsis">
                                {output(messages)}
                            </p>
                        </div>
                    </div>
                </MDBCard>
                <MDBCard id="chat4">
                    <MDBCardBody>                        
                        {   
                            messages.length > 0 && messages.map((message, index) => {
                                if(message.receiver == target._id) {
                                    return (                                        
                                        <div className="d-flex flex-row justify-content-end mb-4 pt-1" 
                                            ref={scrollRef} key={'message' + index}                                           
                                        >
                                            <div>
                                                <div 
                                                    className="small p-2 me-3 mb-1 text-white rounded-3 bg-info" 
                                                    style={{ maxWidth: '205px' }}
                                                    onContextMenu={(e) => {
                                                        e.preventDefault(); 
                                                        setClicked(true);
                                                        const rect = e.target.getBoundingClientRect();
                                                        setPoints({
                                                            x: e.pageX - rect.left,
                                                            y: e.pageY - pageYOffset,
                                                        });
                                                        setPointMessage(message);
                                                    }}
                                                >
                                                    { message.reply&& 
                                                        <p 
                                                            className="small me-3 italic" 
                                                            style={{ maxWidth: '100%', fontSize: '17px', borderBottom: 'solid 1px', paddingBottom: '8px' }}
                                                        >
                                                            {message.reply.message.text}&nbsp;&nbsp;<span style={{fontSize: '14px'}}>{timeFormat(message.reply.time)}</span>
                                                        </p>
                                                    }
                                                    <p style={{ marginTop: '10px' }}>{message.message.text}</p>
                                                    { message.recommend&& <p>👍</p> }
                                                </div>
                                                <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                                                    {timeFormat(message.time)}&nbsp;&nbsp;{diffTime(message.time)}
                                                </p>
                                            </div>
                                            <img
                                                src="/images/user1.png"
                                                alt="avatar 1"
                                                style={{ width: "40px", height: "40px" }}
                                            />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="d-flex flex-row justify-content-start" ref={scrollRef} key={index}>
                                            <img
                                                src="/images/user2.png"
                                                alt="avatar 1"
                                                style={{ width: "45px", height: "45px" }}
                                            />
                                            <div>
                                                <div 
                                                    className="small p-2 ms-3 mb-1 rounded-3"
                                                    style={{ backgroundColor: "#f5f6f7", maxWidth: '205px' }}
                                                    onContextMenu={(e) => {
                                                        e.preventDefault(); 
                                                        setClicked(true);
                                                        const rect = e.target.getBoundingClientRect();
                                                        setPoints({
                                                            x: e.pageX - rect.left,
                                                            y: e.pageY - pageYOffset,
                                                        });
                                                        setPointMessage(message);
                                                    }}
                                                >
                                                    { message.reply&& 
                                                        <p 
                                                            className="small me-3 italic" 
                                                            style={{ maxWidth: '100%', fontSize: '17px', borderBottom: 'solid 1px', paddingBottom: '8px' }}
                                                        >
                                                            {message.reply.message.text}&nbsp;&nbsp;<span style={{fontSize: '14px'}}>{timeFormat(message.reply.time)}</span>
                                                        </p>
                                                    }
                                                    <p style={{ marginTop: '10px' }}>{message.message? message.message.text : ''}</p>
                                                    { message.recommend&& <p>👍</p> }
                                                </div>
                                                <p className="small ms-3 mb-3 rounded-3 text-muted">
                                                    {timeFormat(message.time)}&nbsp;&nbsp;{diffTime(message.time)}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }

                            })
                        }         
                    </MDBCardBody>
                    { showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} width="100%"/> }
                    <div className="d-flex" style={{ justifyContent:"space-between", margin:"15px"}}>
                    { bReply&& 
                        <p 
                            className="small italic" 
                            style={{ maxWidth: '75%', fontSize: '17px', borderBottom: 'solid 1px', paddingBottom: '8px' }}
                        >
                            {pMessage.message.text}
                        </p>
                    }
                        <span className="d-flex" style={{width: '25%'}}>
                            <a className="ms-3 text-muted" href="#!">
                                <div className="emoji" >
                                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                                </div>
                            </a>
                            <a className="ms-3 link-info" href="#!" onClick={(e)=>sendChat(e)}>
                                <MDBIcon fas icon="paper-plane" />
                            </a>
                        </span>
                    </div>
                    <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-2">
                        <textarea
                            className="form-control form-control-lg"
                            value={msg} onChange={(e)=>{setMsg(e.target.value)}}
                            rows="3"
                            placeholder="Type message"
                            onKeyDown={handleKeyDown}
                        />                        
                    </MDBCardFooter>
                </MDBCard>
            </MDBCol>
        </MDBRow>  
        { 
            clicked && (
                pMessage._id == currentUser._id ?
                <ContextMenu top={points.y} left={points.x}>
                    <ul>
                        <li onClick={goRecommend}><i className="fas fa-sign-language" style={{cursor: 'pointer'}}></i>&nbsp;&nbsp;&nbsp;Recommend</li>
                        <li onClick={goReply}><i className="fas fa-reply" style={{cursor: 'pointer'}}></i>&nbsp;&nbsp;&nbsp;Reply</li>
                        <li onClick={goRemove}><i className="fas fa-trash-alt" style={{cursor: 'pointer'}}></i>&nbsp;&nbsp;&nbsp;Remove</li>
                    </ul>
                </ContextMenu>
                :<ContextMenu top={points.y} left={points.x}>
                <ul>
                    <li onClick={goEdit}><i className="fas fa-edit" style={{cursor: 'pointer'}}></i>&nbsp;&nbsp;&nbsp;Edit</li>
                    <li onClick={goReply}><i className="fas fa-reply" style={{cursor: 'pointer'}}></i>&nbsp;&nbsp;&nbsp;Forward</li>
                    <li onClick={goRemove}><i className="fas fa-trash-alt" style={{cursor: 'pointer'}}></i>&nbsp;&nbsp;&nbsp;Remove</li>
                </ul>
            </ContextMenu>
        )}
        </Container>
    );
}

const Container = styled.div`
    .ellipsis {
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .italic {
        font-style: italic;
    }
`;

const ContextMenu = styled.div`
    position: absolute;
    width: 200px;
    background-color: white;
    border: 1px solid;
    border-radius: 5px;
    box-sizing: border-box;
    ${({ top, left }) => css`
        top: ${top}px;
        left: ${left}px;
    `}
    ul {
        box-sizing: border-box;
        padding: 10px 10px;
        margin: 0;
        list-style: none;
    }
    ul li {
        padding: 8px 25px;
        border-bottom: 1px solid
    }
    /* hover */
    ul li:hover {
        cursor: pointer;
        color: #54b4d3;
        background-color: aliceblue;
    }
`;