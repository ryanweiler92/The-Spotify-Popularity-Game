import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'

export default function SingleDealCard
({gameID, picture, name, retailPrice, salePrice, metacritic, steamRatingCount, steamRatingPercent, SteamRatingText, storeID, releaseDate}) {

return (
    <>
    <CardColumns>
        <Card key={gameID} border='dark'>
            {picture ? (
                <Card.Img src={picture} />
            ) : null}
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <p>Retail Price: {retailPrice}  Sale Price: {salePrice}</p>
                <p>Metacritic Score: {metacritic}</p>
            </Card.Body>
        </Card>
    </CardColumns>

    <Row>
        <Col>
            <Card className="single-deal-card">
                <img src={picture} className="card-img-top" />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Release Date: {releaseDate}</Card.Subtitle>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Retail Price: {retailPrice} Sale Price: {salePrice}</li>
                        <li className="list-group-item">Steam Rating: {steamRatingPercent}% Steam Rating Count: {steamRatingCount}</li>
                        <li className="list-group-item">Metacritic Rating: {metacritic}</li>
                    </ul>
                </Card.Body>
            </Card>
        </Col>

    </Row>
    </>
)
};

