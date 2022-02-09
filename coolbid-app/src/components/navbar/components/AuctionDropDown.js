import React from 'react'
import '../style/dropdown.css'
import { NavLink } from 'react-router-dom'

// eslint-disable-next-line space-before-function-paren
export default function AuctionDropDown() {
  return (
    <dl className="auctionList maki">
      <dd>
        <NavLink to="/auction/歷史紀錄">歷史紀錄</NavLink>
      </dd>
      <dd>
        <NavLink to="/auction/coming">即將舉行</NavLink>
      </dd>
      <dd>
        <NavLink to="/auction/about me">about me</NavLink>
      </dd>
    </dl>
  )
}
