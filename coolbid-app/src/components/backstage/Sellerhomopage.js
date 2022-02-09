import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../SASS/Sellerhomopage.scss'
import { Link } from 'react-router-dom'
function Sellerhomopage () {
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/BackStage/sellerhomepage',
      'Content-Type': 'application/json',
      data: { id: userinfo.memberId }
    }).then((e) => setCount(e.data[0].count))
  }, [])

  return (
    <div className="Sellerhomopage_wrap">
      <h1>{userinfo.userId}的賣場</h1>
      <div className="wrap_container">
        <div className="Sellerhomopage_item_wrap">
          <div className="Sellerhomopage_item">
            <div>
            <Link to="/BackStage/orders" className="linkStyle">待付款訂單 <p>0</p></Link>
            </div>
          </div>
          <div className="Sellerhomopage_item" >
            <div>
            <Link to="/BackStage/orders" className="linkStyle">待出貨訂單 <p>{count}</p></Link>
            </div>
          </div>
        </div>
        <div className="Sellerhomopage_item_wrap">
          <div className="Sellerhomopage_item">
            <div>
            <Link to="/BackStage/orders" className="linkStyle">待退款訂單 <p>0</p></Link>
            </div>
          </div>

          <div className="Sellerhomopage_item">
            <div>
            <Link to="/BackStage/orders" className="linkStyle">已出貨訂單 <p>0</p></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sellerhomopage
