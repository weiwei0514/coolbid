/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import Text from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../style/cart.css'
import swal from 'sweetalert'

const TextField = styled(Text)`
  label {
    font-size: 2rem;
  }
  label + .MuiInput-formControl {
    margin-top: 0.6rem;
  }

  div {
    margin-top: 0;
    font-size: 1.8rem;
    padding: 0;
    div {
      margin-top: 0;
      padding: 0;
    }
    input {
      padding: 0px;
    }
  }
`

const Shop = styled.div`
  border: #d9d7d7 solid 0.3rem;
  padding: 2rem;
  width: 85%;
  margin: 5rem auto;
  border-radius: 1rem;
  .top {
    display: block;
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
  .items {
    .cartTitle {
      display: flex;
      background-color: #d9d7d7;
      .info {
        width: 33%;
        font-size: 2rem;
        text-align: center;
        padding: 1rem;
      }
    }
    .cartItems {
      display: flex;
      border-bottom: #d9d7d7 solid 0.2rem;
      height: 11rem;
      div {
        img {
          width: 10rem;
          height: 10rem;
          object-fit: scale-down;
        }
        padding: 1rem;
      }
      .infoTitle {
        svg {
          width: 2rem;
          height: 2rem;
          position: relative;
          top: 0.3rem;
        }
        width: 33%;
        font-size: 1.8rem;
        text-align: center;
        line-height: 9rem;
        color: grey;
      }
      .infoProductName {
        a {
          text-decoration: none;
          color: grey;
        }
        a:hover {
          color: #edaf11;
        }
        width: 26%;
        font-size: 1.8rem;
        text-align: center;
        line-height: 3.2rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
      }
      .info {
        color: grey;
        width: 24%;
        font-size: 2rem;
        text-align: center;
        line-height: 9rem;
        margin-left: 0;
      }
      .now {
        width: 20%;
        padding-right: 3rem;
      }
      .direct {
        padding-right: 0;
        color: grey;
        margin-top: 11px;
        width: 33%;
        font-size: 2rem;
        text-align: center;
      }
      .bidinfo {
        margin-top: 1rem;
        margin-left: 2rem;
        div {
          padding: 0.6rem;
        }
        line-height: 0.1rem;
        button {
          margin: 0.2rem 0 0.2rem 1rem;
        }
      }
    }
  }
`
const Clear = styled.div`
  margin-top: 10rem;
  p {
    font-size: 3.5rem;
    width: 30%;
    padding: 2rem;
    margin: 3rem auto;
    text-align: center;
  }
  div {
    font-size: 2.5rem;
    width: 8%;
    min-width: 150px;
    margin: 1rem auto;
    text-align: center;
    padding: 0.5rem 1rem;
    border: 0.35rem solid grey;
    border-radius: 0.3rem;
    color: grey;
    cursor: pointer;
  }
  div:hover {
    color: white;
    border: 0.35rem solid #edaf11;
    background-color: #edaf11;
  }
`
function MyPrice(props) {
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))
  const { productId, userinfo, a } = props
  const [price, setPrice] = useState([])
  useEffect(() => {
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/myPrice',
      data: {
        pId: productId,
        mId: userinfo.memberId
      }
    }).then((res) => {
      const myprice = res.data[0]
      setPrice(myprice.bidprice)
    })
  }, [a])

  return (
    <div className="info">
      {currency === 'US' ? 'USD$' : 'NTD$'}
      {currency === 'US' ? Math.floor(price / 30) : price}
    </div>
  )
}
function Timer(props) {
  const { endTime } = props
  const [time, setTime] = useState('??????0???0???0???0?????????')

  // count down
  const getRestTime = (endTime) => {
    setInterval(function () {
      // nowTime
      const nowTime = new Date()
      // endTime
      const end = new Date(endTime)
      // ????????????: ??????
      const offsetTime = (end - nowTime) / 1000 // ** ???????????????
      const day = parseInt(offsetTime / 60 / 60 / 24)
      const hr = parseInt(offsetTime / 60 / 60 - day * 24)
      const min = parseInt((offsetTime / 60) % 60)
      const sec = parseInt(offsetTime % 60)
      setTime(`${day}???${hr}???${min}???${sec}???`)
    }, 1000)
    return time
  }

  return (
    <div className="infoTitle">
      <AccessAlarmIcon />
      {getRestTime(endTime)}
    </div>
  )
}
function Prod(props) {
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))
  const { item, setBidEvent, direct, setDirect } = props
  const [bidPrice, setBidPrice] = useState(item.nowPrice + item.perPrice)
  const [a, setA] = useState(true)
  // ????????????????????????
  const handleBidPrice = (e) => {
    setBidPrice(currency === 'US' ? e.target.value * 30 : e.target.value)
  }
  // ????????????
  const handleSubmitPrice = () => {
    setBidEvent(currency === 'US' ? bidPrice * 30 : bidPrice)
    setA(!a)
    swal({
      title: '????????????',
      text: '??????????????????',
      icon: 'success',
      button: '??????'
    })
    // ??????bidding???????????????
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/bidAgain',
      data: {
        bidAgainPrice: bidPrice,
        memberId: userinfo.memberId,
        productId: item.productId
      }
    })
    // ??????product???????????????
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/nowPrice',
      data: {
        bidAgainPrice: bidPrice,
        productId: item.productId
      }
    })
  }
  // ????????????
  const handleDirect = () => {
    setDirect(!direct)
    window.sessionStorage.setItem('renews', JSON.stringify(!direct))
    // ??????bidding history
    swal({
      title: '?????????????????????',
      text: '??????????????????????????????',
      icon: 'success',
      button: '??????'
    })
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/directPrice',
      data: {
        bidPrice: item.directPrice,
        productId: item.productId,
        memberId: userinfo.memberId
      }
    })
    // ?????? product ??????????????????
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/changeStatus',
      data: {
        bidPrice: item.directPrice,
        productId: item.productId
      }
    })
    // ????????????????????????????????????
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/directBuy',
      data: {
        memberId: userinfo.memberId,
        productId: item.productId
      }
    })
  }
  return (
    <div className="cartItems">
      <div className="info">
        <NavLink to={'/bidding/product/product?=' + item.productId}>
          <img src={'/imgs/' + item.productId + '.jpg'} />
        </NavLink>
      </div>
      <div className="infoProductName title">
        <NavLink to={'/bidding/product/product?=' + item.productId}>
          {item.productName}
        </NavLink>
      </div>
      <Timer endTime={item.endTime} />
      <div className="info now">
        {currency === 'US' ? 'USD$' : 'NTD$'}
        {currency === 'US' ? Math.floor(item.nowPrice / 30) : item.nowPrice}
      </div>
      <MyPrice a={a} userinfo={userinfo} productId={item.productId} />
      <form className="bidinfo">
        <TextField
          label="????????????"
          type="number"
          defaultValue={
            currency === 'US'
              ? Math.floor((item.nowPrice + item.perPrice) / 30)
              : item.nowPrice + item.perPrice
          }
          inputProps={{
            min: `${
              currency === 'US'
                ? Math.floor((item.nowPrice + item.perPrice) / 30)
                : item.nowPrice + item.perPrice
            }`,
            max: `${
              currency === 'US'
                ? Math.floor(item.directPrice / 30)
                : item.directPrice
            }`,
            step: `${
              currency === 'US' ? Math.floor(item.perPrice / 30) : item.perPrice
            }`,
            className: 'bid'
          }}
          onChange={handleBidPrice}
        >
          price
        </TextField>
        <Button
          style={{ width: '10rem' }}
          variant="contained"
          size="small"
          color="primary"
          onClick={handleSubmitPrice}
        >
          ????????????
        </Button>
      </form>
      <div className="direct">
        {currency === 'US' ? 'USD$' : 'NTD$'}
        {currency === 'US'
          ? Math.floor(item.directPrice / 30)
          : item.directPrice}
        <div>
          <Button
            style={{ width: '10rem' }}
            variant="contained"
            size="small"
            color="primary"
            type="submit"
            onClick={handleDirect}
          >
            ????????????
          </Button>
        </div>
      </div>
    </div>
  )
}

