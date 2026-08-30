const express = require("express")
const dotenv = require("dotenv")
const router = express.Router()
const {register , getAllUsers} = require('./controller/register')
dotenv.config()
const app = express()
app.use(express.json())

router.post('/register', register)
router.get('/register', getAllUsers)

app.get('/', (req, res) => {
  res.send('API running...')
})

module.exports = router
