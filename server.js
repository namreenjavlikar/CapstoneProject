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
import nodemailer from 'nodemailer'

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

let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "dms-q-system@outlook.com",
        pass: "12class34"
    }
});

import jwt from 'express-jwt'
import { sign } from 'jsonwebtoken'
import bcrypt from "bcryptjs"

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
        const user = await db.collection('users').findOne({ _id: req.body._id })
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, check) => {
                if (check) {
                    result = { user, token: sign(user, secret) }
                    console.log('login result', result)
                }
                res.json(result)
                io.emit('token', result)
            })
        } else {
            res.json(result)
        }
    })

    app.get('/auth/logout', async (req, res) => {
        console.log('logout')
        res.json(null)
        io.emit('token', null)
    })
}
setAuth()

// check token on all routes except for: auth and GET's
//app.use(jwt({ secret }).unless({ method: ['GET'], path: ['/auth/register', '/auth/login', '/auth/reset/:username/:key',  '/'] }))

// routes
const setRoutes = async (collection) => {

    const db = await connection()
    const url = '/api/' + collection

    // custom queries first
    if (collection === 'users') {

        // find users by username
        app.get(url + '/username/:_id', async (req, res) => {
            const results = await db.collection(collection).find({ _id: req.params._id }).toArray()
            res.json(results[0])
        })

        app.get(url + '/email/:email', async (req, res) => {
            const results = await db.collection(collection).find({ email: req.params.email }).toArray()
            res.json(results[0])
        })
        

        app.get(url + '/resetpassword/:email/:key/:username', async (req, res) => {
            let mailOptions = {
                from: 'dms-q-system@outlook.com',
                to: req.params.email,
                subject: 'Reset Password',
                html: "<a href='http://localhost:3000/auth/reset/" + req.params.username + "/" + req.params.key + "'>Click here to Reset</a>"
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error)
                }
                return console.log('Message sent')
            })
            res.json({ "success": true })
        })

        app.get(url + '/email/:email/:key/:username', async (req, res) => {
            let mailOptions = {
                from: 'dms-q-system@outlook.com',
                to: req.params.email,
                subject: 'Activate Account',
                html: "<a href='http://localhost:3000/auth/reset/" + req.params.username + "/" + req.params.key + "'>Click here to activate</a>"
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error)
                }
                return console.log('Message sent')
            })
            res.json({ "success": true })
        })

        
    }

    const url_id = url + '/:_id'

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

    app.put(url_id, async (req, res) => {
        req.body._id = collection == 'users' ? req.params._id : new ObjectId(req.params._id)
        const results = await db.collection(collection).replaceOne({ _id: req.body._id }, req.body)
        emitFindAll(collection)
        emitFindAll(collection + '/' + req.params._id)
        res.json(results)
    })


}

setRoutes('users')