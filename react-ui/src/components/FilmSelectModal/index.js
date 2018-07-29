import React, { Component } from 'react'
import  { Modal, ModalBody, ModalFooter } from 'reactstrap'
import FilmSelectPreview from '../FilmSelectPreview'

export class FilmSelectModal extends Component {

    handleSearchInput = (e) => {
        e.preventDefault()
        let input = e.target.value

        if (input.length > 2) {
            setTimeout(() => {
                fetch(`http://www.omdbapi.com/?s=${input}&type=movie&apikey=5e319b9a`)
                    .then(data => data.json())
                    .then(data => this.props.addSuggestions(data.Search) )
            }, 1000)
        }
    }

    suggestionsList = () => {
        if (this.props.suggestions && Array.isArray(this.props.suggestions)) {
            return this.props.suggestions.map((e) => {
                return <div data-id={e.imdbID} onClick={this.props.selectFilm} className='film-suggestions__suggestion'>{e.Title} <span className='year'>({e.Year})</span></div>
            })
        } else {
            return null
        }
    }

    preventEnter = (e) => {
        return e.which === 13 ? e.preventDefault() : null
    }

  render() {
    return (
        <Modal isOpen={this.props.modalState} toggle={this.props.modalToggle} backdrop="static" contentClassName="bg-dark text-light" className="modal-dialog-centered" id="newScoreModal" tabindex="-1" role="dialog" aria-labelledby="newScoreModalTitle" aria-hidden="true">
            <form className="form" onSubmit={this.props.setFilm.bind(this.event)} onKeyPress={this.preventEnter.bind(this)}>
                <ModalBody>
                    
                    <div className="form-group mb-0">
                        <input type="text" name="name" id="filmTitle" className="form-control border-dark" onChange={this.handleSearchInput} placeholder="Search by film title..." autocomplete="off" />
                        <div id="film-suggestions">
                            {this.suggestionsList()}
                        </div>
                    </div>

                    {this.props.film.selected ? <FilmSelectPreview film={this.props.film} /> : ""}

                </ModalBody>

                { this.props.film.selected ?
                <ModalFooter className="border-secondary">
                    <input type="submit" value={`Score "${this.props.film.title}"`} className="btn btn-danger btn-block text-center" />
                </ModalFooter>
                : '' }
            </form>
        </Modal>
    )
  }
}

export default FilmSelectModal
