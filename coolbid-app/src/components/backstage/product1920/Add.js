import React, { useState, useEffect } from 'react'
// import moment from 'moment'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
// import Radio from '@material-ui/core/Radio'
// import RadioGroup from '@material-ui/core/RadioGroup'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import Typography from '@material-ui/core/Typography'
import '../../SASS/from.scss'
import '../../SASS/Components.scss'
import SellerBackendList from '../Main/SellerBackendList'
import { useParams } from 'react-router'

const AddProduct = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
  // const [descWord, setDescWord] = useState('')
  // console.log(descWord)
  // 綁定change事件
  const [productName, setProductName] = useState('')
  const [endTime, setEndTime] = useState('')
  const [categoryName, setCategoryName] = useState('')
  // const [brandId, setBrandId] = useState('')
  const [brandName, setBrandName] = useState('')
  // const [productConditionId, setProductConditionId] = useState(1)
  const [nowPrice, setNowPrice] = useState(0)
  const [startPrice, setStartPrice] = useState(0)
  const [perPrice, setPerPrice] = useState(0)
  const [directPrice, setDirectPrice] = useState(0)
  const [productDescription, setProductDescription] = useState('')
  // 連線資料庫
  useEffect(() => {
    if (id > 0) {
      axios({
        method: 'get',
        baseURL: 'http://localhost:3001',
        url: '/BackStage/product/edit?id=' + id,
        'Content-Type': 'application/json'
      }).then((a) => {
        console.log(a)
        setProductName(a.data[0].productName)
        setEndTime(a.data[0].endTime)
        setCategoryName(a.data[0].categoryName)
        setBrandName(a.data[0].brandName)
        // setProductConditionId(a.data[0].productConditionId)
        setNowPrice(a.data[0].nowPrice)
        setStartPrice(a.data[0].startPrice)
        setPerPrice(a.data[0].perPrice)
        setDirectPrice(a.data[0].directPrice)
        setProductDescription(a.data[0].productDescription)
      })
    }
  }, [])

  const brandSelect = (e) => {
    if (e === 'Bag') {
      setCategoryName('Bag')
      axios({
        method: 'get',
        baseURL: 'http://localhost:3001',
        url: '/selectBrand/B',
        'Content-Type': 'application/json'
      }).then((a) => setData(a.data))
    } else if (e === 'Cloth') {
      setCategoryName('Cloth')
      axios({
        method: 'get',
        baseURL: 'http://localhost:3001',
        url: '/selectBrand/C',
        'Content-Type': 'application/json'
      }).then((a) => setData(a.data))
    } else if (e === 'Watch') {
      setCategoryName('Watch')
      axios({
        method: 'get',
        baseURL: 'http://localhost:3001',
        url: '/selectBrand/W',
        'Content-Type': 'application/json'
      }).then((a) => setData(a.data))
    } else if (e === 'Shoes') {
      setCategoryName('Shoes')
      axios({
        method: 'get',
        baseURL: 'http://localhost:3001',
        url: '/selectBrand/S',
        'Content-Type': 'application/json'
      }).then((a) => setData(a.data))
    }
  }

  // 編輯商品
  const save = () => {
    if (id > 0) {
      console.log('1')
      const senddata = {
        id: id,
        productName: productName,
        endTime: endTime,
        categoryName: categoryName,
        startPrice: startPrice,
        perPrice: perPrice,
        directPrice: directPrice,
        brandName: brandName,
        nowPrice: nowPrice,
        productDescription: productDescription
      }
      console.log(senddata)
      axios({
        method: 'post',
        baseURL: 'http://localhost:3001',
        url: '/BackStage/Product/edit/' + id,
        'Content-Type': 'application/json',
        data: senddata
      }).then((response) => {
        console.log(response)
      }, (error) => {
        console.log(error)
      })
    } else {
      console.log('2')
      axios({
        method: 'post',
        baseURL: 'http://localhost:3001',
        url: '/BackStage/Product/add' + id,
        'Content-Type': 'application/json',
        data: {
          id: id,
          productName: productName,
          endTime: endTime,
          categoryName: categoryName,
          startPrice: startPrice,
          perPrice: perPrice,
          directPrice: directPrice,
          brandName: brandName,
          nowPrice: nowPrice,
          productDescription: productDescription
        }
      }).then((response) => {
        console.log(response)
      }, (error) => {
        console.log(error)
      })
    }
  }

  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <SellerBackendList />
        </div>
        <div className="backstageRight">
          <div className="backstageRightContainer">
            {/* <Breadcrumbs /> */}
            <div className="breadcrumbsArea">賣家專區/新增商品</div>
            <form className="form_warp">
              <div className="form_row">
                <label>
                  *商品標題:
                  <br />
                  <TextField
                    type="text"
                    name="name"
                    // value={data.length > 0 ? data[0].categoryName : ''}
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value)
                    }}
                    variant="outlined"
                    label="商品標題"
                    className="mininput"
                  />
                </label>
              </div>

              <div className="form_row">
                <label htmlFor="deadline">
                  *截標日期:
                  <br />
                  {/* <TextField
                id="deadline"
                type="datetime-local"
                name="deadline"
                value={endTime}
                onChange=""
                variant="outlined"
                label="DataTime"
                className="dateinput"
                InputLabelProps={{ shrink: true }}
              /> */}
                  <TextField
                    type="text"
                    name="name"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value)
                    }}
                    variant="outlined"
                    label="截標日期"
                    className="mininput"
                  />
                </label>
              </div>

              <div className="form_row">
                <label htmlFor="kind">
                  *商品類型:
                  <br />
                  <FormControl variant="outlined" className="mininput">
                    <InputLabel id="kind">kind</InputLabel>
                    <Select
                      labelId="kind"
                      id="kind"
                      value={categoryName}
                      onChange={(e) => brandSelect(e.target.value)}
                      label="kind"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Shoes">鞋子</MenuItem>
                      <MenuItem value="Cloth">衣服</MenuItem>
                      <MenuItem value="Bag">包包</MenuItem>
                      <MenuItem value="Watch">手錶</MenuItem>
                    </Select>
                  </FormControl>
                </label>
              </div>
              <label htmlFor="brand">
                *商品品牌:
                <br />
                <FormControl variant="outlined" className="mininput">
                  <InputLabel id="brand">brand</InputLabel>
                  <Select
                    labelId="brand"
                    id="brand"
                    value={brandName}
                    // (e.target.value)怎麼抓到value={item.brandName}?
                    onChange={(e) => { setBrandName(e.target.value) }}
                    label="brand"
                  >
                    {data.map((item) => (
                      <MenuItem value={item.brandId} key={item.brandId}>
                     {item.brandName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </label>
              {/* <div className="form_row">
                <label>
                商品性別:
                  <br />
                  <TextField
                    type="text"
                    name="size"
                    value=""
                    onChange=""
                    variant="outlined"
                    label="商品尺寸"
                    className="mininput"
                  />
                </label>
              </div>
              <div className="form_row">
                <label>
                  商品顏色:
                  <br />
                  <TextField
                    type="text"
                    name="colour"
                    value=""
                    onChange=""
                    variant="outlined"
                    label="商品顏色"
                    className="mininput"
                  />
                </label>
              </div>
              <div className="from_row">
                <label>
                  商品狀況:
                  <RadioGroup
                    row
                    aria-label="productStatus"
                    name="productStatus"
                    defaultValue="new"
                  >
                    <FormControlLabel
                      value={productConditionId === 1}
                      control={<Radio color="primary" />}
                      label="全新"
                    />
                    <FormControlLabel
                      value={productConditionId === 2}
                      control={<Radio color="primary" />}
                      label="二手"
                    />
                  </RadioGroup>
                </label>
              </div> */}

              <div className="form_row">
                <label htmlFor="bid">
                  *競標價格:
                  <br />
                  <TextField
                    type="number"
                    name="bid"
                    value={nowPrice}
                    onChange={(e) => {
                      setNowPrice(e.target.value)
                    }}
                    variant="outlined"
                    label="bid"
                    className="mininput"
                    InputLabelProps={{ shrink: true }}
                  />
                </label>
              </div>

              <div className="form_row">
                <label htmlFor="basic">
                  *起標價格:
                  <br />
                  <TextField
                    id="basic"
                    type="number"
                    name="basic"
                    value={startPrice}
                    onChange={(e) => {
                      setStartPrice(e.target.value)
                    }}
                    variant="outlined"
                    label="basic"
                    className="mininput"
                    InputLabelProps={{ shrink: true }}
                  />
                </label>
              </div>

              <div className="form_row">
                <label htmlFor="per">
                  *出價增額:
                  <br />
                  <TextField
                    type="number"
                    name="per"
                    value={perPrice}
                    onChange={(e) => {
                      setPerPrice(e.target.value)
                    }}
                    variant="outlined"
                    label="per"
                    className="mininput"
                    InputLabelProps={{ shrink: true }}
                  />
                </label>
              </div>

              <div className="form_row">
                <label htmlFor="direct">
                  直購價格:
                  <br />
                  <TextField
                    type="number"
                    name="direct"
                    value={directPrice}
                    onChange={(e) => {
                      console.log(e.target.value)
                      setDirectPrice(e.target.value)
                    }}
                    variant="outlined"
                    label="direct"
                    className="mininput"
                    InputLabelProps={{ shrink: true }}
                  />
                </label>
              </div>

              <div className="form_row">
                <label>圖片檔案:<br/>
                <TextField
                    type="file"
                    name="picture"
                    variant="outlined"
                    label="direct"
                    className="mininput"
                    InputLabelProps={{ shrink: true }}
                  />
                </label>
              </div>

              <div className="form_row">
                {/* <Typography
              variant="h4"
              style={{ fontWeight: 'bold', margin: '2rem 0 1rem' }}
            >
              商品描述：
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                setDescWord(editor.getData())
              }}
              value=''
            /> */}
                <label>
                  商品描述:
                  <br />
                  <TextField
                    id="description"
                    type="text"
                    name="description"
                    value={productDescription}
                    onChange={(e) => {
                      setProductDescription(e.target.value)
                    }}
                    label="商品描述"
                    variant="outlined"
                    multiline={true}
                    rows={6}
                    className="txtinput"
                    InputLabelProps={{ shrink: true }}
                  />
                </label>
              </div>

              <button className="button" onClick={save}>儲存</button>
            </form>
          </div>
        </div>
      </div>{' '}
    </div>
  )
}
export default AddProduct
