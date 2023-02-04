/* eslint-disable */
import React,{useState} from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

export default function MessageInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = ()=>{
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (e,emoji)=>{
        let message= msg;
        message += e.emoji;
        setMsg(message);
    }

    const sendChat = (e)=>{
        e.preventDefault();
        if(showEmojiPicker)
            setShowEmojiPicker(!showEmojiPicker);
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }

  return (
    <Container>        
        { showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" height={400}/> }
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder='Type your message here!' value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
            <div className="button-container">
                <div className="emoji" >
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                </div>
                <button className="submit">
                    <IoMdSend />
                </button>
            </div>
        </form>
    </Container>
  )
}

const Container = styled.div`
    padding: 8px;
    margin-left: 4px;
    margin-right: 4px;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
    .input-container {
        display: flex;
        justify-content: space-between;
        input {
            width: 100%;
            border: none;
            background: none;
            outline: none;
        }
    }
    .button-container {
        display: flex;
        align-items: center;

        .submit, .emoji {
            background: none;
            border: none;
            cursor: pointer;

            svg {
                width: 20px;
                height: 20px;
            }
        }

        .submit {
            padding-top: 2px;
        }
    }
}
`;
