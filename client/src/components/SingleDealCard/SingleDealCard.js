import React, { useState, useEffect } from 'react';
import {Container, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'

export default function SingleDealCard
({gameID, picture, name, retailPrice, salePrice, metacritic, steamRatingCount, steamRatingPercent, SteamRatingText, storeID}) {

return (
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
)
};

