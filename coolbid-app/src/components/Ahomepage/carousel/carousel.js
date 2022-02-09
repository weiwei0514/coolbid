import React, { useState, useEffect } from 'react'
import Carousel from 'react-elastic-carousel'
import '../carousel/carousel.css'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Skeleton from '@material-ui/lab/Skeleton'

const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))

const ProductContainer = {
  position: 'relative',
  margin: '0 2rem 3rem 2rem',
  width: '90%',
  height: '40rem',
  borderRadius: '4px',
  background: '#dbdbdb',
  overflow: 'hidden',
  boxShadow: '0px 4px 20px #1b1b1b21'
}

const ProductImgDiv = {
  backgroundColor: 'white',
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  top: '0',
  textAlign: 'center'
}

const productImg = {
  objectFit: 'scale-down',
  height: '18rem',
  width: '18rem',
  ':hover': {
    transform: 'scale(1.2)'
  }
}

const favorite = {
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
  cursor: 'pointer',
  fontSize: '3.6rem'
}

const title = {
  height: '9rem',
  fontSize: '2rem',
  marginBottom: '0',
  padding: '1rem 2rem 0 2rem',
  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': '3'
}

const biddingPrice = {
  color: 'black',
  fontSize: '1.8rem',
  textAlign: 'left',
  marginBottom: '0',
  marginLeft: '2rem'
}

const gotobid = {
  color: 'white',
  textAlign: 'center',
  backgroundColor: '#edae10',
  fontSize: '2rem',
  position: 'absolute',
  bottom: '0',
  width: '100%',
  padding: '5px'
}

const Prods = (props) => {
  const { prod } = props
  const [likeProduct, setLikeProduct] = useState([])
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))
  // get wishlist
  useEffect(() => {
    if (userinfo) {
      axios
        .post('http://localhost:3001/likeproduct', {
          memberId: userinfo.memberId
        })
        .then((e) => {
          setLikeProduct(e.data.map((item) => item.productId))
        })
    }
  }, [])
  // 收藏與取消收藏 done 20210507 Jou
  const handlelike = (e) => {
    if (userinfo) {
      if (likeProduct.includes(e)) {
        // delete收藏
        axios
          .post('http://localhost:3001/collectproduct', {
            memberId: userinfo.memberId,
            productId: e,
            collect: 'false'
          })
          .then((res) => {
            // 前端立刻變色
            setLikeProduct((prev) => {
              return prev.filter((item) => item !== e)
            })
            alert(res.data)
          })
      } else {
        // insert into收藏
        axios
          .post('http://localhost:3001/collectproduct', {
            memberId: userinfo.memberId,
            productId: e,
            collect: 'true'
          })
          .then((res) => {
            // 前端立刻變色
            setLikeProduct((prev) => [...prev, e])
            alert(res.data)
          })
      }
    } else {
      swal({
        title: '請先登入',
        text: '登入以啟用收藏功能',
        icon: 'warning',
        button: 'OK'
      })
    }
  }
  return (
    <div style={ProductContainer}>
      <div style={ProductImgDiv}>
        <NavLink
          style={{ textDecoration: 'none' }}
          to={`/bidding/product/product?=${prod.productId}`}
        >
          <img src={`/imgs/${prod.productId}.jpg`} style={productImg} />
        </NavLink>
        <FavoriteIcon
          onClick={() => handlelike(prod.productId)}
          style={favorite}
          color={likeProduct.includes(prod.productId) ? 'error' : 'disabled'}
        />
      </div>
      <div>
        <NavLink
          style={{ textDecoration: 'none' }}
          to={`/bidding/product/product?=${prod.productId}`}
        >
          <p className="title" style={title}>
            {prod.productName}
          </p>
        </NavLink>
        <p style={biddingPrice}>
          <span>最高出價：</span>
          {currency === 'US' ? 'USD$' : 'NTD$'}
          <span>
            {currency === 'US' ? Math.floor(prod.nowPrice / 30) : prod.nowPrice}
          </span>
          <br />
          <span>直購價：</span> {currency === 'US' ? 'USD$' : 'NTD$'}
          <span>
            {currency === 'US'
              ? Math.floor(prod.directPrice / 30)
              : prod.directPrice}
          </span>
        </p>
      </div>
      <NavLink
        style={{ textDecoration: 'none' }}
        to={`/bidding/product/product?=${prod.productId}`}
      >
        <div style={gotobid}>前往商品頁</div>
      </NavLink>
    </div>
  )
}

const BiddingCarousel = () => {
  const [popular, setPopular] = useState([])

  // get popular products
  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: '/getPopularProducts',
      'Content-Type': 'application/json'
    }).then((res) => {
      setPopular(res.data)
    })
  }, [])

  return (
    <Carousel
      itemsToScroll={2}
      itemsToShow={4}
      pagination={false}
      style={{ width: '90%', margin: '5rem auto 5rem' }}
    >
      {popular.length
        ? popular.map((item, index) => <Prods key={index} prod={item} />)
        : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
            return (
              <Skeleton key={index} variant="rect" style={ProductContainer} />
            )
          })}
    </Carousel>
  )
}

export default BiddingCarousel
