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

export default function UserList({users, showMessages, searchUsers}) {
    const [keyword, setKeyword] = useState("");
    const getMessages = (e, user)=>{
        e.preventDefault();
        showMessages(user);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchUsers(keyword); 
        }
    };


    return (
        <Container> 
        <MDBRow>
            <MDBCol md="12">
                <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                    <MDBCardBody className="p-3">
                    <MDBRow>
                        <MDBCol className="mb-4 mb-md-0">
                        <div className="p-1">
                            <MDBInputGroup className="rounded mb-3">
                            <input
                                className="form-control rounded"
                                value={keyword} 
                                onChange={(e)=>{e.preventDefault(); setKeyword(e.target.value);}}
                                onKeyDown={handleKeyDown}
                                placeholder="Search"
                                type="search"
                            />
                            <span
                                className="input-group-text border-0"
                                id="search-addon"
                            >
                                <MDBIcon fas icon="search" />
                            </span>
                            </MDBInputGroup>

                            <MDBTypography listUnStyled className="mb-0">
                                {
                                    users && users.map((user, index) => {
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