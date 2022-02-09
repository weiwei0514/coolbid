import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  Container,
  Breadcrumbs,
  Link,
  Card,
  // CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'

import useStyles from '../../../styles/bidPageStyle'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import BidFunc from './bidFunc'

const BidPage = props => {
  const classes = useStyles()

  // const userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))

  let [toggle, setToggle] = useState(true)
  const [product, setProduct] = useState([])
  const [bidState, setBidState] = useState(0)
  const [timer, SetTimer] = useState()
  const handleBidState = () => {
    setBidState(bidState + 1)
  }

  let pId = props.data.params.product_id
  pId = window.location.search
  pId = pId.substr(2)

  // 頁面載入撈資料
  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: `/product/${pId}`,
      'Content-Type': 'application/json'
    }).then(res => {
      setProduct(res.data)
      SetTimer(Date.parse(res.data[0][0].endTime) - Date.now())
      setInterval(() => {
        SetTimer(Date.parse(res.data[0][0].endTime) - Date.now())
      }, 1000)
    })
  }, [bidState])

  const productStatus = product.length === 0 ? '' : product[0][0].productStatusId
  const nowBidPrice = product.length === 0 ? '' : product[0][0].nowPrice
  const catId = product.length === 0 ? '' : product[0][0].categoryId

  // 結標判斷
  let isBidDisable = false
  if (nowBidPrice === (product.length === 0 ? '' : product[0][0].directPrice) || Date.parse(product.length === 0 ? '' : product[0][0].endTime) <= Date.now()) isBidDisable = true

  const rows = product.length === 0 ? [] : product[1]

  const handleToggleInfo = () => {
    setToggle((toggle = true))
  }

  const handleToggleHistory = () => {
    setToggle((toggle = false))
  }

  // 剩餘時間
  const dateObject = Date.parse(product.length === 0 ? '' : product[0][0].endTime)
  function getDuration (ms) {
    const days = ms / 1000 / 60 / 60 / 24
    const hours = ms / 1000 / 60 / 60 - (24 * Math.floor(days))
    const minutes = ms / 1000 / 60 - (24 * 60 * Math.floor(days)) - (60 * Math.floor(hours))
    const seconds = ms / 1000 - (24 * 60 * 60 * Math.floor(days)) - (60 * 60 * Math.floor(hours)) - (60 * Math.floor(minutes))

    return (`${Math.floor(days)}天 ${Math.floor(hours)}時 ${Math.floor(minutes)}分 ${Math.floor(seconds)}秒`)
  }

  // 時間截止
  const lastTime = dateObject - Date.now()
  useEffect(() => {
    if (lastTime <= 0) {
      axios({
        method: 'post',
        url: `http://localhost:3001/product/${props.originPId}`,
        'Content-Type': 'application/json',
        data: {
          isDirectBuy: false,
          isTimeUp: true,
          directBidPrice: nowBidPrice,
          id: props.pId,
          finalBidderId: product[1].length === 0 ? '' : product[1][0].memberId,
          productStatusId: 5
        }
      }).then(res => console.log(res.data))
    }
  }, [])

  return (
    <>
      <Container className={classes.root}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link color='inherit' href='http://localhost:3000/'>
            首頁
          </Link>
          <Link color='inherit' href='http://localhost:3000/bidding/'>
            競標區
          </Link>
          <Link color='inherit' href={`http://localhost:3000/bidding/${product.length === 0 ? '' : product[0][0].categoryName}`}>
            {product.length === 0 ? '' : product[0][0].categoryName}
          </Link>
          <Link
            color='textPrimary'
            href='http://localhost:3000/bidding/category/product'
            aria-current='page'
          >
            {product.length === 0 ? '' : product[0][0].productName}
          </Link>
        </Breadcrumbs>
        <Grid
          className={classes.productWrapper}
          container='true'
          direction='row'
        >
          <Card>
            {/* <CardActionArea>
              <CardMedia
                className={classes.mainMedia}
                image={`/imgs/${pId}.jpg`}
              />
            </CardActionArea> */}
            <img
              className={classes.mainMedia}
              src={`/imgs/${pId}.jpg`}
            />
          </Card>
          <div className={classes.productInfoWrapper}>
            <Typography className={classes.productTitle}>
              {product.length === 0 ? '' : product[0][0].productName}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={productStatus === 1 ? { display: 'none' } : { display: 'block' } }
            >
               {isBidDisable ? '剩下 0天 0時 0分 0秒 結束' : `剩下 ${getDuration(timer)} 結束`} {productStatus === 5 ? '(商品已結標) ' : ''}
            </Typography>
            <Typography className={classes.productInfo}>
              起標價格：{product.length === 0 ? '' : `${product[0][0].startPrice}元`}
            </Typography>
            <Typography className={classes.productInfo}>
              最高出價：{product.length === 0 ? '' : (product[1].length === 0 ? '無' : product[1][0].nickname)} {product.length === 0 ? '' : (product[1].length === 0 ? '' : `(${product[1][0].userId})`)}
              {product.length === 0 ? '' : (product[1].length === 0 ? '' : ` / ${product[1][0].bidprice}元`)}
            </Typography>
            <Typography className={classes.productInfo}>
              商品品牌：{product.length === 0 ? '' : product[0][0].brandName}
            </Typography>

            {/* ---------- 各類商品資訊 START ---------- */}
            <Typography
              className={classes.productInfo}
              style={catId === 'B' ? { display: 'block' } : { display: 'none' }}
            >
              商品調性：{product.length === 0 ? '' : product[2][0].bagSex}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'B' ? { display: 'block' } : { display: 'none' }}
            >
              商品類別：{product.length === 0 ? '' : product[2][0].bagType}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'B' ? { display: 'block' } : { display: 'none' }}
            >
              商品顏色：{product.length === 0 ? '' : product[2][0].bagColor}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'C' ? { display: 'block' } : { display: 'none' }}
            >
              商品調性：{product.length === 0 ? '' : product[3][0].clothSex}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'C' ? { display: 'block' } : { display: 'none' }}
            >
              商品季度：{product.length === 0 ? '' : product[3][0].clothSeason}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'C' ? { display: 'block' } : { display: 'none' }}
            >
              商品尺寸：{product.length === 0 ? '' : product[3][0].clothSize}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'S' ? { display: 'block' } : { display: 'none' }}
            >
              商品調性：{product.length === 0 ? '' : product[4][0].shoesSex}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'S' ? { display: 'block' } : { display: 'none' }}
            >
              商品年份：{product.length === 0 ? '' : product[4][0].shoesYear}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'S' ? { display: 'block' } : { display: 'none' }}
            >
              商品尺寸：{product.length === 0 ? '' : product[4][0].shoesSize}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'W' ? { display: 'block' } : { display: 'none' }}
            >
              商品調性：{product.length === 0 ? '' : product[5][0].watchSex}
            </Typography>
            <Typography
              className={classes.productInfo}
              style={catId === 'W' ? { display: 'block' } : { display: 'none' }}
            >
              商品類別：{product.length === 0 ? '' : product[5][0].watchType}
            </Typography>
            {/* ---------- 各類商品資訊 END ---------- */}

            <Typography className={classes.productInfo}>
              商品狀況：{product.length === 0 ? '' : product[0][0].productConditionDescription}
            </Typography>
            <Typography className={classes.productInfo}>
              付款方式：
              <CreditCardIcon
                color='inherit'
                fontSize='large'
              />
              信用卡
            </Typography>
          </div>
          <Card className={classes.productBidWrapper}>
            <BidFunc
              pId={pId}
              originPId={props.data.params.product_id}
              setBidState={handleBidState}
              bidTimes = {rows.length}
              nowBidPrice = {nowBidPrice}
            />
          </Card>
        </Grid>
        <Card component={Paper}>
          <Grid
            container='true'
            direction='row'
            justify='space-around'
            className={classes.store}
          >
            <CardMedia
              className={classes.storeMedia}
              image={`/imgs/sellerPic/${product.length === 0 ? '' : product[0][0].memberId}.jpg`}
            />
            <div className={classes.storeInfo}>
              <div className={classes.storeNameGroup}>
                <Link
                  className={classes.storeName}
                  href={`http://localhost:3000/${product.length === 0 ? '' : product[0][0].memberId}`}
                  underline='none'
                >
                  {product.length === 0 ? '' : product[0][0].shopName} 的賣場
                </Link>
              </div>
              <Typography variant='h4' className={classes.storeInfo}>
                {product.length === 0 ? '' : product[0][0].shopLevelDescription}
              </Typography>
            </div>
            <Button
              variant='contained'
              color='primary'
              className={classes.storeButton}
            >
              關於我
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.storeButton}
            >
              所有商品({product.length === 0 ? '' : product[6][0].itemNum})
            </Button>
          </Grid>
          <Typography
            container='true'
            direction='row'
            className={classes.infoAndHistory}
          >
            <Link
              className={classes.infoAndHistoryLink}
              onClick={handleToggleInfo}
            >
              商品資訊
            </Link>
            <Link
              className={classes.infoAndHistoryLink}
              onClick={handleToggleHistory}
            >
              出價紀錄
            </Link>
          </Typography>
          <Typography
            paragraph='true'
            className={classes.productDetail}
            style={toggle ? { display: 'block' } : { display: 'none' }}
          >
          {product.length === 0 ? '' : product[0][0].productDescription}
          </Typography>
          <TableContainer
            style={!toggle ? { display: 'block' } : { display: 'none' }}
            component={Paper}
            className={classes.table}
          >
            <Table aria-label='bidding-history-table'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.th}>出價者</TableCell>
                  <TableCell className={classes.th}>ID</TableCell>
                  <TableCell className={classes.th}>出價金額</TableCell>
                  <TableCell className={classes.th}>出價時間</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.biddingHistoryId}>
                    <TableCell className={classes.td} component='th' scope='row'>
                      {row.nickname}
                    </TableCell>
                    <TableCell className={classes.td}>{row.userId}</TableCell>
                    <TableCell className={classes.td}>{row.bidprice}</TableCell>
                    <TableCell className={classes.td}>{new Date(Date.parse(row.bidTime)).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  )
}

export default BidPage
