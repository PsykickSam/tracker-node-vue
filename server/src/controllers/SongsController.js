const {Song} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const songs = await Song.findAll({ limit: 10 })
            res.send(songs)
        } catch (err) {
            err.status(500).send({
                error: 'An error occured fetching songs.'
            })
        }
    },
    async create (req, res) {
        try {
            const song = await Song.create(req.body)
            res.send(song)
        } catch (err) {
            err.status(500).send({
                error: 'An error occured trying to create a song.'
            })
        }
    }
}