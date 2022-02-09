import React, { useState } from 'react'
import '../style/notification.css'
import { $ } from 'react-jquery-plugin'
// icons
import CloseIcon from '@material-ui/icons/Close'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Tooltip from '@material-ui/core/Tooltip'

const iconStyle = {
  fontSize: '3.5rem',
  paddingBottom: '.5rem',
  paddingRight: '2rem'
}

export default () => {
  const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))

  const myData = [
    {
      id: 1,
      Title: '商品已送達1',
      info:
        '案1078、1079兩名機組員皆為華航貨機機組員，兩人感染的是英國變異株的接觸者中，161人為陰性，兩人待採檢中。',
      status: 1
    },
    {
      id: 2,
      Title: '商品已送達2',
      info:
        '案1078、1079兩名機組員皆為華航貨機機組員，兩人感染的是英國變異株的接觸者中，161人為陰性，兩人待採檢中。案1078、1079兩名機組員皆為華航貨機機組員，兩人感染的是英國變異株的接觸者中，161人為陰性，兩人待採檢中。案1078、1079兩名機組員皆為華航貨機機組員，兩人感染的是英國變異株的接觸者中，161人為陰性，兩人待採檢中。',
      status: 1
    },
    {
      id: 3,
      Title: '商品已送達3',
      info:
        '案1078、1079兩名機組員皆為華航貨機機組員，兩人感染的是英國變異株的接觸者中，161人為陰性，兩人待採檢中。',
      status: 1
    }
  ]

  // close each notification
  const [notificationData, setNotificationData] = useState(myData)
  // read & unread
  const handlerRead = (e, index) => {
    const newNotificationData = notificationData.map((item) => item)
    if (e.target.tagName === 'svg') {
      newNotificationData.splice(index, 1)
      setNotificationData(newNotificationData)
    } else {
      newNotificationData[index].status = 0
      setNotificationData(newNotificationData)
    }
  }

  let num = 0
  userinfo &&
    notificationData.forEach((item) => {
      const s = item.status
      num += s
    })

  // icon click toggle
  const handlerNotification = () => {
    $('#notificationContainer').toggle('slow')
  }

  return (
    <div>
      <span
        className="notificationNum"
        style={{ display: num !== 0 ? 'block' : 'none' }}
      >
        {num}
      </span>
      <Tooltip onClick={handlerNotification} title="Notification" arrow>
        <NotificationsIcon style={iconStyle} />
      </Tooltip>
      <div id="notificationContainer" className="notification-container">
        <h3 className="title">Notifications</h3>
        {notificationData.map((item, index) => {
          return (
            <div
              key={index}
              onClick={(e) => handlerRead(e, index)}
              className="notification"
              style={{ backgroundColor: item.status === 1 ? '#f3f9fd' : '' }}
            >
              <div className="img"></div>
              <div className="description">
                <h2 className="infoTitle">{item.Title}</h2>
                <p>{item.info}</p>
              </div>
              <CloseIcon className="close"></CloseIcon>
            </div>
          )
        })}
        <div className="seeMore">
          {num === 0 ? '目前沒有新的通知' : '查看更多'}
        </div>
      </div>
    </div>
  )
}
