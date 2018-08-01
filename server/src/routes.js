const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const SongsController = require('./controllers/SongsController')

module.exports = (app) => {
    app.post('/login', AuthController.login)
    app.post('/register', AuthControllerPolicy.register, AuthController.register)
    
    app.get('/songs', SongsController.index)
    app.get('/songs/:id', SongsController.show)
    app.post('/songs', SongsController.create)
    app.put('/songs/:id', SongsController.update)
}

