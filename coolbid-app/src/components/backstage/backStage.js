/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
import React from 'react'
// import Breadcrumbs from './Main/Breadcrumbs'
import SellerBackendList from './Main/SellerBackendList'
import Sellerhomopage from './Sellerhomopage'
import '../SASS/Main.scss'
export default function Backstage() {
  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <SellerBackendList />
        </div>
        <div className="backstageRight">
          <div className="backstageRightContainer">
            {/* <Breadcrumbs /> */}
            <div className="breadcrumbsArea">賣家專區</div>
            <Sellerhomopage />
          </div>
        </div>
      </div>
    </div>
  )
}
