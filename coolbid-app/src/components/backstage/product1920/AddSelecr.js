import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TypeSelect = ({
  types,
  typeSelectedHandler,
  typeSelected
}) => (
    <div className = 'row mt-3'>
      <div className = 'col-md-10 m-auto'>
        <label>Type</label>
        <select
          className = 'form-control'
          onChange = { typeSelectedHandler }
          value = { typeSelected }
        >
          <option value = ''>---</option>
          {
            types && types.map((type) => (
              // eslint-disable-next-line react/jsx-key
              <option value = { type }>{ type }</option>
            ))
          }
        </select>
      </div>
    </div>
)

const ColorSelect = ({
  colors,
  colorSelectedHandler,
  colorSelected
}) => (
    <div className = 'row mt-3'>
      <div className = 'col-md-10 m-auto'>
        <label>Color</label>
        <select
          className = 'form-control'
          onChange = { colorSelectedHandler }
          value = { colorSelected }
        >
          <option value = ''>---</option>
          {
            colors && colors.map((color) => (
              // eslint-disable-next-line react/jsx-key
              <option value = { color }>{ color }</option>
            ))
          }
        </select>
      </div>
    </div>
)

const CountrySelect = ({
  countries,
  countrySelectedHandler,
  countrySelected
}) => (
    <div className = 'row mt-3'>
      <div className = 'col-md-10 m-auto'>
        <label>Country</label>
        <select
          className = 'form-control'
          onChange = { countrySelectedHandler }
          value = { countrySelected }
        >
          <option value = ''>---</option>
          {
            countries && countries.map((country) => (
              // eslint-disable-next-line react/jsx-key
              <option value = { country }>{ country }</option>
            ))
          }
        </select>
      </div>
    </div>
)

const AddSelecr = () => {
  const [data, setData] = useState([])
  const [type, setType] = React.useState('')
  const [color, setColor] = React.useState('')
  const [country, setCountry] = React.useState('')
  const typeSelectedHandler = (e) => {
    setType(e.target.value)
    setColor('')
    setCountry('')
  }
  const colorSelectedHandler = (e) => {
    setColor(e.target.value)
    setCountry('')
  }
  const countrySelectedHandler = (e) => {
    setCountry(e.target.value)
  }

  useEffect(() => {
    console.log('hi')
    axios({
      method: 'get',
      baseURL: 'http://localhost:3001',
      url: '/selectBrand/:cat',
      'Content-Type': 'application/json'
    }).then((a) => {
      setData(a.data)
    })
  }, [])

  const datas = [
    {
      col1: 'apple',
      col2: 'red',
      col3: 'japen'
    },
    {
      col1: 'apple',
      col3: '韓國'
    },
    {
      col1: 'apple',
      col2: 'green',
      col3: 'taiwan'
    },
    {
      col1: 'banana',
      col2: 'yellow',
      col3: 'taiwan'
    }
  ]
  return (
      <div>
        <TypeSelect
          type = { type }
          types = { [...new Set(datas.map((data) => data.col1))] }
          typeSelectedHandler = { typeSelectedHandler }
        />
        {
          type && (
            <ColorSelect
              colorSelected = { color }
              colors = {
                datas
                  .filter((data) => data.col1 === type)
                  .map((data) => data.col2)
              }
              colorSelectedHandler = { colorSelectedHandler }
            />
          )
        }
        {
          (type && color) && (
            <CountrySelect
              countrySelected = { country }
              countries = {
                datas
                  .filter((data) => data.col1 === type && data.col2 === color)
                  .map((data) => data.col3)
              }
              countrySelectedHandler = { countrySelectedHandler }
            />
          )
        }
      </div>
  )
}

export default AddSelecr
