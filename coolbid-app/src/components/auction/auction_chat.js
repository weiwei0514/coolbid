/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import SendIcon from '@material-ui/icons/Send'
import Fab from '@material-ui/core/Fab'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '90%',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    overflow: 'scroll',
    wordBreak: 'break-all'
  },
  inline: {
    display: 'inline-block'
  }
}))

function Chat(props) {
  const { ws, user } = props
  const [text, setText] = useState('')
  const [allMsg, setAllMsg] = useState([])
  const classes = useStyles()
  const [msgFlag, setMsgFlag] = useState('none')
  const [isMsgAtBottom, setIsMsgAtBottom] = useState(true)
  console.log(user)
  // Hint For Message Is In, When Client's MsgBox Isn't At Bottom, Click Can To Bottom
  const handleMsgToBottom = () => {
    const element = document.getElementById('msgBox')
    element.scrollTop = element.scrollHeight - element.clientHeight
    setMsgFlag('none')
    setIsMsgAtBottom(true)
  }

  // When Message Is In, Scroll MsgBox To Bottom
  const handleScroll = () => {
    const element = document.getElementById('msgBox')
    if (isMsgAtBottom) {
      element.scrollTop = element.scrollHeight - element.clientHeight
    } else {
      setMsgFlag('block')
    }
  }

  // Press Icon To Send Message
  const handleSend = () => {
    if (text === '') {
      return
    }
    const msg = {
      user: user.nickname,
      text: text,
      time: moment().format('LTS'),
      memberId: user.memberId
    }
    ws.emit('sendMsg', msg)
    setText('')
  }

  // Press Enter To Send Message
  const handleSendMsg = (e) => {
    if (text === '') {
      return
    }

    if (e.keyCode === 13) {
      handleSend()
    }
  }

  // Listen To WebSocket
  useEffect(() => {
    const nowMsg = (message) => {
      if (message.length !== 0) {
        const newMsg = message.map((item) => item)
        setAllMsg(newMsg)
      }
    }

    const sendMsg = (message) => {
      setAllMsg((prev) => [...prev, message])
    }

    if (ws) {
      ws.on('nowMsg', nowMsg)
      ws.on('sendMsg', sendMsg)
    }

    return () => {
      if (ws) {
        ws.off('nowMsg', nowMsg)
        ws.off('sendMsg', sendMsg)
      }
    }
  }, [ws])

  useEffect(() => {
    handleScroll()
  }, [allMsg])

  return (
    <Card
      style={{
        height: '100%'
      }}
    >
      <List
        className={classes.root}
        id="msgBox"
        onScroll={() => {
          const element = document.getElementById('msgBox')
          setIsMsgAtBottom(
            element.scrollTop + element.clientHeight === element.scrollHeight
          )
        }}
      >
        {allMsg.map((item, index) => (
          <li key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={item.user + 'Sharp'}
                  src={`/imgs/sellerPic/${item.memberId}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.text}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="overline"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.user} -
                    </Typography>{' '}
                    <Typography
                      component="span"
                      variant="caption"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.time}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </li>
        ))}
        <Fab
          color="primary"
          style={{
            display: msgFlag,
            position: 'sticky',
            bottom: '30px',
            margin: 'auto'
          }}
          variant="extended"
          onClick={handleMsgToBottom}
        >
          有新的留言
        </Fab>
      </List>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          position: 'sticky',
          bottom: '0',
          textAlign: 'center'
        }}
      >
        <Input
          placeholder="請輸入文字"
          inputProps={{ 'aria-label': 'description' }}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          onKeyDown={(e) => handleSendMsg(e)}
          // eslint-disable-next-line quotes
          style={{ width: `calc(100% - 34px)`, marginRight: '10px' }}
        />
        <SendIcon
          color="primary"
          style={{ cursor: 'pointer' }}
          onClick={handleSend}
        />
      </div>
    </Card>
  )
}

export default Chat
