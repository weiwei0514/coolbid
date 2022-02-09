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
import { Link } from 'react-router-dom'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
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

function BidingList() {
  const [data, setData] = useState([])
  const classes = useStyles()
  const [nowPrice, setNowPrice] = useState(0)
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  // 新增幣別切換 20200513 weiyy
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))

  useEffect(() => {
    console.log('hi')
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/BackStage/product/Biding',
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

  useEffect(() => {}, [nowPrice])

  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <SellerBackendList />
        </div>
        <div className="backstageRight">
          <div className="backstageRightContainer">
            <div className="breadcrumbsArea">
              賣家專區/商品清單/競標中
              {/* <Breadcrumbs /> */}
            </div>
            <div id="BidingId">
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
                        onClick={changebidPrice}
                        style={{ cursor: 'pointer' }}
                      >
                        目前出價
                        <UnfoldMoreIcon />
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.itemTitle}
                        style={{ cursor: 'pointer' }}
                      >
                        結標日
                      </TableCell>
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
                              ? Math.floor(item.nowPrice / 30)
                              : item.nowPrice}
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

export default BidingList
