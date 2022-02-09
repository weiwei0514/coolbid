/* eslint-disable space-before-function-paren */
import React from 'react'
import '../../../SASS/list.scss'

function CarTabs() {
  return (
    <nav className="tabs">
      <ul>
        <li>
          <a href="#">購物車</a>
        </li>
        <li>
          <a href="#">競標中</a>
        </li>
        <li>
          <a href="#">收藏中</a>
        </li>
      </ul>
    </nav>
  )
}

export default CarTabs
