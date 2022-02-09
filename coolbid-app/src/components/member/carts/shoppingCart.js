/* eslint-disable space-before-function-paren */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import StepContainer from './components/stepContainer'
import Shopping from './components/shopping'
import Bidding from './components/bidding'
import Wish from './components/wish'
import './style/cart.css'
const ShoppingCartContainer = styled.div`
  width: 100%;
  margin-top: 12.5rem;
`

export default function ShoppingCart(props) {
  const cart = props.data.params.cart
  console.log(cart)
  const [checked, setChecked] = useState(true)
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  return (
    <ShoppingCartContainer>
      <div className="active-tabs">
        <input
          type="radio"
          name="active_tabs"
          id="btn-1"
          className="input btn-1"
          defaultChecked={cart === 'Cart' ? 'checked' : ''}
          onChange={() => {
            setChecked(!checked)
          }}
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
          defaultChecked={cart === 'WishList' ? 'checked' : ''}
        />
        <label htmlFor="btn-3" className="btn">
          <i className="fa fa-heart"></i> 收藏清單
        </label>

        <div className="tabs-container">
          <div className="tab-1">
            <StepContainer />
            <Shopping userinfo={userinfo} />
          </div>
          <div className="tab-2">
            <Bidding userinfo={userinfo} />
          </div>
          <div className="tab-3">
            <Wish userinfo={userinfo} />
          </div>
        </div>
      </div>
    </ShoppingCartContainer>
  )
}
