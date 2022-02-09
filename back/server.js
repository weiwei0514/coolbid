var express = require('express')
var multer = require('multer')
var app = express()
const cors = require('cors')

app.use(express.json())
app.listen(3001)

var mysql = require('mysql')
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'coolbid',
  port: 8889,
  multipleStatements: true
})
//-----------------------------------------------------
// 設置session
// app.use(
//   session({
//     key: 'user',
//     secret: 'secretKey',
//     // store: new FileStore(),
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       path: '/',
//       httpOnly: true,
//       secure: false,
//       maxAge: 10 * 60 * 1000
//     }
//   })
// )

//////////////////// RSA Crypto - Len 2021/5/9 ////////////////////
var NodeRSA = require('node-rsa')
var fs = require('fs')

// Generate Key Pair
function generator() {
  const key = new NodeRSA({ b: 512 })
  key.setOptions({ encryptionScheme: 'pkcs1' })

  const privatePem = key.exportKey('pkcs1-private-pem')
  const publicPem = key.exportKey('pkcs1-public-pem')

  fs.writeFile('./pem/public.pem', publicPem, (err) => {
    if (err) throw err
  })
  fs.writeFile('./pem/private.pem', privatePem, (err) => {
    if (err) throw err
  })
}

// Encrypt
function encrypt(msg) {
  const data = fs.readFileSync('./pem/private.pem')
  const key = new NodeRSA(data)
  var cipherText = key.encryptPrivate(msg, 'base64')
  return cipherText
}

// Decrypt
function decrypt(cryptoMsg) {
  const data = fs.readFileSync('./pem/public.pem')
  const key = new NodeRSA(data)
  var rawText = key.decryptPublic(cryptoMsg, 'utf8')
  return rawText
}
///////////////////////////////////////////////////////////////////

// session要跨域
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)

// 送登入資料去前端
app.post('/member/signin', function (req, res) {
  let sql = 'select * from member where userId=? and password=?'
  conn.query(
    sql,
    [req.body.memberId, encrypt(req.body.password)],
    function (err, result) {
      if (err) console.log(err)
      else if (result[0]) {
        // req.session.user = result
        res.send(result[0])
      } else res.send('')
    }
  )
})

// read memberInfo
app.post('/member/edit', function (req, res, next) {
  const zipData = fs.readFileSync('./addr/taiwan_districts.json')
  const { memberId } = req.body

  conn.query(
    'SELECT * FROM `member` WHERE memberId = ?; SELECT * FROM `address` AS a join zipcode AS z ON z.zipcodeId = a.zipcodeId WHERE memberId = ?',
    [memberId, memberId],
    function (err, result) {
      result.push(JSON.parse(zipData))
      res.send(result)
    }
  )
  next()
})

// overwrite memberInfo
app.post('/member/edit', function (req, res, next) {
  const {
    isOverwrite,
    memberId,
    lastName,
    firstName,
    nickname,
    gender,
    birthday,
    phone,
    email
  } = req.body

  if (isOverwrite) {
    conn.query(
      'UPDATE `member` SET `firstName`= ?, `lastName`= ?, `nickname`= ?, `gender`= ?, `birthday`= ?, `phone`= ?, `email`= ? WHERE memberId = ?',
      [firstName, lastName, nickname, gender, birthday, phone, email, memberId],
      function (err, result) {
        // console.log(result)
      }
    )
  }
  next()
})

// overwrite address
app.post('/member/edit', function (req, res) {
  const { isOverwrite, memberId, address, zipCode } = req.body

  if (isOverwrite) {
    conn.query(
      'UPDATE `address` SET `zipcodeId`= ? ,`address`= ? WHERE `memberId` = ?',
      [zipCode, address, memberId],
      function (err, result) {
        // console.log(result)
      }
    )
  }
})

// upload member pic
// var storage = multer.diskStorage({
//     destination: '../coolbid-app/public/imgs/sellerPic/',
//     filename: function (req, file, cb) {
//       cb(null, req.body.memberId + '.jpg')
//     }
//   })
// var upload = multer({ storage }).single('profilePic')

// app.post('/member/edit', upload, function(req, res) {
//   const {
//     isOverwrite,
//     memberId
//   } = req.body

//   console.log(req.body)
//   console.log(req.file)
//   if (isOverwrite) {
//     conn.query(
//       '',
//       [memberId],
//       function (err, result) {
//         console.log(result)
//       }
//     )
//   }
// })

