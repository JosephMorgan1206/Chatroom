/* eslint-disable */
import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import styled from 'styled-components'
import axios from "axios";
import { login } from '../../utils/apiRoutes'
import useToast from 'hooks/useToast'

export default function UserList({users, showMessages, searchUsers}) {
    const [keyword, setKeyword] = useState("");
    const [password, setPassword] = useState("");
    const [show_login, showLogin] = useState(false);
    const [target, selectTarget] = useState("");
    const { toastError } = useToast();

    const getMessages = (e, user)=>{
        e.preventDefault();
        showLogin(true);
        selectTarget(user);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(show_login) {
                loginAction();
            } else {
                searchUsers(keyword); 
            }
        }
    };

    const loginAction = () => {
        const loginServer = async () => {
            if (password) {
                const response = await axios.post(login, {
                  password: password
                });
                if(response.data.status) {
                    showMessages(target);
                    showLogin(false);
                    setKeyword("");
                    setPassword("");
                } else {
                    toastError('Error', 'Login information is incrorrect!')
                }
            } else {
                toastError('Error', 'Password is required!')
            }
        }
        loginServer()
    }


    return (
        <Container> 
        <MDBRow>
            <MDBCol md="12">
                <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                    <MDBCardBody className="p-3">
                    <MDBRow>
                        <MDBCol className="mb-4 mb-md-0">
                        <div className="p-1">
                            {
                                show_login ?
                                <MDBInputGroup className="rounded mb-3">
                                    <input
                                        className="form-control rounded"
                                        type="password"
                                        value={password} 
                                        onChange={(e)=>{e.preventDefault(); setPassword(e.target.value);}}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Please input the Password"
                                        style={{borderColor: 'red'}}
                                        autoFocus 
                                    />
                                    <button
                                        className="input-group-text rounded"
                                        style={{marginLeft: "10px", background: "red", color: "white"}}
                                        id="login-addon"
                                        onClick={loginAction}
                                    >
                                        login
                                    </button>
                                </MDBInputGroup>
                                : <MDBInputGroup className="rounded mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded"
                                        value={keyword} 
                                        onChange={(e)=>{e.preventDefault(); setKeyword(e.target.value);}}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search"
                                        autoFocus 
                                    />
                                    <span
                                        className="input-group-text border-0"
                                        id="search-addon"
                                    >
                                        <MDBIcon fas icon="search" />
                                    </span>
                                </MDBInputGroup>        

                            }                                              

                            <MDBTypography listUnStyled className="mb-0">
                                {
                                    users && users.map((user, index) => {
                                        if(user && user.username) {
                                            return (
                                                <li className="p-2 border-bottom" key={index} onClick={(e) => getMessages(e, user)}>
                                                <a
                                                    href="#"
                                                    className="d-flex justify-content-between user-item"
                                                >
                                                    <div className="d-flex flex-row col-md-10">
                                                        <div className="col-md-2">
                                                            <img
                                                            src="/images/user2.png"
                                                            alt="avatar"
                                                            className="d-flex align-self-center me-3"
                                                            width="60"
                                                            height="60"
                                                            />
                                                            <span className="badge bg-success badge-dot"></span>
                                                        </div>
                                                        <div className="pt-1 col-md-10">
                                                            <p className="fw-bold mb-0 ellipsis">{user.username}</p>
                                                            <p className="small text-muted ellipsis">
                                                            Hello, How are you?
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="pt-1 col-md-2">
                                                        <p className="small text-muted mb-1">Just now</p>
                                                        <span className="badge bg-danger rounded-pill float-end">
                                                            {user.count >0 ? user.count : null}
                                                        </span>
                                                    </div>
                                                </a>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </MDBTypography>
                        </div>
                        </MDBCol>
                    </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow> 
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

    .user-item:hover {
        color: red !important;
    }
`;