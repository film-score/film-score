import React from 'react'
import { Container } from 'reactstrap'
import ScoreForm from '../../components/ScoreForm'
import FilmSelectModal from '../../components/FilmSelectModal'
import ScoreResultsModal from '../../components/ScoreResultsModal'

class NewScore extends React.Component {
    constructor(props) {
      super(props)

      this.selectFilm = this.selectFilm.bind(this)
    
      this.state = {
        modal: true,
        scoreSubmitted: false,
        film: {
            selected: false,
            set: false,
        },
        results: [],
        suggestions: []
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

    selectFilm = (e) => {
        e.preventDefault()
        document.getElementById('filmTitle').value = (e.target.innerText)
        this.setState({ suggestions: [] })
        fetch(`/api/films/${e.target.dataset.id}`)
            .then(data => data.json())
            .then(data => this.setState({
                film: {
                    ...this.state.film,
                    selected: true,
                    title: data[0].title,
                    id: data[0].id,
                    date: new Date(data[0].release_date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }),
                    director: data[0].director_name,
                    excerpt: data[0].short_description,
                    poster: data[0].poster_file
                }
            }))
    }


    setFilm = (e) => {
        e.preventDefault()
        
        this.modalToggle()

        let film = {...this.state.film}
        film.set = true

        this.setState({film})
    }

    addSuggestions = (data) => {
        this.setState({ suggestions: data })
        console.log(data)
    }

    newScore = () => {
        this.setState({
            modal: true,
            scoreSubmitted: false,
            film: {
                selected: false,
            },
            results: []
        })
    }
    
    render() {
        return (
            <section id="newScore" className="body pt-5 visible">
                <Container className="pb-5"> 
                    <FilmSelectModal film={this.state.film} selectFilm={this.selectFilm} setFilm={this.setFilm} modalToggle={this.modalToggle} modalState={this.state.modal} addSuggestions={this.addSuggestions} suggestions={this.state.suggestions} />
                    {this.state.film.set && !this.state.scoreSubmitted ? <ScoreForm film={this.state.film} scoreSubmitted={this.scoreSubmitted} /> : null}
                    <ScoreResultsModal film={this.state.film} results={this.state.results} modalState={this.state.scoreSubmitted} newScore={this.newScore} />
                </Container>
            </section>
        )
    }
}

export default NewScore