// read and overwrite password
app.post('/member/renewMemberPwd', function (req, res) {
  const { isOverwrite, memberId, password, newPassword } = req.body

  if (!isOverwrite) {
    conn.query(
      'SELECT password FROM `member` WHERE memberId = ?',
      [memberId],
      function (err, result) {
        res.send(decrypt(result[0].password))
      }
    )
  } else {
    conn.query(
      'UPDATE `member` SET `password`= ? WHERE memberId = ?',
      [encrypt(newPassword), memberId],
      function (err, result) {
        // console.log(result)
      }
    )
  }
})

// 把session送去前端
// app.get('/member/signin', (req, res) => {
//   // console.log(req.session)
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user })
//   } else {
//     res.send({ loggedIn: false })
//   }
// })

// 登出
// app.get('/logout', function (req, res) {
//   res.send('登出成功')
// })

//商品類別
app.get('/category/:category', function (req, res) {
  let test = req.params.category
  conn.query(
    'SELECT * FROM `product` AS p join category AS c ON p.categoryId= c.categoryId WHERE productStatusId in (1,4) and c.categoryName = ?',
    [test],
    function (err, result) {
      res.send(result)
    }
  )
})

// 讀取商品資料 & 出價紀錄
app.get('/product/:product_id', function (req, res) {
  let para = req.params.product_id
  // `biddingHistoryId`, `bidprice`, `bidTime`, `userId`, `nickname`
  conn.query(
    'SELECT * FROM `product` AS p join `productcondition` AS pc ON pc.productConditionId = p.productConditionId join `brand` AS b ON b.brandId = p.brandId join `category` AS c ON c.categoryId = p.categoryId join `member` AS m ON m.memberId = p.shopId join `shoplevel` AS sl ON sl.shopLevelId = m.shoplevelId WHERE productId = ?; SELECT * FROM `biddinghistory` AS bh join member AS m ON m.memberId = bh.memberId WHERE `productId` = ? ORDER BY bidprice DESC; SELECT productId, productName, (SELECT description from product as p join newcategorydetail as n on p.bagSexId = n.newcategoryDetailId WHERE productId = ?) as bagSex, (SELECT description from product as p join newcategorydetail as n on p.bagTypeId = n.newcategoryDetailId WHERE productId = ?) as bagType, (SELECT description from product as p join newcategorydetail as n on p.bagColorId = n.newcategoryDetailId WHERE productId = ?) as bagColor FROM product WHERE productId = ?; SELECT productId, productName, (SELECT description from product as p join newcategorydetail as n on p.clothSexId = n.newcategoryDetailId WHERE productId = ?) as clothSex, (SELECT description from product as p join newcategorydetail as n on p.clothSizeId = n.newcategoryDetailId WHERE productId = ?) as clothSize, (SELECT description from product as p join newcategorydetail as n on p.clothSeasonId = n.newcategoryDetailId WHERE productId = ?) as clothSeason FROM product WHERE productId = ?; SELECT productId, productName, (SELECT description from product as p join newcategorydetail as n on p.shoesSexId = n.newcategoryDetailId WHERE productId = ?) as shoesSex, (SELECT description from product as p join newcategorydetail as n on p.shoesSizeId = n.newcategoryDetailId WHERE productId = ?) as shoesSize, (SELECT description from product as p join newcategorydetail as n on p.shoesYearId = n.newcategoryDetailId WHERE productId = ?) as shoesYear FROM product WHERE productId = ?; SELECT productId, productName, (SELECT description from product as p join newcategorydetail as n on p.watchSexId = n.newcategoryDetailId WHERE productId = ?) as watchSex, (SELECT description from product as p join newcategorydetail as n on p.watchTypeId = n.newcategoryDetailId WHERE productId = ?) as watchType FROM product WHERE productId = ?; SELECT COUNT(*) AS itemNum FROM `product` WHERE `shopId` = (SELECT `shopId` FROM `product` WHERE `productId` = ?)',
    [
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para,
      para
    ],
    function (err, result) {
      res.send(result)
    }
  )
})

// 寫入目前價格
app.post('/product/:product_id', function (req, res, next) {
  let para = req.params.product_id
  let {
    id,
    isDirectBuy,
    directBidPrice,
    productStatusId,
    memberId,
    isTimeUp
  } = req.body

  if (isDirectBuy) {
    conn.query(
      'UPDATE product SET nowPrice = ?, productStatusId = ?, finalBidderId = ?, endTime = CURRENT_TIMESTAMP WHERE productId = ?',
      [directBidPrice, productStatusId, memberId, id],
      function (err, result) {
        res.send(result)
      }
    )
  } else if (isTimeUp) {
    conn.query(
      'UPDATE product SET nowPrice = ?, productStatusId = ?, finalBidderId = ?, endTime = CURRENT_TIMESTAMP WHERE productId = ?',
      [directBidPrice, productStatusId, memberId, id],
      function (err, result) {
        res.send(result)
      }
    )
  } else if (directBidPrice) {
    conn.query(
      'UPDATE product SET nowPrice = ?, productStatusId = ? WHERE productId = ?',
      [directBidPrice, productStatusId, id],
      function (err, result) {
        // console.log(result)
      }
    )
  }
  next()
})

