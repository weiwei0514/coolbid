/* eslint-disable space-before-function-paren */
import React from 'react'
import '../../SASS/list.scss'
import { Link } from 'react-router-dom'

function ProductTabs() {
  return (
    <nav className="tabs">
      <ul>
        <li>
          <Link
            to="/BackStage/product"
            onClick={(e) => {
              e.target.classList.add('active')
            }}
          >
            全&emsp;部
          </Link>
        </li>
        <li>
          <Link
            to="/BackStage/product/onTheMarket"
            onClick={(e) => {
              e.target.classList.add('active')
            }}
          >
            上架中
          </Link>
        </li>
        <li>
          <Link
            to="/BackStage/product/Biding"
            onClick={(e) => {
              e.target.classList.add('active')
            }}
          >
            競標中
          </Link>
        </li>
        <li>
          <Link
            to="/BackStage/product/closeAuction"
            onClick={(e) => {
              e.target.classList.add('active')
            }}
          >
            已結標
          </Link>
        </li>
        <li>
          <Link
            to="/BackStage/product/soldout"
            onClick={(e) => {
              e.target.classList.add('active')
            }}
          >
            已售出
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default ProductTabs
