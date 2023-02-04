/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'styled-components';
import axios from "axios";
import { io } from "socket.io-client";
import useGetTokenBalance from 'hooks/useTokenBalance';
import { useFetchMessages, useGetUserInfo } from 'hooks/useClient'
import { getBalanceAmount } from 'utils/formatBalance';
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React';
import { connect, getAllMessagesRoute, sendMessageRoute, host } from '../../utils/apiRoutes'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ChatComponent = () => {
  const socket = useRef();
  const scrollRef = useRef();
  const { account, isConnected } = useWeb3React()
  const [currentUser, setCurrentUser] = useState("")
  
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { balance: userCake, fetchStatus } = useGetTokenBalance("0xe9e7cea3dedca5984780bafc599bd69add087d56", account)
  const userCakeBalance = getBalanceAmount(userCake)
  const [messages, setMessages] = useState([]);
  // const messages = useFetchMessages("http://localhost:5000/api/message/getmsg")
  socket.current = io(host);

  useEffect( () => {
    const connectUser = async() => {
      if (isConnected && fetchStatus === "FETCHED") {
        const whale = userCakeBalance.gt("2")
        const { data } = await axios.post(connect, {address: account, isWhale: whale})
        setCurrentUser(data.user)
      }
    }
    connectUser()

    const fetchData = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        sender: currentUser?._id,
      });
      setMessages( response.data);
    }
    fetchData();
  }, [account, fetchStatus])

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      sender: currentUser,
      message: msg,
    });
    const updateTime = Date.now()
    socket.current.emit("send-msg", {
      sender: currentUser,
      message: msg,
      updatedAt: updateTime
    });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieved", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg.message,
          sender: msg.sender,
          updatedAt: msg.updatedAt
        });
      })
    }

  }, [socket]);

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
  },[arrivalMessage]);

  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <MessageList scrollRef={ scrollRef } messages={ messages } />
      <MessageInput handleSendMsg={handleSendMsg} />
    </>
  );
};

export default ChatComponent;
