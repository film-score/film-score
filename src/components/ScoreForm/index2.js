import React from 'react'
import { fields } from './config'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { calculateScores } from './calculate'

import './style.css'

const FormField = (props) => {
    const RangeInput = () => {
        let checkboxes = []

        for (let i = 1; i <= 10; i++) {
            checkboxes.push(<div className="d-flex flex-column text-center" key={props.slug+'_'+i}>
                        <input className="mb-2" type="radio" name={props.slug} value={i} />
                        <label className="text-secondary" htmlFor={i}>{i}</label>
                    </div>)
        }

        return <div className="d-flex justify-content-between">{checkboxes}</div>
    }

    return (
        <div className="form-group mb-5" id={props.slug} data-subcategory-scale={props.scale}>
            <h6 className="small text-secondary">{props.title}</h6>
            <p>{props.desc}</p>
            <RangeInput />
        </div>
    )
}

const FooterButtons = (props) => {
    let leftButton = "", rightButton = ""

    if (props.pageNum !== 1) {
        leftButton = <button className="back-button btn btn-outline-secondary" onClick={props.changePage.prev}><i className="fa fa-chevron-left"></i> Back</button>
    }

    if (props.pageNum !== props.totalPages) {
        rightButton = <button className="next-button ml-auto btn btn-info" onClick={props.changePage.next}>Next <i className="fa fa-chevron-right"></i></button>
    } else {
        rightButton = <button className="next-button ml-auto btn btn-success"><i className="fa fa-check"></i> Submit Your Score!</button>
    }

    return (
        <section className="page-footer d-flex py-5 border-top border-secondary">
            {leftButton}
            {rightButton}
        </section>
    )
}

const FormPageFields = (props) => {
    return props.subcategories.map((subcategory, i) => {
        const slug = subcategory.title.replace(/\s+/g, '-').toLowerCase()

        return <FormField
            title={subcategory.title}
            slug={this.slug}
            desc={subcategory.description}
            scale={subcategory.scale}
            key={slug + '_' + i}
        />
    })
}

class FormPage extends React.PureComponent {
    constructor(props) {
        super(props)
        
        this.slug = props.title.replace(/\s+/g, '-').toLowerCase()
    }

    render() {
        return (
            <fieldset className={"form-page mb-5 "+ this.props.active} id={this.slug} data-category-scale={this.props.scale}>
                <h2 className="mb-3 pb-2 border-bottom border-secondary d-flex">{this.props.title} <small className="ml-auto">{this.props.pageNum}/{this.props.totalPages}</small></h2>
                
                <section className="pl-3 pr-3">
                    <FormPageFields subcategories={this.props.subcategories} />
                </section >

                <FooterButtons pageNum={this.props.pageNum} totalPages={this.props.totalPages} changePage={this.props.changePage} />
            </fieldset >
        )
    }
}

class FormFields extends React.Component {
    constructor(props) {
        super(props)

        this.fields = props.fields
        this.changePage = {
            next: this.nextPage.bind(this),
            prev: this.prevPage.bind(this),
        }
        
        this.state = {
            currentPage: 5
        }
    }

    nextPage(e) {
        e.preventDefault()

        document.querySelector('section.body').scrollTop = 0

        this.setState({ currentPage: this.state.currentPage + 1 })
    }
    
    prevPage(e) {
        e.preventDefault()

        document.querySelector('section.body').scrollTop = 0

        this.setState({ currentPage: this.state.currentPage - 1 })
    }

    render() {
        return this.fields.map((category, i) => {
            return <FormPage 
                title={category.title}
                subcategories={category.subcategories}
                desc={category.desc}
                scale={category.scale}
                pageNum={i+1}
                totalPages={fields.length}
                key={i}
                changePage={this.changePage}
                active={this.state.currentPage === i+1 ? 'active' : ''}
            />
        })
}
}

class ScoreForm extends React.Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.submitNewScore = this.submitNewScore.bind(this)

        this.state = {
            modal: true,
            isFilmSubmitted: false,
            isFilmSelected: false,
        }
    }

    submitNewScore = (e) => {
        e.preventDefault()
        const categories = [...e.target.querySelectorAll('fieldset.form-page')]

        console.log(calculateScores(e, categories))
    }

    setFilm = (e) => {
        e.preventDefault()

        this.toggle()

        this.setState({
            isFilmSubmitted: true,
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        })
    }

    handleSearchInput = (e) => {
        e.preventDefault()
        let input = e.target.value


        if (input.length > 2) {
            setTimeout(() => {
                fetch(`http://localhost:8080/films?q=${input}`)
                    .then(data => data.json())
                    .then(data => { this.setState({ suggestions: data }) })
            }, 1000)
        }
    }

    selectFilm = (e) => {
        e.preventDefault()
        document.getElementById('filmTitle').value = (e.target.innerText)
        this.setState({suggestions: []})
        fetch(`http://localhost:8080/films/${e.target.dataset.id}`)
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
            return this.state.suggestions.map( (e) => {
                return <div data-id={e.id} onClick={this.selectFilm.bind(this)} className='film-suggestions__suggestion'>{e.title} <span className='year'>({new Date(e.release_date).getFullYear()})</span></div>
            })
        } else {
            return null
        }
    }

    render() {
        const { isFilmSubmitted, isFilmSelected } = this.state
        
        return (
            <div>
            {isFilmSubmitted ?
                    <form id="newScore__form" className="text-light" onSubmit={this.submitNewScore}>
                        <legend class="mb-5">
                            <h1 className="display-5 text-secondary">New Score</h1>
                            <h2 className="display-2">{this.state.film.title}</h2>
                        </legend>
                        <FormFields fields={fields}/>
                    </form> : ''}

            <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop="static" contentClassName="bg-secondary text-light" className="modal-dialog-centered" id="newScoreModal" tabindex="-1" role="dialog" aria-labelledby="newScoreModalTitle" aria-hidden="true">
                <form className="form" onSubmit={this.setFilm.bind(this)}>
                        <ModalBody>
                                <div className="form-group mb-0">
                                <input type="text" name="name" id="filmTitle" className="form-control border-dark" onChange={this.handleSearchInput} placeholder="Film Title" autocomplete="off" />
                                <div id="film-suggestions">
                                        {this.suggestionsList()}
                                    </div>
                        </div>

                        {isFilmSelected ?
                        <section id="filmPreview">
                            <div className="row mt-4">
                                <div className="col-4">
                                    <img src={this.state.film.poster} alt="Jurassic Park" className="img-fluid" />
                                </div>
                                <div className="col-8">
                                    <h2 className="display-6">{this.state.film.title}</h2>
                                    <div className="small mb-3">{this.state.film.date} | {this.state.film.director}</div>
                                    <p>{this.state.film.excerpt}</p>
                                </div>
                            </div>
                        </section> : ""}
                </ModalBody>

                        {isFilmSelected ?
                        <ModalFooter className="border-dark">
                            <input type="submit" value="Next" className="btn btn-success" />
                        </ModalFooter> : ''}
                                </form>
                    </Modal>
                    </div>
        )
    }
}

export default ScoreForm