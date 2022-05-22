import React, { useState, useEffect } from 'react';
import {Container, Nav, Navbar, Modal, Tab, Button, Row} from 'react-bootstrap'
import background from '../assets/images/concert.jpg'

const TopTracksModal = ({topTracks, artistName}) => {

   const myFunction = () => {
        console.log(topTracks)
    }

    const modalStyle = {
        backgroundImage: "url(" + background + ")",
        backgroundSize: "cover",
        backgroundPosition: "center"
    }

    return (
        <>
            <Modal.Header className="d-flex align-items-center justify-content-center text-center" closeButton>
                <Modal.Title className="d-flex align-items-center justify-content-center text-center">
                    <h2>Top Tracks for {artistName}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalStyle}>
                {topTracks?.slice(0, 5).map((track) => {
                    return (
                        <Row className="centered-row mt-3">
                            <iframe src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}  
                            frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                        </Row>
                    )
                })}

            </Modal.Body>
        </>
    )
};

export default TopTracksModal