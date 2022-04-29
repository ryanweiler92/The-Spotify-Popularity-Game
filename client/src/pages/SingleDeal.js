import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import {Container, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import  SingleDealCard  from '../components/SingleDealCard.js'

const SingleDeal = (props) => {
    //get the passed dealID from home which was passed as state
    let data = useLocation();

    console.log(data.state)
    //state for setting the dealID passed from home page
    const [dealID, setDealID] = useState("")
    console.log("UHH " + dealID)
    //state for setting the deal data from the fetch call
    const [deal, setDeal] = useState([]);

    //set state of deal id on load, second arguement of [] makes effect run once
    useEffect(() => {
        if(!data.state){
            console.log('wrong')
        } else {
        setDealID(data.state.id)
        }
    }, [])


    useEffect(() => {
        fetch (`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }
            return response.json()
        })
        .then((dealData) => setDeal(dealData))
    }, [dealID]);


    const myFunction = () => {
        console.log(deal)
        console.log(deal.gameInfo.name)
    }

    return (
        <>
        <Container>
            <CardColumns>
                <Card key={deal.gameInfo?.gameID} border='dark'>
                    {deal.gameInfo?.thumb ? (
                        <Card.Img src={deal.gameInfo?.thumb} />
                    ) : null}
                    <Card.Body>
                        <Card.Title>{deal.gameInfo?.name}</Card.Title>
                        <p>Retail Price: {deal.gameInfo?.retailPrice}  Sale Price: {deal.gameInfo?.salePrice}</p>
                        <p>Metacritic Score: {deal.gameInfo?.metacriticScore}</p>
                    </Card.Body>
                    <Button onClick={myFunction}>Click</Button>
                </Card>
            </CardColumns>
        </Container>

        <Container className="mx-auto mt-4">
            <SingleDealCard 
            gameID={deal.gameInfo?.gameID}
            picture={deal.gameInfo?.thumb}
            name={deal.gameInfo?.name}
            retailPrice={deal.gameInfo?.retailPrice}
            salePrice={deal.gameInfo?.salePrice}
            metacritic={deal.gameInfo?.metacriticScore}
            steamRatingCount={deal.gameInfo?.steamRatingCount}
            steamRatingPercent={deal.gameInfo?.steamRatingPercent}
            steamRatingText={deal.gameInfo?.steamRatingText}
            storeID={deal.gameInfo?.storeID}
            releaseDate={deal.gameInfo?.releaseDate}
            />
        </Container>
        </>
    )

}

export default SingleDeal