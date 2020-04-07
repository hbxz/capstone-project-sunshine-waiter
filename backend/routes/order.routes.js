const express = require('express')
const router = express.Router()

const { verifyAuthToken } = require('../auth/authentication')
const {
  scopes,
  actions,
  resources,
  allowIfLoggedin,
  requestAccess,
} = require('../auth/authorization')

const {
  createOrder,
  readOrder,
  // updateOrder,
  // readMany,
} = require('../controllers/order.controller')

// order CRUD

// public access ( customer dosen't need to login/register )
router.post('/:restaurantId/orders/', createOrder)
router.get('/:restaurantId/orders/:orderId', readOrder)

// owner/manager access
router.get(
  '/:restaurantId/orders/',
  verifyAuthToken,
  allowIfLoggedin,
  requestAccess(scopes.restaurant, actions.update, resources.update), // readMany is for order management.
  readMany
)

// router.put(
//   '/:restaurantId/orders/:orderId',
//   verifyAuthToken,
//   allowIfLoggedin,
//   requestAccess(scopes.restaurant, actions.update, resources.order),
//   updateOrder
// )

module.exports = router
