/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { Container, Button, FormControl, Typography } from '@material-ui/core'
import useStyles from '../../../styles/bidFuncStyle'

const BidFunc = (props, { bidState }) => {
  const userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  // 新增幣別切換 20200511 weiyy
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))

  const { setBidState, nowBidPrice, bidTimes } = props
  const [productF, setProductF] = useState([])

  // 頁面載入撈資料
  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: `/product/${props.pId}`,
      'Content-Type': 'application/json'
    }).then((res) => {
      setProductF(res.data)
      console.log(res.data)
    })
  }, [bidState])

  const directBuyPrice = productF.length === 0 ? '' : productF[0][0].directPrice
  const bidPriceStep = productF.length === 0 ? '' : productF[0][0].perPrice
  const startBidPrice = productF.length === 0 ? '' : productF[0][0].startPrice
  let [directBidPrice, setDirectBidPrice] = useState(nowBidPrice + bidPriceStep)

  // 結標判斷
  let isBidDisable = false
  if (
    productF.length === 0
      ? ''
      : productF[0][0].nowPrice === directBuyPrice ||
        Date.parse(productF.length === 0 ? '' : productF[0][0].endTime) <=
          Date.now()
  ) {
    isBidDisable = true
  }

  const handleNowPriceChange = (e) => {
    setDirectBidPrice(e.target.value)
  }

  const handleDirectBidPriceChange = (e) => {
    const bidPrice = parseInt(e.target.value)
    setDirectBidPrice(currency === 'US' ? bidPrice * 30 : bidPrice)
  }

  // 直購
  const directBuy = () => {
    if (!userInfo) {
      swal('需登入才能使用競標功能喔').then((value) => {
        window.location.href = '/member/signin'
      })
    } else {
      directBidPrice = directBuyPrice

      swal({
        title: '確定要購買嗎？',
        text: '購買後不可任意棄標喔！',
        icon: 'warning',
        buttons: true
      }).then((confirmPurchased) => {
        if (confirmPurchased) {
          swal('感謝您的購買：）', {
            icon: 'success'
          }).then(() => {
            location.reload()

            axios({
            method: 'post',
            url: `http://localhost:3001/product/${props.originPId}`,
            'Content-Type': 'application/json',
            data: {
              isDirectBuy: true,
              isTimeUp: false,
              directBidPrice: directBidPrice,
              id: props.pId,
              memberId: userInfo.memberId,
              productStatusId: 5
            }
          }).then((res) => console.log(res.data))
          })
        } else {
          swal('再想想也沒關係唷～')
        }
      })
    }
  }

  // 下標
  const bidNow = () => {
    if (!nowBidPrice) directBidPrice = startBidPrice + bidPriceStep
    if (!directBidPrice) directBidPrice = nowBidPrice + bidPriceStep

    if (!userInfo) {
      swal('需登入才能使用競標功能喔').then((value) => {
        window.location.href = '/member/signin'
      })
    } else {
      if (
        directBidPrice < directBuyPrice &&
        directBidPrice >= nowBidPrice + bidPriceStep
      ) {
        swal({
          title: `直接出價成功，目前競標價 ${directBidPrice}元`,
          icon: 'success',
          button: '確認'
        })

        axios({
          method: 'post',
          url: `http://localhost:3001/product/${props.originPId}`,
          'Content-Type': 'application/json',
          data: {
            isDirectBuy: false,
            isTimeUp: false,
            directBidPrice: directBidPrice,
            id: props.pId,
            memberId: userInfo.memberId,
            productStatusId: 4
          }
        }).then((res) => console.log(res.data))
      } else {
        if (directBidPrice >= directBuyPrice) {
          swal({
            title: '確定要以直購價購買嗎？',
            text: '購買後不可任意棄標喔！',
            icon: 'warning',
            buttons: true
          }).then((confirmPurchased) => {
            if (confirmPurchased) {
              swal('感謝您的購買：）', {
                icon: 'success'
              }).then(() => {
                location.reload()

                axios({
                method: 'post',
                url: `http://localhost:3001/product/${props.originPId}`,
                'Content-Type': 'application/json',
                data: {
                  isDirectBuy: true,
                  isTimeUp: false,
                  directBidPrice: directBidPrice,
                  id: props.pId,
                  memberId: userInfo.memberId,
                  productStatusId: 5
                }
              }).then((res) => console.log(res.data))
              })
            } else {
              swal('再想想也沒關係唷～')
            }
          })
        }
      }
    }
  }

  // 省下多少錢
  // 新增幣別切換 20200511 weiyy

  const saveMoney = () => {
    const priceDiff = directBuyPrice - nowBidPrice
    return priceDiff <= 5000
      ? `${parseFloat(((1 - nowBidPrice / directBuyPrice) * 100).toFixed(2))}%`
      : `${directBuyPrice - nowBidPrice}元`
  }

  const classes = useStyles()

  return (
    <Container className={classes.bidFuncWrapper}>
      <Typography
        variant="h4"
        color="primary"
        onChange={handleNowPriceChange}
        className={classes.bidInfo}
      >
        {/* 新增幣別切換 20200512 weiyy */}
        目前出價： {currency === 'US' ? 'USD$' : 'NTD$'}
        {currency === 'US' ? Math.floor(nowBidPrice / 30) : nowBidPrice}元
      </Typography>
      <Typography variant="h4" color="primary" className={classes.bidInfo}>
        出價次數：{bidTimes}次
      </Typography>
      <Typography variant="h4" color="primary" className={classes.bidInfo}>
        出價增額： {currency === 'US' ? 'USD$' : 'NTD$'}
        {currency === 'US' ? Math.floor(bidPriceStep / 30) : bidPriceStep}元
      </Typography>
      <br />
      <hr />
      <br />
      <div className={classes.directBuyGroup}>
        <Typography
          variant="h5"
          color="secondary"
          className={classes.directBuy}
        >
          {currency === 'US' ? 'USD$' : 'NTD$'}{' '}
          {currency === 'US' ? Math.floor(directBuyPrice / 30) : directBuyPrice}
          元{' '}
        </Typography>
        <Button
          className={classes.buyBtn}
          onClick={() => {
            directBuy()
            setBidState(bidState + 1)
          }}
          variant="outlined"
          color="secondary"
        >
          直接購買
        </Button>
      </div>
      <br />
      <FormControl component="fieldset" className={classes.bidFuncGroup}>
        <input
          className={classes.priceInput}
          type="number"
          onChange={handleDirectBidPriceChange}
          min={
            nowBidPrice <= startBidPrice
              ? currency === 'US'
                ? Math.floor((startBidPrice + bidPriceStep) / 30)
                : startBidPrice + bidPriceStep
              : currency === 'US'
              ? Math.floor((nowBidPrice + bidPriceStep) / 30)
              : nowBidPrice + bidPriceStep
          }
          max={
            currency === 'US' ? Math.floor(directBuyPrice / 30) : directBuyPrice
          }
          step={
            currency === 'US' ? Math.floor(bidPriceStep / 30) : bidPriceStep
          }
          defaultValue={
            nowBidPrice <= startBidPrice
              ? (currency === 'US'
                ? Math.floor((startBidPrice + bidPriceStep) / 30)
                : startBidPrice + bidPriceStep)
              : (currency === 'US'
              ? Math.floor((nowBidPrice + bidPriceStep) / 30)
              : nowBidPrice + bidPriceStep)
          }
        />
        <Button
          className={classes.bidBtn}
          onClick={() => {
            bidNow()
            setBidState(bidState + 1)
          }}
          variant="outlined"
          color="primary"
          disableElevation
          disabled={isBidDisable}
        >
          直接出價
        </Button>
      </FormControl>
      <Typography variant="h4" color="primary" className={classes.save}>
        已省下 {saveMoney()}
      </Typography>
    </Container>
  )
}

