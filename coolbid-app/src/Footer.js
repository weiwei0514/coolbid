import React from 'react'
import styled from '@emotion/styled'
import logo from '../src/coolbid.svg'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

const FooterContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 210px;
  background-color: #000;
  z-index: 99;
`

const Logo = styled.div`
  margin: 0 auto;
  background: url(${logo}) no-repeat center top;
  width: 200px;
  height: 100px;
  position: relative;
  top: 20px;
`

const SocialMedia = styled.div`
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
  margin-top: 3rem;
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      opacity: 0.7;
    }
  }
`

const Facebook = styled(FacebookIcon)`
  position: relative;
  top: 2px;
  margin-right: 3px;
`

const Instagram = styled(InstagramIcon)`
  position: relative;
  top: 2px;
  margin-right: 3px;
  margin-left: 2rem;
`

const FooterLinks = styled.div`
  width: 100%;
  background-color: black;
  margin-top: 20px;
  text-align: center;
  padding: 15px 0;
  box-sizing: border-box;
  height: 50px;
  bottom: 0;
  position: absolute;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  ul {
    display: inline-block;
    list-style: none;
    li:last-child{
      padding-right: 20px;
      border-right: 1px solid rgba(255, 255, 255, 0.5);
    }
  }
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      opacity: 0.7;
    }
  }
`
const FooterMenuItem = styled.li`
  display: inline-block;
  margin: 0 20px 0 0;
  font-size: 12px;
  line-height: 12px;
`

const FooterCopyright = styled.div`
  font-size: 11px;
  line-height: 12px;
  display: inline-block;
  color: #fff;
`

const Footer = () => {
  return (
    <FooterContainer>
      <Logo></Logo>
      <SocialMedia>
        <a href="">
          <Facebook />
          FACEBOOK
        </a>
        <a href="">
          <Instagram />
          INSTAGRAM
        </a>
      </SocialMedia>
      <FooterLinks>
        <ul>
          <FooterMenuItem>
            <a href="">疑難排解</a>
          </FooterMenuItem>
          <FooterMenuItem>
            <a href="">與我們聯絡</a>
          </FooterMenuItem>
        </ul>
        <ul>
          <FooterMenuItem>
            <a href="">使用條款</a>
          </FooterMenuItem>
          <FooterMenuItem>
            <a href="">個人資料保護方針</a>
          </FooterMenuItem>
        </ul>
        <ul></ul>
        <ul>
          <FooterMenuItem>
            <a href="/">Global Website</a>
          </FooterMenuItem>
        </ul>
        <FooterCopyright>© COOLBID TAIWAN Co., Ltd.</FooterCopyright>
      </FooterLinks>
    </FooterContainer>
  )
}

export default Footer
