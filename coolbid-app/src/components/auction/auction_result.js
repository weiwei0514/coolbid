/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Backdrop from '@material-ui/core/Backdrop'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
})
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

function Row(props) {
  const { row } = props
  const [open, setOpen] = useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.productName}
        </TableCell>
        <TableCell align="right">{row.userId}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.time}</TableCell>
        <TableCell align="right">{row.times}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                競標紀錄
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>編號</TableCell>
                    <TableCell>會員編號</TableCell>
                    <TableCell align="right">價錢</TableCell>
                    <TableCell align="right">時間</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.bidHistory
                    .slice()
                    .reverse()
                    .map((historyRow, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.bidHistory.length - parseInt(index)}
                        </TableCell>
                        <TableCell>{historyRow.user}</TableCell>
                        <TableCell align="right">{historyRow.price}</TableCell>
                        <TableCell align="right">{historyRow.time}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function AuctionResult(props) {
  const { ws } = props
  const [result, setResult] = useState([])
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleToggle = () => {
    setOpen(!open)
  }
  // Add Comma In Price
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  useEffect(() => {
    const hammerDown = () => {
      handleToggle()
    }

    const nowHammer = (obj) => {
      if (obj.length === 0) return
      const result = obj.map((item) => item)
      setResult(result)
    }

    if (ws) {
      ws.on('nowHammer', nowHammer)
      ws.on('hammerDown', hammerDown)
    }

    return () => {
      if (ws) {
        ws.off('nowHammer', nowHammer)
        ws.off('hammerDown', hammerDown)
      }
    }
  }, [ws, result])

  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={handleClose}
        style={{ display: 'block', textAlign: 'center' }}
      >
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_sq9m7b0a.json"
          background="transparent"
          speed="1"
          style={{ width: '300px', height: '300px', margin: 'auto' }}
          loop
          autoplay
        ></lottie-player>
        <h3>
          商品：
          {result.length === 0 ? '' : result[result.length - 1].productName}
        </h3>
        <h3>
          得標者：{result.length === 0 ? '' : result[result.length - 1].userId}
        </h3>
        <h3>
          得標金額：
          {result.length === 0
            ? ''
            : numberWithCommas(result[result.length - 1].price)}
        </h3>
      </Backdrop>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>商品名稱</TableCell>
              <TableCell align="right">得標者</TableCell>
              <TableCell align="right">得標金額</TableCell>
              <TableCell align="right">結標時間</TableCell>
              <TableCell align="right">出價次數</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
