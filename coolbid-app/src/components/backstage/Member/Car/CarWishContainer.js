/* eslint-disable space-before-function-paren */
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem } from '@fortawesome/free-solid-svg-icons'
import '../../../SASS/list.scss'
import '../../../SASS/Components.scss'

function CarWishContainer(props) {
  const { carWishDetail } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={6}>
            {carWishDetail.store}&emsp;
            <FontAwesomeIcon icon={faGem} />
            &emsp;{carWishDetail.title}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="center">圖片</TableCell>
          <TableCell align="center">項目</TableCell>
          <TableCell align="center">日期</TableCell>
          <TableCell align="center">當前價格</TableCell>
          <TableCell align="center">直接購買</TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {carWishDetail.product.map((list, index) => {
          return (
            <TableRow key={index}>
              <TableCell align="center">{list.pic}</TableCell>
              <TableCell align="center">{list.name}</TableCell>
              <TableCell align="center">{list.date}</TableCell>
              <TableCell align="center">{list.currentprice}</TableCell>
              <TableCell align="center">{list.direct}</TableCell>
              <TableCell align="center">
                <input
                  type="submit"
                  value="取消收藏"
                  className="button SetStoreInfo_Submit"
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default CarWishContainer
