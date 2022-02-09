/* eslint-disable space-before-function-paren */
import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import CarWishContainer from './CarWishContainer'
import CarTabs from './CarTabs'
import '../../../SASS/list.scss'
import '../../../SASS/Components.scss'

function CatWish() {
  // const [list, setList] = useState(

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
          date: '2021-05-27T10:30',
          currentprice: 3000,
          direct: 5000
        },
        {
          productId: 2,
          pic: 'null',
          name: '超貴手錶',
          date: '2021-05-25T10:30',
          currentprice: 2000,
          direct: 6000
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
          date: '2021-05-27T10:30',
          currentprice: 3000,
          direct: 5000
        },
        {
          productId: 4,
          pic: 'null',
          name: '時尚衣服',
          date: '2021-05-25T10:30',
          currentprice: 2000,
          direct: 6000
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
            return <CarWishContainer key={item.storeId} carWishDetail={item} />
          })}
        </TableContainer>
      </div>
    </>
  )
}

export default CatWish