// 寫入競標紀錄
app.post('/product/:product_id', function (req, res) {
  let para = req.params.product_id
  let { id, directBidPrice, memberId } = req.body

  conn.query(
    'INSERT INTO `biddinghistory`(`productId`, `memberId`, `bidprice`) VALUES (?, ?, ?)',
    [id, memberId, directBidPrice],
    function (err, result) {
      // console.log(result)
    }
  )
})

//品牌
app.get('/brand/:brand', function (req, res) {
  let test = req.params.brand
  conn.query(
    'SELECT DISTINCT brandName,categoryName FROM brandcat AS b join category as c on b.categoryId=c.categoryId join brand as bb ON bb.brandId=b.brandId where categoryName=?',
    [test],
    function (err, result) {
      res.send(result)
    }
  )
})

//genders
app.get('/genders/:cat', function (req, res) {
  let test = req.params.cat
  conn.query(
    `SELECT categoryName,detailTitleDescription,detailId,categoryDetailDescription,categorydetailId FROM categorydetail AS cd JOIN category AS c ON c.categoryId= cd.categoryId JOIN detailtitle AS dt ON dt.detailTitleId= cd.detailTitleId WHERE categoryName=? AND detailTitleDescription = 'Genders'`,
    [test],
    function (err, result) {
      res.send(result)
    }
  )
})

//types
app.get('/types/:cat', function (req, res) {
  let test = req.params.cat
  conn.query(
    `SELECT categoryName,detailTitleDescription,detailId,categoryDetailDescription,categorydetailId FROM categorydetail AS cd JOIN category AS c ON c.categoryId= cd.categoryId JOIN detailtitle AS dt ON dt.detailTitleId= cd.detailTitleId WHERE categoryName=? AND (detailTitleDescription = 'Types' OR detailTitleDescription = 'Seasons' OR detailTitleDescription = 'Years')`,
    [test],
    function (err, result) {
      res.send(result)
    }
  )
})

//sizes
app.get('/sizes/:cat', function (req, res) {
  let test = req.params.cat
  conn.query(
    `SELECT categoryName,detailTitleDescription,detailId,categoryDetailDescription,categorydetailId FROM categorydetail AS cd JOIN category AS c ON c.categoryId= cd.categoryId JOIN detailtitle AS dt ON dt.detailTitleId= cd.detailTitleId WHERE categoryName=? AND (detailTitleDescription = 'Sizes' OR detailTitleDescription = 'Colors')`,
    [test],
    function (err, result) {
      res.send(result)
    }
  )
})

//filter
app.get('/filter/:filter', function (req, res) {
  let test = req.params.filter
  let sql = `SELECT * FROM product WHERE bagSexId IN ${test} OR bagTypeId IN ${test} OR bagColorId IN ${test} OR clothSexId IN ${test} OR clothSizeId IN ${test} OR clothSeasonId IN ${test} OR shoesSexId IN ${test} OR shoesSizeId IN ${test} OR shoesYearId IN ${test} OR watchSexId IN ${test} OR watchTypeId IN ${test}`

  conn.query(sql, function (err, result) {
    res.send(result)
  })
})

