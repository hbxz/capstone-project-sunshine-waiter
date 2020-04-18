import React, { Component } from 'react'

import { fetchOrderApi } from '../apis/actions/order'
import { getCookie } from '../authenticate/Cookies'
import { Button, Icon, WingBlank, WhiteSpace } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

import { Table, Typography, Input } from 'antd'
import 'antd/dist/antd.css'

const { Column } = Table
const { Text } = Typography

class OrderCheckout extends Component {
  state = {
    currentOrder: {},
    orderItemsData: [],
    totoalprice: 0,
  }

  componentDidMount = () => {
    this.onFetchCurrentOrder()
  }

  OnSetCurrentOrder = data => {
    console.log('currentorder->', data)
    this.setState({
      currentOrder: data,
      orderItemsData: data.items,
    })
    this.computeTotalPrice()
  }

  onFetchCurrentOrder = async () => {
    const { orderId } = this.props.match.params
    const { id } = this.props.match.params
    await fetchOrderApi(getCookie('token'), id, orderId, this.OnSetCurrentOrder)
  }

  computeTotalPrice() {
    var total = 0
    for (var i = 0; i < this.state.orderItemsData.length; i++) {
      total =
        total +
        this.state.orderItemsData[i].price * this.state.orderItemsData[i].amount
    }
    total = total.toFixed(2)
    this.setState({
      totalPrice: total,
    })
  }

  render() {
    console.log('ordercheckouid->', this.props)

    const { orderId } = this.props.match.params
    return (
      <div>
        <div
          style={{
            fontFamily: 'Times',
            fontSize: '40px',
            position: 'absolute',
            top: '20px',
          }}
        >
          Your order # is :{orderId}
        </div>
        <Table
          style={{
            position: 'absolute',
            top: '200px',
            width: '100%',
          }}
          dataSource={this.state.orderItemsData}
          pagination={false}
          summary={() => {
            return (
              <tr>
                <th>Total</th>
                <td colSpan={2}>
                  <Text strong>{this.state.totalPrice}</Text>
                </td>
              </tr>
            )
          }}
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Amount" dataIndex="amount" key="amount" />
          <Column title="Price" dataIndex="price" key="price" />
        </Table>
      </div>
    )
  }
}

export default OrderCheckout