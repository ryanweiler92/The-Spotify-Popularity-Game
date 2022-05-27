import React, { useState, useEffect } from 'react';
import {Container, Table, Row, Col, Form, Button, Card, CardColumns, Jumbotron} from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client';
import {GET_SCORES} from "../utils/queries"

const Leaderboard = () => {

    const { data: leaderboardData} = useQuery(GET_SCORES)

    const myFunction = () => {
        console.log(leaderboardData.scores)
    }

    return (
        <Container className="mx-auto mt-3" id="leaderboard-container">
            <Row>
                <Button onClick={myFunction}>Buttonman</Button>
            </Row>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Score</th>
                        <th>Playlist</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData?.scores?.map((score) => {
                        return (
                            <tr>
                                <td></td>
                                <td>{score.username}</td>
                                <td>{score.score}</td>
                                <td>{score.playlistName}</td>
                                <td className="d-flex justify-content-center">
                                    <img src={score.playlistImage} 
                                    className="leaderboard-img" />
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        
        </Container>
    )
}

export default Leaderboard