//搜尋
// app.get('/search/:keyword', function (req, res) {
//   let test = req.params.keyword
//   let productsql = `
//   select productId,userId,productName,brandName,categoryName,bagSexDescription,bagtypeDescription,
//   bagColorDescription,clothSexDescription,clothSizeDescription,clothSeasonDescription,
//   shoesSexDescription,shoesSizeDescription,shoesYearDescription,watchSexDescription,
//   watchTypeDescription,productConditionDescription,productName,startPrice,perPrice,
//   directPrice,nowPrice,endTime,productDescription,productStatusDescription from product
//   inner join member on product.shopId = member.memberId
//   inner join brand on product.brandId = brand.brandId
//   inner join category on product.categoryId = category.categoryId
//   left outer join bagSex on product.bagSexId = bagSex.bagSexId
//   left outer join bagtype on product.bagTypeId = bagType.bagTypeId
//   left outer join bagColor on product.bagColorId = bagColor.bagColorId
//   left outer join clothSex on product.clothSexId = clothSex.clothSexId
//   left outer join clothSize on product.clothSizeId = clothSize.clothSizeId
//   left outer join clothSeason on product.clothSeasonId = clothSeason.clothSeasonId
//   left outer join shoesSex on product.shoesSexId = shoesSex.shoesSexId
//   left outer join shoesSize on product.shoesSizeId = shoesSize.shoesSizeId
//   left outer join shoesYear on product.shoesYearId = shoesYear.shoesYearId
//   left outer join watchSex on product.watchSexId = watchSex.watchSexId
//   left outer join watchType on product.watchTypeId = watchType.watchTypeId
//   inner join productCondition on product.productConditionId = productCondition.productConditionId
//   inner join productStatus on product.productStatusId = productStatus.productStatusId
//   `
//   let sql = `
//   ${productsql} where userId LIKE '%${test}%'union
//   ${productsql} where productName LIKE '%${test}%'union
//   ${productsql} where brandName LIKE '%${test}%'union
//   ${productsql} where categoryName LIKE '%${test}%'union
//   ${productsql} where bagSexDescription LIKE '%${test}%'union
//   ${productsql} where bagtypeDescription LIKE '%${test}%'union
//   ${productsql} where bagColorDescription LIKE '%${test}%'union
//   ${productsql} where clothSexDescription LIKE '%${test}%'union
//   ${productsql} where clothSizeDescription LIKE '%${test}%'union
//   ${productsql} where clothSeasonDescription LIKE '%${test}%'union
//   ${productsql} where shoesSexDescription LIKE '%${test}%'union
//   ${productsql} where shoesSizeDescription LIKE '%${test}%'union
//   ${productsql} where shoesYearDescription LIKE '%${test}%'union
//   ${productsql} where watchSexDescription LIKE '%${test}%'union
//   ${productsql} where watchTypeDescription LIKE '%${test}%'union
//   ${productsql} where productConditionDescription LIKE '%${test}%'union
//   ${productsql} where productDescription LIKE '%${test}%'
//   `
//   conn2.query(sql, function (err, result) {
//     res.send(result)
//     // res.send(test + 'ok')
//   })
// })

//search bar
app.get('/search/:id', function (req, res) {
  let test = req.params.id
  let productsql2 = `
  select productId,userId,productName,brandName,categoryName,productConditionDescription,productName,startPrice,perPrice,
  directPrice,nowPrice,endTime,productDescription,productStatusDescription from product
  inner join member on product.shopId = member.memberId
  inner join brand on product.brandId = brand.brandId
  inner join category on product.categoryId = category.categoryId
  inner join productCondition on product.productConditionId = productCondition.productConditionId
  inner join productStatus on product.productStatusId = productStatus.productStatusId
  `
  let sql2 = `
  ${productsql2} where userId LIKE '%${test}%'  union
  ${productsql2} where productName LIKE '%${test}%'  union
  ${productsql2} where brandName LIKE '%${test}%'  union
  ${productsql2} where categoryName LIKE '%${test}%'  union
  ${productsql2} where productConditionDescription LIKE '%${test}%'  union
  ${productsql2} where productDescription LIKE '%${test}%'
  `
  conn.query(sql2, function (err, result) {
    // console.log(result)
    res.send(result)
    // res.send('ok');
  })
})

// 撈使用者的收藏清單 20200507 Jou
app.post('/likeproduct', function (req, res) {
  conn.query(
    'select productId from wishproduct where memberId = ?',
    [req.body.memberId],
    function (err, result) {
      if (err) console.log(err)
      res.send(result)
    }
  )
})

// 撈使用者的收藏清單 20200507 Jou
app.post('/likeproduct', function (req, res) {
  conn.query(
    'select productId from wishproduct where memberId = ?',
    [req.body.memberId],
    function (err, result) {
      if (err) console.log(err)
      res.send(result)
    }
  )
})

// 收藏/取消收藏 20200507 Jou
app.post('/collectproduct', function (req, res) {
  if (req.body.collect == 'true') {
    conn.query(
      'insert into `wishproduct` (`memberId`, `productId`) values (?, ?)',
      [req.body.memberId, req.body.productId],
      function (err, result) {
        if (err) console.log(err)
        res.send('收藏成功')
      }
    )
  } else {
    conn.query(
      'delete from `wishproduct` where `memberId` = ? and `productId` = ? ',
      [req.body.memberId, req.body.productId],
      function (err, result) {
        if (err) console.log(err)
        res.send('取消收藏')
      }
    )
  }
})
//bidding cart 20200507 weiyy
app.get('/bidding/:memberId', function (req, res) {
  let test = req.params.memberId
  let sql = `SELECT DISTINCT productId,memberId FROM biddinghistory WHERE memberId=${test}`

  conn.query(sql, function (err, result) {
    res.send(result)
  })
})

