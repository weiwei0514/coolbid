import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import {
  Typography,
  FormGroup,
  FormControl,
  // FormHelperText,
  Button,
  Breadcrumbs,
  Link,
  Card,
  TextField
} from '@material-ui/core'

import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'

import useStyles from '../../../styles/renewMemberPwdStyle'
import styled from '@emotion/styled'
import NestedList from '../../backstage/Main/MemberList'

// const RenewContainer = styled.div`
//   width: 70%;
//   margin: 20rem auto;
//   display: flex;
// `

const FormControlWei = styled(FormControl)`
  width: 30rem;
`

const RenewMemberPwd = () => {
  const classes = useStyles()
  const userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))

  useEffect(() => {
    axios
      .post('http://localhost:3001/member/renewMemberPwd', {
        memberId: userInfo.memberId
      })
      .then(res => setDbPassword(res.data.toString()))
  }, [])

  const [dbPassword, setDbPassword] = useState()
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const handleOldPasswordChange = e => {
    setOldPassword(e.target.value)
  }
  const handleNewPasswordChange = e => {
    setNewPassword(e.target.value)
  }
  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
  }

  const onSave = () => {
    if (dbPassword === oldPassword) {
      if (newPassword === confirmPassword) {
        axios
          .post('http://localhost:3001/member/renewMemberPwd', {
            isOverwrite: true,
            memberId: userInfo.memberId,
            newPassword: newPassword
          })

        swal({
          title: '密碼已更新',
          icon: 'success',
          button: '確認'
        })
      } else {
        setNewPassword('')
        setConfirmPassword('')

        swal({
          title: '確認密碼與新密碼不一致，請重新輸入',
          icon: 'warning',
          button: '確認'
        })
      }
    } else {
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')

      swal({
        title: '舊密碼輸入錯誤，請重新輸入',
        icon: 'warning',
        button: '確認'
      })
    }
  }

  const onDelete = () => {
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='sellerBackend_Member_Wrap'>
      <div className='sellerBackend_Member_Container'>
        <div className='backstageLeft'>
          <NestedList />
        </div>
        <div className='backstageRight'>
          <div className='backstageRightContainer'>
            <div className='content'>
              <Breadcrumbs
                aria-label='breadcrumb'
                className={classes.breadcrumb}
              >
                <Link color='inherit' href='http://localhost:3000/member/edit'>
                  會員中心
                </Link>
                <Link
                  color='inherit'
                  href='http://localhost:3000/member/renewMemberPwd'
                >
                  更改密碼
                </Link>
              </Breadcrumbs>
              <Card className={classes.card}>
                <FormGroup>
                  {/* 舊密碼 */}
                  <div className={classes.inputGroup}>
                    <Typography variant='h5'>舊的密碼</Typography>
                    <FormControlWei className={classes.inline}>
                      <TextField
                        required
                        id='old-password'
                        label='必填'
                        onChange={handleOldPasswordChange}
                        value={oldPassword}
                        variant='outlined'
                        type='password'
                      />
                    </FormControlWei>
                  </div>
                  <br />

                  {/* 新密碼 */}
                  <div className={classes.inputGroup}>
                    <Typography variant='h5'>新的密碼</Typography>
                    <FormControlWei className={classes.inline}>
                      <TextField
                        required
                        id='new-password'
                        label='必填'
                        onChange={handleNewPasswordChange}
                        value={newPassword}
                        variant='outlined'
                        type='password'
                      />
                    </FormControlWei>
                  </div>
                  <br />

                  {/* 確認密碼 */}
                  <div className={classes.inputGroup}>
                    <Typography variant='h5'>確認密碼</Typography>
                    <FormControlWei className={classes.inline}>
                      <TextField
                        required
                        id='confirm-password'
                        label='請與新密碼一致'
                        onChange={handleConfirmPasswordChange}
                        value={confirmPassword}
                        variant='outlined'
                        type='password'
                      />
                    </FormControlWei>
                  </div>
                </FormGroup>
                <br />
                <div className={classes.btnGroup}>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={onSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
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
    </div>
  )
}

export default RenewMemberPwd
