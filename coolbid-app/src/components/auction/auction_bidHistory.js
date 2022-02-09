/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import gavel from '../../gavel.png'
import swal from 'sweetalert'

const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))

function BidHistory(props) {
  const { ws, user } = props
  const [bidMsg, setBidMsg] = useState([])
  const [bidPrice, setBidPrice] = useState(0)
  const [bidStep, setBidStep] = useState(100)
  const [product, setProduct] = useState('')
  const initTime = 10
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const options = [
    'NT$ ' + numberWithCommas(bidStep),
    'NT$ ' + numberWithCommas(bidStep * 3),
    'NT$ ' + numberWithCommas(bidStep * 5),
    'NT$ ' + numberWithCommas(bidStep * 10)
  ]

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }
  // Bidding Button
  const handleBidding = (index) => {
    if (userinfo) {
      let price = 0
      switch (index) {
        case 0:
          price = bidStep
          break
        case 1:
          price = bidStep * 3
          break
        case 2:
          price = bidStep * 5
          break
        case 3:
          price = bidStep * 10
          break
        default:
      }
      const newPrice = bidPrice + price

      const np = {
        user: user.userId,
        price: newPrice,
        time: moment().format('LTS'),
        deadline: moment().add(initTime, 's')
      }

      ws.emit('getBid', np)
    } else {
      swal({
        title: '請先登入',
        text: '請先登入才能參與拍賣哦',
        icon: 'warning',
        button: '確認'
      })
    }
  }

  // Add Comma In Price
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  useEffect(() => {
    const nowPrice = (obj) => {
      if (obj.length === 0) {
        setBidMsg([])
        setBidPrice(0)
      } else {
        setBidPrice(obj[obj.length - 1].price)
        const newMsg = obj.map((item) => item)
        setBidMsg(newMsg)
      }
    }
    const getBid = (obj) => {
      setBidPrice(obj.price)
      setBidMsg((prev) => [...prev, obj])
    }

    const nowProduct = (product) => {
      setProduct(product)
    }

    if (ws) {
      ws.on('nowPrice', nowPrice)
      ws.on('getBid', getBid)
      ws.on('nowProduct', nowProduct)
    }

    return () => {
      if (ws) {
        ws.off('nowPrice', nowPrice)
        ws.off('getBid', getBid)
        ws.off('nowProduct', nowProduct)
      }
    }
  }, [ws])

  // Listen To bidPrice, And Reset The BidStep
  useEffect(() => {
    if (bidPrice === 0) {
      setBidStep(100)
    }
    if (bidPrice >= bidStep * 100) {
      setBidStep(bidStep * 10)
    }
  }, [bidPrice])

  return (
    <div style={{ height: '100%' }}>
      <Card
        style={{
          height: '77vh',
          backgroundColor: '#f9f9f9',
          borderRadius: '0px 0px 3px 3px'
        }}
      >
        <Card
          style={{
            height: 'auto',
            padding: '0 10px',
            backgroundColor: '#fff',
            borderRadius: '3px 3px 0px 0px',
            boxShadow: '0 5px 20px rgba(0,0,0,.2) '
          }}
        >
          <h4 style={{ margin: '1rem 0' }}>目前競標商品：{product}</h4>
          <h4 style={{ margin: '1rem 0' }}>
            最高出價者：
            {bidMsg.length === 0 ? '' : bidMsg[bidMsg.length - 1].user}
          </h4>
          <h4 style={{ margin: '1rem 0' }}>
            目前最高價：NT${' '}
            {bidMsg.length === 0 ? 0 : numberWithCommas(bidPrice)}
          </h4>
        </Card>
        <div style={{ height: '80%', overflow: 'scroll', paddingLeft: '20px' }}>
          <ol reversed style={{ listStyle: `square inside url(${gavel})` }}>
            {bidMsg
              .slice()
              .reverse()
              .map((item, index) => (
                <li key={index}>
                  {item.user} - {numberWithCommas(item.price)}元
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    &nbsp;({item.time})
                  </Typography>
                </li>
              ))}
          </ol>
        </div>
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{
            position: 'sticky',
            height: '60px',
            bottom: '0',
            backgroundColor: '#fff',
            paddingTop: '15px',
            boxShadow: '0 -5px 20px rgba(0,0,0,.2) '
          }}
        >
          <span style={{ marginTop: '5px' }}>出價</span>
          <Grid item xs={12}>
            <ButtonGroup
              variant="contained"
              color="primary"
              ref={anchorRef}
              aria-label="split button"
            >
              <Button onClick={() => handleBidding(selectedIndex)}>
                {options[selectedIndex]}
              </Button>
              <Button
                color="primary"
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom'
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu">
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            // disabled={index === 2}
                            selected={index === selectedIndex}
                            onClick={(event) =>
                              handleMenuItemClick(event, index)
                            }
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default BidHistory
