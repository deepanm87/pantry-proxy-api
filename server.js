const express = require('express')
const axios = require('axios')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const PANTRY_ID = process.env.PANTRY_ID

const PANTRY_API_BASE_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket`

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/:basketName', async (req, res) => {
    const {basketName} = req.params
    try {
        const response = await axios.get(`${PANTRY_API_BASE_URL}/${basketName}`)
        res.json(response.data)
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})

app.post('/:basketName', async (req, res) => {
    const {basketName} = req.params
    const newData = req.body
    try {
        const response = await axios.post(`${PANTRY_API_BASE_URL}/${basketName}`, newData)
        res.json(response.data)
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})

app.put('/:basketName', async (req, res) => {
    const {basketName} = req.params
    const newData = req.body
    try {
        const response = await axios.put(`${PANTRY_API_BASE_URL}/${basketName}`, newData)
        res.json(response.data)
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})

app.delete('/:basketName', async (req, res) => {
    const {basketName} = req.params
    try {
        const response = await axios.get(`${PANTRY_API_BASE_URL}/${basketName}`)
        res.json({ message: `Basket ${basketName} cleared successfully.`})
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})