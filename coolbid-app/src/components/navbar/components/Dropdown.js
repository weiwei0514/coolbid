/* eslint-disable multiline-ternary */

import React from 'react'
import '../style/dropdown.css'
import { NavLink } from 'react-router-dom'

const dropbg = {
  display: 'flex',
  position: 'fixed',
  top: '125px',
  left: '0',
  boxShadow: 'inset 0px 5px 10px rgba(0,0,0,.2)',
  width: '100vw',
  height: '20rem',
  padding: '20px',
  backgroundColor: '#fff',
  color: 'black'
}

const category = {
  fontSize: '1.6rem',
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
  letterSpacing: '2px',
  width: '25%',
  padding: '20px',
  borderRight: '1px solid lightgray'
}
const category2 = {
  fontSize: '1.6rem',
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
  letterSpacing: '2px',
  width: '50%',
  padding: '20px',
  borderRight: '1px solid lightgray'
}
const subtitle = {
  borderBottom: '2px solid black',
  color: 'black'
}

const handleHover = (e) => {
  const cat = e.target.getAttribute('cat')
  document.getElementById('bagBrand').style.display = 'none'
  document.getElementById('clothBrand').style.display = 'none'
  document.getElementById('shoesBrand').style.display = 'none'
  document.getElementById('watchBrand').style.display = 'none'
  document.getElementById(cat).style.display = 'flex'
  // console.log(cat)
}
// eslint-disable-next-line space-before-function-paren
export default function DropDown(props) {
  const { pop } = props
  return (
    <>
      <div
        className="dropList"
        style={dropbg}
        id="dropdown"
        onMouseLeave={() => {
          const dropdown = document.getElementById('dropdown')
          dropdown.style.visibility = 'hidden'
        }}
      >
        <div style={category}>
          <span style={subtitle}>SHOP BY PRODUCT</span>
          <div style={{ marginTop: '2.5rem' }}>
            <div className='catLink' cat='bagBrand'>
              <NavLink
                to='/bidding/Bag'
                cat='bagBrand'
                onMouseEnter={(e) => handleHover(e)}
              >
                BAG
              </NavLink>
            </div>
            <div className='catLink' cat='clothBrand'>
              <NavLink
                to='/bidding/Cloth'
                cat='clothBrand'
                onMouseEnter={(e) => handleHover(e)}
              >
                CLOTH
              </NavLink>
            </div>
            <div className='catLink' cat='shoesBrand'>
              <NavLink
                to='/bidding/Shoes'
                cat='shoesBrand'
                onMouseEnter={(e) => handleHover(e)}
              >
                SHOES
              </NavLink>
            </div>
            <div className='catLink' cat='watchBrand'>
              <NavLink
                to='/bidding/Watch'
                cat='watchBrand'
                onMouseEnter={(e) => handleHover(e)}
              >
                WATCH
              </NavLink>
            </div>
          </div>
        </div>
        <div style={category}>
          <span style={subtitle}>SHOP BY BRAND</span>
          {/* Bag */}
          <div id='bagBrand' style={{ marginTop: '1rem', display: 'flex' }}>
            <div
              style={{
                width: '50%'
              }}
            >
              <div className='catLink'>
                <NavLink to='/bidding/Bag'>Louis Vuitton</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Cloth'>Gucci</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Shoes'>Chanel</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Watch'>Dior</NavLink>
              </div>
            </div>
            <div
              style={{
                width: '50%'
              }}
            >
              <div className='catLink'>
                <NavLink to='/bidding/Bag'>Hermès</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Cloth'>Burberry</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Shoes'>Prada</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Watch'>MCM</NavLink>
              </div>
            </div>
          </div>
          {/* CLOTH */}
          <div id='clothBrand' style={{ marginTop: '1rem', display: 'none' }}>
            <div
              style={{
                width: '50%'
              }}
            >
              <div className='catLink'>
                <NavLink to='/bidding/Bag'>Supreme</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Cloth'>Bape</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Shoes'>Kith</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Watch'>Palace</NavLink>
              </div>
            </div>
            <div
              style={{
                width: '50%'
              }}
            >
              <div className='catLink'>
                <NavLink to='/bidding/Bag'>Fear Of God</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Cloth'>Human Made</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Shoes'>Nike</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Watch'>Adidas</NavLink>
              </div>
            </div>
          </div>
          {/* SHOES */}
          <div id='shoesBrand' style={{ marginTop: '1rem', display: 'none' }}>
            <div
              style={{
                width: '50%'
              }}
            >
              <div className='catLink'>
                <NavLink to='/bidding/Bag'>Air Jordan</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Cloth'>Yeezy</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Shoes'>Converse</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Watch'>New Balance</NavLink>
              </div>
            </div>
            <div
              style={{
                width: '50%'
              }}
            >
              <div className='catLink'>
                <NavLink to='/bidding/Bag'>Nike</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Cloth'>Adidas</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Shoes'>Puma</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Watch'>Off-White</NavLink>
              </div>
            </div>
          </div>
          {/* Watch */}
          <div id='watchBrand' style={{ marginTop: '1rem', display: 'none' }}>
            <div
              style={{
                width: '50%'
              }}
            >
              <div className='catLink'>
                <NavLink to='/bidding/Bag'>Rolex</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Cloth'>Tudor</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Shoes'>Cartier</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Watch'>Omega</NavLink>
              </div>
            </div>
            <div
              style={{
                width: '50%'
              }}
            >
              <div className='catLink'>
                <NavLink to='/bidding/Bag'>Seiko</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Cloth'>Casio</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Shoes'>Timex</NavLink>
              </div>
              <div className='catLink'>
                <NavLink to='/bidding/Watch'>Apple</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div style={category2}>
          <span style={subtitle}>Popular Product</span>
          <div style={{ width: '100%', marginTop: '2rem' }}>
            {pop[0] ? (
              <NavLink
                to={
                  pop[0] ? `/bidding/product/product?=${pop[0].productId}` : ''
                }
              >
                <img
                  style={{
                    objectFit: 'scale-down',
                    width: '30%',
                    height: '15rem'
                  }}
                  src={pop[0] ? `/imgs/${pop[0].productId}.jpg` : ''}
                ></img>
              </NavLink>
            ) : <div></div>}
            {pop[1] ? (
              <NavLink
                to={
                  pop[1] ? `/bidding/product/product?=${pop[1].productId}` : ''
                }
              >
                <img
                  style={{
                    objectFit: 'scale-down',
                    width: '30%',
                    height: '15rem'
                  }}
                  src={pop[1] ? `/imgs/${pop[1].productId}.jpg` : ''}
                ></img>
              </NavLink>
            ) : <div></div>}
            {pop[2] ? (
              <NavLink
                to={
                  pop[2] ? `/bidding/product/product?=${pop[2].productId}` : ''
                }
              >
                <img
                  style={{
                    objectFit: 'scale-down',
                    width: '30%',
                    height: '15rem'
                  }}
                  src={pop[2] ? `/imgs/${pop[2].productId}.jpg` : ''}
                ></img>
              </NavLink>
            ) : <div></div>}
          </div>
        </div>
      </div>
      {/* <dl className="list maki">
      {category.map((item, index) => (
        <dd key={index}>
          <NavLink to={'/bidding/' + item.categoryName}>
            {item.categoryName}
          </NavLink>
        </dd>
      ))}
    </dl> */}
    </>
  )
}
