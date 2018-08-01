const {Song} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const songs = await Song.findAll({ order: [['id', 'DESC']], limit: 10 })
            res.send(songs)
        } catch (err) {
            err.status(500).send({
                error: 'An error occured fetching songs.'
            })
        }
    },
    async show(req, res) {
        try {
            const song = await Song.findById(req.params.id)
            res.send(song)
        } catch (err) {
            err.status(500).send({
                error: 'An error occured show the song.'
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
    },
    async update (req, res) {
        try {
            const song = await Song.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.send(req.body)
        } catch (err) {
            err.status(500).send({
                error: 'An error occured trying to update the song.'
            })
        }
    }
}