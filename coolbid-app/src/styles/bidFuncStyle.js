import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  bidFuncWrapper: {
    padding: theme.spacing(5, 4)
  },
  bidInfo: {
    lineHeight: '3.5rem',
    fontWeight: '500'
  },
  directBuy: {
    display: 'inline-block',
    fontSize: '2rem',
    marginRight: '10px'
  },
  directBuyGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem 0'
  },
  bidFuncGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  directBidGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  bidNowGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceInput: {
    width: '8rem',
    padding: '.3rem 0 .3rem 1rem',
    fontSize: '1.8rem',
    marginLeft: '3rem',
    border: 'none',
    borderBottom: '2px solid #888',
    color: '#666'
  },
  buyBtn: {
    fontSize: '1.5rem'
  },
  bidBtn: {
    marginLeft: '4.5rem',
    fontSize: '1.5rem',
    margin: '0 1rem'
  },
  save: {
    margin: '4rem 0 0',
    padding: '2rem 5rem',
    backgroundColor: '#eee',
    fontWeight: '600',
    fontSize: '2.5rem'
  }
}))

export default useStyles
