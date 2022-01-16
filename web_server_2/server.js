'use strict'

const tableInFile = require('./src/tableinfile.js')

const express = require('express')
const app = express()

// const path = require('path') // use the path module
const fileName = 'users.json'

// use CORS to allow AJAX requests from other web sites
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// get all users
app.get('/users', function (req, res) {
    const users = tableInFile.getTable(fileName)
    if (Object.keys(users).length !== 0) {
        const usersString = JSON.stringify(users)
        res.statusMessage = 'All Ok'
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(usersString)
    } else {
        res.statusMessage = 'file empty'
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('file empty')
    }
})

// get user by id
app.get('/users/:id', function (req, res) {
    const id = parseInt(req.params.id)
    const user = tableInFile.getRec(fileName, id)
    // console.log(user)
    if (Object.keys(user).length !== 0) {
        const userString = JSON.stringify(user)
        res.statusMessage = 'All Ok'
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(userString)
    } else {
        res.statusMessage = 'id not found'
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('id not found')
    }
})

// add a new user
app.post('/users', function (req, res) {
    if (tableInFile.addRec(fileName, req.body)) {
        res.statusMessage = 'All Ok'
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('Record added to table')
    } else {
        res.statusMessage = 'id already exist'
        res.writeHead(403, { 'Content-Type': 'text/html' })
        res.end('id already exist')
    }
})

// update a user by id
app.put('/users/:id', function (req, res) {
    const id = parseInt(req.params.id)
    if (tableInFile.updateRec(fileName, id, req.body)) {
        res.statusMessage = 'All Ok'
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('Record updated')
    } else {
        res.statusMessage = 'id not found'
        res.writeHead(403, { 'Content-Type': 'text/html' })
        res.end('id not found')
    }
})

// delete user by id
app.delete('/users/:id', function (req, res) {
    const id = parseInt(req.params.id)
    if (tableInFile.deleteRec(fileName, id)) {
        res.statusMessage = 'All Ok'
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('Record deleted')
    } else {
        res.statusMessage = 'id not found'
        res.writeHead(403, { 'Content-Type': 'text/html' })
        res.end('id not found')
    }
})

// start server
app.listen(8000, function () {
    console.log('Server listening to port 8000')
})
