import React from 'react'
import '../style/dropdown.css'
import { NavLink } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import StorefrontIcon from '@material-ui/icons/Storefront'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
// eslint-disable-next-line space-before-function-paren
export default function MemberDropDown() {
  const userinfo = window.sessionStorage.getItem('userinfo')
  let login, editto, backstageto, purchaseto, wishListto
  if (userinfo) {
    login = <NavLink to="/member/signout">登出</NavLink>
    editto = '/member/edit'
    backstageto = '/BackStage'
    purchaseto = '/member/purchase'
    wishListto = '/Shopping/WishList'
  } else {
    login = <NavLink to="/member/signin">登入</NavLink>
    editto = '/member/signin'
    backstageto = '/member/signin'
    purchaseto = '/member/signin'
    wishListto = '/member/signin'
  }
  return (
    <div className="memberList">
      <div>{login}</div>
      <div>
        <NavLink to={editto}>
          <PermIdentityIcon
            style={{
              fontSize: '3rem',
              position: 'relative',
              top: '8px',
              marginRight: '4px'
            }}
          />
          會員中心
        </NavLink>
      </div>
      <div>
        <NavLink to={backstageto}>
          <StorefrontIcon
            style={{
              fontSize: '3rem',
              position: 'relative',
              top: '8px',
              marginRight: '4px'
            }}
          />
          賣家後台
        </NavLink>
      </div>
      <div>
        <NavLink to={purchaseto}>
          <LocalMallOutlinedIcon
            style={{
              fontSize: '3rem',
              position: 'relative',
              top: '8px',
              marginRight: '4px'
            }}
          />
          購買紀錄
        </NavLink>
      </div>
      <div>
        <NavLink to={wishListto}>
          <FavoriteBorderOutlinedIcon
            style={{
              fontSize: '3rem',
              position: 'relative',
              top: '8px',
              marginRight: '4px'
            }}
          />
          收藏清單
        </NavLink>
      </div>
    </div>
  )
}
