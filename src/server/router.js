const express = require('express')
const mw = require('./middleware.js')

class FilmscoreRouter {
    constructor(app) {
        this.app = app

        this.scoresRouter()
        this.usersRouter()
        this.filmsRouter()
    }

    scoresRouter() {
        let scoresRouter = express.Router()
        scoresRouter.get('/:id', mw.GET_query({ table: 'scores', by: 'id' }), (req, res) => { mw.GET_return(req, res) })
        scoresRouter.post('/', (req, res) => { })
        scoresRouter.delete('/:id', (req, res) => { })
        this.app.use('/scores', scoresRouter)
    }
    
    filmsRouter() {
        let filmsRouter = express.Router()
        filmsRouter.get('/:id', mw.GET_query({ table: 'films' }), (req, res) => { mw.GET_return(req, res) })
        filmsRouter.get('/:id/scores', mw.GET_query({ table: 'scores', by: 'film_id' }), (req, res) => { mw.GET_return(req, res) })
        this.app.use('/films', filmsRouter)
    }

    usersRouter() {
        let usersRouter = express.Router()
        usersRouter.get('/:id', mw.GET_query({ table: 'users' }), (req, res) => { mw.GET_return(req, res) })
        usersRouter.get('/:id/scores', mw.GET_query({ table: 'scores', by: 'user_id' }), (req, res) => { mw.GET_return(req, res) })
        usersRouter.post('/', (req, res) => { })
        usersRouter.delete('/:id', (req, res) => { })
        this.app.use('/users', usersRouter)
    }
}

module.exports = {
    router: app => { new FilmscoreRouter(app) }
}