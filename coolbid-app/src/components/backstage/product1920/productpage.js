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
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import '../../SASS/list.scss'
import '../../SASS/Components.scss'
import swal from 'sweetalert'

const goEdit = (id) => {
  window.location.href = 'product/' + id
}

const useStyles = makeStyles((theme) => ({
  itemTitle: {
    fontSize: 18
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

const productpage = () => {
  // 增加幣別切換 20200513 weiyy
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))
  const classes = useStyles()
  const [data, setData] = useState([])
  const [startPrice, setstartPrice] = useState(0)
  const [perPrice, setPerPrice] = useState(0)
  const [directPrice, setdirectPrice] = useState(0)
  const [nowPrice, setNowPrice] = useState(0)
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))

  useEffect(() => {
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/BackStage/product',
      'Content-Type': 'application/json',
      data: { id: userinfo.memberId }
    }).then((a) => setData(a.data))
  }, [])

  const changebidPrice = () => {
    if (nowPrice === 0) {
      setNowPrice(1)
    } else {
      setNowPrice(0)
    }
  }

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
    if (nowPrice === 0) {
      const nowPriceAfter = data.map((item) => item)
      nowPriceAfter.sort(function (a, b) {
        return a.nowPrice - b.nowPrice
      })
      setData(nowPriceAfter)
    } else {
      const nowPriceAfter = data.map((item) => item)
      nowPriceAfter.sort(function (a, b) {
        return b.nowPrice - a.nowPrice
      })
      setData(nowPriceAfter)
    }
  }, [nowPrice])

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

  useEffect(() => {}, [directPrice, perPrice, startPrice, nowPrice])

  const handleDelete = (e) => {
    swal({
      title: '真的要刪除？',
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        axios({
          method: 'post',
          baseURL: 'http://localhost:3001',
          url: '/BackStage/deleteProduct',
          'Content-Type': 'application/json',
          data: { id: e }
        })
        setData(
          (prev) => {
            return prev.filter((item) => item.productId !== e)
          }
        )
      } else {
        swal('已取消刪除')
      }
    })
  }

  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <SellerBackendList />
        </div>
        <div className="backstageRight">
          <div className="backstageRightContainer">
            {/* <Breadcrumbs /> */}
            <div className="breadcrumbsArea">賣家專區/商品清單</div>
            <div id="SoldOutId">
              <div>
                <ProductTabs />
              </div>
              <TableContainer className="Table_container">
                <Table>
                  <TableHead>
                    <TableRow>
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
                        style={{ width: '100px', cursor: 'pointer' }}
                      >
                        起標價
                        <UnfoldMoreIcon />
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        onClick={changePerPrice}
                        style={{ width: '100px', cursor: 'pointer' }}
                      >
                        每標價
                        <UnfoldMoreIcon />
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        onClick={changedirectPrice}
                        style={{ width: '100px', cursor: 'pointer' }}
                      >
                        直購價
                        <UnfoldMoreIcon />
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        style={{ width: '100px', cursor: 'pointer' }}
                      >
                        結標日
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        onClick={changebidPrice}
                        style={{ width: '150px', cursor: 'pointer' }}
                      >
                        目前出價
                        <UnfoldMoreIcon />
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        style={{ width: '100px' }}
                      >
                        狀態
                      </TableCell>
                      <TableCell align="center" colSpan={2}></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center" className={classes.itemTxt}>
                            {' '}
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
                          <TableCell align="center" className={classes.itemTxt}>
                            {item.nowPrice
                              ? currency === 'US'
                                ? 'USD$'
                                : 'NTD$'
                              : ''}
                            {item.nowPrice
                              ? currency === 'US'
                                ? Math.floor(item.nowPrice / 30)
                                : item.nowPrice
                              : '尚無人出價'}
                          </TableCell>
                          <TableCell align="center" className={classes.itemTxt}>
                            {item.productstatusDescription}
                          </TableCell>
                          <TableCell align="center" colSpan={2}>
                            <input
                              type="submit"
                              value="編輯"
                              className="button SetStoreInfo_Submit"
                              onClick={() => goEdit(item.productId)}
                            />
                            <br />
                            <input
                              type="submit"
                              value="刪除"
                              className="button SetStoreInfo_Submit"
                              id={item.id}
                              onClick={() => handleDelete(item.productId)}
                            />
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

export default productpage
