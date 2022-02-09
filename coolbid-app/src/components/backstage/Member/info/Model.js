import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '50px',
    borderRadius: '1rem'
  }
}))

export default function TransitionsModal () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <button className="button" type="button" onClick={handleOpen}>
        新增地址
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="addlist">
              <p>
                姓名：
                <TextField
                  type="text"
                  name="name"
                  value=""
                  onChange=""
                  variant="outlined"
                  className="mininput"
                />
              </p>
              <p>
                手機：
                <TextField
                  type="text"
                  name="phonee"
                  value=""
                  onChange=""
                  variant="outlined"
                  className="mininput"
                />
              </p>
              <p>
                超商：
                <TextField
                  type="text"
                  name="convenience"
                  value=""
                  onChange=""
                  variant="outlined"
                  className="mininput"
                />
              </p>
              <p>
                地址：
                <TextField
                  type="text"
                  name="address"
                  value=""
                  onChange=""
                  variant="outlined"
                  className="mininput"
                />
              </p>

              <button className="button">新增地址</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
