import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import swal from 'sweetalert'
import Input from '@material-ui/core/Input'
import Tooltip from '@material-ui/core/Tooltip'

const TitleContainer = styled.div`
  // margin-top: 15rem;
  color: grey;
`
const LoginContainer = styled.div`
  width: 60%;
  height: 35rem;
  margin: 5rem auto;
  color: grey;
  display: flex;
  justify-content: center;
  .account {
    width: 70%;
    font-size: 2rem;
  }
`
const SignupContainer = styled.div`
  width: 100%;
`
const ButtonContainer = styled.div`
  text-align: center;
  padding: 4rem;
`

const Signup = () => {
  const [account, setAccount] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwd2, setPwd2] = useState('')
  const [last, setLast] = useState('')
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bday, setBday] = useState('')
  const [user, setUser] = useState('')
  let alertitem = ''
  const demo = () => {
    setAccount('mfee12')
    setPwd('12345')
    setPwd2('12345')
    setLast('陳')
    setName('爹摸')
    setNickname('DEMO')
    setEmail('demo@gmail.com')
    setPhone('0912345678')
    setBday('2021-05-20')
  }
  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: '/getuserid'
    }).then((e) => {
      setUser(e.data.map((item) => item.userId))
    })
  }, [])

  if (user.includes(account)) {
    alertitem += '此帳號已有人使用\n'
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_]{3,11}$/.test(account)) {
    alertitem += '帳號格式錯誤：請輸入4-12位英文、數字或底線(開頭為英文)\n'
  }
  if (!/^[a-zA-Z0-9]{4,12}$/.test(pwd)) {
    alertitem += '密碼格式錯誤：請輸入4-12位英數字\n'
  }
  if (pwd !== pwd2) {
    alertitem += '再次輸入密碼錯誤\n'
  }
  if (!/^09[0-9]{8}$/.test(phone)) {
    alertitem += '手機格式錯誤\n'
  }
  if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
    alertitem += 'Email格式錯誤\n'
  }

  const handleSignup = () => {
    if (alertitem.length !== 0) {
      swal({
        title: '註冊失敗',
        text: alertitem,
        icon: 'error',
        button: '再試一次'
      })
    } else if (
      account &&
      pwd &&
      last &&
      name &&
      nickname &&
      email &&
      phone &&
      bday
    ) {
      axios
        .post('http://localhost:3001/signup', {
          userId: account,
          password: pwd,
          last: last,
          name: name,
          nickname: nickname,
          email: email,
          phone: phone,
          bday: bday
        })
        .then((e) => {
          swal({
            title: e.data,
            icon: 'success',
            button: '開始競標！'
          }).then(() => {
            window.location.href = '/member/signin'
          })
        })
    }
  }
  return (
    <div style={{ marginTop: '16rem', minHeight: 'calc(100vh - 125px)' }}>
      <TitleContainer>
        <p className="logTitle" onClick={demo}>
          註冊會員
        </p>
      </TitleContainer>
      <LoginContainer>
        <SignupContainer>
          <span className="title2"> 帳號 </span>
          <br />
          <Tooltip
            title="請輸入4-12位英文、數字或底線(開頭為英文)"
            placement="top"
          >
            <Input
              className="account"
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required={true}
            />
          </Tooltip>
          <br />
          <span className="title2"> 密碼 </span>
          <br />
          <Tooltip title="請輸入4-12位英數字" placement="top">
            <Input
              className="account"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required={true}
            />
          </Tooltip>
          <br />
          <span className="title2"> 再次輸入密碼 </span>
          <br />
          <Input
            className="account"
            type="password"
            value={pwd2}
            onChange={(e) => setPwd2(e.target.value)}
            required={true}
          />
          <br />
          <span className="title2"> 姓 </span>
          <br />
          <Input
            className="account"
            type="text"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            required={true}
          />
          <br />
          <span className="title2"> 名 </span>
          <br />
          <Input
            className="account"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <br />
        </SignupContainer>
        <SignupContainer>
          <span className="title2"> 暱稱 </span>
          <br />
          <Input
            className="account"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required={true}
          />
          <br />
          <span className="title2"> Email </span>
          <br />
          <Input
            className="account"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <br />
          <span className="title2"> 手機 </span>
          <br />
          <Input
            className="account"
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required={true}
          />
          <br />
          <span className="title2"> 生日 </span>
          <br />
          <Input
            className="account"
            type="date"
            value={bday}
            onChange={(e) => setBday(e.target.value)}
            required={true}
          />
          <br />
        </SignupContainer>
      </LoginContainer>
      <ButtonContainer>
        <Button
          className="submitBtn"
          variant="contained"
          color="primary"
          onClick={handleSignup}
          style={{ width: '15%', fontSize: '2rem', textAlign: 'center' }}
        >
          送出
        </Button>
      </ButtonContainer>
    </div>
  )
}

export default Signup
