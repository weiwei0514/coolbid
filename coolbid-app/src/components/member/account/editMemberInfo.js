import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import {
  Typography,
  FormGroup,
  FormControl,
  TextField,
  Input,
  Button,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
  Card
  // Avatar
} from '@material-ui/core'

import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'

import useStyles from '../../../styles/editMemberInfoStyle'
import styled from '@emotion/styled'
import NestedList from '../../backstage/Main/MemberList'

// const EditContainer = styled.div`
//   width: 70%;
//   margin: 20rem auto;
//   display: flex;
// `
const FormControlWei = styled(FormControl)`
  width: 30rem;
`

const EditMemberInfo = () => {
  const classes = useStyles()
  const userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))

  const [lastName, setLastName] = useState()
  const [firstName, setFirstName] = useState()
  const [nickname, setNickname] = useState()
  const [gender, setGender] = useState('')
  const [birthday, setBirthday] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()
  const [county, setCounty] = useState()
  const [dist, setDist] = useState()
  const [addr, setAddr] = useState()
  const [zipData, setZipData] = useState([])
  // const [distData, setDistData] = useState([])
  const [zip, setZip] = useState('')
  // const [pic, setPic] = useState()

  useEffect(() => {
    axios
      .post('http://localhost:3001/member/edit', {
        memberId: userInfo.memberId
      })
      .then(res => {
        console.log(res.data)
        setLastName(res.data[0][0].lastName)
        setFirstName(res.data[0][0].firstName)
        setNickname(res.data[0][0].nickname)
        // setCounty(res.data[1][0].city)
        // setDist(res.data[1][0].district)
        setAddr(res.data[1][0].address)
        setGender(res.data[0][0].gender)
        setBirthday(res.data[0][0].birthday)
        setPhone(res.data[0][0].phone)
        setEmail(res.data[0][0].email)
        setZipData(res.data[2])
      })
  }, [])

  // find zip
  const countyData = zipData.map((zip) => {
    return zip.name
  })
  const distData = county ? zipData[countyData.indexOf(county)].districts : []

  const dateFormat = (date) => {
    const d = new Date(birthday)
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const handleNicknameChange = (e) => {
    setNickname(e.target.value)
  }
  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }
  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleCountyChange = (e) => {
    setCounty(e.target.value)
  }
  const handleDistChange = (e) => {
    setDist(e.target.value)
    setZip(e.target.value)
  }
  const handleAddrChange = (e) => {
    setAddr(e.target.value)
  }

  const onSave = () => {
    axios.post('http://localhost:3001/member/edit', {
      isOverwrite: true,
      memberId: userInfo.memberId,
      lastName: lastName,
      firstName: firstName,
      nickname: nickname,
      gender: gender,
      birthday: birthday,
      phone: phone,
      email: email,
      address: addr,
      zipCode: zip
    })

    swal({
      title: '會員資料已更新',
      icon: 'success',
      button: '確認'
    })
  }

  const onDelete = () => {
    setLastName('')
    setFirstName('')
    setNickname('')
    setGender('')
    setBirthday('')
    setPhone('')
    setEmail('')
    setCounty('')
    setDist('')
    setAddr('')
  }

  // const handlePicSubmit = e => {
  //   e.preventDefault()
  //   console.log(pic)

  //   const formData = new FormData()
  //   formData.append([pic.name], [pic])
  //   axios.post('http://localhost:3001/member/edit', formData, {
  //     headers: { 'content-type': 'multipart/form-data' },
  //     data: {
  //       memberId: userInfo.memberId
  //     }
  //   }).then(res => console.log(res.data))
  // }

  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:3001/member/edit',
  //     'Content-Type': 'multipart/form-data',
  //     // 'Content-Type': 'application/json',
  //     data: {
  //       memberId: userInfo.memberId,
  //       profilePic: pic
  //     }
  //   }).then(res => console.log(res.data))
  // }

  // const handlePicChange = e => {
  //   setPic(e.target.files[0])
  // }

  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <NestedList />
        </div>
        <div className="backstageRight">
          <div className="backstageRightContainer">
            <div className="content">
              <Breadcrumbs aria-label='breadcrumb' className={classes.breadcrumb}>
                <Link color='inherit' href='http://localhost:3000/member/edit'>
                  會員中心
                </Link>
                <Link color='inherit' href='http://localhost:3000/member/edit'>
                  會員編輯
                </Link>
              </Breadcrumbs>
              <Card className={classes.card}>
                <FormGroup>
                  {/* 姓 */}
                  <div className={classes.inputGroup}>
                    <Typography variant="h5">姓氏</Typography>
                    <FormControlWei className={classes.inline}>
                      <TextField
                        id="lastName"
                        onChange={handleLastNameChange}
                        value={lastName}
                        variant="outlined"
                      />
                      {/* <FormHelperText id="my-helper-text">
                        僅收貨時使用，請填寫真實姓氏
                      </FormHelperText> */}
                    </FormControlWei>
                  </div>
                  <br />

                  {/* 名 */}
                  <div className={classes.inputGroup}>
                    <Typography variant="h5">名字</Typography>
                    <FormControlWei className={classes.inline}>
                      <TextField
                        id="firstName"
                        onChange={handleFirstNameChange}
                        value={firstName}
                        variant="outlined"
                      />
                      {/* <FormHelperText id="my-helper-text">
                        僅收貨時使用，請填寫真實名字
                      </FormHelperText> */}
                    </FormControlWei>
                  </div>
                  <br />

                  {/* 暱稱 */}
                  <div className={classes.inputGroup}>
                    <Typography variant="h5">暱稱</Typography>
                    <FormControlWei className={classes.inline}>
                      <TextField
                        id="nickname"
                        onChange={handleNicknameChange}
                        value={nickname}
                        variant="outlined"
                      />
                    </FormControlWei>
                  </div>
                  <br />

                  {/* 地址 */}
                  <div className={classes.addrGroup}>
                    <Typography variant="h5">地址</Typography>
                    <FormControlWei className={classes.addrSelect}>
                    {/* 縣市 */}
                      <Select
                        id="county-select"
                        value={county}
                        onChange={handleCountyChange}
                      >
                        {zipData.map((zip) => {
                          return (
                            <MenuItem key={zip.name} value={zip.name}>
                              {zip.name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControlWei>
                    {/* 行政區 */}
                    <FormControlWei className={classes.addrSelect}>
                      <Select
                        id="dist-select"
                        value={dist}
                        onChange={handleDistChange}
                      >
                        {distData.map((dist) => {
                          return (
                            <MenuItem key={dist.name} value={dist.zip}>
                              {dist.name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControlWei>
                  </div>
                    {/* 詳細地址 */}
                    <FormControlWei className={classes.addrInput}>
                      <TextField
                        id="address"
                        onChange={handleAddrChange}
                        value={addr}
                        variant="outlined"
                      />
                    {/* <FormHelperText id="my-helper-text">
                      僅收貨時使用，請填寫真實地址
                    </FormHelperText> */}
                    </FormControlWei>
                  <br />

                  {/* 性別 */}
                  <div className={classes.inputGroup}>
                    <Typography variant="h5">性別</Typography>
                    <FormControlWei className={classes.inline}>
                      <Select
                        id="gender-select"
                        value={gender}
                        onChange={handleGenderChange}
                      >
                        <MenuItem value={'男'}>男</MenuItem>
                        <MenuItem value={'女'}>女</MenuItem>
                        <MenuItem value={'其他'}>其他</MenuItem>
                      </Select>
                    </FormControlWei>
                  </div>
                  <br />

                  {/* 生日 */}
                  <div className={classes.inputGroup}>
                    <Typography variant="h5">生日</Typography>
                    <FormControlWei className={classes.inline}>
                      <Input
                        id="birthday"
                        type="date"
                        value={dateFormat(birthday)}
                        onChange={handleBirthdayChange}
                      />
                    </FormControlWei>
                  </div>
                  <br />

                  {/* 手機 */}
                  <div className={classes.inputGroup}>
                    <Typography variant="h5">手機</Typography>
                    <FormControlWei className={classes.inline}>
                      <TextField
                        id="phone"
                        onChange={handlePhoneChange}
                        value={phone}
                        variant="outlined"
                      />
                    </FormControlWei>
                  </div>
                  <br />

                  {/* 信箱 */}
                  <div className={classes.inputGroup}>
                    <Typography variant="h5">信箱</Typography>
                    <FormControlWei className={classes.inline}>
                      <TextField
                        id="email"
                        onChange={handleEmailChange}
                        value={email}
                        variant="outlined"
                      />
                    </FormControlWei>
                  </div>
                </FormGroup>
                <br />
                <div className={classes.btnGroup}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={onSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={onDelete}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* <form
        className={classes.imgUpload}
        onSubmit={handlePicSubmit}
      >
        <Avatar
          className={classes.profilePic}
          src={`/imgs/sellerPic/${userInfo.memberId}.jpg`}
        />
        <input
          type='file'
          name='profilePic'
          onChange={handlePicChange}
        />
        <Button type='submit'>
          上傳照片
        </Button>
      </form> */}
    </div>
  )
}

export default EditMemberInfo
