import React, { useState, useEffect } from 'react';
import {Container, Col, Form, Button} from 'react-bootstrap'
import { searchGames } from '../utils/API'

const Home = () => {
    const [searchedGames, setSearchedGames] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchGames(searchInput)
            console.log(searchInput)

            if(!response.ok) {
                throw new Error('something went wrong!')
            }

            const  items  = await response.json();

            console.log(items)

            const gameData = items.map((game) => ({
                gameID: game.id
            }))
            setSearchedGames(gameData)
            setSearchInput('');
        } catch (err){
            console.error(err)
        }
    }

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
        </>
    )

}

export default Home