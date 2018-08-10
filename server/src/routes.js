const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoryController = require('./controllers/HistoryController')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
    app.post('/login', AuthController.login)
    app.post('/register', AuthControllerPolicy.register, AuthController.register)
    
    app.get('/songs', SongsController.index)
    app.get('/songs/:id', SongsController.show)
    app.post('/songs', SongsController.create)
    app.put('/songs/:id', SongsController.update)
    
    app.get('/all/bookmarks', isAuthenticated, BookmarksController.all)
    app.get('/bookmarks', isAuthenticated, BookmarksController.index)
    app.post('/bookmarks', isAuthenticated, BookmarksController.add)
    app.delete('/bookmarks/:id', isAuthenticated, BookmarksController.remove)
    
    app.get('/history', isAuthenticated, HistoryController.all)
    app.post('/history', isAuthenticated, HistoryController.add)
}