function Items(props) {
  const { product, shopId, setBidEvent, direct, setDirect } = props
  // ???????????????????????????
  const newProduct = product.filter(function (el) {
    return el.shopId === shopId
  })
  return (
    <>
      {newProduct.map((item, index) => (
        <Prod
          direct={direct}
          setDirect={setDirect}
          key={index}
          item={item}
          setBidEvent={setBidEvent}
        />
      ))}
    </>
  )
}
export default function Bidding(props) {
  const { userinfo } = props
  const [biddingProduct, setBiddingProduct] = useState([])
  const [product, setProduct] = useState([1])
  const [shopId, setShopId] = useState([])
  // ????????????????????????????????????
  const [bidEvent, setBidEvent] = useState()
  const [direct, setDirect] = useState(false)

  // ????????????????????????ID
  useEffect(() => {
    // ??????????????????????????????
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
        console.log(res.data)
      })
      .then(() => {
        // ?????????????????????(status=?????????)
        if (biddingProduct) {
          axios({
            method: 'get',
            baseURL: 'http://localhost:3001',
            url: '/confirmStatus/' + biddingProduct,
            'Content-Type': 'application/json'
          })
            .then((res) => {
              setProduct(res.data)
            })
            .then(() => {
              axios({
                method: 'get',
                baseURL: 'http://localhost:3001',
                url: '/shopName/' + biddingProduct,
                'Content-Type': 'application/json'
              }).then((res) => {
                setShopId(res.data)
              })
            })
        }
      })
  }, [userinfo, biddingProduct, bidEvent, direct])
  // ?????????????????????Btn
  const handleBackHome = () => {
    window.location.href = 'http://localhost:3000/bidding'
  }

  return (
    <>
      {product.length ? (
        shopId.map((item, index) => (
          <Shop key={index}>
            <div className="top">
              <p>
                {item.shopName}(
                <span>
                  {
                    product.filter(function (el) {
                      return el.shopId === item.shopId
                    }).length
                  }
                </span>
                )
              </p>
            </div>
            <div className="items">
              <div className="cartTitle">
                <div className="info">??????</div>
                <div className="info">????????????</div>
                <div className="info">????????????</div>
                <div className="info">????????????</div>
                <div className="info">????????????</div>
                <div className="info">??????</div>
                <div className="info">?????????</div>
              </div>
              <Items
                setBidEvent={setBidEvent}
                shopId={item.shopId}
                product={product}
                direct={direct}
                setDirect={setDirect}
              />
            </div>
          </Shop>
        ))
      ) : (
        <Clear>
          <p>??????????????????????????????</p>
          <div onClick={handleBackHome}>????????????</div>
        </Clear>
      )}
    </>
  )
}
