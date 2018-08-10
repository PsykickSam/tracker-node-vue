const {History, Song} = require('../models')
const _ = require('lodash')
module.exports = {
    async all (req, res) {
        try {
            const userId = req.user.id
            const histories = await History.findAll({
                    where: {
                        UserId: userId
                    },
                    include: {
                        model: Song
                    }
                })
                .map(history => history.toJSON())
                .map(history => _.extend({},
                    history.Song,
                    history
                ))
            // res.send(_.uniqBy(histories, history => history.SongId))
            res.send(histories)
        } catch (err) {
            res.status(500).send({
                error: 'An error occured fetching history.'
            })
        }
    },
    async add (req, res) {
        try {
            const userId = req.user.id
            const {songId} = req.body

            const history = await History.create({
                SongId: songId,
                UserId: userId
            })
            res.send(history)
        } catch (err) {
            res.status(500).send({
                error: 'An error occured while adding history'
            })
        }
    }
}