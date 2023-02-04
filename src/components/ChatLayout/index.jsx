/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';

import {
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBCollapse,
} from "mdb-react-ui-kit";

import axios from "axios";
import { io } from "socket.io-client";
import useGetTokenBalance from 'hooks/useTokenBalance';
import { getBalanceAmount } from 'utils/formatBalance';
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React';
import { connect, host } from '../../utils/apiRoutes'

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import MessageList from './MessageList'
import UserList from './UserList'
import { allUsersRoute } from '../../utils/apiRoutes';
import CircleLoader from 'components/Loader/CircleLoader';

export default function ChatComponent() {

  const socket = useRef();
  const { account, isConnected } = useWeb3React()
  const { balance: userCake, fetchStatus } = useGetTokenBalance("0xe9e7cea3dedca5984780bafc599bd69add087d56", account)
  const userCakeBalance = getBalanceAmount(userCake)
  
  const [msgEnable, setEnableMsg] = useState(false);
  const [showShow, setShowShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [target, setTarget] = useState({});
  const [currentUser, setCurrentUser] = useState("")

  useEffect( () => {
    const connectUser = async() => {
      if (isConnected && fetchStatus === "FETCHED") {
        const whale = userCakeBalance.gt("2")
        const { data } = await axios.post(connect, {address: account, isWhale: whale})
        setCurrentUser(data.user);
        // fetchUsers(data.user)
      }
    }
    connectUser()
  }, [account, fetchStatus])

  useEffect(()=>{
    if(currentUser) {
      fetchUsers(currentUser)
    }
   },[currentUser, msgEnable, showShow]);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
   },[currentUser]);

  const fetchUsers = async (user) => {
    const response = await axios.post(allUsersRoute + user?._id);
    setUsers( response.data);
  }

  const toggleShow = () => setShowShow(!showShow);
  const showMessages = (user) => {
    setEnableMsg(true);
    setTarget(user);
  }

  const backTo = async() => {
    setEnableMsg(false);
  }

  return (
    <MDBContainer fluid className="py-2" style={{overflow: 'auto'}}>
      <MDBBtn onClick={toggleShow} color="info" size="lg" block>
        <div className="d-flex justify-content-between align-items-center">
          <span><i className='fas fa-comments-dollar'></i>&nbsp;&nbsp;Chat with Clients</span>
        </div>
      </MDBBtn>
      <MDBCollapse show={showShow} className="mt-3" style={{height: 'auto'}}>
        { msgEnable ? <MessageList target={ target } backTo= {backTo} currentUser={currentUser}/> : <UserList showMessages={showMessages} users={ users }/> }
      </MDBCollapse>    
    </MDBContainer>
  );
}