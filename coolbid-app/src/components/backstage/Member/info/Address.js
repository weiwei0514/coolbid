/* eslint-disable space-before-function-paren */
import React from 'react'
import '../../../SASS/list.scss'
import '../../../SASS/Components.scss'
// import styled from '@emotion/styled'
import NestedList from '../../Main/MemberList'
import Model from '../info/Model'

// const AddressContainer = styled.div`
//   width: 70%;
//   margin: 20rem auto;
//   display: flex;
//   .shipList {
//     width: 20%;
//   }
// `

function Address() {
  // const [data, setDate] = useState(
  const data = [
    {
      id: 1,
      name: 'xia yi zhen',
      phone: '0911-111-123',
      convenience: '7-11',
      address: '台中市台中路168號'
    },
    {
      id: 1,
      name: 'xia yi zhen',
      phone: '0911-111-123',
      convenience: '7-11',
      address: '台中市台中路168號'
    }
  ]

  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <NestedList />
        </div>
        <div className="backstageRight">
          <div className="backstageRightContainer">
            <div className="Address_wrap">
              <Model />
              {/* <div className="btnArea">
                <button className="button">新增地址</button>
              </div> */}
              {data.map((item, index) => {
                return (
                  <div key={index} className="Address_list">
                    <button className="button">刪除</button>
                    <div className="dataArea">
                      <p>姓名：{item.name}</p>
                      <p>手機：{item.phone}</p>
                      <p>超商：{item.convenience}</p>
                      <p>地址：{item.address}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Address
