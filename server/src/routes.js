const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

module.exports = (app) => {
    app.post('/login', AuthController.login)
    app.post('/register', AuthControllerPolicy.register, AuthController.register)
}

