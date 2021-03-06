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
// εζΈθ¨ζ
function Timer(props) {
  const { endTime } = props
  const [time, setTime] = useState('ε©δΈ0ε€©0ζ0ε0η§η΅ζ')
  // count down
  const getRestTime = (endTime) => {
    setInterval(function () {
      // nowTime
      const nowTime = new Date()
      // endTime
      const end = new Date(endTime)
      // εζΈθ¨ζ: ε·?εΌ
      const offsetTime = (end - nowTime) / 1000 // ** δ»₯η§ηΊε?δ½
      const day = parseInt(offsetTime / 60 / 60 / 24)
      const hr = parseInt(offsetTime / 60 / 60 - day * 24)
      const min = parseInt((offsetTime / 60) % 60)
      const sec = parseInt(offsetTime % 60)
      setTime(`ε©δΈ${day}ε€©${hr}ζ${min}ε${sec}η§`)
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

// ηΆ
export default function Wish() {
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  const [collectProduct, setCollectProduct] = useState([])
  const bidproduct = []
  const unbidproduct = []
  const sold = []
  const deleted = []

  const handleUncollect = (e) => {
    swal({
      title: 'ηηθ¦εͺι€οΌ',
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
            swal('εͺι€ζΆθζε', {
              icon: 'success'
            })
          })
      } else {
        swal('ε·²δΏηζΆθ')
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
          // ιιζΏηε°ζΆθηεεε
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
          // δΈζΆ
          unbidproduct.push(item)
          break
        case 4:
          // η«Άζ¨δΈ­
          bidproduct.push(item)
          break
        case 5:
          // η΅ζ¨
          sold.push(item)
          break
        case 2:
        case 3:
        case 6:
          // δΈζΆ εͺι€ ε?εΊ
          deleted.push(item)
          break
      }
    })

  return (
    <>
      <Shop>
        <div className="top">
          <p>
            ε°ζͺζδΊΊη«Άζ¨(<span>{unbidproduct.length}</span>)
          </p>
        </div>
        <div className="items">
          <div className="cartTitle">
            <div className="info">εη</div>
            <div className="info">εεεη¨±</div>
            <div className="info">ζͺζ¨ζι</div>
            <div className="info">θ΅·ζ¨εΉ</div>
            <div className="info">εζΆζΆθ</div>
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
                  εζΆζΆθ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Shop>
      <Shop>
        <div className="top">
          <p>
            η«Άζ¨δΈ­(<span>{bidproduct.length}</span>)
          </p>
        </div>
        <div className="items">
          <div className="cartTitle">
            <div className="info">εη</div>
            <div className="info">εεεη¨±</div>
            <div className="info">ζͺζ¨ζι</div>
            <div className="info">η?εεΉζ Ό</div>
            <div className="info">εζΆζΆθ</div>
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
                  εζΆζΆθ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Shop>
      <Shop>
        <div className="top">
          <p>
            ε·²η΅ζ¨(<span>{sold.length}</span>)
          </p>
        </div>
        <div className="items">
          <div className="cartTitle">
            <div className="info">εη</div>
            <div className="info">εεεη¨±</div>
            <div className="info">η΅ζ¨εΉζ Ό</div>
            <div className="info">εζΆζΆθ</div>
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
                  εζΆζΆθ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Shop>
      <Shop>
        <div className="top">
          <p>
            δΈζΆοΌε?εΊεε(<span>{deleted.length}</span>)
          </p>
        </div>
        <div className="items">
          <div className="cartTitle">
            <div className="info">εη</div>
            <div className="info">εεεη¨±</div>
            <div className="info">εζΆζΆθ</div>
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
                  εζΆζΆθ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Shop>
    </>
  )
}