//確認競標中商品 20200507 weiyy
app.get('/confirmStatus/:productId', function (req, res) {
  let test = req.params.productId
  let sql = `SELECT * FROM product WHERE productId IN ${test} AND productStatusId=4`

  conn.query(sql, function (err, result) {
    res.send(result)
  })
})

//得商店名稱 20200508 weiyy
app.get('/shopName/:productId', function (req, res) {
  let test = req.params.productId
  let sql = `SELECT DISTINCT p.shopId,shopName FROM product AS p JOIN member AS m ON p.shopId=m.memberId WHERE productId IN ${test} AND productStatusId=4`

  conn.query(sql, function (err, result) {
    res.send(result)
  })
})

// Bidding homepage get popular products by weiwei

app.get('/getPopularProducts', function (req, res) {
  let sql = `SELECT b.productId, productName, nowPrice, endTime, directPrice, COUNT(b.productId) as bidCount FROM biddinghistory as b
  JOIN product as p on b.productId = p.productId
  where productStatusId in (1,4)
  GROUP BY productId
  ORDER BY bidCount DESC limit 8`

  conn.query(sql, function (err, result) {
    res.send(result)
  })
})

// 拿收藏車的收藏productId 20210509 Jou
app.get('/collect/:memberId', function (req, res) {
  conn.query(
    'select productId from wishproduct where memberId = ?',
    [req.params.memberId],
    function (err, result) {
      if (err) console.log(err)
      res.send(result)
      // console.log(result)
    }
  )
})

// 拿收藏車的收藏物品本人 20210509 Jou
app.post('/membercollect', function (req, res) {
  conn.query(
    `select productId, productName, endTime, nowPrice, startPrice, p.productstatusId as productstatusId, productStatusDescription as productstatus from product as p
    join productstatus as ps on p.productStatusId = ps.productStatusId where productId in ${req.body.data}`,
    function (err, result) {
      if (err) console.log(err)
      res.send(result)
      // console.log(result)
    }
  )
})

// 註冊 20210510 Jou
app.post('/signup', function (req, res) {
  let r = req.body
  conn.query(
    `INSERT INTO member (userId, firstName, lastName, nickname, birthday, phone, email, password, shopName)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      r.userId,
      r.name,
      r.last,
      r.nickname,
      r.bday,
      r.phone,
      r.email,
      encrypt(r.password),
      r.userId
    ],
    function (err, result) {
      if (err) console.log(err)
      res.send('註冊成功')
      // console.log(result)
    }
  )
})

// 拿目前所有註冊的Id 20200510 Jou
app.get('/getuserid', function (req, res) {
  conn.query(`select userId from member`, function (err, result) {
    if (err) console.log(err)
    res.send(result)
    // console.log(result)
  })
})

//-----------------------------post方法------------------------
// app.post('/search',function(req,res){
//     let test = req.body.test
//     // console.log(test)
//     // res.send(JSON.stringify(test))
//     var mysql = require('mysql');
//     var conn = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database:"coolbid",
//         port: 8889
//     });
//     conn.query("select * from product where productId = ?",[test],function(err,result){
//         res.send(result)
//     })
//得目前我出的最高金額
// app.get('/myPrice/:productId', function (req, res) {
//   let test = req.params.productId
//   let sql = `SELECT bidprice FROM biddinghistory where memberId=5 AND bidTime IN (SELECT max(bidTime) FROM biddinghistory WHERE productId=${test} AND memberId=5  )`

//   conn.query(sql, function (err, result) {
//     res.send(result)
//   })
// })

//-----------------------------post方法------------------------
//取出自己再每件商品裡最高的進標價格 20200508 weiyy
app.post('/myPrice', function (req, res) {
  let test1 = req.body.pId
  let test2 = req.body.mId
  let sql = `SELECT bidprice FROM biddinghistory where memberId=${test2} AND bidTime IN (SELECT max(bidTime) FROM biddinghistory WHERE productId=${test1} AND memberId=${test2}  )`
  conn.query(sql, function (err, result) {
    res.send(result)
  })
})
//bid again in "bidding cart" 20200509 weiyy
app.post('/bidAgain', function (req, res) {
  //增加bidding history 20200509 weiyy
  let price = req.body.bidAgainPrice
  let member = req.body.memberId
  let product = req.body.productId
  let sql = `INSERT INTO biddinghistory (productId,memberId,bidprice) VALUES (${product},${member},${price})`
  conn.query(sql, function (err, result) {})
})
app.post('/nowPrice', function (req, res) {
  // 更新product的最高出價 20200509 weiyy
  let price = req.body.bidAgainPrice
  let product = req.body.productId
  let sql = `UPDATE product SET nowPrice=${price} WHERE productId=${product}`
  conn.query(sql, function (err, result) {})
})

//direct buy in "bidding cart" 20200509 weiyy
app.post('/directPrice', function (req, res) {
  //增加bidding history
  let price = req.body.bidPrice
  let member = req.body.memberId
  let product = req.body.productId
  let sql = `INSERT INTO biddinghistory (productId,memberId,bidprice) VALUES (${product},${member},${price})`
  conn.query(sql, function (err, result) {})
})
app.post('/changeStatus', function (req, res) {
  // 更改 product 的狀態為結標 20200509 weiyy
  let product = req.body.productId
  let price = req.body.bidPrice
  let sql = `UPDATE product SET productStatusId=5,nowPrice=${price} WHERE productId=${product}`
  conn.query(sql, function (err, result) {})
})
//bidding cart 更新得標者＋得標時間 20200513 weiyy
app.post('/directBuy', function (req, res) {
  let product = req.body.productId
  let member = req.body.memberId
  let sql = `UPDATE product SET finalBidderId=${member},endTime = CURRENT_TIMESTAMP WHERE productId=${product}`
  conn.query(sql, function (err, result) {})
})

// shopping Cart 確認下標過且結標的商品 20200509 weiyy
app.get('/shoppingStatus/:productId', function (req, res) {
  let test = req.params.productId
  let sql = `SELECT * FROM product WHERE productId IN ${test} AND productStatusId=5`

  conn.query(sql, function (err, result) {
    res.send(result)
  })
})
//shopping cart 取得得標商品 20200509 weiyy
app.get('/shopping/:memberId', function (req, res) {
  let test = req.params.memberId
  let sql = `SELECT * FROM product WHERE productStatusId=5 AND finalBidderId=${test}`

  conn.query(sql, function (err, result) {
    res.send(result)
  })
})
// shopping cart 取得商家名稱 20200509 weiyy
app.get('/shop/:memberId', function (req, res) {
  let test = req.params.memberId
  let sql = `
  SELECT DISTINCT p.shopId , shopName FROM product AS p JOIN member AS m ON p.shopId=m.memberId WHERE productStatusId=5 AND finalBidderId=${test}`

  conn.query(sql, function (err, result) {
    res.send(result)
  })
})
// shopping cart 取得商家名稱 20200510 weiyy
app.get('/shop/:memberId', function (req, res) {
  let test = req.params.memberId
  let sql = `
  SELECT DISTINCT p.shopId , shopName FROM product AS p JOIN member AS m ON p.shopId=m.memberId WHERE productStatusId=5 AND finalBidderId=${test}`
  conn.query(sql, function (err, result) {
    res.send(result)
  })
})

// shopping cart 取得商家名稱 20200509 weiyy
app.get('/address/:memberId', function (req, res) {
  let test = req.params.memberId
  let sql = `SELECT address FROM address WHERE memberId=${test}`
  conn.query(sql, function (err, result) {
    res.send(result)
  })
})

//shopping cart 後的 check out page
//取得商家id
app.post('/order', function (req, res) {
  let product = req.body.products
  let sql = `
  SELECT shopId, productId FROM product WHERE productId IN ${product};
  SELECT DISTINCT shopId FROM product WHERE productId IN ${product};
  `
  conn.query(sql, function (err, result) {
    if (err) console.log(err)
    // distinct商店id-->[shop1,shop2,shop3]
    let shop = result[1].map((item) => item.shopId)

    // 商品依商店分組--->[{shopId:2,productId:4},{shopId:2,productId:7},{shopId:5,productId:17}]
    let product = result[0]

    let array2 = []
    let array3 = []
    //以商家個數存存陣列[[],[],[]]
    for (let i = 0; i < shop.length; i++) {
      array2[i] = []
    }
    //判別同店家存入商品Id到array2陣列的相對位子[[1,2],[5]]
    product.forEach((val) => {
      for (let i = 0; i < shop.length; i++) {
        if (val.shopId == shop[i]) {
          array2[i].push(val.productId)
        }
      }
    })
    //將array2每項改為(1,2)存入新的陣列
    for (let i = 0; i < array2.length; i++) {
      array3.push('(' + array2[i].toString() + ')')
    }

    let obj = {
      shop: shop,
      product: array3
    }

    res.send(JSON.stringify(obj))
  })
})
app.post('/orderInfo', function (req, res) {
  //商家id的陣列
  let shop = req.body.data.shop
  //一商家分類的商品id陣列--->每一項(product1,product2)
  let product = req.body.data.product
  let member = req.body.memberId

  conn.query('SELECT MAX(orderId) as max FROM `order`', function (err, result) {
    if (err) console.log(err)

    //取最後一筆orderId
    let max = result[0].max

    //新增訂單
    let sql1 = '(orderId, buyerId, shopId, addressId) values'

    //要新增的value內容
    for (let i = 0; i < shop.length; i++) {
      sql1 += ` (${max + i + 1}, ${member}, ${shop[i]}, 1),`
    }

    //跑完迴圈後將最後一個,去掉改成;的語法
    console.log(sql1.slice(0, -1) + ';')
    let sql3 = sql1.slice(0, -1) + ';' + '\n'

    //update orederId 到product裡的語法
    let sql2 = ''
    for (let i = 0; i < shop.length; i++) {
      sql2 += `update product set orderId = ${
        max + i + 1
      } , productStatusId = 6 where productId in ${product[i]};\n`
    }

    // 新增訂單為待出貨到orderstatusdetail表單
    let sql4 = ''
    for (let i = 0; i < shop.length; i++) {
      sql4 += `INSERT INTO orderstatusdetail (orderId, orderStatusId) VALUES (${
        max + i + 1
      }, '1');\n`
    }
    res.send(sql3 + sql2 + sql4)
  })
})
//新增訂單並更新的到商品表裡
app.post('/orderCreate', function (req, res) {
  let sql = req.body.data
  conn.query('insert into ' + '`order` ' + `${sql}`, function (err, result) {
    if (err) {
      console.log(err)
    }
  })
})
// 成立訂單的資訊
app.get('/getOrderId/:info', function (req, res) {
  let test = req.params.info
  test = '(' + test + ')'
  let sql = `SELECT orderId FROM product WHERE productId IN ${test}`
  conn.query(sql, function (err, result) {
    res.send(result)
  })
})
//各項商品資訊
app.get('/orderProduct/:info', function (req, res) {
  let test = req.params.info
  test = '(' + test + ')'
  let sql = `SELECT orderId,shopId, productName,nowPrice,productId FROM product WHERE productId IN ${test}`
  // let sql = `SELECT  p.orderId,shopId, productName,nowPrice,productId,orderStatusBuyer FROM product AS p JOIN orderstatusdetail AS od ON p.orderId=od.orderId JOIN orderstatus AS os ON od.orderStatusId=os.orderStatusId WHERE productId IN ${test}`
  conn.query(sql, function (err, result) {
    res.send(result)
  })
})

//--------------------------------------------------------
//夏會員中心_訂購清單
app.post('/member/purchase', function (req, res) {
  const { memberId } = req.body
  let sql =
    'SELECT o.orderId, shopName, productName, orderTime, nowPrice, orderStatusBuyer, productId, orderStatusDate FROM `order` as o join `product` as p on o.orderId = p.orderId join `member` as m on o.shopId = m.memberId join `orderstatusdetail` as osd on o.orderId = osd.orderId join `orderstatus` as os on osd.orderStatusId = os.orderStatusId WHERE buyerId = ?'
  conn.query(sql, [memberId], function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
    console.log(result)
  })
})

//夏會員中心_賣家首頁
app.get('/BackStage/SellerPageHero', function (req, res) {
  let sql =
    'SELECT shopName, shopLevelDescription, (SELECT COUNT(*) FROM `wishshop` WHERE shopId = 1) as shopFans, (SELECT COUNT(*) FROM `product` WHERE shopId = 1) as productNumber, registerDate, shopDescription FROM `member` as m join `shoplevel` as s on m.shoplevelId = s.shopLevelId where memberId = 1'
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

// 賣家中心 找訂單數量
app.post('/BackStage/sellerhomepage', function (req, res) {
  let sql =
    'SELECT COUNT(*) as count FROM `order` as o JOIN orderstatusdetail as od on o.orderId = od.orderId WHERE orderstatusId = 1 and shopId = ?'
  conn.query(sql, [req.body.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

//夏賣家中心_訂單清單
app.post('/BackStage/orders', function (req, res) {
  let sql =
    'SELECT o.orderId, userId, productName, productId, orderTime, nowPrice, orderStatusSeller FROM `order` as o join `product` as p on o.orderId = p.orderId join `member` as m on o.buyerId = m.memberId join `orderstatusdetail` as osd on o.orderId = osd.orderId join `orderstatus` as os on osd.orderStatusId = os.orderStatusId WHERE p.shopId = ?'
  conn.query(sql, [req.body.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

//夏賣家中心_商品清單_全部
app.post('/BackStage/product', function (req, res) {
  // console.log(req)
  let sql =
    'SELECT p.productId, p.brandId, productDescription, nowPrice, productName, categoryName, startPrice, perPrice, directPrice, endTime, productstatusDescription, brandName, c.categoryId  FROM `product` as p JOIN `category` as c on p.categoryId = c.categoryId JOIN `productstatus` as ps on p.productStatusId = ps.productStatusId JOIN `brand` as b on p.brandId = b.brandId WHERE (p.productStatusId) in (1,4,5,6) and (p.shopId = ?)'
  conn.query(sql, [req.body.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

//夏賣家中心_新增商品
app.get('/BackStage/product/edit', function (req, res) {
  let sql =
    'SELECT p.productId, productName, nowPrice, productDescription, categoryName, startPrice, perPrice, directPrice, endTime, productstatusDescription FROM `product` as p JOIN `category` as c on p.categoryId = c.categoryId JOIN `productstatus` as ps on p.productStatusId = ps.productStatusId WHERE p.productId = ' +
    req.query.id
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

//夏賣家中心_商品清單_上架商品
app.post('/BackStage/product/OnTheMarket', function (req, res) {
  let sql =
    'SELECT p.productId, productName, categoryName, startPrice, perPrice, directPrice, endTime, productstatusDescription FROM `product` as p JOIN `category` as c on p.categoryId = c.categoryId JOIN `productstatus` as ps on p.productStatusId = ps.productStatusId WHERE (p.productStatusId = 1) and (p.shopId = ?)'
  conn.query(sql, [req.body.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

//夏賣家中心_商品清單_結標
app.post('/BackStage/product/closeAuction', function (req, res) {
  let sql =
    'SELECT p.productId, productName, categoryName, nowPrice, userId, endTime, productstatusDescription FROM product as p JOIN category as c on p.categoryId = c.categoryId JOIN productstatus as ps on p.productStatusId = ps.productStatusId JOIN biddinghistory as b on p.nowPrice = b.bidPrice JOIN member as m on b.memberId = m.memberId WHERE (p.shopId = ? and p.productStatusId = 5)'
  conn.query(sql, [req.body.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

//夏賣家中心_商品清單_競標
app.post('/BackStage/product/Biding', function (req, res) {
  let sql =
    'SELECT p.productId, productName, categoryName, nowPrice, startPrice, perPrice, directPrice, endTime, productstatusDescription FROM `product` as p JOIN `category` as c on p.categoryId = c.categoryId JOIN `productstatus` as ps on p.productStatusId = ps.productStatusId WHERE (p.productStatusId = 4) and (p.shopId = ?)'
  conn.query(sql, [req.body.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

//夏賣家中心_商品清單_已售出
app.post('/BackStage/product/soldout', function (req, res) {
  let sql =
    'SELECT p.productId, productName, categoryName, nowPrice, startPrice, perPrice, directPrice, endTime, productstatusDescription FROM `product` as p JOIN `category` as c on p.categoryId = c.categoryId JOIN `productstatus` as ps on p.productStatusId = ps.productStatusId WHERE (p.productStatusId = 6) and (p.shopId = ?)'
  conn.query(sql, [req.body.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

//類別
app.get('/category', function (req, res) {
  let cat = req.params.cat
  let sql = `SELECT * FROM category`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

// 夏編輯商品 select_用類別找出對應品牌
app.get('/selectBrand/:cat', function (req, res) {
  let cat = req.params.cat
  let sql = `SELECT brand.brandId, brandName FROM brandcat JOIN brand on brandcat.brandId = brand.brandId WHERE categoryId = '${cat}'`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

app.post('/BackStage/deleteProduct', function (req, res) {
  let sql = `UPDATE product SET productStatusId = 3 WHERE productId = ?`
  console.log(req.body)
  id = req.body.id
  conn.query(sql, [id], function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send('OK')
  })
})

//夏編輯商品select_找出所有品牌
app.get('/selectBrandAll/brand', function (req, res) {
  let brand = req.params.brand
  let sql = `SELECT * FROM brand`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

//夏編輯商品select_商品size/sex
app.get('/selectBrandAll/bagSex', function (req, res) {
  let brand = req.params.brand
  let sql = `SELECT * FROM brand`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})

app.get('/selectBrandAll/:SexId', function (req, res) {
  let SexId = req.params.SexId
  let sql = `SELECT detailDescription, categoryDetailDescription FROM categorydetail as c JOIN detail as d on c.detailId = d.detailId WHERE detailDescription = '${SexId}'`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
})
