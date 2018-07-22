import React from 'react'
import { Container } from 'reactstrap'
import ScoreForm from '../../components/ScoreForm'
import FilmSelectModal from '../../components/FilmSelectModal'
import ScoreResultsModal from '../../components/ScoreResultsModal'

class NewScore extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
        modal: true,
        scoreSubmitted: false,
        film: {
            selected: false,
        },
        results: []
      }
    }

    scoreSubmitted = (data) => {
        this.setState({
            scoreSubmitted: true,
            results: data
        })
    }

    modalToggle = () => {
        this.setState({
            modal: !this.state.modal,
        })
    }

    setFilm = (filmInfo, e) => {
        e.preventDefault()
        
        this.modalToggle()

        let film = {...filmInfo}
        film.selected = true

        this.setState({film})
    }
    
    render() {
        return (
            <section id="newScore" className="body pt-5 visible">
                <Container className="pb-5"> 
                    <FilmSelectModal film={this.state.film} setFilm={this.setFilm} modalToggle={this.modalToggle} modalState={this.state.modal}/>
                    {this.state.film.selected && !this.state.scoreSubmitted ? <ScoreForm film={this.state.film} scoreSubmitted={this.scoreSubmitted} /> : null}
                    <ScoreResultsModal film={this.state.film} results={this.state.results} modalState={this.state.scoreSubmitted}/>
                </Container>
            </section>
        )
    }
}

export default NewScore