export default BidFunc

// /////////////////////// with autobid /////////////////////////////////
//   bidNow = () => {
//   if (bidMethod === 'autoBid' && autoBidPrice >= nowBidPrice + bidPriceStep) {
//     swal({
//       title: `自動出價成功，最高價 ${autoBidPrice}`,
//       icon: 'success',
//       button: '確認'
//     })

//     axios({
//       method: 'post',
//       url: `http://localhost:3001/product/${props.originPId}`,
//       'Content-Type': 'application/json',
//       data: {
//         autoBidPrice: autoBidPrice
//       }
//     }).then(res => console.log(res.data))
//     // 當 autoBidPrice > nowBidPrice && nowBidPrice 的人 != 自己 => setNowBidPrice(parseInt(setNowBidPrice) + parseInt(bidPriceStep)) & bidTimes++
//   } else if (bidMethod === 'directBid' && directBidPrice >= nowBidPrice + bidPriceStep) {
//     if (directBidPrice < directBuyPrice) {
//       // setNowBidPrice(parseInt(directBidPrice))

//       swal({
//         title: `直接出價成功，目前競標價 ${directBidPrice}元`,
//         icon: 'success',
//         button: '確認'
//       })

//       axios({
//         method: 'post',
//         url: `http://localhost:3001/product/${props.originPId}`,
//         'Content-Type': 'application/json',
//         data: {
//           directBidPrice: directBidPrice,
//           id: props.pId
//         }
//       }).then(res => console.log(res.data))
//     } else {
//       if (directBidPrice >= directBuyPrice) {
//         swal({
//           title: '確定要以直購價購買嗎？',
//           text: '購買後不可任意棄標喔！',
//           icon: 'warning',
//           buttons: true
//         })
//           .then((confirmPurchased) => {
//             if (confirmPurchased) {
//               // 將商品狀態設為結標
//               // 更改商品頁
//               swal('感謝您的購買：）', {
//                 icon: 'success'
//               })
//             } else {
//               swal('再想想也沒關係唷～')
//             }
//           })
//       }
//     }
//   }
// }
