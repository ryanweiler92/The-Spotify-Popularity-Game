import React, { useState } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'


const UserData = ( {userData, topArtistData} ) => {

    let { followers: followers, href: href, id: id, image: image,
          name: name, uri: uri } = userData

    let artists = topArtistData
    
    const myFunction = () => {
        console.log(artists)
        console.log(topArtistData)
    }

    return (
        <Container>
        <div className="d-flex justify-content-center align-items-center">
            <div className="splash">
                <Row className="centered-row mt-3">
                    <h2>Welcome {name}!</h2>
                </Row>
                <Row className="centered-row">
                    <Col>
                    <img src={image} className="img-fluid prof-pic gradient-border"/>
                    </Col>
                </Row>
                <Row className="centered-row mb-3">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-center">Followers: {followers}</li>
                    </ul>
                </Row>
            </div>
        </div>
        
        <div>
            <Row className="centered-row mt-3">
                <h2>Your Top Artists</h2>
            </Row>
            <Row>
                {artists?.map((artist) =>{
                    return (
                        <Col className="col-md-4 col-lg-3 col-xl-3 mt-4">
                            <Card className="h-100 top-artist-cards">
                                <img src={artist.images[0].url} alt={artist.name}/>
                                <Card.Body>
                                    <Row>
                                        <Col className="col-lg-12 mx-auto">
                                            <h5 className="text-center">{artist.name}</h5>
                                        </Col>
                                    </Row>
                                    <Row className="centered-row">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item text-center">
                                                Followers: {(artist.followers.toLocaleString())}
                                            </li>
                                            <li className="list-group-item list-group-flush text-center text-capitalize">
                                                {artist.genres[0]}
                                            </li>
                                        </ul>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <Row className="centered-row mt-3">
                <Button onClick={myFunction}>Button Man</Button>
            </Row>
        </div>
        </Container>

    )
}

export default UserData