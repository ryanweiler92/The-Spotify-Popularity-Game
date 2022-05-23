import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns, Modal} from 'react-bootstrap'
import axios from 'axios';
import PlaylistSelectorModal from '../components/PlaylistSelectorModal'
import xIcon from '../assets/images/x.png'

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
       const [chosenPlaylistImage, setChosenPlaylistImage] = useState("");
       const [chosenPlaylistTracks, setChosenPlaylistTracks] = useState([]);

       const [correctCount, setCorrectCount] = useState(0)
       const [incorrectCount, setIncorrectCount] = useState(0)
       const [roundCount, setRoundCount] = useState(0);
       const [leftSong, setLeftSong] = useState([]);
       const [leftSongImage, setLeftSongImage] = useState("");
       const [rightSong, setRightSong] = useState([]);
       const [rightSongImage, setRightSongImage] = useState("");
       const [correctAnswer, setCorrectAnswer] = useState("");
       const [chosenAnswer, setChosenAnswer] = useState("");
       const [chosenArtist, setChosenArtist] = useState("");
       const [answerStatus, setAnswerStatus] = useState("");
       const [correctSide, setCorrectSide] = useState("");
   
       const [showPlaylistModal, setShowPlaylistModal] = useState(false);
       const [answerModal, setAnswerModal] = useState(false);

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
                setShowPlaylistModal(true)
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
                setChosenPlaylistImage(playlistData.images[0].url)
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

        let [curratedPlaylist, setCurratedPlaylist] = useState([]); 

        //create an array of songs with a popularity greater than 0
        useEffect(() => {
            for(let i = 0; i < chosenPlaylistTracks.length; i++){
                if(chosenPlaylistTracks[i].popularity > 0){
                    setCurratedPlaylist(oldArray => [...oldArray, chosenPlaylistTracks[i]])
                }
            }
        }, [chosenPlaylistTracks])
        
        //advance rounds and call random song function
        const roundHandler = () => {
            if(incorrectCount < 3){
            setRoundCount(roundCount + 1)
            setAnswerModal(false)
            randomSongSelect()
            
            } else {
                console.log("end game")
                setAnswerModal(false)
            }
        };

        
        //grab 2 random songs and check to make sure they dont have same pop score
        const randomSongSelect = () => {
        //left song
            let left = curratedPlaylist[Math.floor(Math.random()*curratedPlaylist.length)];
            setLeftSong(left)
            setLeftSongImage(left.images[0].url)
            // curratedPlaylist.splice([left], 1)

            //right song
            let right = curratedPlaylist[Math.floor(Math.random()*curratedPlaylist.length)];
            setRightSong(right)
            setRightSongImage(right.images[0].url)
            // curratedPlaylist.splice([right], 1)

            if(right.popularity == left.popularity){
                randomSongSelect()
            };

            //correct answer
            if(right.popularity > left.popularity){
                setCorrectAnswer(right.name)
                setCorrectSide("right")
            } else {
                setCorrectAnswer(left.name)
                setCorrectSide("left")

            }
        };

        //check answer vs correct answer
        //state is updating on initial page render so had to create an extra if statement to catch
        useEffect(() => {
            const answerHandler = () => {
                if(chosenAnswer === ""){
                    console.log("pls don't update")
                }else if(chosenAnswer === correctAnswer){
                    setCorrectCount(correctCount + 1)
                    setAnswerStatus("Correct")
                    setAnswerModal(true)
                } else {
                    setIncorrectCount(incorrectCount + 1)
                    setAnswerModal(true)
                    setAnswerStatus("Incorrect")
                }
            };
        answerHandler();
        }, [chosenAnswer] )


        // const startGameBtn = document.querySelector("start-game-btn")
        const myStyle = {
            display: 'none'
        }

        const myFunction = () =>{
            console.log(curratedPlaylist)
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

            <Row className="d-flex justify-content-between align-items-center">
                <Col lg="3" md="3" sm="3" className="overlay-box">
                <img src={chosenPlaylistImage} id="game-playlist-image" className="img-fluid gradient-border" />
                </Col>
                <Col lg="3" md="3" sm="3">
                    <h1 className="gradient-text text-center">Popularity Guesser</h1>
                </Col>
                <Col lg="4" md="4" sm="4" className="scoreboard" >
                        <Row className="d-flex justify-content-center" id="scoreboard-title">
                            <p>Scoreboard</p>
                        </Row>
                        <Row className="my-bottom-border">
                            <Col className="my-right-border d-flex justify-content-center">
                                <p>Correct</p>
                                
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <p>{correctCount}</p>
                            </Col>
                        </Row>
                        <Row className="my-bottom-border">
                            <Col className="my-right-border d-flex justify-content-center align-items-center">
                                <p>Incorrect</p>
                            </Col>
                            <Col className="d-flex justify-content-center ">
                                <p>{incorrectCount}</p>
                            </Col>
                        </Row>
                        <Row>
                        <Col className="d-flex justify-content-center">
                            <p>Current Round: {roundCount} of 10</p>
                        </Col>
                        </Row>
                </Col>
            </Row>
            <Row className="d-flex justify-content-between align-items-center mt-4">
                <Col lg="3" md="3" sm="3">
                    
                </Col>
                <Col lg="5" md="5" sm="5">
                    <Button 
                    onClick={roundHandler}
                    className="gradient-button start-game-btn"
                    style={{display: roundCount != 0 ? 'none' : 'block'}}>
                        Start Game
                    </Button>
                </Col>
                <Col lg="3" md="3" sm="3">
                </Col>
            </Row>
            <Container className="game-container mt-4 mb-4">
                <Row>
                    <Col>
                        <Row>
                            <Col className="hover-img">
                                <img src={leftSongImage}
                                className="img-fluid game-song-img"/>
                                <figcaption style={{display: roundCount == 0 ? 'none' : ''}}
                                value={leftSong.name} 
                                onClick={(e) => {setChosenAnswer(leftSong.name); setChosenArtist(leftSong.artist)}}>
                                    <h3 className="text-center">Song: {leftSong.name}</h3>
                                    <h3 className="text-center">Artist: {leftSong.artist}</h3>
                                    <h3 className="text-center">Album: {leftSong.album}</h3>
                                </figcaption>
                            </Col>
                        </Row>
                        <Row className="mt-3 d-flex justify-content-center">
                            <iframe src={`https://open.spotify.com/embed/track/${leftSong.id}?utm_source=generator`}  
                            frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col className="hover-img">
                                <img src={rightSongImage} 
                                className="img-fluid game-song-img"/>
                                <figcaption style={{display: roundCount == 0 ? 'none' : ''}}
                                value={rightSong.name}
                                onClick={(e) => {setChosenAnswer(rightSong.name); setChosenArtist(rightSong.artist)}}>
                                    <h3 className="text-center">Song: {rightSong.name}</h3>
                                    <h3 className="text-center">Artist: {rightSong.artist}</h3>
                                    <h3 className="text-center">Album: {rightSong.album}</h3>
                                </figcaption>
                            </Col>
                        </Row>
                        <Row className="mt-3 d-flex justify-content-center">
                            <iframe src={`https://open.spotify.com/embed/track/${rightSong.id}?utm_source=generator`}  
                            frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Modal
            size="lg"
            show={answerModal}
            onHide={() => setAnswerModal(false)}
            className="answer-modal"
            >
                <Modal.Header className="d-flex align-items-center justify-content-center text-center dark-modal" closeButton>
                    <Modal.Title className="d-flex align-items-center justify-content-center text-center">
                        <h2>{answerStatus}</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="dark-modal m-auto">
                <Row className="d-flex justify-content-center align-items-center">
                    <h3>You chose <span className="font-weight-bold">{chosenAnswer} </span> 
                    by <span className="font-weight-bold">{chosenArtist}</span></h3>
                </Row>
                <Row>
                    <Col>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col lg="10" md="10" sm="10" >
                                <img src={leftSongImage} className="img-fluid answer-modal-img" />
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center mt-2">
                                <h3 id="left-pop" 
                                className={correctSide == "left" ? "correct" : "incorrect"}>
                                    Popularity: {leftSong.popularity}
                                </h3>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <p>Song: {leftSong.name}</p>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <p>Artist: {leftSong.artist}</p>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <p>Album: {leftSong.album}</p>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col lg="10" md="10" sm="10" >
                                <img src={rightSongImage} className="img-fluid answer-modal-img" />
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center mt-2">
                                <h3 id="right-pop"
                                className={correctSide == "right" ? "correct" : "incorrect"}>
                                    Popularity: {rightSong.popularity}
                                </h3>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <p>Song: {rightSong.name}</p>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <p>Artist: {rightSong.artist}</p>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center">
                            <p>Album: {rightSong.album}</p>
                        </Row>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center">
                    <Button 
                    className="gradient-button"
                    onClick={roundHandler}
                    >Next Round</Button>
                </Row>
            </Modal.Body>
            </Modal>
           </>
       )
}

export default Game