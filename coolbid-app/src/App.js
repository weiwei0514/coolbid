/* eslint-disable space-before-function-paren */
import React from 'react'
// import NavBar from './components/navbar/navbar'
import Ahomepage from './components/Ahomepage/aHomepage'
import Category from './components/Ahomepage/CatProduct/category'
import Homepage from './components/Homepage/homepage'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Search from './components/Ahomepage/search/search'
import Auction from './Auction'
import Login from './components/member/login'
import Signup from './components/member/signup'
import Logout from './components/member/logout'
import Add from './components/backstage/product1920/Add'
import productpage from './components/backstage/product1920/productpage'
import Biding from './components/backstage/product1920/Biding'
import SoldOut from './components/backstage/product1920/SoldOut'
import CloseAuction from './components/backstage/product1920/CloseAuction'
import OnTheMarket from './components/backstage/product1920/OnTheMarket'
import SetStoreInfo from './components/backstage/SetStoreInfo21/SetStoreInfo'
import OrderList from './components/backstage/Order22/OrderList'
import EditMemberInfo from './components/member/account/editMemberInfo'
import RenewMemberPwd from './components/member/account/renewMemberPwd'
import ForgetMemberPwd from './components/member/forgetMemberPwd'
import BidPage from './components/Ahomepage/bidding/bidPage'
import NavBar from './components/navbar/navbar'
import Backstage from './components/backstage/backStage'
import AuctionCountdown from './AuctionCountdown'
import Footer from './Footer'
import BuyList from './components/backstage/Member/PurchaseList/BuyList'
import Address from './components/backstage/Member/info/Address'
// import CloseAuction from './components/backstage/product1920/CloseAuction'
import ShoppingCart from './components/member/carts/shoppingCart'
//
import SellerPageHero from './components/backstage/SellerPageHero23/SellerPageHero'
// cart checkout
import Checkout from './components/member/carts/components/checkout'
import CompleteOrder from './components/member/carts/components/completeOrder'

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          {/* entry page */}
          <Route path="/" component={Homepage} exact />
          {/* Ahomepage */}
          <Route path="/bidding" component={Ahomepage} exact />
          <Route
            path="/bidding/:category"
            render={({ match }) => <Category data={match} />}
            exact
          />
          <Route
            path="/bidding/product/:product_id"
            render={({ match }) => <BidPage data={match} />}
          />
          <Route
            path="/bidding/search/:search"
            render={({ match }) => <Search data={match} />}
          />
          {/* Chomepage */}
          <Route path="/auction" component={Auction} exact />
          <Route path="/auction/coming" component={AuctionCountdown} />
          {/* Member */}
          <Route path="/member/signin" component={Login} />
          <Route path="/member/signup" component={Signup} />
          <Route path="/member/signout" component={Logout} />
          <Route path="/member/edit" component={EditMemberInfo} />
          <Route path="/member/renewMemberPwd" component={RenewMemberPwd} />
          <Route path="/member/forgetMemberPwd" component={ForgetMemberPwd} />
          <Route path="/member/shippingInfo" component={Address} />
          <Route path="/member/paymentInfo" component={Login} />
          <Route path="/member/coolCoin" component={Login} />
          <Route path="/member/purchase" component={BuyList} />
          {/* 2021/05/07測試賣場首頁,放入資料庫連線 */}
          <Route path="/sellerpage/:memberId" component={SellerPageHero} />

          {/* Seller */}
          <Route path="/BackStage" component={Backstage} exact />
          <Route path="/BackStage/product" component={productpage} exact />
          <Route
            path="/BackStage/product/OnTheMarket"
            component={OnTheMarket}
          />
          <Route
            path="/BackStage/product/CloseAuction"
            component={CloseAuction}
          />
          <Route path="/BackStage/product/SoldOut" component={SoldOut} />
          <Route path="/BackStage/product/Biding" component={Biding} />
          <Route path="/BackStage/product/:id" component={Add} />
          <Route path="/BackStage/sellerInfo" component={SetStoreInfo} />
          <Route path="/BackStage/orders" component={OrderList} />

          {/* Shopping */}
          <Route
            path="/Shopping/:cart"
            render={({ match }) => <ShoppingCart data={match} />}
          />
          <Route path="/Shopping/Cart/checkout" component={Checkout} />
          <Route path="/completeOrder" component={CompleteOrder} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
