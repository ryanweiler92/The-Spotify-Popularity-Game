import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns, Jumbotron} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserData from '../components/UserData.js'

const Home = () => {

    //SPOTIFY API STUFF
    const CLIENT_ID = "f268301c1b63456b81cf1b534073b905"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState([]);
    //name, id, uri, image, folowers, href
    const [userData, setUserData] = useState([]);
    const [topArtistData, setTopArtistData] = useState([]);
    const [playlistData, setPlaylistData] = useState([]);

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

    // const searchArtists = async (e) => {
    //     e.preventDefault()
    //     const {data} = await axios.get("https://api.spotify.com/v1/search", {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },
    //         params: {
    //             q: searchKey,
    //             type: "artist"
    //         }
    //     })
    //     console.log({data})
    //     setArtists(data.artists.items)
    // };

    // const renderArtists = () => {
    //     return artists.map(artist => (
    //         <div key={artist.id}>
    //             {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
    //             {artist.name}
    //         </div>
    //     ))
    // };

    //search for user data based on who is logged in
    //Searches once the token state has set
    useEffect(() => {
    const searchMe = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
            console.log(data)
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
                console.log(data)
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
       console.log(token)
    }

    return (
        
        <Container className="mx-auto mt-4 pb-4" id="background-pic">
        <Row className="d-flex justify-content-end">
            {/* <Button onClick={myFunction} className="gradient-button">My Button</Button> */}
              {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                        <Button className="gradient-button">Login to Spotify</Button>
                        </a>
                    : <Button onClick={logout} className="gradient-button">Logout of Spotify</Button>}
        </Row>
        {!token ?
        <Row className="blank-row">
            <Jumbotron>
                <h1>Welcome to The Spotify Popularity Game!</h1>
                <p>Please login to Spotify using the link in the top right corner.</p>
                <p>You can also make an account to keep track of and post your scores to the leaderboards.</p>
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