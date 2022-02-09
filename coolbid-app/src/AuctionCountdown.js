import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import './components/auction/carousel.css'
import styled from '@emotion/styled'

const useStyles = makeStyles({
  container: {
    color: '#fff',
    margin: '0 auto',
    textAlign: 'center'
  },
  h1: {
    fontWeight: 'normal',
    letterSpacing: '.125rem',
    textTransform: 'uppercase'
  },
  li: {
    display: 'inline-block',
    fontSize: '3em',
    listStyleType: 'none',
    padding: '1em',
    textTransform: 'uppercase'
  },
  span: {
    display: 'block',
    fontSize: '5rem'
  }
})

const AuctionDay = styled.div`
  text-align: center;
  font-size:2rem;
  color: #fff;
  margin-bottom:4rem;
  letter-spacing:10px;
  &::after{
    content:"";
    width:100px;
    border-bottom:1px solid #fff;
    display:inline-block;
    position:relative;
    top:-6px;
    margin-left:1rem;
  }
  &::before{
    content:"";
    width:100px;
    border-bottom:1px solid #fff;
    display:inline-block;
    position:relative;
    top:-6px;
    margin-right:1rem;
  }
`

const slides = [
  {
    title: 'Nike Air Jordan 1',
    subtitle: 'Dior',
    // description: 'Adventure is never far away',
    image:
      'https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/methode/2020/07/21/369bac56-ca47-11ea-9c1b-809cdd34beb3_image_hires_154102.jpg?itok=in54a9qU&v=1595317268'
  },
  {
    title: 'SUPREME X RIMOWA',
    subtitle: 'Suitcase',
    // description: 'Let your dreams come true',
    image: 'https://assets.juksy.com/files/articles/78342/5af28356d3beb.png'
  },
  {
    title: 'Nike Air Yeezy 2',
    subtitle: 'Red October',
    // description: 'A piece of heaven',
    image:
      'https://images.solecollector.com/complex/image/upload/kvna8scidfkdl9jtsbph.jpg'
  },
  {
    title: 'FDMTL X MEDICOM TOY',
    subtitle: 'BE@RBRICK',
    // description: 'A piece of heaven',
    image:
      'https://image-cdn.hypb.st/https%3A%2F%2Fhk.hypebeast.com%2Ffiles%2F2020%2F05%2Ffdmtl-x-medicom-toy-boro-bearbrick-1000-release-info2.jpg?quality=95&w=1170&cbr=1&q=90&fit=max'
  },
  {
    title: 'Hermès Birkin bag',
    subtitle: 'matte crocodile skin',
    // description: 'A piece of heaven',
    image:
      'https://economictimes.indiatimes.com/thumb/msid-60985352,width-1200,height-900,resizemode-4,imgsize-183073/heres-why-a-herms-birkin-bag-has-been-making-headlines.jpg?from=mdr'
  }
]

const useTilt = (active) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (!ref.current || !active) {
      return
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined
    }

    const el = ref.current

    const handleMouseMove = (e) => {
      if (!el) {
        return
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect()
      }
      state.mouseX = e.clientX
      state.mouseY = e.clientY
      const px = (state.mouseX - state.rect.left) / state.rect.width
      const py = (state.mouseY - state.rect.top) / state.rect.height

      el.style.setProperty('--px', px)
      el.style.setProperty('--py', py)
    }

    el.addEventListener('mousemove', handleMouseMove)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
    }
  }, [active])

  return ref
}

const initialState = {
  slideIndex: 0
}

const slidesReducer = (state, event) => {
  if (event.type === 'NEXT') {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length
    }
  }
  if (event.type === 'PREV') {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
    }
  }
}

const Slide = ({ slide, offset }) => {
  const active = offset === 0 ? true : null
  const ref = useTilt(active)

  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        '--offset': offset,
        '--dir': offset === 0 ? 0 : offset > 0 ? 1 : -1
      }}
    >
      <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      />
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      >
        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.title}</h2>
          <h3 className="slideSubtitle">{slide.subtitle}</h3>
          <p className="slideDescription">{slide.description}</p>
        </div>
      </div>
    </div>
  )
}

const AuctionCountdown = () => {
  const classes = useStyles()
  const [time, setTime] = useState(false)
  const [timer, setTimer] = useState()
  const [state, dispatch] = React.useReducer(slidesReducer, initialState)
  const auctionDay = moment('2021-5-28 16:00:00')
  const countdown = () => {
    const now = moment()
    const difference = auctionDay.diff(now)
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    if (difference < 1000) {
      setTime({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      })
      setTimeout(() => {
        window.location.href = '/auction'
      }, 1000)
    } else {
      setTime({
        days: Math.floor(difference / day),
        hours: Math.floor((difference % day) / hour),
        minutes: Math.floor((difference % hour) / minute),
        seconds: Math.floor((difference % minute) / second)
      })
      setTimer(setTimeout(countdown, 1000))
    }
  }

  useEffect(() => {
    clearTimeout(timer)
    countdown()
  }, [])

  return (
    <div
      style={{
        height: '80vh',
        marginTop: '120px',
        background: '#151515',
        overflowY: 'scroll',
        overflowX: 'hidden'
      }}
    >
      <div className={classes.container}>
        <div id="countdown" style={{}}>
          <ul style={{ margin: '0' }}>
            <li className={classes.li}>
              <span className={classes.span} id="days">
                {time ? time.days : '0'}
              </span>
              days
            </li>
            <li className={classes.li}>
              <span className={classes.span} id="hours">
                {time ? time.hours : '0'}
              </span>
              Hours
            </li>
            <li className={classes.li}>
              <span className={classes.span} id="minutes">
                {time ? time.minutes : '0'}
              </span>
              Minutes
            </li>
            <li className={classes.li}>
              <span className={classes.span} id="seconds">
                {time ? time.seconds : '0'}
              </span>
              Seconds
            </li>
          </ul>
        </div>
      </div>
      <AuctionDay>2021/05/28 (五) 16:00PM</AuctionDay>
      <div className="slides">
        <button onClick={() => dispatch({ type: 'NEXT' })}>‹</button>

        {[...slides, ...slides, ...slides].map((slide, i) => {
          const offset = slides.length + (state.slideIndex - i)
          return <Slide slide={slide} offset={offset} key={i} />
        })}
        <button onClick={() => dispatch({ type: 'PREV' })}>›</button>
      </div>
    </div>
  )
}

export default AuctionCountdown
