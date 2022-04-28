import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import {Container, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import { getDeal } from '../utils/API'

const SingleDeal = (props) => {

    let data = useLocation();
    const dealID = data.state
    console.log(dealID)

    const [searchedDeal, setSearchedDeal] = useState([])

    useEffect(async () => {

        try {
            const response = await getDeal(dealID)

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
            }));
             setSearchedDeal(dealData)
        } catch (err){
            console.error(err)
        }
    });



    return (
        <>
        <Container>
            <CardColumns>
                <Card key={searchedDeal.gameID} border='dark'>
                    {searchedDeal.picture ? (
                        <Card.Img src={searchedDeal.picture} />
                    ) : null}
                    <Card.Body>
                        <Card.Title>{searchedDeal.name}</Card.Title>
                        <p>Retail Price: {searchedDeal.retailPrice}  Sale Price: {searchedDeal.salePrice}</p>
                        <p>Metacritic Score: {searchedDeal.metacriticScore}</p>
                    </Card.Body>
                    
                </Card>
            </CardColumns>
        </Container>
        </>
    )

}

export default SingleDeal