const router = require('express').Router()
const {
  read,
  create,
  update,
  remove,
  readOne,
} = require('../controllers/booking.controller')

router.route('/').get(read).post(create)

router.route('/:_id').get(readOne).put(update).delete(remove)

module.exports = router
