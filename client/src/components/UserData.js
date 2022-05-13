import React, { useState } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'


const UserData = ( {userData} ) => {

    let { followers: followers, href: href, id: id, image: image,
          name: name, uri: uri } = userData

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="splash">
                <Row className="centered-row mt-3">
                    <h2>Welcome {name}!</h2>
                </Row>
                <Row className="centered-row">
                    <Col>
                    <img src={image} className="img-fluid prof-pic gradient-border"/>
                    </Col>
                </Row>
                <Row className="centered-row mb-3">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-center">Followers: {followers}</li>
                    </ul>
                </Row>
            </div>
        </div>

    )
}

export default UserData