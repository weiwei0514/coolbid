/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import ListIcon from '@material-ui/icons/List'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms'
import DashboardIcon from '@material-ui/icons/Dashboard'
// import Pagination from '@material-ui/lab/Pagination'
import FavoriteIcon from '@material-ui/icons/Favorite'
import axios from 'axios'
import './search.css'
import Skeleton from '@material-ui/lab/Skeleton'

const SearchProducts = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`

export function ItemDiv(props) {
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))
  const { data, index, handlelike, sort } = props
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timer, setTimer] = useState()
  const endTime = data.endTime
  const countdown = () => {
    // 得now date
    const nowTime = new Date()

    // 得到截止時間
    const endDate = new Date(endTime)

    // 倒數計時: 差值
    const offTime = (endDate - nowTime) / 1000 // ** 以秒為單位
    let day = parseInt(offTime / 60 / 60 / 24)
    let hr = parseInt(offTime / 60 / 60 - day * 24)
    let min = parseInt((offTime / 60) % 60)
    let sec = parseInt(offTime % 60)

    day = day < 10 ? '0' + day : day
    hr = hr < 10 ? '0' + hr : hr
    min = min < 10 ? '0' + min : min
    sec = sec < 10 ? '0' + sec : sec

    setDays(day)
    setHours(hr)
    setMinutes(min)
    setSeconds(sec)
    setTimer(setTimeout(countdown, 1000))
  }
  useEffect(() => {
    clearInterval(timer)
    countdown()
  }, [data])
  return (
    <div className={sort === 1 ? 'ProductContainer' : 'ProductContainer2'}>
      <div className={sort === 1 ? 'ProductImgDiv' : 'ProductImgDiv2'}>
        <img
          className={sort === 1 ? 'productImg' : 'productImg2'}
          src={'/imgs/' + data.productId + '.jpg'}
        ></img>
        <FavoriteIcon
          className={sort === 1 ? 'Favorite' : 'Favorite2'}
          onClick={(e) => handlelike(e, index)}
          style={{
            fontSize: '3.6rem'
            //   color: data.like === 0 ? '' : 'rgb(254 63 29)'
          }}
          color="disabled"
        />
      </div>
      <div className={sort === 1 ? 'Information' : 'Information2'}>
        <p className={sort === 1 ? 'title' : 'title2'}>{data.productName}</p>
        <p className={sort === 1 ? 'biddingPrice' : 'biddingPrice2'}>
          <span>最高出價：</span> {currency === 'US' ? 'USD$' : 'NTD$'}
          <span>
            {currency === 'US'
              ? Math.floor(data.directPrice / 30)
              : data.directPrice}
          </span>
        </p>
        <p className={sort === 1 ? 'price' : 'price2'}>
          <span>直購價格：</span> NT.
          <span>{data.directPrice}</span>
        </p>
        <div style={{ position: 'absolute', bottom: '0', color: 'black' }}>
          <p className={sort === 1 ? 'infoEnd' : 'infoEnd2'}>即將結束</p>
          <div className="countDownContainer">
            <div className="flip-clock flip-clock-d">
              <div
                className="digit digit-left"
                data-digit-before="0"
                data-digit-after={days.toString().substr(0, 1)}
              >
                {/* ::before */}
                <div className="card flipped">
                  <div className="card-face card-face-front">0</div>
                  <div className="card-face card-face-back">
                    {days.toString().substr(0, 1)}
                  </div>
                </div>
                {/* ::after */}
              </div>
              <div
                className="digit digit-right"
                data-digit-before="0"
                data-digit-after={days.toString().substr(1, 1)}
              >
                {/* ::before */}
                <div className="card flipped">
                  <div className="card-face card-face-front">0</div>
                  <div className="card-face card-face-back">
                    {days.toString().substr(1, 1)}
                  </div>
                </div>
                {/* ::after */}
              </div>
            </div>
            <div className="colon">:</div>

            <div className="flip-clock flip-clock-h">
              <div
                className="digit digit-left"
                data-digit-before="0"
                data-digit-after={hours.toString().substr(0, 1)}
              >
                {/* ::before */}
                <div className="card flipped">
                  <div className="card-face card-face-front">0</div>
                  <div className="card-face card-face-back">
                    {hours.toString().substr(0, 1)}
                  </div>
                </div>
                {/* ::after */}
              </div>
              <div
                className="digit digit-right"
                data-digit-before="0"
                data-digit-after={hours.toString().substr(1, 1)}
              >
                {/* ::before */}
                <div className="card flipped">
                  <div className="card-face card-face-front">0</div>
                  <div className="card-face card-face-back">
                    {hours.toString().substr(1, 1)}
                  </div>
                </div>
                {/* ::after */}
              </div>
            </div>
            <div className="colon">:</div>
            <div className="flip-clock flip-clock-m">
              <div
                className="digit digit-left"
                data-digit-before="0"
                data-digit-after={minutes.toString().substr(0, 1)}
              >
                {/* ::before */}
                <div className="card flipped">
                  <div className="card-face card-face-front">0</div>
                  <div className="card-face card-face-back">
                    {minutes.toString().substr(0, 1)}
                  </div>
                </div>
                {/* ::after */}
              </div>
              <div
                className="digit digit-right"
                data-digit-before="0"
                data-digit-after={minutes.toString().substr(1, 1)}
              >
                {/* ::before */}
                <div className="card flipped">
                  <div className="card-face card-face-front">0</div>
                  <div className="card-face card-face-back">
                    {minutes.toString().substr(1, 1)}
                  </div>
                </div>
                {/* ::after */}
              </div>
            </div>
            <div className="colon">:</div>
            <div className="flip-clock flip-clock-s">
              <div
                className="digit digit-left"
                data-digit-before="0"
                data-digit-after={seconds.toString().substr(0, 1)}
              >
                {/* ::before */}
                <div className="card flipped">
                  <div className="card-face card-face-front">0</div>
                  <div className="card-face card-face-back">
                    {seconds.toString().substr(0, 1)}
                  </div>
                </div>
                {/* ::after */}
              </div>
              <div
                className="digit digit-right"
                data-digit-before={(seconds - 1).toString().substr(1, 1)}
                data-digit-after={seconds.toString().substr(1, 1)}
              >
                {/* ::before */}
                <div className="card flipped">
                  <div className="card-face card-face-front">
                    {(seconds - 1).toString().substr(1, 1)}
                  </div>
                  <div className="card-face card-face-back">
                    {seconds.toString().substr(1, 1)}
                  </div>
                </div>
                {/* ::after */}
              </div>
            </div>
          </div>
          <div className={sort === 1 ? 'info' : 'info2'}>
            <span className="infoTitle">days</span>
            <span className="infoTitle1">hours</span>
            <span className="infoTitle1">minutes</span>
            <span className="infoTitle">seconds</span>
          </div>
        </div>
      </div>
    </div>
  )
}
const CategoryContainer = styled.div`
  margin-top: 12.5rem;
  width: 100%;
