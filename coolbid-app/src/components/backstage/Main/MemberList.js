import React from 'react'
import '../../SASS/Main.scss'
import { Link } from 'react-router-dom'
export default function NestedList () {
  return (
    <div className="side-menu">
    <ul className="backstageNav">
        <li><Link className='link' to="/member/edit">會員編輯</Link></li>
        <li><Link className='link' to="/member/renewMemberPwd">更改密碼</Link></li>
        {/* <li><Link className='link' to="/member/shippingInfo">收貨資訊</Link></li> */}
        {/* <li><Link className='link' to="/member/paymentInfo">付款資訊</Link></li> */}
        <li><Link className='link' to="/member/purchase">購買清單</Link></li>
    </ul>
</div>

  )
}
