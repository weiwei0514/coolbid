/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ProductTabs from '../product1920/ProductTabs'
// import Breadcrumbs from '../Main/Breadcrumbs'
import SellerBackendList from '../Main/SellerBackendList'
import { makeStyles } from '@material-ui/core/styles'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import { Link } from 'react-router-dom'
import '../../SASS/list.scss'
import '../../SASS/Components.scss'
const useStyles = makeStyles((theme) => ({
  itemTitle: {
    fontSize: 20
  },
  itemTxt: {
    fontSize: 16
  },
  tableStyle: {
    marginTop: 50,
    border: 'double',
    borderColor: 'grey'
  },
  imgStyle: {
    width: 80
  }
}))

function OnTheMarket() {
  const [data, setData] = useState([])
  const [startPrice, setstartPrice] = useState(0)
  const [perPrice, setPerPrice] = useState(0)
  const [directPrice, setdirectPrice] = useState(0)
  // const [endTime, setEndTime] = useState(0)
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  // 新增切換幣別 20200513 weiyy
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))

  useEffect(() => {
    console.log('hi')
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/BackStage/product/OnTheMarket',
      'Content-Type': 'application/json',
      data: { id: userinfo.memberId }
    }).then((a) => setData(a.data))
  }, [])

  const changestartPrice = () => {
    if (startPrice === 0) {
      setstartPrice(1)
    } else {
      setstartPrice(0)
    }
  }
  const changePerPrice = () => {
    if (perPrice === 0) {
      setPerPrice(1)
    } else {
      setPerPrice(0)
    }
  }

  const changedirectPrice = () => {
    if (directPrice === 0) {
      setdirectPrice(1)
    } else {
      setdirectPrice(0)
    }
  }

  // const changeEndTime = () => {
  //   if (endTime === 0) {
  //     setEndTime(1)
  //   } else {
  //     setEndTime(0)
  //   }
  // }

  useEffect(() => {
    if (startPrice === 0) {
      const startPriceAfter = data.map((item) => item)
      startPriceAfter.sort(function (a, b) {
        return a.startPrice - b.startPrice
      })
      setData(startPriceAfter)
    } else {
      const startPriceAfter = data.map((item) => item)
      startPriceAfter.sort(function (a, b) {
        return b.startPrice - a.startPrice
      })
      setData(startPriceAfter)
    }
  }, [startPrice])

  useEffect(() => {
    if (perPrice === 0) {
      const perPriceAfter = data.map((item) => item)
      perPriceAfter.sort(function (a, b) {
        return a.perPrice - b.perPrice
      })
      setData(perPriceAfter)
    } else {
      const perPriceAfter = data.map((item) => item)
      perPriceAfter.sort(function (a, b) {
        return b.perPrice - a.perPrice
      })
      setData(perPriceAfter)
    }
  }, [perPrice])

  useEffect(() => {
    if (directPrice === 0) {
      const directPriceAfter = data.map((item) => item)
      directPriceAfter.sort(function (a, b) {
        return a.directPrice - b.directPrice
      })
      setData(directPriceAfter)
    } else {
      const directPriceAfter = data.map((item) => item)
      directPriceAfter.sort(function (a, b) {
        return b.directPrice - a.directPrice
      })
      setData(directPriceAfter)
    }
  }, [directPrice])

  // useEffect(() => {
  //   if (endTime === 0) {
  //     const endTimeAfter = data.map((item) => item)
  //     endTimeAfter.sort(function (a, b) {
  //       return new Date(a.endTime) - new Date(b.endTime)
  //     })
  //     setEndTime(endTimeAfter)
  //   } else {
  //     const endTimeAfter = data.map((item) => item)
  //     endTimeAfter.sort(function (a, b) {
  //       return new Date(b.endTime) - new Date(a.endTime)
  //     })
  //     setEndTime(endTimeAfter)
  //   }
  // }, [endTime])

  useEffect(() => {}, [directPrice, perPrice, startPrice])

  const classes = useStyles()
  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <SellerBackendList />
        </div>
        <div className="backstageRight">
          <div className="backstageRightContainer">
            <div className="breadcrumbsArea">
              賣家專區/商品清單/上架中
              {/* <Breadcrumbs /> */}
            </div>
            <div id="OnTheMarketId">
              <div>
                <ProductTabs />
              </div>
              <TableContainer className="Table_container">
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* 遞減排序功能,截標倒數計時 */}
                      <TableCell align="center" className={classes.itemTitle}>
                        圖片
                      </TableCell>
                      <TableCell align="center" className={classes.itemTitle}>
                        項目
                      </TableCell>
                      <TableCell align="center" className={classes.itemTitle}>
                        類別
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        onClick={changestartPrice}
                        style={{ cursor: 'pointer', width: '100px' }}
                      >
                        起標價
                        <UnfoldMoreIcon />
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        onClick={changePerPrice}
                        style={{ cursor: 'pointer', width: '100px' }}
                      >
                        每標價
                        <UnfoldMoreIcon />
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        onClick={changedirectPrice}
                        style={{ cursor: 'pointer', width: '100px' }}
                      >
                        直購價
                        <UnfoldMoreIcon />
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        style={{ cursor: 'pointer', width: '100px' }}
                      >
                        結標日
                      </TableCell>
                      {/* <TableCell align="center" className={classes.itemTitle}>
                        狀態
                      </TableCell> */}
                      {/* <TableCell align="center" className={classes.itemTitle}>
                操作
              </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center" className={classes.itemTxt}>
                            <img
                              src={'/imgs/' + item.productId + '.jpg'}
                              className={classes.imgStyle}
                            />
                          </TableCell>
                          <TableCell align="center" className={classes.itemTxt}>
                            <Link
                              className="linkStyle"
                              to={'/bidding/product/product?=' + item.productId}
                            >
                              {item.productName}
                            </Link>
                          </TableCell>
                          <TableCell align="center" className={classes.itemTxt}>
                            {item.categoryName}
                          </TableCell>
                          <TableCell align="center" className={classes.itemTxt}>
                            {currency === 'US' ? 'USD$' : 'NTD$'}
                            {currency === 'US'
                              ? Math.floor(item.startPrice / 30)
                              : item.startPrice}
                          </TableCell>
                          <TableCell align="center" className={classes.itemTxt}>
                            {currency === 'US' ? 'USD$' : 'NTD$'}
                            {currency === 'US'
                              ? Math.floor(item.perPrice / 30)
                              : item.perPrice}
                          </TableCell>
                          <TableCell align="center" className={classes.itemTxt}>
                            {currency === 'US' ? 'USD$' : 'NTD$'}
                            {currency === 'US'
                              ? Math.floor(item.directPrice / 30)
                              : item.directPrice}
                          </TableCell>
                          <TableCell align="center" className={classes.itemTxt}>
                            {item.endTime.substr(0, 10)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OnTheMarket
