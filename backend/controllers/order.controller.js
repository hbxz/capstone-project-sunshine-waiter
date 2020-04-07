const Joi = require('joi')
const Order = require('../models/order.model')
const { allowedStatus } = require('../models/orderItem.model')
const _ = require('lodash')
const { findRestaurant } = require('./restaurant.controller')
const { createOrderItems } = require('./orderItem.controller')

// present data to client side
const present = (obj) => {
  const { __v, createdBy, ...data } = obj._doc
  return data
}

/*
1. validate input
2. if valid: create new object with input; save it;
3. response 

precond: 
- exist restaurant in DB with req.restaurantId
- on every menuItemId from req.orderItemsData, exist menuItem in DB with such id 
*/
createOrder = async (req, res, next) => {
  try {
    const { placedBy } = req.body
    if (!placedBy)
      throw { resCode: 400, message: 'Request body miss key: placedBy' }
    const restaurant = await findRestaurant(req, res, next)

    const order = new Order({
      placedBy,
      isPaid: false,
      isAllServed: false,
      createdAt: new Date(),
      restaurant: restaurant._id,
      orderItems: [],
    })

    const orderItemIds = await createOrderItems(req, res, next, order)

    order.orderItems = orderItemIds
    await order.save()
    res.status(201).json({ data: present(order) })

    /*
    TODO: emit event of new order placement
    d 
    const orderPlacedEvent = new Event("new order placed", order}) restaurant._id
    orderPlacedEvent.emit()
    */
  } catch (error) {
    next(error)
  }
}

readOrder = async (req, res, next) => {
  try {
    const { orderId: id } = req.params
    const obj = await Order.findById(id)
    if (obj) {
      res.json({ data: obj })
    } else {
      res.status(404).json({ error: `Object ot found. id: ${id}` })
    }
  } catch (error) {
    next(error)
  }
}

// update scope: { name, description }
updatePaymentStatus = async (req, res, next) => {
  try {
    await validateUpdateDataFormat(req.body)

    obj.isPaid = req.body.isPaid
    await obj.save()

    return res.json({
      success: true,
      data: obj,
      message: 'Order updated.',
    })
  } catch (error) {
    next(error)
  }
}

updateServedStatus = async (orderId) => {
  try {
    const order = await Order.findById(orderId)

    await order.orderItems.forEach(async (orderItem) => {
      if (
        orderItem.status != allowedStatus.SERVED &&
        orderItem.status != allowedStatus.FAIL
      ) {
        order.isAllServed = false
        await order.save()
        return { isAllServed: false }
      }
    })

    order.isAllServed = true
    await order.save()
    return { isAllServed: true }
  } catch (error) {
    return error
  }
}

validateUpdateDataFormat = async (body) => {
  const schema = {
    isPaid: Joi.boolean().required(),
  }

  const { error } = Joi.validate(body, schema)
  if (error)
    if (error) return res.status(400).json({ error: error.details[0].message })
}

module.exports = {
  createOrder,
  readOrder,
  updatePaymentStatus,
  updateServedStatus,
}
