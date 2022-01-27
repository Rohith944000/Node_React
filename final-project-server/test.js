'use strict'

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded())

app.use(express.json())

// To get all tracks from data base
app.get('/tracks', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('select track.*, playlist.title AS playlist from track left join playlist on track.playlist_id = playlist.id order by track.id asc', function (tracks) {
        const tracksJSON = { tracks: tracks.rows }
        const tracksJSONString = JSON.stringify(tracksJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(tracksJSONString)
    })
})
// To get all playlist from data base
app.get('/playlists', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('select title from playlist order by id asc', function (playlist) {
        const playlistJSON = { playlist: playlist.rows }
        const playlistJSONString = JSON.stringify(playlistJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(playlistJSONString)
    })
})

// Insert data into tracks table
app.post('/tracks', function (request, response) {
    const DB = require('./src/dao')
    const playlistId = request.body.playlist_id
    const title = request.body.title
    const uri = request.body.uri
    const masterId = request.body.master_id
    DB.connect()
    DB.queryParams('INSERT INTO track (playlist_id, title, uri, master_id) VALUES ($1,$2,$3,$4)',
        [playlistId, title, uri, masterId], function (offices) {
            if (offices === 1) {
                response.statusMessage = 'Please enter valid data'
                response.writeHead(403, { 'Content-Type': 'text/html' })
                response.end('Please enter valid data')
            } else {
                response.statusMessage = 'track inserted'
                response.writeHead(200, { 'Content-Type': 'text/html' })
                // send out a string
                response.end('track inserted')
            }
        })
})

// Delete track from track table
app.delete('/tracks/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('SELECT * FROM track WHERE id = $1', [id], function (tracks) {
        if (tracks.rowCount === 0) {
            response.statusMessage = 'data does not exist'
            response.writeHead(403, { 'Content-Type': 'text/html' })
            response.end('data does not exist')
        } else {
            DB.queryParams('DELETE from track WHERE id = $1', [id], function (tracks) {
                response.statusMessage = 'track deleted'
                response.writeHead(200, { 'Content-Type': 'text/html' })
                // send out a string
                response.end('track deleted')
            })
        }
    })
})

app.listen(8000, function () {
    console.log('Server listening to port 8000 using express')
})
