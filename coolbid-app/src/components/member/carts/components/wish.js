/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import swal from 'sweetalert'

const Shop = styled.div`
  border: #d9d7d7 solid 0.3rem;
  padding: 2rem;
  width: 75%;
  margin: 2rem auto;
  border-radius: 1rem;
  .top {
    display: block;
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
  .items {
    .cartTitle {
      display: flex;
      background-color: #d9d7d7;
      .info {
        width: 33%;
        font-size: 2rem;
        text-align: center;
        padding: 1rem;
      }
    }
    .cartItems {
      display: flex;
      border-bottom: #d9d7d7 solid 0.2rem;
      height: 11rem;
      div {
        img {
          width: 10rem;
          height: 10rem;
          object-fit: scale-down;
        }
        padding-top: 0.5rem;
      }
      .infoProductName {
        a {
          text-decoration: none;
          color: grey;
        }
        a:hover {
          color: #edaf11;
        }
        width: 33%;
        font-size: 1.8rem;
        text-align: center;
        line-height: 3.2rem;
        overflow: hidden;
        vertical-align: middle;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
      }
      .timer{
        width: 33%;
        font-size: 1.8rem;
        text-align: center;
        line-height: 10rem;
      }
      .info {
        width: 33%;
        font-size: 2.4rem;
        text-align: center;
        line-height: 10rem;
      }
      // .price{
      //   width: 33%;
      //   font-size: 2.4rem;
      //   text-align: center;
      //   line-height: 10rem;
      //   margin-left: 10rem
      // }
      .submitBtn {
        font-size: 1.8rem;
      }
    }
  }
`
// 倒數計時
function Timer(props) {
  const { endTime } = props
  const [time, setTime] = useState('剩下0天0時0分0秒結束')
  // count down
  const getRestTime = (endTime) => {
    setInterval(function () {
      // nowTime
      const nowTime = new Date()
      // endTime
      const end = new Date(endTime)
      // 倒數計時: 差值
      const offsetTime = (end - nowTime) / 1000 // ** 以秒為單位
      const day = parseInt(offsetTime / 60 / 60 / 24)
      const hr = parseInt(offsetTime / 60 / 60 - day * 24)
      const min = parseInt((offsetTime / 60) % 60)
      const sec = parseInt(offsetTime % 60)
      setTime(`剩下${day}天${hr}時${min}分${sec}秒`)
    }, 1000)
    return time
  }
  return (
    <div className="infoTitle">
      <AccessAlarmIcon />
      {getRestTime(endTime)}
    </div>
  )
}

