import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns, Modal} from 'react-bootstrap'
import axios from 'axios';
import PlaylistSelectorModal from '../components/PlaylistSelectorModal'

const Game = () => {

       //SPOTIFY API STUFF
       const CLIENT_ID = "f268301c1b63456b81cf1b534073b905"
       const REDIRECT_URI = "http://localhost:3000"
       const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
       const RESPONSE_TYPE = "token"
   
       const [token, setToken] = useState("");
       //name, id, uri, image, folowers, href
       const [userData, setUserData] = useState([]);
       const [playlistData, setPlaylistData] = useState([]);
       const [playlistID, setPlaylistID] =useState("");
       const [chosenPlaylist, setChosenPlaylist] = useState([]);
       const [chosenPlaylistTracks, setChosenPlaylistTracks] = useState([]);

       const [correctCount, setCorrectCount] = useState(0)
       const [incorrectCount, setIncorrectCount] = useState(0)
   
       const [showPlaylistModal, setShowPlaylistModal] = useState(false);

       //get spotify token
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

       //search user data when the page loads
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

        //search users top playlists when userdata is fetched
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
                // setShowPlaylistModal(true)
            };
            searchMeTopPlaylists();
            }, [token])

        //get high level data of individual playlist chosen
        useEffect(() => {
            const searchPlaylistByID = async () => {
                const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(data)
                const playlistData = {
                    name: data.name,
                    id: data.id,
                    owner: data.owner.display_name,
                    images: data.images
                }
                
                setShowPlaylistModal(false)
                setChosenPlaylist(playlistData)
            };
            searchPlaylistByID();
            }, [playlistID])
            
        //get tracks for individual playlist
        useEffect(() => {
            const searchPlaylistTracks = async () => {
                const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=50`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(data)
                const trackData = data.items.map((track) => ({
                    id: track.track.id,
                    name: track.track.name,
                    popularity: track.track.popularity,
                    artist: track.track.artists[0].name,
                    album: track.track.album.name,
                    releaseDate: track.track.album.release_date,
                    images: track.track.album.images
                }))
                setChosenPlaylistTracks(trackData) 
            };
            searchPlaylistTracks();
            }, [chosenPlaylist])   



        const myFunction = () =>{
            console.log(playlistID)
            console.log(chosenPlaylistTracks)
        };

        

        

       return (
           <>
           <Button onClick={myFunction}>Button Man</Button>
           <Modal
            size="lg"
            show={showPlaylistModal}
            onHide={() => setShowPlaylistModal(false)}
            className="top-tracks-modal"
            >
                <PlaylistSelectorModal 
                    playlistData={playlistData} 
                    setPlaylistID={setPlaylistID} 
                    setShowPlaylistModal={setShowPlaylistModal}/>
            </Modal>

            <Row className="d-flex justify-content-end">
                <Col lg="4" md="4" sm="6" className="scoreboard" >
                        <Row className="d-flex justify-content-center" id="scoreboard-title">
                            <p >Scoreboard</p>
                        </Row>
                        <Row className="my-bottom-border">
                            <Col className="my-right-border d-flex justify-content-center">
                                <p>Correct</p>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <p>{correctCount}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="my-right-border d-flex justify-content-center">
                                <p>Incorrect</p>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <p>{incorrectCount}</p>
                            </Col>
                        </Row>
                </Col>
            </Row>
           </>
       )
}

export default Game