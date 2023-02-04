/* eslint-disable */
import styled from "styled-components";
import truncateHash from "utils/truncateHash";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { useProfileForAddress } from 'state/profile/hooks'

const MessageList = ({ scrollRef, messages }) => {
    const timeFormat = (time) => {
        let result = time;
        if (time < 10) {
            result = "0" + time; 
        }
        return result
    }

    const AvatarWrapper = styled.div`
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
        position: relative;
        width: 100%;
        height: 100%;

        & > img {
            border-radius: 50%;
        }
    `

  return (
    <div className = "chat-messages" style={{overflowY: "auto"}}  onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
        {messages.map((message, index) => {
            const isAvatarSet = message.sender?.avatarImage !== ""
            const getAllMessage = () => {
                let _messageDiv = new Array();
                _messageDiv.push(message);
                let k = 1;
                while(true) {
                    if(index + k < messages.length && message.sender?.username === messages[index + k].sender.username){
                        _messageDiv.push(messages[index + k])
                    k++;
                    }
                    else if(index === messages.length - 1) break;
                    else break;
                }

                return _messageDiv
            }

            if(index > 0 && message.sender?.username === messages[index-1].sender?.username){
                return <></>
            }
            else {
                return (
                    
                    <div ref={scrollRef} >
                        <MessageContent>
                            <div className="message-header">
                                
                                {isAvatarSet ? <img src = {message.sender?.avatarImage} width={24} style={{borderRadius: "12px"}} /> : 
                                    <Jazzicon diameter={20} seed={jsNumberForAddress(message.sender?.address)} />
                                }
                                <p>{message.sender?.username.length > 9 ? truncateHash(message.sender?.username) : message.sender?.username}</p>
                                {message.sender?.role === "admin" && <p className="badge role-badge">Admin</p>}
                                {message.sender?.isWhale && 
                                    <>
                                        <img src={'/images/whale.svg'} width="24" className="whale-badge" />
                                        {/* <p className="badge whale-badge">Whale</p> */}
                                    </>
                                }
                            </div>
                            {getAllMessage().map((_message) => {
                                return (
                                    <div className="message-content">
                                        <p className="smaller-text">{timeFormat(new Date(_message.updatedAt).getHours())  + ':' + timeFormat(new Date(_message.updatedAt).getMinutes())}</p>
                                        <p className="normal-text">{_message.message}</p>
                                    </div>
                                )
                            })}                            
                        </MessageContent>
                    </div>
                );
            }
        })}
    </div>
  )
}

const MessageContent = styled.div`
    margin: 8px;
    padding: 4px;
    background: ${({ theme }) => theme.colors.backgroundDisabled};
    border-radius: 4px;

    .message-header {
        display: flex;
        align-items: center;
        padding: 8px 1px;
        p {
            padding-left: 4px;
        }
        .whale-badge {
            margin-left: 8px;
            margin-top: -5px;
        }
        .badge {
            padding: 2px 4px;
            font-size: 12px;
            background: red;
            margin-left: 8px;
            border-radius: 4px;
            color: white;
        }
    }

    .message-content {
        display: flex;
        padding-top: 8px;
        .smaller-text {
            font-size: 12px;
            font-weight: 400;
            padding-top: 2px;
            color: ${({ theme }) => theme.colors.textSubtle};
        }
        .normal-text {
            padding-left: 4px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            overflow: hidden;
        }
    }
`
export default MessageList
