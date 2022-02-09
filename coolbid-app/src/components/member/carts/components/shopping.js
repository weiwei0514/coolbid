/* eslint-disable multiline-ternary */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import CartTotal from './CartTotal'

const Shop = styled.div`
  border: #d9d7d7 solid 0.3rem;
  padding: 2rem;
  width: 75%;
  margin: 2rem auto;
  border-radius: 1rem;
  .top {
    display: flex;
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }
  .items {
    .cartTitle {
      display: flex;
      background-color: #d9d7d7;
      .check {
        width: 5%;
        font-size: 2.4rem;
        text-align: center;
        padding: 1rem;
        .checkAll {
          width: 1.8rem;
          height: 1.8rem;
        }
      }
      .info {
        width: 33%;
        font-size: 2.4rem;
        text-align: center;
        padding: 1rem;
      }
      .picInfo {
        width: 15%;
        font-size: 2.4rem;
        text-align: center;
        padding: 1rem;
      }
    }
    .cartItems {
      display: flex;
      border-bottom: #d9d7d7 solid 0.2rem;
      height: 11rem;
      .check {
        width: 5%;
        font-size: 2.4rem;
        text-align: center;
        padding: 1rem;
        .checkEach {
          width: 1.8rem;
          height: 1.8rem;
        }
      }
      .info {
        width: 33%;
        font-size: 2.4rem;
        text-align: center;
        line-height: 10rem;
        svg {
          position: relative;
          top: 0.4rem;
          width: 2.5rem;
          height: 2.5rem;
        }
      }
      .infoProductName {
        margin-top: 1rem;
        a {
          text-decoration: none;
          color: grey;
        }
        a:hover {
          color: #edaf11;
        }
        width: 33%;
        font-size: 2rem;
        text-align: center;
        line-height: 3.2rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
      }
      .picInfo {
        padding: 1rem;
        width: 15%;
        margin-left: 2rem;
        img {
          width: 10rem;
          height: 10rem;
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
    margin: 3rem auto 8rem auto;
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
export default function Shopping(props) {
  const direct = JSON.parse(window.sessionStorage.getItem('direct'))
  const { userinfo } = props
  const [product, setProduct] = useState([])
  const [shopId, setShopId] = useState([])
  // 點選結帳商品個數
  const [totalArray, setTotalArray] = useState([])
  // 點選結帳商品總金額
  const [totPrice, setTotPrice] = useState()
  // 點選到的商品id
  const [productArray, setProductArray] = useState([])
  useEffect(() => {
    let tot = 0
    totalArray.forEach((item) => {
      return (tot += parseInt(item))
    })
    setTotPrice(tot)
  }, [totalArray])

  // 得標商品
  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: '/shopping/' + userinfo.memberId,
      'Content-Type': 'application/json'
    })
      .then((res) => {
        setProduct(res.data)
      })
      .then(() => {
        if (product) {
          axios({
            method: 'get',
            baseURL: 'http://localhost:3001',
            url: '/shop/' + userinfo.memberId,
            'Content-Type': 'application/json'
          }).then((res) => {
            setShopId(res.data)
          })
        }
      })
  }, [userinfo, direct])

  const handleCheckAll = (e) => {
    const eachCheckbox = document.getElementsByName(e.target.name)

    if (e.target.checked) {
      for (let i = 0; i < eachCheckbox.length; i++) {
        eachCheckbox[i].checked = true
      }
    } else {
      for (let i = 0; i < eachCheckbox.length; i++) {
        eachCheckbox[i].checked = false
      }
    }
  }
  // 往競標頁跳轉的Btn
  const handleBackHome = () => {
    window.location.href = 'http://localhost:3000/bidding'
  }
  return (
    <>
      <>
        {product
          ? shopId.map((item, index) => (
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
                    <div className="check">
                      <input
                        onChange={(e) => {
                          handleCheckAll(e)
                        }}
                        className="checkAll"
                        type="checkbox"
                        name={item.shopId}
                      />
                    </div>
                    <div className="picInfo">商品</div>
                    <div className="info">商品名稱</div>
                    <div className="info">結帳期限</div>
                    <div className="info">得標金額</div>
                  </div>
                  <Items
                    setTotalArray={setTotalArray}
                    totalArray={totalArray}
                    shopId={item.shopId}
                    product={product}
                    setTotPrice={setTotPrice}
                    productArray={productArray}
                    setProductArray={setProductArray}
                  />
                </div>
              </Shop>
            ))
          : ''}
      </>
      {product.length ? (
        <CartTotal
          productArray={productArray}
          totalArray={totalArray}
          totPrice={totPrice}
        />
      ) : (
        <Clear>
          <p>目前沒有得標的商品</p>
          <div onClick={handleBackHome}>開始競標</div>
        </Clear>
      )}
    </>
  )
}
function Items(props) {
  const {
    product,
    shopId,
    setBidEvent,
    direct,
    setDirect,
    totalArray,
    setTotalArray,
    setTotPrice,
    productArray,
    setProductArray
  } = props

  // 依商店分類競標商品
  const newProduct = product
    ? product.filter(function (el) {
        return el.shopId === shopId
      })
    : ''
  return (
    <>
      {newProduct.map((item, index) => (
        <Prod
          direct={direct}
          setDirect={setDirect}
          key={index}
          item={item}
          setBidEvent={setBidEvent}
          setTotalArray={setTotalArray}
          totalArray={totalArray}
          setTotPrice={setTotPrice}
          productArray={productArray}
          setProductArray={setProductArray}
        />
      ))}
    </>
  )
}
function Prod(props) {
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))
  const [time, setTime] = useState('剩下0天0時0分0秒結束')
  const {
    item,
    totalArray,
    setTotalArray,
    productArray,
    setProductArray
  } = props
  const countdown = (deadline) => {
    setInterval(function () {
      // 得now date
      const nowTime = new Date()

      // 得到訂單成立時間
      const orderStart = new Date(deadline)

      // 預設倒數七天
      const endDate = orderStart.setDate(orderStart.getDate() + 7)
      // 倒數計時: 差值
      const offsetTime = (endDate - nowTime) / 1000 // ** 以秒為單位
      const day = parseInt(offsetTime / 60 / 60 / 24)
      const hr = parseInt(offsetTime / 60 / 60 - day * 24)
      const min = parseInt((offsetTime / 60) % 60)
      const sec = parseInt(offsetTime % 60)

      setTime(`剩下${day}天${hr}時${min}分${sec}秒`)
    }, 1000)
    return time
  }

  function handleChecked(e, price, id) {
    // 將點選的checkebox存成兩個個陣列
    const newTotal = totalArray.map((item) => item)
    const newProductArray = productArray.map((item) => item)
    // 分別將金額跟producitId存進兩個不同陣列
    const addPrice = price
    const addProduct = id
    if (e.target.checked) {
      newTotal.push(addPrice)
      newProductArray.push(addProduct)
      setTotalArray(newTotal)
      setProductArray(newProductArray)
    } else {
      const index = newTotal.indexOf(addPrice)
      const index2 = newProductArray.indexOf(addProduct)
      newTotal.splice(index, 1)
      newProductArray.splice(index2, 1)
      setTotalArray(newTotal)
      setProductArray(newProductArray)
    }
  }
  return (
    <div className="cartItems">
      <div className="check">
        <input
          onChange={(e) => {
            handleChecked(e, item.nowPrice, item.productId)
          }}
          className="checkEach"
          type="checkbox"
          name={item.shopId}
          value={item.productId}
        />
      </div>
      <div className="picInfo">
        <NavLink to={'/bidding/product/product?=' + item.productId}>
          <img
            style={{ objectFit: 'scale-down' }}
            src={'/imgs/' + item.productId + '.jpg'}
          />
        </NavLink>
      </div>
      <div className="infoProductName">
        <NavLink to={'/bidding/product/product?=' + item.productId}>
          {item.productName}
        </NavLink>
      </div>
      <div className="info">
        <AccessAlarmIcon />
        {countdown(item.endTime)}
      </div>
      <div className="info">
        {currency === 'US' ? 'USD$' : 'NTD$'}
        {currency === 'US' ? Math.floor(item.nowPrice / 30) : item.nowPrice}
      </div>
    </div>
  )
}
