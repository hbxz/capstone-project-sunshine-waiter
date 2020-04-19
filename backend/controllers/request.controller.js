const Request = require('../models/request.model')

const { findRestaurant } = require('./restaurant.controller')
const { findOrder } = require('./order.controller')

const _ = require('lodash')
const isValid = require('mongoose').Types.ObjectId.isValid

/*
1. validate input
2. if valid: create new object with input; save it;
3. response 

precond: 
- exist restaurant in DB with req.restaurantId
- on every menuItemId from req.orderItemsData, exist menuItem in DB with such id 
*/

createRequest = async (req, res, next) => {
  try {
    const { tableId } = req.body
    if (!tableId)
      throw { httpCode: 400, message: 'Request body miss key: tableId' }
    const restaurant = await findRestaurant(req)
    const order = await findOrder(req)
    if (!order) throw { httpCode: 400, message: 'Invalid order' }
    if (!order.restaurant.equals(restaurantId))
      throw {
        httpCode: 400,
        message: `request ${requestId} is not in current restaurant!`,
      }

    const request = new Request({
      tableId: tableId,
      order: order._id,
      receiveTime: new Date(),
      restaurant: restaurant._id,
    })
    const requestRecord = await request.save()

    sendRequest(requestRecord) // send to websocket server
    res.status(201)
  } catch (error) {
    next(error)
  }
}

updateRequest = async (restaurantId, { _id: requestId, ...rest }) => {
  try {
    const request = await findRequest(restaurantId, requestId)
    for (let [key, value] of Object.entries(rest)) request[key] = value
    await request.save()
    return { success: true }
  } catch (error) {
    return error
  }
}

findRequest = async (restaurantId, requestId) => {
  if (!requestId || !isValid(requestId))
    return { error: `requestId ${requestId} is not valid` }
  if (!restaurantId || !isValid(restaurantId))
    return { error: `restaurantId ${restaurantId} is not valid` }
  const request = await Request.findById(requestId)
  if (!request) return { error: `Request ${requestId} not found` }
  const order = await Order.findById(request.order)
  if (!order) return { error: `order not found` }
  if (!order.restaurant.equals(restaurantId))
    return { error: `request ${requestId} is not in current restaurant!` }
  return request
}

module.exports = {
  createRequest,
  updateRequest,
}