`
const SortList = styled.div`
  margin-top: 3rem;
  margin-right: 5rem;
  float: right;
  display: flex;
  font-size: 2rem;
  div {
    cursor: pointer;
    padding: 1rem;
    svg {
      position: relative;
      top: 4px;
      font-size: 2.3rem;
      padding-right: 0.2rem;
    }
  }
`
// const Bread = styled.div`
//   font-size: 2rem;
//   margin: 3rem;
//   width: 100%;
// `

// const Page = styled.div`
//   width: 35rem;
//   display: flex;
//   // float: right;
//   margin: 15rem auto;
//   height: 10rem;
//   button {
//     svg {
//       font-size: 3rem;
//     }
//     font-size: 2rem;
//   }
// `
export default function Search(props) {
  const [productData, setProductData] = useState([])
  const keyword = props.data.params.search
  // const [page, setPage] = React.useState(1)
  const [sort, setSort] = useState(1)
  const [sortTime, setSortTime] = useState(0)
  const [sortPrice, setSortPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // console.log(keyword)
  useEffect(() => {
    setIsLoading(true)
    axios({
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: '/search/' + keyword,
      'Content-Type': 'application/json'
    }).then((res) => {
      setIsLoading(false)
      setProductData(res.data)
    })
  }, [keyword])
  const handlelike = (e, index) => {
    console.log(e)
    console.log(index)
    // const newData = productData.map((item) => item)
    // if (productData[index].like === 0) {
    //   newData[index].like = 1
    //   setProductData(newData)
    // } else {
    //   newData[index].like = 0
    //   setProductData(newData)
    // }
  }
  // // pages
  // const handleChange = (event, value) => {
  //   setPage(value)
  // }
  const changeSort = (e) => {
    setSort(e)
  }
  const changeSortPrice = () => {
    if (sortPrice === 0) {
      setSortPrice(1)
    } else {
      setSortPrice(0)
    }
  }
  const changeSortTime = () => {
    if (sortTime === 0) {
      setSortTime(1)
    } else {
      setSortTime(0)
    }
  }
  useEffect(() => {
    if (sortPrice === 0) {
      const sortAfter = productData.map((item) => item)
      sortAfter.sort(function (a, b) {
        return a.directPrice - b.directPrice
      })
      setProductData(sortAfter)
    } else {
      const sortAfter = productData.map((item) => item)
      sortAfter.sort(function (a, b) {
        return b.directPrice - a.directPrice
      })
      setProductData(sortAfter)
    }
  }, [sortPrice])
  useEffect(() => {
    if (sortTime === 0) {
      const sortAfter = productData.map((item) => item)
      sortAfter.sort(function (a, b) {
        return new Date(a.endTime) - new Date(b.endTime)
      })
      setProductData(sortAfter)
    } else {
      const sortAfter = productData.map((item) => item)
      sortAfter.sort(function (a, b) {
        return new Date(b.endTime) - new Date(a.endTime)
      })
      setProductData(sortAfter)
    }
  }, [sortTime])

  useEffect(() => {}, [sort, sortPrice, sortTime])

  return (
    <CategoryContainer>
      {/* navbar2 */}
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/bidding/Bag">Bag</NavLink>
          </li>
          <li>
            <NavLink to="/bidding/Cloth">Cloth</NavLink>
          </li>
          <li>
            <NavLink to="/bidding/Shoes">Shoes</NavLink>
          </li>
          <li>
            <NavLink to="/bidding/Watch">Watch</NavLink>
          </li>
        </ul>
      </nav>
      {/* Breadcrumbs */}
      {/* <Bread>首頁/競標區/包包類</Bread> */}
      {/* sort */}
      <SortList>
        <div onClick={() => changeSort(1)}>
          <DashboardIcon />
          圖像式瀏覽
        </div>
        <div onClick={() => changeSort(2)}>
          <ListIcon />
          條列式瀏覽
        </div>
        <div onClick={changeSortPrice}>
          <MonetizationOnIcon />
          價格排列
        </div>
        <div onClick={changeSortTime}>
          <AccessAlarmsIcon />
          截止排列
        </div>
      </SortList>
      <SearchProducts>
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <Skeleton
                key={index}
                variant="rect"
                width={240}
                height={460}
                style={{
                  margin: '0 2rem 3rem 2rem',
                  borderRadius: '4px',
                  boxShadow: '0px 4px 20px #1b1b1b21'
                }}
              />
            ))
          : productData.map((item, index) => {
              return (
                <ItemDiv
                  key={index}
                  index={index}
                  data={item}
                  handlelike={handlelike}
                  sort={sort}
                />
              )
            })}
      </SearchProducts>
      {/* <Page>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Page> */}
    </CategoryContainer>
  )
}
