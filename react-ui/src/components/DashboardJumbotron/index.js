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
        "It's like you have ESPN or something.",
        "You are serious, and I won't call you Shirley.",
        "The force is strong with this one.",
        "Excellent! *air guitar*",
        "Your scientists spent so long wondering if they could score these films, John, they never stop to think if they should.",
        "Rosebud. [Note: Sorry, I've got no pun here]",
        "What do you mean? African or European scores?",
        "Supercalifragilisticexpialidocious!",
        "You gotta ask yourself one question: do I feel lucky? Well, do ya punk?",
        "That's about As Good As It Gets!",
        "Think you can handle Se7en more?",
        "Some comedies, some drama...all The Usual Suspects.",
        "At this point you're Almost Famous!",
        "All right, Mr. DeMille, (you're) ready for (your) close-up.",
        "You're the Dude...You know, that or, uh, His Dudeness, or uh, Duder, or El Duderino if you're not into the whole brevity thing.",
        "Don't score too fast and go all Pyscho on us.",
        "The first rule of Film Score is: you tell everyone about Film Score. The second rule of Film Score is: you tell EVERYONE about Film Score!",
        "That's (The Sound of) Music to my ears!",
        "I love the smell of film scores in the morning!",
        "If my calculations are correct, when this baby hits 88 film scores... you're gonna see some serious shit.",
        "Here's looking at you, kid.",
        "Life moves pretty fast. If you don't stop and score some films once in a while, you could miss it.",
        "Get busy scorin' or get busy dyin'.",
        "My momma always said that life is like a box of film scores. You never know what you're gonna get.",
        "Try not. Score, or score not. There is no try.",
        "Some people without brains do an awful lot of scoring, don't you think?",
        "Keep it up, and I'm gonna make (you) an offer (you) can't refuse.",
        "Frankly my dear, I DO give a damn.",
        "All work and no scores make Jack a dull boy.",
        "Great (Gatsby) job!",
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