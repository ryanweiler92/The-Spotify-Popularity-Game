import React, { useState } from 'react';
import {Container, Nav, Navbar, Modal, Tab} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {

    return (
        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" >
                    Literally Anything
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar' />
                <Navbar.Collapse id="navbar">

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation