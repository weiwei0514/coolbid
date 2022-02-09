/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react'
import OrderTabs from './OrderTabs'
import '../../SASS/list.scss'
import '../../SASS/Components.scss'
// import Breadcrumbs from '../Main/Breadcrumbs'
import SellerBackendList from '../Main/SellerBackendList'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

const useStyles = makeStyles((theme) => ({
  itemTitle: {
    fontSize: 20
  },
  itemTxt: { fontSize: 16 },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    width: 800,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spacing: {
    width: 150
  },
  imgStyle: {
    width: 80
  }
}))

function getSteps() {
  return ['訂單成立', '撿貨中', '運送中', '已送達']
}

function OrderList() {
  const steps = getSteps()
  const [open, setOpen] = React.useState(false)
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  // 新增幣別切換 20200513 weiyy
  const currency = JSON.parse(window.sessionStorage.getItem('currency'))

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [data, setData] = useState([])
  const classes = useStyles()
  useEffect(() => {
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/BackStage/orders',
      'Content-Type': 'application/json',
      data: { id: userinfo.memberId }
    }).then((a) => setData(a.data))
  }, [])

  function OrderDate({ ordertime }) {
    const time = new Date(ordertime)
    time.setDate(time.getDate() + 7)
    const year = time.getFullYear()
    const month = time.getMonth()
    const date = time.getDate()
    return (
      <div>
        <span>{year}</span>
        <span>-{(month + 1).toString().padStart(2, '0')}</span>
        <span>-{date}</span>
      </div>
    )
  }

  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <SellerBackendList />
        </div>
        <div className="backstageRight">
          <div className="backstageRightContainer">
            <div className="breadcrumbsArea">
              賣家專區/商品訂單
              {/* <Breadcrumbs /> */}
            </div>
            <OrderTabs />
            <TableContainer className="Table_container">
              <Table className={classes.tableStyle}>
                <>
                  {data.map((item, index) => {
                    return (
                      <>
                        <TableHead key={index}>
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className={classes.itemTitle}
                            >
                              買家 : {item.userId}
                              {/* <FontAwesomeIcon icon={faCommentDots} /> */}
                            </TableCell>

                            <TableCell className={classes.itemTxt}>
                              訂單編號:{item.orderId}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              align="center"
                              className={classes.itemTitle}
                            >
                              圖片
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.itemTitle}
                            >
                              項目
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.itemTitle}
                            >
                              日期
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.itemTitle}
                            >
                              預計出貨時間
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.itemTitle}
                            >
                              價錢
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              align="center"
                              className={classes.itemTxt}
                            >
                              <img
                                src={'/imgs/' + item.productId + '.jpg'}
                                className={classes.imgStyle}
                              />
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.itemTxt}
                            >
                              <Link
                                className="linkStyle"
                                to={
                                  '/bidding/product/product?=' + item.productId
                                }
                              >
                                {item.productName}
                              </Link>
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.itemTxt}
                            >
                              {item.orderTime.substr(0, 10)}
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.itemTxt}
                            >
                              {' '}
                              <OrderDate ordertime={item.orderTime} />{' '}
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.itemTxt}
                            >
                              {currency === 'US' ? 'USD$' : 'NTD$'}
                              {currency === 'US'
                                ? Math.floor(item.nowPrice / 30)
                                : item.nowPrice}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell colSpan={4} className={classes.itemTxt}>
                              狀態:
                              <a
                                onClick={handleOpen}
                                style={{
                                  cursor: 'pointer',
                                  color: 'rgb(11, 96, 175)'
                                }}
                              >
                                {item.orderStatusSeller}
                              </a>
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.itemTxt}
                            >
                              總計:
                              {currency === 'US' ? 'USD$' : 'NTD$'}
                              {currency === 'US'
                                ? Math.floor(item.nowPrice)
                                : item.nowPrice}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            {/* <TableCell colSpan={5}>
                              <input
                                type="submit"
                                value="出貨"
                                className="button SetStoreInfo_Submit"
                              />
                            </TableCell> */}
                          </TableRow>
                        </TableBody>
                      </>
                    )
                  })}
                </>
              </Table>
            </TableContainer>
          </div>
          <>
            <Modal
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <Stepper alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label} className={classes.spacing}>
                        <StepLabel>
                          <h1>{label}</h1>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
              </Fade>
            </Modal>
          </>
        </div>
      </div>
    </div>
  )
}

export default OrderList
