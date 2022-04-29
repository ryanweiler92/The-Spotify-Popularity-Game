import React, { useState, useEffect } from 'react';
import {Container, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import { searchGames } from '../utils/API'
import SingleDeal from './SingleDeal'
import { Link } from 'react-router-dom';

const Home = () => {
    
    //state for game searched from form
    const [searchedGames, setSearchedGames] = useState([]);

    //form search
    const [searchInput, setSearchInput] = useState('');
    


    //Getting the game data when the form submits
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchGames(searchInput)

            if(!response.ok) {
                throw new Error('something went wrong!')
            }

            const  items  = await response.json();

            console.log(items)

            const gameData = items.map((game) => ({
                gameID: game.gameID,
                cheapestDealID: game.cheapestDealID,
                name: game.external,
                price: game.cheapest,
                picture: game.thumb
            }))
            setSearchedGames(gameData)
            setSearchInput('');
        } catch (err){
            console.error(err)
        }
    };



    return (
        <>
        <Container>
            <h1>Search for Games!</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                    <Col xs={12} md={8}>
                        <Form.Control
                         name='searchInput'
                         value={searchInput}
                         onChange={(e) => setSearchInput(e.target.value)}
                         type='text'
                         size='lg'
                         placeholder='Search for a game'
                        />
                    </Col>
                </Form.Row>
            </Form>
        </Container>

        <Container>
            <CardColumns>
                {searchedGames.map((game) => {
                    return (
                        <Card key={game.gameID} border='dark'>
                            {game.picture ? (
                                <Card.Img src={game.picture} />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{game.name}</Card.Title>
                                <p className='small'>Price: {game.price}</p>
                                <Link to={{
                                    pathname: "/deal", 
                                    state: {id: game.cheapestDealID,
                                            }
                                    }}>
                                    <button value={game.gameID}>View This Deal</button>
                                </Link>
                            </Card.Body>
                            )
                        </Card>
                    )
                })}
            </CardColumns>
        </Container>
        <div>
            <SingleDeal />
        </div>
        </>
    )

}

export default Home