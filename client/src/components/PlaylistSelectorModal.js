import React, { useState, useEffect } from 'react';
import {Container, Nav, Navbar, Modal, Tab, Button, Row} from 'react-bootstrap'
import background from '../assets/images/concert.jpg'

const PlaylistSelectorModal = () => {

    const [showPlaylistModal, setShowPlaylistModal] = useState(false);


    const modalStyle = {
        backgroundImage: "url(" + background + ")",
        backgroundSize: "cover",
        backgroundPosition: "center"
    }

    return (
        <>
            <Modal.Header className="d-flex align-items-center justify-content-center text-center" closeButton>
                <Modal.Title className="d-flex align-items-center justify-content-center text-center">
                    <h2>Select a Playlist</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalStyle}>
                <p>Please select one of your playlists to use in the game. Only playlists
                    with 10 or more tracks qualify.
                </p>
            </Modal.Body>
        </>
    )
};

export default PlaylistSelectorModal