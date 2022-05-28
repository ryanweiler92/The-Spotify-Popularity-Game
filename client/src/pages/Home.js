import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns, Jumbotron} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserData from '../components/UserData.js'
import {useMutation} from '@apollo/client';
import {ADD_USER} from '../utils/mutations'

const Home = () => {


    let token = window.localStorage.getItem("token")
    const [artists, setArtists] = useState([]);
    //name, id, uri, image, folowers, href
    const [userData, setUserData] = useState([]);
    const [topArtistData, setTopArtistData] = useState([]);
    const [playlistData, setPlaylistData] = useState([]);


    //search for user data based on who is logged in
    //Searches once the token state has set
    useEffect(() => {
    const searchMe = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        const userData = {
            name: data.display_name,
            id: data.id,
            uri: data.uri,
            image: data.images[0].url,
            followers: data.followers.total,
            href: data.href
        }
        setUserData(userData)  
    };
    searchMe();
    }, [token])


    //mutation for adding user to db
    const [userAdd, { error }] = useMutation(ADD_USER);
    const [myMutationResponse, setMyMutationResponse] = useState([])

    //add user to database if not already
    useEffect(() => {
        console.log("userdata is", userData.name)
    const addUser = async () => {
        try{
            const mutationResponse = await userAdd({
                variables: { username: userData.name, id: userData.id, image: userData.image},
            });
            const myResponse = mutationResponse.data
            setMyMutationResponse(myResponse)
        } catch (e) {
            console.error(e);
        }
        }
        addUser();
    }, [userData])

    //get users top artists
    useEffect(() => {
        const searchMeTopArtists = async () => {
            const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=4", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const topArtistData = data.items.map((artist) => ({
                name: artist.name,
                images: artist.images,
                genres: artist.genres,
                followers: artist.followers.total,
                id: artist.id
            }))
            setTopArtistData(topArtistData)
        };
        searchMeTopArtists();
        }, [token])

        //get user playlists
        useEffect(() => {
            const searchMeTopPlaylists = async () => {
                const {data} = await axios.get("https://api.spotify.com/v1/me/playlists?limit=20", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const playlistData = data.items.map((playlist) => ({
                    name: playlist.name,
                    images: playlist.images,
                    numberSongs: playlist.tracks.total,
                    owner: playlist.owner.display_name,
                    id: playlist.id
                }))
                setPlaylistData(playlistData)
            };
            searchMeTopPlaylists();
            }, [token])

    //END SPOTIFY API STUFF

    const myFunction = () => {
       console.log(userData)
       console.log(myMutationResponse)

    }

    return (
        
        <Container className="mx-auto mt-4 pb-4 " id="background-pic">
        {!token ?
        <Row className="blank-row">
            <Jumbotron>
                <h1 className="text-center">Welcome to The Spotify Popularity Game!</h1>
                <p className="text-center">Please login to Spotify using the link in the top right corner.</p>
            </Jumbotron>

        </Row>
        : <UserData userData={userData} topArtistData={topArtistData} playlistData={playlistData} myToken={token} /> 
        }

        
        
        
        
        
        
        
        {/* <Row>
            <Col>
                <form onSubmit={searchArtists}>
                    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                    <button type={"submit"}>Search</button>
                </form>
            </Col>
            <Col>
            <Button onClick={() => searchMe()}>Search Me</Button>
            </Col>
        </Row>
        <Row>
        {renderArtists()}
        </Row> */}
        </Container>
        
    )

}

export default Home