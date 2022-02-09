/* eslint-disable space-before-function-paren */
import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import CarTabs from './CarTabs'
import CarBidingContainer from './CarBidingContainer'
import '../../../SASS/list.scss'
import '../../../SASS/Components.scss'

function CarBiding() {
  // const [list, setList] = useState([
  const list = [
    {
      storeId: 122,
      store: '香奈兒精品',
      title: '超級酷斃賣家',
      product: [
        {
          productId: 1,
          pic: 'null',
          name: '可愛包包',
          date: '2021-05-27',
          currentPrice: 3000,
          myBidPrice: 2400,
          direct: 5000
        },
        {
          productId: 2,
          pic: 'null',
          name: '酷炫鞋子',
          date: '2021-05-27',
          currentPrice: 3000,
          myBidPrice: 2400,
          direct: 5000
        }
      ]
    },
    {
      storeId: 123,
      store: '耐吉專賣',
      title: '超級酷斃賣家',
      product: [
        {
          productId: 3,
          pic: 'null',
          name: '超貴手錶',
          date: '2021-05-27',
          currentPrice: 8000,
          myBidPrice: 5000,
          direct: 9000
        },
        {
          productId: 4,
          pic: 'null',
          name: '時尚衣服',
          date: '2021-05-27',
          currentPrice: 6000,
          myBidPrice: 4000,
          direct: 8000
        }
      ]
    }
  ]

  return (
    <>
      <div className="Table_wrap">
        <CarTabs />
        <TableContainer className="Table_container">
          {list.map((item) => {
            return <CarBidingContainer key={item.storeId} carBidDetail={item} />
          })}
        </TableContainer>
      </div>
    </>
  )
}

export default CarBiding
