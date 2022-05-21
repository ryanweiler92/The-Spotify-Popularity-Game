import React, { useState, useEffect } from 'react';
import {Container, Nav, Navbar, Modal, Tab, Button, Row} from 'react-bootstrap'

const TopTracksModal = ({topTracks}) => {

   const myFunction = () => {
        console.log(topTracks)
    }

   

    return (
        <>
            <Modal.Header className="d-flex align-items-center justify-content-center text-center" closeButton>
                <Modal.Title className="d-flex align-items-center justify-content-center text-center">
                    <h2>Top Tracks for {}</h2>
                </Modal.Title>
                <Button onClick={myFunction}>ButtonMan</Button>
            </Modal.Header>
            <Modal.Body>
                {topTracks?.slice(0, 3).map((track) => {
                    return (
                        <Row className="centered-row mt-3">
                            <iframe src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`} width="100%" height="380" 
                            frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                        </Row>
                    )
                })}

            </Modal.Body>
        </>
    )
};

export default TopTracksModal