// 父
export default function Wish() {
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  const [collectProduct, setCollectProduct] = useState([])
  const bidproduct = []
  const unbidproduct = []
  const sold = []
  const deleted = []

  const handleUncollect = (e) => {
    swal({
      title: '真的要刪除？',
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post('http://localhost:3001/collectproduct', {
            memberId: userinfo.memberId,
            productId: e,
            collect: 'false'
          })
          .then(() => {
            setCollectProduct((prev) => {
              return prev.filter((item) => item.productId !== e)
            })
            swal('刪除收藏成功', {
              icon: 'success'
            })
          })
      } else {
        swal('已保留收藏')
      }
    })
  }

  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: '/collect/' + userinfo.memberId
    }).then((e) => {
      const collected =
        '(' + e.data.map((item) => item.productId).toString() + ')'
      axios
        .post(
          'http://localhost:3001/membercollect',
          {
            data: collected
          }
          // 這邊拿的到收藏的商品們
        )
        .then((e) => {
          setCollectProduct(e.data)
        })
    })
  }, [])

  collectProduct.length > 0 &&
    collectProduct.forEach((item) => {
      switch (item.productstatusId) {
        case 1:
          // 上架
          unbidproduct.push(item)
          break
        case 4:
          // 競標中
          bidproduct.push(item)
          break
        case 5:
          // 結標
          sold.push(item)
          break
        case 2:
        case 3:
        case 6:
          // 下架 刪除 售出
          deleted.push(item)
          break
      }
    })

  return (
    <>
      <Shop>
        <div className="top">
          <p>
            尚未有人競標(<span>{unbidproduct.length}</span>)
          </p>
        </div>
        <div className="items">
          <div className="cartTitle">
            <div className="info">圖片</div>
            <div className="info">商品名稱</div>
            <div className="info">截標時間</div>
            <div className="info">起標價</div>
            <div className="info">取消收藏</div>
          </div>
          {unbidproduct.map((item, index) => (
            <div className="cartItems" key={index}>
              <div className="info">
                <img src={'/imgs/' + item.productId + '.jpg'} />
              </div>
              <div className="infoProductName">
                <NavLink to={'/bidding/product/product?=' + item.productId}>
                  {item.productName}
                </NavLink>
              </div>
              <div className="timer">
              <Timer endTime={item.endTime} />
              </div>
              <div className="info">{item.startPrice}</div>
              <div className="info">
                <Button
                  className="submitBtn"
                  variant="outlined"
                  onClick={() => {
                    handleUncollect(item.productId)
                  }}
                  type="submit"
                  style={{ width: '45%' }}
                >
                  取消收藏
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Shop>
      <Shop>
        <div className="top">
          <p>
            競標中(<span>{bidproduct.length}</span>)
          </p>
        </div>
        <div className="items">
          <div className="cartTitle">
            <div className="info">圖片</div>
            <div className="info">商品名稱</div>
            <div className="info">截標時間</div>
            <div className="info">目前價格</div>
            <div className="info">取消收藏</div>
          </div>
          {bidproduct.map((item, index) => (
            <div className="cartItems" key={index}>
              <div className="info">
                <img src={'/imgs/' + item.productId + '.jpg'} />
              </div>
              <div className="infoProductName">
                <NavLink to={'/bidding/product/product?=' + item.productId}>
                  {item.productName}
                </NavLink>
              </div>
              <div className="timer">
              <Timer endTime={item.endTime} />
              </div>
              <div className="info">{item.nowPrice}</div>
              <div className="info">
                <Button
                  className="submitBtn"
                  variant="outlined"
                  onClick={() => {
                    handleUncollect(item.productId)
                  }}
                  type="submit"
                  style={{ width: '45%' }}
                >
                  取消收藏
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Shop>
      <Shop>
        <div className="top">
          <p>
            已結標(<span>{sold.length}</span>)
          </p>
        </div>
        <div className="items">
          <div className="cartTitle">
            <div className="info">圖片</div>
            <div className="info">商品名稱</div>
            <div className="info">結標價格</div>
            <div className="info">取消收藏</div>
          </div>
          {sold.map((item, index) => (
            <div className="cartItems" key={index}>
              <div className="info">
                <img src={'/imgs/' + item.productId + '.jpg'} />
              </div>
              <div className="infoProductName">
                <NavLink to={'/bidding/product/product?=' + item.productId}>
                  {item.productName}
                </NavLink>
              </div>
              <div className="info">{item.nowPrice}</div>
              <div className="info">
                <Button
                  className="submitBtn"
                  variant="outlined"
                  onClick={() => {
                    handleUncollect(item.productId)
                  }}
                  type="submit"
                  style={{ width: '45%' }}
                >
                  取消收藏
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Shop>
      <Shop>
        <div className="top">
          <p>
            下架／售出商品(<span>{deleted.length}</span>)
          </p>
        </div>
        <div className="items">
          <div className="cartTitle">
            <div className="info">圖片</div>
            <div className="info">商品名稱</div>
            <div className="info">取消收藏</div>
          </div>
          {deleted.map((item, index) => (
            <div className="cartItems" key={index}>
              <div className="info">
                <img src={'/imgs/' + item.productId + '.jpg'} />
              </div>
              <div className="infoProductName">
                <NavLink to={'/bidding/product/product?=' + item.productId}>
                  {item.productName}
                </NavLink>
              </div>
              <div className="info">
                <Button
                  className="submitBtn"
                  variant="outlined"
                  onClick={() => {
                    handleUncollect(item.productId)
                  }}
                  type="submit"
                  style={{ width: '45%' }}
                >
                  取消收藏
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Shop>
    </>
  )
}
