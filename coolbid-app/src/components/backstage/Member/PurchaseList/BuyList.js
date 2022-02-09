import React, { useState, useEffect } from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import OrderTabs from '../../Order22/OrderTabs'
import '../../../SASS/list.scss'
import '../../../SASS/Components.scss'
import '../../../SASS/Main.scss'
import NestedList from '../../Main/MemberList'
import axios from 'axios'
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Breadcrumbs,
  Link,
  Modal,
  Backdrop,
  Fade,
  Stepper,
  Step,
  StepLabel
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  itemTitle: {
    fontSize: 20
  },
  itemTxt: {
    fontSize: 16
  },
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
  },
  breadcrumb: {
    padding: '2rem 0',
    fontSize: '2rem'
  }
}))

const getSteps = () => {
  return ['訂單成立', '撿貨中', '運送中', '已送達']
}

const BuyList = () => {
  const userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
  console.log(userInfo.memberId)

  const steps = getSteps()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const classes = useStyles()
  const [data, setData] = useState([])
  useEffect(() => {
    axios({
      method: 'post',
      baseURL: 'http://localhost:3001',
      url: '/member/purchase',
      'Content-Type': 'application/json',
      data: {
        memberId: userInfo.memberId
      }
    }).then(res => setData(res.data))
  }, [])

  console.log(data)
  let totPrice = 0
  data.map(item => {
    totPrice += item.nowPrice
    return totPrice
  })

  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <NestedList />
        </div>
        <div className="backstageRight">
          <div className="backstageRightContainer">
            <Breadcrumbs aria-label='breadcrumb' className={classes.breadcrumb}>
                <Link color='inherit' href='http://localhost:3000/member/edit'>
                  會員中心
                </Link>
                <Link color='inherit' href='http://localhost:3000/member/purchase'>
                  購買清單
                </Link>
              </Breadcrumbs>
            <div>
              <OrderTabs />
              <TableContainer className="Table_container">
                <Table>
                  {data.map((item, index) => {
                    return (
                      <>
                        <TableHead key={index}>
                          <TableRow>
                            <TableCell colSpan={4} className={classes.itemTxt}>
                              賣家：{item.shopName}{' '}
                              <FontAwesomeIcon icon={faCommentDots} />
                            </TableCell>
                            <TableCell className={classes.itemTxt}>
                              訂單編號：{item.orderId}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              align='center'
                              className={classes.itemTitle}
                            >
                              圖片
                            </TableCell>
                            <TableCell
                              align='center'
                              className={classes.itemTitle}
                            >
                              項目
                            </TableCell>
                            <TableCell
                              align='center'
                              className={classes.itemTitle}
                            >
                              日期
                            </TableCell>
                            <TableCell
                              align='center'
                              className={classes.itemTitle}
                            >
                              狀態
                            </TableCell>
                            <TableCell
                              align='center'
                              className={classes.itemTitle}
                            >
                              價錢
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          <TableRow>
                            <TableCell
                              align='center'
                              className={classes.itemTxt}
                            >
                              <img
                                src={'/imgs/' + item.productId + '.jpg'}
                                className={classes.imgStyle}
                              />
                            </TableCell>
                            <TableCell
                              align='center'
                              className={classes.itemTxt}
                            >
                              {item.productName}
                            </TableCell>
                            <TableCell
                              align='center'
                              className={classes.itemTxt}
                            >
                              {new Date(
                                Date.parse(item.orderTime)
                              ).toLocaleString()}
                            </TableCell>
                            <TableCell
                              align='center'
                              className={classes.itemTxt}
                            >
                              訂單成立
                            </TableCell>
                            <TableCell
                              align='center'
                              className={classes.itemTxt}
                            >
                              {item.nowPrice}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell colSpan={4} className={classes.itemTxt}>
                              狀態：
                              <a
                                onClick={handleOpen}
                                style={{
                                  cursor: 'pointer',
                                  color: 'rgb(11, 96, 175)'
                                }}
                              >
                                {item.orderStatusBuyer}
                              </a>
                              &emsp;
                              {new Date(
                                Date.parse(item.orderStatusDate)
                              ).toLocaleString()}
                            </TableCell>
                            {/* <TableCell
                              align='center'
                              className={classes.itemTxt}
                            >
                              總計：{totPrice} 元
                            </TableCell> */}
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={5}>
                              <input
                                type='submit'
                                value='完成訂單'
                                className='button SetStoreInfo_Submit'
                              />
                              <input
                                type='submit'
                                value='評價'
                                className='button SetStoreInfo_Submit'
                              />

                              <input
                                type='submit'
                                value='退貨/退款'
                                className='button SetStoreInfo_Submit'
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </>
                    )
                  })}
                </Table>
              </TableContainer>
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
      </div>
    </div>
  )
}

export default BuyList
