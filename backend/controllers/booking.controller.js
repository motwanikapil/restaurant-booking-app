const Booking = require('../models/booking.model')

const LIMIT = 10
const SKIP = 0

async function read(req, res) {
  try {
    const { limit, skip } = req.query

    const bookings = await Booking.find({})
      .limit(limit ?? LIMIT)
      .skip(skip ?? SKIP)

    if (!bookings)
      return res.status(404).json({ message: 'Bookings not found' })

    res.status(200).json({ bookings })
  } catch (error) {
    console.error(error)
  }
}

async function readOne(req, res) {
  try {
    const { _id } = req.params

    const booking = await Booking.findOne({ _id })

    if (!booking) return res.status(400).json({ message: 'Booking not found' })

    res.status(200).json({ booking })
  } catch (error) {
    console.error(error)
  }
}

async function create(req, res) {
  try {
    const { name, email, mobile, guests, startTime, endTime } = req.body
    if (!name || !email || !mobile || !guests || !startTime || !endTime) {
      return res.status(400).json({ message: 'Missing Details' })
    }

    const booking = await Booking.create(req.body)

    res
      .status(201)
      .json({ message: 'Booking created', id: booking._id.toString() })
  } catch (error) {
    console.error(error)
  }
}

async function update(req, res) {
  try {
    const { _id } = req.params
    const { name, email, mobile, guests, startTime, endTime } = req.body

    if (!name && !email && !mobile && !guests && !startTime && !endTime) {
      return res.status(400).json({ message: 'No details sent' })
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id },
      { $set: req.body }
    )

    if (!updatedBooking)
      return res.status(404).json({ message: 'Booking not found' })

    return res.status(200).json({ message: 'Booking updated' })
  } catch (error) {
    console.error(error)
  }
}

async function remove(req, res) {
  try {
    const { _id } = req.params

    const deletedBooking = await Booking.findOneAndDelete({ _id })

    if (!deletedBooking)
      return res.status(404).json({ message: 'Booking not found' })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { read, create, update, remove, readOne }
