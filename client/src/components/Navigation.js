import React, { useState } from 'react';
import {Container, Nav, Navbar, Modal, Tab} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import spotifyLogo from "../assets/images/spotify-logo.svg"

const Navigation = () => {

    return (
        <Navbar expand='lg' className="gradient-border-bottom">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="gradient-text">
                    My Spotify 
                   <img src={spotifyLogo} id="spotify-logo-header"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar' />
                <Navbar.Collapse id="navbar">

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation