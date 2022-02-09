const express = require('express')
const app = express()
const cors = require('cors')
const moment = require('moment')

app.use(cors())
//將 express 放進 http 中開啟 Server 的 3000 port ，正確開啟後會在 console 中印出訊息
const server = require('http')
  .Server(app)
  .listen(3002, () => {
    console.log('open server!')
  })

//將啟動的 Server 送給 socket.io 處理
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

/*上方為此寫法的簡寫：
  const socket = require('socket.io')
  const io = socket(server)
*/
const productName = ['Air Jordan 1 Dior', 'PlayStation 5','Rolex手錶','Supreme行李箱']
let timer = 0
let online = 0
let nowPrice = []
const allMessage = []
let auctionNo = 0
const result = []
const hammerDown = () => {
  let obj = {
    productName: productName[auctionNo],
    userId: nowPrice[nowPrice.length - 1].user,
    price: nowPrice[nowPrice.length - 1].price,
    time: nowPrice[nowPrice.length - 1].time,
    times: nowPrice.length,
    bidHistory: nowPrice
  }
  result.push(obj)
}

// 監聽現在時間與結標時間
const listenDeadline = () => {
  if (nowPrice.length === 0) {
    console.log('notYet')
  } else {
    if (
      moment().format('LTS') ===
      moment(nowPrice[nowPrice.length - 1].deadline).format('LTS')
    ) {
      hammerDown()
      io.emit('nowHammer', result)
      nowPrice = []
      io.emit('nowPrice', nowPrice)
      auctionNo += 1
      io.emit('hammerDown','')
      io.emit('nowProduct', productName[auctionNo])
      return
    }
    console.log(
      moment(nowPrice[nowPrice.length - 1].deadline).format('LTS'),
      moment().format('LTS')
    )
  }

  timer = setTimeout(() => {
    listenDeadline()
  }, 1000)
}
//監聽 Server 連線後的所有事件，並捕捉事件 socket 執行
io.on('connection', (socket) => {
  // client進入後傳目前出價紀錄
  socket.emit('nowPrice', nowPrice)
  socket.emit('nowMsg', allMessage)
  socket.emit('nowHammer', result)
  socket.emit('nowProduct', productName[auctionNo])
  // online+=1
  // console.log(online)

  //監聽透過 connection 傳進來的事件
  socket.on('getBid', (obj) => {
    io.emit('getBid', obj)
    nowPrice.push(obj)
    console.log(nowPrice)
    clearTimeout(timer)
    listenDeadline()
  })

  socket.on('sendMsg', (message) => {
    io.emit('sendMsg', message)
    allMessage.push(message)
  })

})
