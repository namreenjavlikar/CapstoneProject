import fetch from 'node-fetch'
const port = 3001
const fetchHost = 'http://localhost:' + port + '/api/'

import { MongoClient, ObjectId } from 'mongodb'

const connection = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017')
    return client.db('capstone')
}

import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.set('port', port)

import { Server } from 'http'
import SocketIO from 'socket.io'

const server = Server(app)
const io = SocketIO(server)

server.listen(app.get('port'), () => {
    console.log("Listening on http://localhost:" + app.get('port'))
})

io.on('connection', socket => {
    socket.on('disconnect', () => console.log('disconnected'))
    socket.on('token', token => fetchOptions.headers.authorization = 'Bearer ' + token)
    socket.on('findAll', collection => collection !== 'token' && emitFindAll(collection))
})

let fetchOptions = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
const emitFindAll = async (collection) => {
    console.log('url = ', collection)
    const response = await fetch(fetchHost + collection, fetchOptions)
    const json = await response.json()
    console.log('emitFindAll result:', json)
    io.emit(collection, json)
}

import jwt from 'express-jwt'
import { sign } from 'jsonwebtoken'
const secret = 'abc'

const setAuth = async () => {
    const db = await connection()
    // register = add username and password to db
    app.post('/auth/register', async (req, res) => {
        const user = await db.collection('users').insertOne(req.body)
        res.json(user)
    })

    // login = check username and password in db and return token containing user data and token string
    app.post('/auth/login', async (req, res) => {
        let result = null
        const user = await db.collection('users').findOne({ _id: req.body._id, password: req.body.password })
        if (user) {
            result = { user, token: sign(user, secret) }
        }
        console.log('login result', result)
        res.json(result)
        io.emit('token', result)
    })

    app.get('/auth/logout', async (req, res) => {
        console.log('logout')
        res.json(null)
        io.emit('token', null)
    })
}
setAuth()

// check token on all routes except for: auth and GET's
app.use(jwt({ secret }).unless({ method: ['GET'], path: ['/auth/register', '/auth/login', '/'] }))

// routes
const setRoutes = async (collection) => {

    const db = await connection()
    const url = '/api/' + collection

    // custom queries first
    if (collection === 'users') {
        // find users by username
        app.get(url + '/username/:_id', async (req, res) => {
            const results = await db.collection(collection).find({ name: req.params._id }).toArray()
            res.json(results)
        })
    }

    app.get(url, async (req, res) => {
        const results = await db.collection(collection).find().toArray()
        res.json(results)
    })
    app.post(url, async (req, res) => {
        console.log(req.body)
        const results = await db.collection(collection).insertOne(req.body)
        emitFindAll(collection)
        res.json(results)
    })

}

setRoutes('users')