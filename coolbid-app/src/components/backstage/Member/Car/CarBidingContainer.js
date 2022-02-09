/* eslint-disable space-before-function-paren */
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem, faGavel } from '@fortawesome/free-solid-svg-icons'
import '../../../SASS/list.scss'
import '../../../SASS/Components.scss'

function CarBidingContainer(props) {
  const { carBidDetail } = props
  const [state, setState] = React.useState({
    checked: true
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {' '}
          {/* 資料庫帶入區 */}
          <TableCell align="center">
            <Checkbox
              checked={state.checked}
              onChange={handleChange}
              name="checked"
              color="primary"
            />
          </TableCell>
          <TableCell colSpan={7}>
            {carBidDetail.store}&emsp;
            <FontAwesomeIcon icon={faGem} />
            &emsp;{carBidDetail.title}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="center">圖片</TableCell>
          <TableCell align="center">項目</TableCell>
          <TableCell align="center">日期</TableCell>
          <TableCell align="center">當前價格</TableCell>
          <TableCell align="center">我的出價</TableCell>
          <TableCell align="center">再次競標</TableCell>
          <TableCell align="center">直接購買</TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {carBidDetail.product.map((list, index) => {
          return (
            <TableRow key={index}>
              <TableCell align="center">{list.pic}</TableCell>
              <TableCell align="center">{list.name}</TableCell>
              <TableCell align="center">{list.date}</TableCell>
              <TableCell align="center">{list.currentPrice}</TableCell>
              <TableCell align="center">{list.myBidPrice}</TableCell>
              <TableCell align="center">
                <input type="number" value={2200} className="numberInput" />
                &ensp; <FontAwesomeIcon icon={faGavel} />
                <br />
                <input type="radio" name="offer" className="radioInput" />
                直接出價
                <br />
                <input type="radio" name="offer" className="radioInput" />
                自動出價
                {/* <TextField
          id="bid"
          type="number"
          variant="outlined"
          label="bid"
          InputLabelProps={{ shrink: true}}
        />  */}
                {/* <RadioGroup row aria-label="bid" name="bid" defaultValue="direct">
<FormControlLabel value="direct" control={<Radio color="primary" />} label="直接出價" />
<FormControlLabel value="automatic" control={<Radio color="primary" />} label="自動出價" />
</RadioGroup> */}
              </TableCell>
              <TableCell align="center">{list.direct}</TableCell>
              <TableCell align="center">
                <input
                  type="submit"
                  value="直接購買"
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

export default CarBidingContainer
