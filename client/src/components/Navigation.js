import React, { useState } from 'react';
import {Container, Nav, Navbar, Modal, Tab} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import spotifyLogo from "../assets/images/spotify-logo.svg"
import gameLogo from "../assets/images/game-logo.png"
import login from "../assets/images/login.png"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const Navigation = () => {

    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
        <Navbar expand='lg' className="gradient-border-bottom">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="gradient-text">
                    The Spotify Popularity Game
                   <img src={spotifyLogo} id="spotify-logo-header"/>
                </Navbar.Brand>
                <Navbar id="navbar">
                    <Nav className="ml-auto d-flex align-items-center">
                        <Nav.Link as={Link} to="/leaderboard" className="gradient-text login-link" >
                            Leaderboard
                            <img src={login} id="game-logo-header" />
                            </Nav.Link>
                        <Nav.Link as={Link} to="/game" className="gradient-text">
                            Play The Game!
                            <img src={gameLogo} id="game-logo-header" />
                            </Nav.Link>
                    </Nav>
                </Navbar>
            </Container>
        </Navbar>

        <Modal
        className="login-modal"
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
        >
        <Tab.Container defaultActiveKey='login'>
        <Modal.Header className="dark-modal" closeButton>
        <Modal.Title id='signup-modal'>
            <Nav variant="pills">
            <Nav.Item>
                <Nav.Link eventKey='login' className="gradient-text">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='signup' className="gradient-text">Sign Up</Nav.Link>
            </Nav.Item>
            </Nav>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tab.Content>
            <Tab.Pane eventKey='login'>
            <LoginForm handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
            <Tab.Pane eventKey='signup'>
            <SignUpForm handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
        </Tab.Content>
        </Modal.Body>
        </Tab.Container>
        </Modal>
        </>
    );
};

export default Navigation