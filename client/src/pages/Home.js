import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    //SPOTIFY API STUFF
    const CLIENT_ID = "f268301c1b63456b81cf1b534073b905"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

    }, [])

    const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
        console.log({data})
        setArtists(data.artists.items)
    };

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                {artist.name}
            </div>
        ))
    };

    //search for user data based on who is logged in

    useEffect(() => {
    const searchMe = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
      
        console.log({data})
    };
    searchMe();
    }, [token])


    const searchMe2 = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
      
        console.log({data})
    };

    //END SPOTIFY API STUFF

    return (
        
        <Container className="mx-auto mt-4">
        <Row>
              {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                        <Button>Login to Spotify</Button>
                        </a>
                    : <Button onClick={logout}>Logout</Button>}
        </Row>
        <Row>
        <Button onClick={() => searchMe2()}>Search Me</Button>
        </Row>
        
        
        
        
        
        
        
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