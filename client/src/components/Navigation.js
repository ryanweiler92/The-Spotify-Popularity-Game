import React, { useState } from 'react';
import {Container, Nav, Navbar, Modal, Tab} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import spotifyLogo from "../assets/images/spotify-logo.svg"
import gameLogo from "../assets/images/game-logo.png"

const Navigation = () => {

    return (
        <Navbar expand='lg' className="gradient-border-bottom">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="gradient-text">
                    The Spotify Popularity Game
                   <img src={spotifyLogo} id="spotify-logo-header"/>
                </Navbar.Brand>
                <Navbar id="navbar">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/game" className="gradient-text">
                            Play The Game!
                            <img src={gameLogo} id="game-logo-header" />
                            </Nav.Link>
                    </Nav>
                </Navbar>
            </Container>
        </Navbar>
    );
};

export default Navigation