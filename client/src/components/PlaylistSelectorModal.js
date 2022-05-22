import React, { useState, useEffect } from 'react';
import {Container, Nav, Navbar, Modal, Tab, Button, Row, Col} from 'react-bootstrap'
import background from '../assets/images/concert.jpg'

const PlaylistSelectorModal = ({playlistData}) => {

    //playlists with 20 or more tracks
    const qualifiedPlaylists = playlistData.filter(playlist => playlist.numberSongs >= 20)

    // const modalStyle = {
    //     backgroundImage: "url(" + background + ")",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center"
    // }

    const myFunction = () => {
        console.log(playlistData)
        console.log(qualifiedPlaylists)
    }

    return (
        <>
            <Modal.Header className="d-flex align-items-center justify-content-center text-center dark-modal" closeButton>
                <Modal.Title className="d-flex align-items-center justify-content-center text-center">
                    <h2>Select a Playlist</h2>
                    <Button onClick={myFunction}>ButtonMan</Button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="dark-modal m-auto">
                <Row>
                <p>Please select one of your playlists to use in the game. Only playlists
                    with 20 or more tracks qualify.
                </p>
                </Row>
                {qualifiedPlaylists?.map((playlist) => {
                    return (
                        <Row className="centered-row mt-2 m-auto playlist-selector-items">
                            <Col>
                            <img 
                            src={playlist.images[0].url}
                            className="playlist-selector-img" />
                            </Col>
                            <Col>
                            <p className="text-center">{playlist.name}</p>
                            </Col>
                            <Col>
                            <p className="text-center">Songs: {playlist.numberSongs}</p>
                            </Col>
                            <Col>
                            <Button value={playlist.id}>
                                Select playlist
                            </Button>
                            </Col>
                        </Row> 
                    )
                })}
            </Modal.Body>
        </>
    )
};

export default PlaylistSelectorModal