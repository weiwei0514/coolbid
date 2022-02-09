/* eslint-disable space-before-function-paren */
import React from 'react'
import { Link } from '@material-ui/core'

import '../../SASS/list.scss'
function OrderTabs() {
  const handleAllChange = () => {
    console.log(123)
  }

  return (
    <nav className="tabs">
      <ul>
        <li>
          <Link href="#" onClick={handleAllChange}>
            全部
          </Link>
        </li>
        <li>
          <Link href="#" style={{ color: '#edae10' }}>待出貨</Link>
        </li>
        <li>
          <Link href="#">運送中</Link>
        </li>
        <li>
          <Link href="#">已完成</Link>
        </li>
        <li>
          <Link href="#">棄標</Link>
        </li>
        <li>
          <Link href="#">退款/貨</Link>
        </li>
      </ul>
    </nav>
  )
}

export default OrderTabs
