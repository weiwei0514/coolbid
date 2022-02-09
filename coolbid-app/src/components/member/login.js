/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable space-before-function-paren */
/* eslint-disable react/prop-types */
/* eslint curly: 2, quotes: ["error", "double"] */
/* eslint eqeqeq: "off", curly: "error" */
import styled from '@emotion/styled'
import React, { useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import './log.css'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

const LoginContainer = styled.div`
  width: 25%;
  min-height:calc(100vh - 125px);
  margin: 20rem auto 0;
  color: grey;
`

export default function Login(props) {
  const [account, setAccount] = useState('')
  const [pwd, setPwd] = useState('')

  const demo = () => {
    setAccount('joutzu')
    setPwd('12345')
  }

  const handlelogin = () => {
    axios
      .post('http://localhost:3001/member/signin', {
        memberId: account,
        password: pwd
      })
      .then((e) => {
        if (e.data) {
          // alert('登入成功')
          // 把member資訊存入session
          window.sessionStorage.setItem('userinfo', JSON.stringify(e.data))
          swal({
            title: '登入成功',
            // text: "You clicked the button!",
            icon: 'success',
            button: '開始競標！'
          }).then(() => {
            window.location.href = 'http://localhost:3000/'
          }
          )
        } else {
          // alert('登入失敗')
          swal({
            title: '登入失敗',
            text: '請輸入正確的帳號密碼',
            icon: 'error',
            button: '再試一次'
          })
        }
      })
  }

  return (
    <>
      <LoginContainer>
        <p className="logTitle" onClick={demo}>登入會員</p>
        <span className="title2"> 帳號 </span>
        <br />
        <input
          className="account"
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <br />
        <span className="title2"> 密碼 </span>
        <br />
        <input
          type="password" // Len 2021/5/9
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <input className="rememberMe" type="checkbox" />
        <label className="rememberMeLabel">記住我</label>
        <Button
          className="submitBtn"
          variant="contained"
          color="primary"
          onClick={handlelogin}
          type="submit"
          style={{ width: '100%', fontSize: '2rem' }}
        >
          登入
        </Button>
        <br /><br />
        <span className="title2">還沒有會員？<Link to="/member/signup">註冊</Link></span>

      </LoginContainer>
    </>
  )
}
