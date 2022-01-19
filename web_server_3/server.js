'use strict'

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.static('public_html'))

app.use(express.urlencoded())

app.use(express.json())

app.get('/offices', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from offices ORDER BY officecode ASC', function (offices) {
        const officesJSON = { offices: offices.rows }
        const officesJSONString = JSON.stringify(officesJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(officesJSONString)
    })
})
app.get('/offices/:id', function (request, response) {
    const id = request.params.id
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('SELECT * FROM offices WHERE officecode = $1', [id], function (offices) {
        if (offices.rowCount === 0) {
            response.statusMessage = 'data does not exist'
            response.writeHead(403, { 'Content-Type': 'text/html' })
            response.end('Data does not exist')
        } else {
            const officesJSON = { offices: offices.rows }
            const officesJSONString = JSON.stringify(officesJSON, null, 4)
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(officesJSONString)
        }
    })
})
app.post('/offices', function (request, response) {
    const DB = require('./src/dao')
    const officecode = request.body.officecode
    const city = request.body.city
    const phone = request.body.phone
    const addressline1 = request.body.addressline1
    const addressline2 = request.body.addressline2
    const state = request.body.state
    const country = request.body.country
    const postalcode = request.body.postalcode
    const territory = request.body.territory
    DB.connect()
    DB.connect()
    DB.queryParams('SELECT * FROM offices WHERE officecode = $1', [officecode], function (offices) {
        if (offices.rowCount === 1 || officecode === '') {
            response.statusMessage = 'data already exists'
            response.writeHead(403, { 'Content-Type': 'text/html' })
            response.end('data already exists')
        } else {
            DB.queryParams('INSERT INTO offices (officecode,city,phone,addressline1,addressline2,state,country,postalcode,territory) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
                [officecode, city, phone, addressline1, addressline2, state, country, postalcode, territory], function (offices) {
                    if (offices === 1) {
                        response.statusMessage = 'Please enter valid data'
                        response.writeHead(403, { 'Content-Type': 'text/html' })
                        response.end('Please enter valid data')
                    } else {
                        response.statusMessage = 'office inserted'
                        response.writeHead(200, { 'Content-Type': 'text/html' })
                        // send out a string
                        response.end('office inserted')
                    }
                })
        }
    })
})

app.put('/offices/:id', function (request, response) {
    const DB = require('./src/dao')
    const id = request.params.id
    // const officecode = request.body.officecode
    const city = request.body.city
    const phone = request.body.phone
    const addressline1 = request.body.addressline1
    const addressline2 = request.body.addressline2
    const state = request.body.state
    const country = request.body.country
    const postalcode = request.body.postalcode
    const territory = request.body.territory
    DB.connect()
    DB.connect()
    DB.queryParams('SELECT * FROM offices WHERE officecode = $1', [id], function (offices) {
        if (offices.rowCount === 0) {
            response.statusMessage = 'data does not exist'
            response.writeHead(403, { 'Content-Type': 'text/html' })
            response.end('data does not exists')
        } else {
            DB.queryParams('Update offices set city = $2,phone=$3,addressline1=$4,addressline2=$5,state=$6,country=$7,postalcode=$8,territory=$9 where officecode = $1',
                [id, city, phone, addressline1, addressline2, state, country, postalcode, territory], function (offices) {
                    if (offices === 1) {
                        response.statusMessage = 'Please enter valid data'
                        response.writeHead(403, { 'Content-Type': 'text/html' })
                        response.end('Please enter valid data')
                    } else {
                        response.statusMessage = 'office updated'
                        response.writeHead(200, { 'Content-Type': 'text/html' })
                        // send out a string
                        response.end('office updated')
                    }
                })
        }
    })
})

app.delete('/offices/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('SELECT * FROM offices WHERE officecode = $1', [id], function (offices) {
        if (offices.rowCount === 0) {
            response.statusMessage = 'data does not exist'
            response.writeHead(403, { 'Content-Type': 'text/html' })
            response.end('data does not exist')
        } else {
            DB.queryParams('DELETE from offices WHERE officecode=$1', [id], function (offices) {
                response.statusMessage = 'Office deleted'
                response.writeHead(200, { 'Content-Type': 'text/html' })
                // send out a string
                response.end('office deleted')
            })
        }
    })
})

// start server
app.listen(8000, function () {
    console.log('Server listening to port 8000 using express')
})
