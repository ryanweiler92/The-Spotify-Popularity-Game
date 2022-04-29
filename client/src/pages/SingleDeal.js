import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import {Container, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import { getDeal } from '../utils/API'

const SingleDeal = (props) => {

    let data = useLocation();

    const [dealID, setDealID] = useState("")

    const [deal, setDeal] = useState([]);

    useEffect(() => {
        setDealID(data.state)
    })

    const searchDeal = async (event, dealID) => {
        event.preventDefault();

        if (!data.state) {
            return false;
        }

        try {
            const response = await getDeal(dealID.id)

            if(!response.ok) {
                throw new Error('something went wrong!')
            }

            const items = await response.json();

            console.log(items)

            const dealData = {
                name: items.gameInfo.name,
                salePrice: items.gameInfo.salePrice,
                retailPrice: items.gameInfo.retailPrice,
                metacriticScore: items.gameInfo.metacriticScore,
                picture: items.gameInfo.thumb,
                gameID: items.gameInfo.gameID
            }
             setDeal(dealData)
        } catch (err){
            console.error(err)
        }
    };

    console.log(deal)


    return (
        <>
        <Container>
            <CardColumns>
                <Card key={deal.gameID} border='dark'>
                    {deal.picture ? (
                        <Card.Img src={deal.picture} />
                    ) : null}
                    <Card.Body>
                        <Card.Title>{deal.name}</Card.Title>
                        <p>Retail Price: {deal.retailPrice}  Sale Price: {deal.salePrice}</p>
                        <p>Metacritic Score: {deal.metacriticScore}</p>
                    </Card.Body>
                    <Button onClick={(e) => searchDeal(e, dealID)}>Click</Button>
                    
                </Card>
            </CardColumns>
        </Container>
        </>
    )

}

export default SingleDeal