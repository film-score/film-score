import React from 'react'
import { Container, Row, Col, Jumbotron } from 'reactstrap';

const randomPun = () => {
    const puns = [
        "You're doing (Inter)stellar!",
        "No Ferris Bueller's Day Off for you!",
        "Close Encounters of the overacheivers kind, am I right?",
        "You've really had a wonderful score history, George.",
        "You're gonna need a bigger app.",
        "Shake n' bake, baby.",
    ]

    return puns[Math.floor(Math.random() * puns.length)]
}

const DashboardJumbotron = (props) => {
    return <Row>
        <Col>
            <Jumbotron fluid className="bg-secondary text-light">
                <Container className="px-5">
                    <h1 className="display-4">Welcome back, <strong>{props.currentUser.first_name}</strong>!</h1>
                    <hr />
                    <p className="lead mb-0">You've scored <strong>{props.currentUser.filmsScored}</strong> films so far! {randomPun()}</p>
                </Container>
            </Jumbotron>
        </Col>
    </Row>
}

export default DashboardJumbotron