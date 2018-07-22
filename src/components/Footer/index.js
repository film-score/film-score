import React from "react";
import { Container } from "reactstrap";

const Footer = (props) => {
    return <footer className="fixed-bottom pt-5" style={{ background: "linear-gradient(transparent,#1a1d22 70%)" }}>
        <Container>
            <p className="text-secondary small pb-0">©2018 Film Score | <a href="/privacy-policy.html" className="text-secondary" target="_blank">Privacy Policy</a> | <a href="/about-us.html" className="text-secondary" target='_blank'>About Us</a></p>
        </Container>
    </footer>
}

export default Footer