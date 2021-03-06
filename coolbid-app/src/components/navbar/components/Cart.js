/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import styled from '@emotion/styled'
import Tooltip from '@material-ui/core/Tooltip'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'

// styled Components
const ProductDiv = styled.div`
  display: flex;
  justify-content: center;
`
const ProductImg = styled.div`
  width: 12rem;
  height: 12rem;
  margin-right: 1.5rem;
`
const ProductInfo = styled.div`
  .productName {
    font-size: 2.2rem;
    margin-bottom: 0;
    a {
      color: grey;
      text-decoration: none;
    }
    a:hover {
      color: rgb(237, 174, 16);
    }
  }
  .productPrice {
    font-size: 2rem;
    margin-bottom: 0.2rem;
  }
  .seller {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  .seller a {
    color: #555;
  }

  .countdown {
    font-size: 1.6rem;
    margin-top: 0.5rem;
    svg {
      font-size: 2rem;
      position: relative;
      margin-right: 2px;
      top: 3px;
    }
  }
`
const Total = styled.div`
  height: 5rem;
  font-size: 2.5rem;
  line-height: 5rem;
  color: rgb(17, 17, 49);
  display: flex;
  position: relative;
  padding: 0 2rem;
  div {
    position: absolute;
    right: 2rem;
  }
`
const CartNum = styled.span`
  background-color: red;
  border-radius: 50%;
  padding: 0.1rem 0.6rem;
  position: absolute;
  right: 1rem;
  bottom: 3.2rem;
  color: white;
`
const SignIn = styled.div`
  font-size: 3rem;
  padding: 1rem 1.5rem;
  color: grey;
  border: 0.5rem solid grey;
  width: 18rem;
  text-align: center;
  border-radius: 0.6rem;
  font-weight: bold;
  hight: auto;
  margin: 30rem auto;
  cursor: pointer;
  &:hover {
    background-color: #ffc400;
    color: white;
  }
`

// styled Components--End
export function ItemDiv(props) {
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))
  const { data } = props
  const [countDowntime, setCountDownTime] = useState('??????0???0???0???0?????????')
  const handleTimer = (orderDate) => {
    setInterval(() => {
      // ???now date
      const nowTime = new Date()

      // ????????????????????????
      const orderStart = new Date(orderDate)

      // ??????????????????
      const endDate = orderStart.setDate(orderStart.getDate() + 7)

      // ????????????: ??????
      const offTime = (endDate - nowTime) / 1000 // ** ???????????????
      const day = parseInt(offTime / 60 / 60 / 24)
      const hr = parseInt(offTime / 60 / 60 - day * 24)
      const min = parseInt((offTime / 60) % 60)
      const sec = parseInt(offTime % 60)

      setCountDownTime(`??????${day}???${hr}???${min}???${sec}???`)
    }, 1000)
    return countDowntime
  }

  return (
    <ProductDiv>
      <ProductImg>
        <NavLink to={'/bidding/product/product?=' + data.productId}>
          <img
            src={'/imgs/' + data.productId + '.jpg'}
            style={{ objectFit: 'scale-down', height: '100%', width: '100%' }}
          />
        </NavLink>
      </ProductImg>
      <ProductInfo>
        <p
          className="productName"
          style={{
            maxWidth: '200px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
        >
          <NavLink to={'/bidding/product/product?=' + data.productId}>
            {data.productName}
          </NavLink>
        </p>
        <p className="productPrice">
          {currency === 'US' ? 'USD$' : 'NTD$'}
          {currency === 'US' ? Math.floor(data.nowPrice / 30) : data.nowPrice}
        </p>
        <span className="seller">
          {/* ?????????<NavLink to="/seller">{data.sellerId}</NavLink> */}
        </span>
        <p className="countdown">
          <AccessAlarmIcon />
          {handleTimer(data.endTime)}
        </p>
      </ProductInfo>
    </ProductDiv>
  )
}

export default function ShoppingCart(props) {
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))
  const { userinfo } = props
  const [product, setProduct] = useState([])
  const [state, setState] = React.useState({
    right: false
  })
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setState({ ...state, [anchor]: open })
  }
  // ???????????????????????????
  useEffect(() => {
    if (userinfo) {
      axios({
        method: 'get',
        baseURL: 'http://localhost:3001',
        url: '/shopping/' + userinfo.memberId,
        'Content-Type': 'application/json'
      }).then((res) => {
        setProduct(res.data)
      })
    }
  }, [userinfo])
  const handleSignin = () => {
    window.location.href = 'http://localhost:3000/member/signin'
  }
  const list = (anchor) => (
    <div
      style={{ width: '40rem' }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '10px',
            textAlign: 'center'
          }}
        >
          <ShoppingCartIcon
            style={{ fontSize: '3rem', position: 'relative', top: '4px' }}
          />
          ?????????
        </h1>
        <Divider />
        <div style={{ height: '75vh', overflowY: 'scroll', padding: '10px 0' }}>
          {userinfo ? (
            product.length > 0 &&
            product.map((item, index) => <ItemDiv key={index} data={item} />)
          ) : (
            <SignIn onClick={handleSignin}>????????????</SignIn>
          )}
        </div>
      </List>
    </div>
  )

  // ??????????????????
  let tot = 0
  product.length > 0 &&
    product.map((item) => {
      return (tot += parseInt(item.nowPrice))
    })

  // ?????????????????????
  let itemAmount = 0
  product.length > 0 && product.map((item) => (itemAmount += 1))

  // ?????????????????????Btn
  const handleCheckOut = () => {
    window.location.href = '/Shopping/Cart'
  }
  return (
    <React.Fragment key="right">
      <div>
        {itemAmount !== 0 ? <CartNum>{itemAmount}</CartNum> : ''}
        <Tooltip title="ShoppingCart" arrow>
          <ShoppingCartIcon
            onClick={toggleDrawer('right', true)}
            style={{
              fontSize: '3.5rem',
              paddingBottom: '.5rem',
              paddingRight: '2rem'
            }}
          />
        </Tooltip>
      </div>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
        {/* {userinfo ? ( */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            position: 'sticky',
            bottom: '0',
            boxShadow: '0 -5px 5px rgb(0 0 0 / 20%)'
          }}
        >
          <Total>
            Total:
            <div>
              {currency === 'US' ? 'USD$' : 'NTD$'}
              {currency === 'US' ? Math.floor(tot / 30) : tot}
            </div>
          </Total>
          <Button
            onClick={handleCheckOut}
            style={{
              fontSize: '2.2rem',
              borderRadius: '0',
              backgroundColor: '#edae10',
              color: '#fff'
            }}
          >
            ??? ???
          </Button>
        </div>
        {/* // ) : (
          <div />
        // )} */}
      </Drawer>
    </React.Fragment>
  )
}
