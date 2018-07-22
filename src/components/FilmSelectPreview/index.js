import React, { Component } from 'react'

export class FilmSelectPreview extends Component {
  render() {
    return (
        <section id="filmPreview">
            <div className="row mt-4">
                <div className="col-4">
                    <img src={this.props.film.poster} alt="Jurassic Park" className="img-fluid" />
                </div>
                <div className="col-8">
                    <h2 className="display-6">{this.props.film.title}</h2>
                    <div className="small mb-3">{this.props.film.date} | {this.props.film.director}</div>
                    <p>{this.props.film.excerpt}</p>
                </div>
            </div>
        </section>
    )
  }
}

export default FilmSelectPreview
