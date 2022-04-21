import React, { useState, useEffect } from 'react';
import {Container, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import { getDeal } from '../utils/API'

const SingleDeal = (gameID) => {

    const searchDeal = async (event) => {
        event.preventDefault();

        try {
            const response = await getDeal(gameID)

            if(!response.ok) {
                throw new Error('something went wrong!')
            }

            const items = await response.json();

            console.log(items)

            const dealData = items.map((deal) => ({
                name: deal.name,
                salePrice: deal.salePrice,
                retailPrice: deal.retailPrice,
                metacriticScore: deal.metacriticScore,
                picture: deal.thumb,
                gameID: deal.gameID
            }))
            console.log(dealData)
        } catch (err){
            console.error(err)
        }
    }

    return (
        <>
        <Container>
            {/* <CardColumns>
                <Card key={gameID} border='dark'>
                    {deal.picture ? (
                        <Card.Img src={picture} />
                    ) : null}
                    <Card.Body>
                        <Card.Title>{dealData.name}</Card.Title>
                        <p>Retail Price: {dealData.retailPrice}  Sale Price: {deal.salePrice}</p>
                        <p>Metacritic Score: {dealData.metacriticScore}</p>
                    </Card.Body>
                    
                </Card>
            </CardColumns> */}
        </Container>
        </>
    )

}

export default SingleDeal