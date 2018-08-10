const {Bookmark, Song, User} = require('../models')
const _ = require('lodash')
module.exports = {
    async index (req, res) {
        try {
            const userId = req.user.id
            const {songId} = req.query
            const where = {
                UserId: userId
            }
            if (songId) {
                where.SongId = songId
            }
            const bookmark = await Bookmark.findAll({
                where: where,
                include: [
                    {
                        model: Song
                    }
                ]
            })
            .map(bookmark => bookmark.toJSON())
            .map(bookmark => _.extend(
                {},
                bookmark.Song,
                bookmark
            ))
            
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error occured fetching bookmarks. ' . err
            })
        }
    },
    async add (req, res) {
        try {
            const userId = req.user.id
            const {songId} = req.body.params

            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            if (bookmark) {
                return res.status(400).send({
                    error: 'Already have this bookmark set as a bookmark'
                })
            }

            const newBookmark = await Bookmark.create({
                SongId: songId,
                UserId: userId
            })
            res.send(newBookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error occured while adding bookmark'
            })
        }
    },
    async remove(req, res) {
        try {
            const userId = req.user.id
            const {id} = req.params
            const bookmark = await Bookmark.findOne({
                where: {
                    id: id,
                    UserId: userId
                }
            })

            if (!bookmark) {
                return res.status(403).send({
                    error: 'You don\'t have access to bookmark.' 
                })
            }

            await bookmark.destroy()
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error occured while removing bookmark'
            })
        }
    },
    async all(req, res) {
        try {
            const bookmark = await Bookmark.findAll()
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'An error occured fetching bookmarks.'
            })
        }
    },
}