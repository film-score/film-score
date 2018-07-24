import React, { Component } from 'react'
import  { Modal, ModalBody, ModalFooter } from 'reactstrap'
import FilmSelectPreview from '../FilmSelectPreview'

export class FilmSelectModal extends Component {

    constructor(props) {
      super(props)

    this.selectFilm = this.selectFilm.bind(this)
    
      this.state = {
         suggestions: [],
         film: null,
         isFilmSelected: false,
      }
    }

    handleSearchInput = (e) => {
        e.preventDefault()
        let input = e.target.value


        if (input.length > 2) {
            setTimeout(() => {
                fetch(`/api/films?q=${input}`)
                    .then(data => data.json())
                    .then(data => { this.setState({ suggestions: data }) })
            }, 1000)
        }
    }

    selectFilm = (e) => {
        e.preventDefault()
        document.getElementById('filmTitle').value = (e.target.innerText)
        this.setState({ suggestions: [] })
        fetch(`/api/films/${e.target.dataset.id}`)
        .then(data => data.json())
        .then(data => this.setState({
                isFilmSelected: true,
                film: {
                    title: data[0].title,
                    id: data[0].id,
                    date: new Date(data[0].release_date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }),
                    director: data[0].director_name,
                    excerpt: data[0].short_description,
                    poster: data[0].poster_file
                }
            }))
    }
    

    suggestionsList = () => {
        if (this.state.suggestions && Array.isArray(this.state.suggestions)) {
            return this.state.suggestions.map((e) => {
                return <div data-id={e.id} onClick={this.selectFilm} className='film-suggestions__suggestion'>{e.title} <span className='year'>({new Date(e.release_date).getFullYear()})</span></div>
            })
        } else {
            return null
        }
    }

  render() {
    return (
        <Modal isOpen={this.props.modalState} toggle={this.props.modalToggle} backdrop="static" contentClassName="bg-dark text-light" className="modal-dialog-centered" id="newScoreModal" tabindex="-1" role="dialog" aria-labelledby="newScoreModalTitle" aria-hidden="true">
            <form className="form" onSubmit={this.props.setFilm.bind(this.event, this.state.film)}>
                <ModalBody>
                    
                    <div className="form-group mb-0">
                        <input type="text" name="name" id="filmTitle" className="form-control border-dark" onChange={this.handleSearchInput} placeholder="Film Title" autocomplete="off" />
                        <div id="film-suggestions">
                            {this.suggestionsList()}
                        </div>
                    </div>

                    {this.state.isFilmSelected ? <FilmSelectPreview film={this.state.film} /> : ""}

                </ModalBody>

                { this.state.isFilmSelected ?
                <ModalFooter className="border-secondary">
                    <input type="submit" value="Next" className="btn btn-danger" />
                </ModalFooter>
                : '' }
            </form>
        </Modal>
    )
  }
}

export default FilmSelectModal
