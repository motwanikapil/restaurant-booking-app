require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const bookingRoutes = require('./routes/booking.routes')

const app = express()

const { PORT, MONGODB_URL, FRONTEND_URL } = process.env

app.use(
  cors({
    origin: FRONTEND_URL,
  })
)
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/booking', bookingRoutes)

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Database connected successfully')
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`)
    })
  })
  .catch(console.log)
