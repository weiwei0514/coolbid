import React from 'react'

import {
  Container,
  Breadcrumbs,
  Link,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core'

import useStyles from '../../../styles/bidPageHistoryStyle'

import BidFunc from './bidFunc' // bidding function

const handleClick = () => {}

const createData = (name, ID, bid, time) => {
  return { name, ID, bid, time }
}

const rows = [
  createData('Len', 'LEN', '31,800元', '2021/05/04 21:34'),
  createData('偶是瑋瑋~', 'WEIWEI', '30,000元', '2021/05/04 11:57'),
  createData('慈慈', 'JOU', '28,500元', '2021/05/02 09:06'),
  createData('叛逆a維婷', 'WEIYYY', '27,000元', '2021/05/01 15:03')
]

const BidPage = () => {
  const classes = useStyles()

  return (
    <>
      <Container className={classes.root}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link color='inherit' href='/bidding' onClick={handleClick}>
            Home Page
          </Link>
          <Link color='inherit' href='/bidding/category' onClick={handleClick}>
            Bags
          </Link>
          <Link
            color='textPrimary'
            href='/bidding/category/product'
            onClick={handleClick}
            aria-current='page'
          >
            Supreme x Louis Vuitton Christopher Backpack
          </Link>
        </Breadcrumbs>
        <Grid
          className={classes.productWrapper}
          container='true'
          direction='row'
        >
          <Card className={classes.productImageWrapper}>
            <CardActionArea>
              <div className={classes.mainMediaWrapper}>
                <CardMedia
                  className={classes.mainMedia}
                  image='https://www.supremetw.com.tw/goods/images/supreme-backpack/20180516/9f677276a14605b81ba77ceb40676368.jpg'
                />
              </div>
              <div className={classes.smallMediaWrapper}>
                <CardMedia
                  className={classes.smallMedia}
                  image='https://www.supremetw.com.tw/goods/images/supreme-backpack/20180516/9f677276a14605b81ba77ceb40676368.jpg'
                />
                <CardMedia
                  className={classes.smallMedia}
                  image='https://www.supremetw.com.tw/goods/images/supreme-backpack/20180516/f838499cabb02f038c3ca1a92b24c1fe.jpg'
                />
                <CardMedia
                  className={classes.smallMedia}
                  image='https://www.supremetw.com.tw/goods/images/supreme-backpack/20180516/f838499cabb02f038c3ca1a92b24c1fe.jpg'
                />
                <CardMedia
                  className={classes.smallMedia}
                  image='https://www.supremetw.com.tw/goods/images/supreme-backpack/20180516/49744594c9f4a427321924705497bd66.jpg'
                />
              </div>
            </CardActionArea>
          </Card>
          <div className={classes.productInfoWrapper}>
            <Typography variant='h2' className={classes.productTitle}>
              Supreme x Louis Vuitton <br />
              Christopher Backpack
            </Typography>
            <Typography variant='h4' className={classes.productInfo}>
              剩下 6天6小時 結束
            </Typography>
            <Typography variant='h4' className={classes.productInfo}>
              最高出價：Len
            </Typography>
            <Typography variant='h4' className={classes.productInfo}>
              商品狀況：九成新
            </Typography>
            <Typography variant='h4' className={classes.productInfo}>
              商品顏色：紅色
            </Typography>
            <Typography variant='h4' className={classes.productInfo}>
              運送方式：宅配 店到店
            </Typography>
            <Typography variant='h4' className={classes.productInfo}>
              付款方式：信用卡
            </Typography>
            <Typography variant='h4' className={classes.productInfo}>
              退貨方式：不接受退貨
            </Typography>
          </div>
          <Card className={classes.productBidWrapper}>
            <BidFunc />
          </Card>
        </Grid>
        <Card component={Paper}>
          <Grid
            container='true'
            direction='row'
            justify='space-around'
            className={classes.store}
          >
            <img
              className={classes.storeMedia}
              src='https://crazypetter.com.tw/wp-content/uploads/2019/07/BLOW-%E6%88%90%E9%95%B7%E5%8F%B2_190413_0911.jpg'
            />
            <div className={classes.storeInfo}>
              <div className={classes.storeNameGroup}>
                <Typography variant='h3' className={classes.storeName}>
                  LEN 的商店
                </Typography>
                <Button
                  variant='outlined'
                  color='primary'
                  className={classes.follow}
                >
                  Follow
                </Button>
              </div>
              <Typography variant='h4' className={classes.storeInfo}>
                金槌賣家
              </Typography>
              <Typography variant='h4' className={classes.storeInfo}>
                粉絲：666
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
              買家評價(3856)
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.storeButton}
            >
              所有商品(87)
            </Button>
          </Grid>
          <Typography
            container='true'
            direction='row'
            className={classes.infoAndHistory}
          >
            <Link href='#' className={classes.infoAndHistoryLink}>
              商品資訊
            </Link>
            <Link href='#' className={classes.infoAndHistoryLink}>
              出價紀錄
            </Link>
          </Typography>
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label='simple table'>
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
                  <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell>{row.ID}</TableCell>
                    <TableCell>{row.bid}</TableCell>
                    <TableCell>{row.time}</TableCell>
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
