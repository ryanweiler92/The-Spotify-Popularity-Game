import React, { useState, useEffect } from 'react';
import {Container, Nav, Navbar, Modal, Col, Row, Tab, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import spotifyLogo from "../assets/images/spotify-logo.svg"
import gameLogo from "../assets/images/game-logo.png"
import login from "../assets/images/login.png"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const Navigation = () => {
    
    window.onload = function() {
        if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
            document.body.addEventListener('touchstart', function() {}, false);
        }
      }

    const [ showModal, setShowModal ] = useState(false);
    const [token, setToken] = useState("");

    //SPOTIFY API STUFF
    const CLIENT_ID = "f268301c1b63456b81cf1b534073b905"
    const REDIRECT_URI = "https://spotify-popularity-game.herokuapp.com/"
    // const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
    
        setToken(token)
    
        }, [])

        const logout = () => {
            setToken("")
            window.localStorage.removeItem("token")
            }

    return (
        <>
        <Navbar expand='lg' className="gradient-border-bottom">
            <Container fluid>
                <div id="brand-div">
                <Navbar.Brand as={Link} to="/" className="gradient-text">
                    The Spotify Popularity Game
                   <img src={spotifyLogo} id="spotify-logo-header"/>
                </Navbar.Brand>
                </div>
                <Navbar id="navbar">
                    <Nav className="ml-auto d-flex align-items-center">
                        <Row className="d-flex justify-content-center">
                        <Col>
                        <Nav.Link as={Link} to="/leaderboard" className="gradient-text login-link text-center" >
                            Leaderboard
                            <img src={login} id="game-logo-header" />
                            </Nav.Link>
                        </Col>
                        <Col>
                        {!token ? <p></p> :
                        <Nav.Link as={Link} to="/game" className="gradient-text text-center">
                            Play The Game!
                            <img src={gameLogo} id="game-logo-header" />
                            </Nav.Link>
                        } 
                        </Col>
                        <Col id="logout-col">
                            {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                        <Button className="gradient-button gradient-border"><span className="gradient-text">Login to Spotify</span></Button>
                        </a>
                    : <Button onClick={logout} className="gradient-button gradient-border" id="spotify-button"><span className="gradient-text">Logout of Spotify</span></Button>}
                    </Col>
                    </Row>
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