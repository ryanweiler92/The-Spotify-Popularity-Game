import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import axios from 'axios';

const Game = () => {

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

       return (
           <>
           </>
       )
}

export default Game