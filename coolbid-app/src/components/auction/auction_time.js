/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react'
import moment from 'moment'
// import { makeStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
// import Typography from '@material-ui/core/Typography'
import '../auction/countdown.css'

const FULL_DASH_ARRAY = 283
const WARNING_THRESHOLD = 5
const ALERT_THRESHOLD = 3

const COLOR_CODES = {
  info: {
    color: 'green'
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD
  }
}

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1
//   }
// })

function AuctionTime(props) {
  const { ws } = props
  const initTime = 10
  const [deadline, setDeadline] = useState(moment())
  const [time, setTime] = useState(initTime)
  const [timerId, setTimerId] = useState()
  // const classes = useStyles()
  // const [product, setProduct] = useState('')
  const [circle, setCircle] = useState(283)
  const [color, setColor] = useState('green')

  function setRemainingPathColor(timeLeft) {
    const { alert, warning } = COLOR_CODES
    if (timeLeft <= alert.threshold) {
      setColor('red')
    } else if (timeLeft <= warning.threshold) {
      setColor('orange')
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = time / initTime
    return rawTimeFraction - (1 / initTime) * (1 - rawTimeFraction)
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`
    setCircle(circleDasharray)
    console.log(circle)
  }

  const countdown = () => {
    const now = moment()
    const s = deadline.diff(now, 'seconds') % 60
    setTime(s)
    setRemainingPathColor(s)
    if (s <= 0) {
      clearTimeout(timerId)
      setTime(0)
    }

    if (s > 0) {
      setTimerId(
        setTimeout(() => {
          countdown()
        }, 1000)
      )
    }
  }
  useEffect(() => {
    setCircleDasharray()
  }, [time])
  // When New Bid Is In, Reset The Countdown Time
  useEffect(() => {
    if (ws) {
      clearTimeout(timerId)
      countdown()
    }
  }, [deadline])

  // Listen To WebSocket
  useEffect(() => {
    const nowPrice = (obj) => {
      if (obj.length !== 0) {
        setDeadline(moment(obj[obj.length - 1].deadline))
      }
    }

    const getBid = (obj) => {
      setDeadline(moment().add(initTime, 's'))
      setColor('green')
    }

    const nowProduct = (product) => {
      // setProduct(product)
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

  return (
    <>
      <div className="base-timer">
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              id="base-timer-path-remaining"
              strokeDasharray={circle}
              className={`base-timer__path-remaining ${color}`}
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">
          {time}
        </span>
      </div>
      <iframe
        width="100%"
        src="https://www.youtube.com/embed/dw_aYDwEv6k?autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{ marginTop: '20px', height: '100%' }}
      ></iframe>
      {/* <Card
        className={classes.root}
        style={{ position: 'absolute', bottom: '0' }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="300"
            image="https://cdn-origin.cool-style.com.tw/cool/2020/08/2020-Air-Jordan-1-High-OG-Dior-Wolf-Grey-Sail-Photon-Dust-White-To-Buy.jpg"
            title={product}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              French fashion label Dior is set to release an extremely limited
              Air Jordan 1 during Summer 2020 with a hefty price tag. This Dior
              x Air Jordan 1 features a White and Grey upper with “Air Dior”
              branding on the tongues and above the Wings logo. An all-over
              printed Swoosh logo on the sides atop a co-branded icy translucent
              outsole with a Silver Jumpman and “Air Dior” Wings hangtag
              completes the design.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card> */}
    </>
  )
}

export default AuctionTime
