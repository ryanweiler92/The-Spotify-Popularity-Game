import React, { useState, useEffect } from 'react';
import {Container, Table, Row, Col, Form, Button, Card, CardColumns, Jumbotron} from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client';
import {GET_SCORES} from "../utils/queries"

const Leaderboard = () => {

    const { data: leaderboardData} = useQuery(GET_SCORES)

    const myFunction = () => {
        console.log(leaderboardData.scores.createdAt)
    }

    return (
        <Container className="mx-auto mt-3" id="leaderboard-container">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Score</th>
                        <th>Playlist</th>
                        <th>Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData?.scores?.map((score, index) => {
                        return (
                            <tr>
                                <td className="rank align-middle">{index + 1}</td>
                                <td className="rank align-middle">{score.username}</td>
                                <td className="rank align-middle">{score.score}</td>
                                <td className="rank align-middle">{score.playlistName}</td>

                                <td className="rank align-middle">{score.createdAt.split(" ").splice(0,3).join(" ")}</td>
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