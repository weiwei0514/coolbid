/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Bidding from './bidding'
import Wish from './wish'
import axios from 'axios'
import '../style/cart.css'
import creditCard from '../credit-card.svg'
import { NavLink } from 'react-router-dom'

const ShoppingCartContainer = styled.div`
  hieght: auto;
  width: 100%;
  margin-top: 12.5rem;
`
const StepOutter = styled.div`
  width: 80%;
  display: flex;
  margin: 2rem auto;
  .step2 {
    background-color: #ffb802e6;
    color: white;
    border: #f4ab0a 0.3rem solid;
    border-radius: 1rem;
  }
`
const Step = styled.div`
  display: flex;
  padding: 1rem;
  width: 30%;
  text-align: center;
  border: black 0.3rem solid;
  border-radius: 1rem;
  margin: 2rem;
  .number {
    width: 20%;
    font-size: 4.5rem;
  }
  .info {
    font-size: 2rem;
  }
`
const Address = styled.div`
  border: #d9d7d7 solid 0.3rem;
  padding: 3rem;
  width: 60%;
  margin: 2rem auto;
  border-radius: 1rem;
  .myAddress {
    font-size: 3rem;
    color: grey;
  }
  .shippingInfo {
    font-size: 2.4rem;
    width: 70%;
    position: relative;
    .shippingInfodiv {
      display: flex;
      margin-left: 15rem;
      margin-top: 1rem;
    }
    .shippingTitle {
      width: 10rem;
      letter-spacing: 1.5rem;
    }
    input {
      position: relative;
      top: 5px;
    }
  }
`
const Payment = styled.div`
  border: #d9d7d7 solid 0.3rem;
  padding: 3rem;
  width: 60%;
  margin: 2rem auto;
  border-radius: 1rem;
  .myCard {
    font-size: 3rem;
    color: grey;
  }
  .cardBidDiv {
    display: flex;
    .cardDiv {
      margin-top: 3rem;
      position: relative;
      color: white;
      width: 500px;
      font-family: 'Karla', 'sans-serif';
      .bankName {
        font-size: 2.5rem;
        font-weight: bold;
        top: 3rem;
        right: 2rem;
        position: absolute;
      }
      .bankNum {
        font-size: 3.2rem;
        letter-spacing: 2px;
        top: 15rem;
        right: 11rem;
        position: absolute;
      }
      .safeNum {
        font-size: 2.2rem;
        top: 20rem;
        right: 41.5rem;
        position: absolute;
      }
      .expired {
        font-size: 2.4rem;
        top: 20.9rem;
        right: 6.5rem;
        position: absolute;
      }
      .cardUser {
        font-size: 3rem;
        top: 23.5rem;
        right: 25rem;
        font-weight: bold;
        position: absolute;
      }
    }
    .cardInfo {
      padding: 4rem;
      width: 40%;
      .cardInfodiv {
        display: flex;
      }
      input {
        width: 80%;
        position: relative;
        top: 15px;
      }
      .cardTitle {
        font-size: 2.4rem;
        width: 22rem;
        letter-spacing: 1rem;
        position: relative;
        top: 10px;
      }
    }
  }
`
const ConfirmContainer = styled.div`
  height: 5rem;
  display: flex;
  padding: 3rem;
  width: 60%;
  margin: 1rem auto;
  position: relative;
  .right {
    right: 0;
    top: 0;
  }
  .left {
    left: 0;
    top: 0;
  }
  .confirmBtn {
    border-radius: 0.8rem;
    width: 15%;
    border: solid 0.3rem grey;
    padding: 1rem;
    font-size: 2.4rem;
    position: absolute;
    text-align: center;
    cursor: pointer;
    bottom: 5rem;
  }
  .confirmBtn:hover {
    border: solid 0.3rem #f2c480;
    background-color: #fecb68;
    color: white;
  }
`
export default function Checkout() {
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  const orderProduct = JSON.parse(window.sessionStorage.getItem('orderProduct'))

  const [address, setAddress] = useState()
  const [bankName, setBankName] = useState('Bank of America')
  const [bankNum, setBankNum] = useState('0123 4567 8923 8765')
  const [expired, setExpired] = useState('02/02')
  const [owner, setOwner] = useState('CHEN WEI TING')
  axios({
    method: 'get',
    baseURL: 'http://localhost:3001',
    url: '/address/' + userinfo.memberId,
    'Content-Type': 'application/json'
  }).then((res) => {
    // console.log(res)
    if (res.data.length) {
      setAddress(res.data[0].address)
    } else {
      setAddress('')
    }
  })
  useEffect(() => {
    // 創建訂單
    const products = '(' + orderProduct.toString() + ')'
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/order',
      data: {
        products: products
      }
    }).then((res) => {
      console.log(res.data)
      axios({
        method: 'post',
        baseURL: 'http://localhost:3001',
        url: '/orderInfo',
        data: {
          data: res.data,
          memberId: userinfo.memberId
        }
      }).then((res) => {
        console.log(res.data)
        axios({
          method: 'post',
          baseURL: 'http://localhost:3001',
          url: '/orderCreate',
          data: {
            data: res.data
          }
        })
      })
    })
  }, [orderProduct])

  const handleBankName = (e) => {
    setBankName(e.target.value)
  }
  const handleBankNum = (e) => {
    setBankNum(e.target.value)
  }
  const handleExpired = (e) => {
    setExpired(e.target.value)
  }
  const handleOwner = (e) => {
    setOwner(e.target.value)
  }
  return (
    <ShoppingCartContainer>
      <div className="active-tabs">
        <input
          type="radio"
          name="active_tabs"
          id="btn-1"
          className="input btn-1"
          checked
        />
        <label htmlFor="btn-1" className="btn">
          <i className="fa fa-shopping-cart"></i>
          購物車
        </label>
        <input
          type="radio"
          name="active_tabs"
          id="btn-2"
          className="input btn-2"
        />
        <label htmlFor="btn-2" className="btn">
          <i className="fa fa-gavel" />
          競標中
        </label>

        <input
          type="radio"
          name="active_tabs"
          id="btn-3"
          className="input btn-3"
        />
        <label htmlFor="btn-3" className="btn">
          <i className="fa fa-heart"></i> 收藏清單
        </label>

        <div className="tabs-container">
          <div className="tab-1">
            <StepOutter>
              <Step className="step1">
                <div className="number">
                  <span className="stepNum">01</span>
                </div>
                <div className="info">
                  <p className="line">確認清單及選擇付款方式</p>
                  <p className="line">Cart &amp; Check out</p>
                </div>
              </Step>
              <Step className="step2">
                <div className="number">
                  <span className="stepNum">02</span>
                </div>
                <div className="info">
                  <p className="line">填寫訂購資料</p>
                  <p className="line">Shipping &amp; Biling info</p>
                </div>
              </Step>
              <Step className="step3">
                <div className="number">
                  <span className="stepNum">03</span>
                </div>
                <div className="info">
                  <p className="line">購物完成！</p>
                  <p className="line">Order completed</p>
                </div>
              </Step>
            </StepOutter>
            <Address>
              <p className="myAddress">收貨資訊</p>
              <div className="shippingInfo">
                <div className="shippingInfodiv">
                  <div className="shippingTitle">全名</div>
                  <input
                    defaultValue={userinfo.lastName + userinfo.firstName}
                    type="text"
                    className="infoShipping"
                  />
                </div>
                <div className="shippingInfodiv">
                  <div className="shippingTitle">手機</div>
                  <input
                    defaultValue={userinfo.phone}
                    type="text"
                    className="infoShipping"
                  />
                </div>
                <div className="shippingInfodiv">
                  <div className="shippingTitle">地址</div>
                  <input
                    defaultValue={address}
                    type="text"
                    className="infoShipping"
                  />
                </div>
              </div>
            </Address>
            <Payment>
              <p className="myCard">我的卡號</p>
              <div className="cardBidDiv">
                <div className="cardDiv">
                  <img src={creditCard} />
                  {/* Bank of America */}
                  <div className="bankName">{bankName}</div>
                  <div className="bankNum">{bankNum}</div>
                  <div className="safeNum">103</div>
                  <div className="expired">{expired}</div>
                  <div className="cardUser">{owner}</div>
                </div>
                <div className="cardInfo">
                  <div className="cardInfodiv">
                    <div className="cardTitle">銀行名稱</div>
                    <input
                      defaultValue="Bank of America"
                      onChange={handleBankName}
                      type="text"
                      className="infoShipping"
                    />
                  </div>
                  <div className="cardInfodiv">
                    <div className="cardTitle">銀行卡號</div>
                    <input
                      defaultValue="0123 4567 8923 8765"
                      onChange={handleBankNum}
                      type="text"
                      className="infoShipping"
                    />
                  </div>
                  <div className="cardInfodiv">
                    <div className="cardTitle">有效期限</div>
                    <input
                      defaultValue="02/02"
                      onChange={handleExpired}
                      type="text"
                      className="infoShipping"
                    />
                  </div>

                  <div className="cardInfodiv">
                    <div className="cardTitle">持卡人</div>
                    <input
                      onChange={handleOwner}
                      defaultValue="CHEN WEI TING"
                      type="text"
                      className="infoShipping"
                    />
                  </div>
                </div>
              </div>
            </Payment>
            <ConfirmContainer>
              <NavLink style={{ color: 'grey' }} to="/completeOrder">
                <div className="confirmBtn right">確認結帳</div>
              </NavLink>
              <NavLink style={{ color: 'grey' }} to="/Shopping/WishList">
                <div className="confirmBtn left">回上一頁</div>
              </NavLink>
            </ConfirmContainer>
          </div>
          <div className="tab-2">
            <p>
              <Bidding userinfo={userinfo} />
            </p>
          </div>
          <div className="tab-3">
            <Wish userinfo={userinfo} />
          </div>
        </div>
      </div>
    </ShoppingCartContainer>
  )
}
