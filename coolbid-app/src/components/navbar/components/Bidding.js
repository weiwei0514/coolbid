/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import styled from '@emotion/styled'
import Tooltip from '@material-ui/core/Tooltip'
import GavelIcon from '@material-ui/icons/Gavel'
import TextField from '@material-ui/core/TextField'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'

// styled Components
const ProductDiv = styled.div`
  display: flex;
  justify-content: center;
`
const ProductImg = styled.div`
  width: 15rem;
  height: 15rem;
  margin-right: 1.5rem;
`
const ProductInfo = styled.div`
  padding: 1rem;
  .productName {
    font-size: 2.2rem;
    margin-bottom: 0rem;
  }
  a {
    color: grey;
    text-decoration: none;
  }
  a:hover {
    color: rgb(237, 174, 16);
  }
  p {
    font-size: 1.4rem;
  }
`
const CartNum = styled.span`
  background-color: red;
  border-radius: 50%;
  padding: 0.1rem 0.6rem;
  position: absolute;
  right: 6.5rem;
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

function ProductDiv1(props) {
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))
  const [time, setTime] = useState('剩下0天0時0分0秒結束')
  const { data } = props
  const [newPrice, setNewPrice] = useState([])

  const getRestTime = (deadline) => {
    setInterval(function () {
      // nowTime
      const nowTime = new Date()
      // endTime
      const endTime = new Date(deadline)

      // 倒數計時: 差值
      const offsetTime = (endTime - nowTime) / 1000 // ** 以秒為單位
      const day = parseInt(offsetTime / 60 / 60 / 24)
      const hr = parseInt(offsetTime / 60 / 60 - day * 24)
      const min = parseInt((offsetTime / 60) % 60)
      const sec = parseInt(offsetTime % 60)

      setTime(`剩下${day}天${hr}時${min}分${sec}秒`)
    }, 1000)
    return time
  }
  const bidAgain = () => (data.directPrice = newPrice)

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
        <NavLink
          className="productName"
          to={'/bidding/product/product?=' + data.productId}
        >
          <p
            style={{
              maxWidth: '200px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {data.productName}
          </p>
        </NavLink>
        <p>
          最高出價：
          <span>{currency === 'US' ? 'USD$' : 'NTD$'}</span>
          {currency === 'US' ? Math.floor(data.nowPrice / 30) : data.nowPrice}
        </p>
        <p>
          目前出價：
          <span>{currency === 'US' ? 'USD$' : 'NTD$'}</span>
          {currency === 'US'
            ? Math.floor(data.directPrice / 30)
            : data.directPrice}
        </p>
        <TextField
          id="standard-number"
          label="再次出價"
          type="number"
          defaultValue={data.nowPrice + data.perPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          inputProps={{ min: `${data.nowPrice + data.perPrice}` }}
          style={{ display: 'block' }}
        />
        <Button
          style={{ margin: '1rem .5rem .5rem 0' }}
          variant="contained"
          size="small"
          color="primary"
        >
          直接購買
        </Button>
        <Button
          style={{ margin: '1rem 0 .5rem 0' }}
          variant="contained"
          size="small"
          color="primary"
          onClick={bidAgain}
        >
          確認出價
        </Button>
        <p id="countdown">
          <AccessAlarmIcon />
          {getRestTime(data.endTime)}
        </p>
      </ProductInfo>
    </ProductDiv>
  )
}

export default function Bidding(props) {
  const renews = JSON.parse(window.sessionStorage.getItem('renews'))
  const { userinfo } = props
  const [biddingProduct, setBiddingProduct] = useState()
  const [product, setProduct] = useState([])
  useEffect(() => {
    if (userinfo) {
      axios({
        method: 'get',
        baseURL: 'http://localhost:3001',
        url: '/bidding/' + userinfo.memberId,
        'Content-Type': 'application/json'
      })
        .then((res) => {
          let bP = res.data.map((item) => item.productId)
          bP = '(' + bP.toString() + ')'
          setBiddingProduct(bP)
        })
        .then(() => {
          // 篩選競標中商品
          if (biddingProduct) {
            axios({
              method: 'get',
              baseURL: 'http://localhost:3001',
              url: '/confirmStatus/' + biddingProduct,
              'Content-Type': 'application/json'
            }).then((res) => {
              setProduct(res.data)
            })
          }
        })
    }
  }, [userinfo, biddingProduct, renews])

  // 購物車商品數量
  let itemAmount = 0
  product.length > 0 && product.map((item) => (itemAmount += 1))

  const [state, setState] = React.useState({
    right: false
  })

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ [anchor]: open })
  }
  const handleSignin = () => {
    window.location.href = 'http://localhost:3000/member/signin'
  }
  const list = (anchor) => (
    <div style={{ width: '40rem' }}>
      <List>
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '10px',
            textAlign: 'center'
          }}
        >
          <GavelIcon
            style={{ fontSize: '3rem', position: 'relative', top: '4px' }}
          />
          競標中
        </h1>
        <Divider />
        {userinfo ? (
          product.length > 0 &&
          product.map((item, index) => <ProductDiv1 key={index} data={item} />)
        ) : (
          <SignIn onClick={handleSignin}>請先登入</SignIn>
        )}
      </List>
    </div>
  )

  return (
    <React.Fragment key="right">
      <div>
        {itemAmount !== 0 ? <CartNum>{itemAmount}</CartNum> : ''}
        <Tooltip title="Bidding" arrow>
          <GavelIcon
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
      </Drawer>
    </React.Fragment>
  )
}
