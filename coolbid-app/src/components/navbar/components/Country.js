/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TaiwanFlag from '../images/Taiwan-flag.png'
import AmericaFlag from '../images/America-flag.jpg'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  },
  resize: {
    fontSize: '1.5rem'
  }
}))

export default function DialogSelect() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [country, setCountry] = React.useState('')
  const [currency, setCurrency] = React.useState('')

  const handleChangeCountry = (event) => {
    setCountry(event.target.value || '')
  }
  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (e) => {
    if (e.target.innerText === 'OK') {
      window.sessionStorage.setItem('currency', JSON.stringify(country))
    }
    setOpen(false)
  }
  return (
    <div
      style={{
        display: 'inline-block',
        position: 'absolute',
        right: '2rem',
        top: '6px'
      }}
    >
      <Tooltip title="Language" arrow placement="left">
        <img
          onClick={handleClickOpen}
          src={country === 'TW' ? TaiwanFlag : AmericaFlag}
          alt="countrySelect"
        ></img>
      </Tooltip>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Choose your country</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Country</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={country}
                onChange={handleChangeCountry}
                input={<Input />}
                className={classes.resize}
              >
                <MenuItem value="TW">
                  <img
                    src={TaiwanFlag}
                    style={{ width: '2rem' }}
                    alt="countrySelect"
                  ></img>
                  &nbsp;Taiwan(Traditional Chinese)
                </MenuItem>
                <MenuItem value="US">
                  <img
                    src={AmericaFlag}
                    style={{ width: '2rem' }}
                    alt="countrySelect"
                  ></img>
                  &nbsp;America(English)
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Currency</InputLabel>
              <Select
                native
                value={country === 'TW' ? 'TWD' : 'USD'}
                onChange={handleChangeCurrency}
                input={<Input id="demo-dialog-native" />}
                className={classes.resize}
              >
                <option aria-label="None" value="" />
                <option value="TWD">TWD-Taiwan New Dollar</option>
                <option value="USD">USD-US Dollar</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
