import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '17rem auto 3rem',
    padding: theme.spacing(0, 0, 2)
  },
  productWrapper: {
    margin: '4rem 1rem 6rem'
  },
  mainMedia: {
    height: '40rem',
    width: '40rem',
    objectFit: 'contain'
  },
  productInfoWrapper: {
    margin: '0 6rem',
    width: '40rem'
  },
  storeMedia: {
    height: '12rem',
    width: '12rem',
    borderRadius: '50%',
    border: '6px solid #ccc'
  },
  productTitle: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    margin: '1.5rem 0 2rem'
  },
  productInfo: {
    fontSize: '1.8rem',
    color: '#555',
    fontWeight: '500',
    lineHeight: '4rem',
    display: 'flex',
    alignItems: 'center'
  },
  store: {
    display: 'flex',
    alignItems: 'center',
    margin: '3rem 2rem 4rem',
    padding: '1rem 7rem 0 3rem'
  },
  storeNameGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  storeName: {
    display: 'inline-block',
    fontSize: '4.5rem',
    margin: '2rem 1rem 1.5rem 0'
  },
  storeInfo: {
    color: '#555',
    fontWeight: '500',
    lineHeight: '4rem'
  },
  storeButton: {
    fontSize: '1.5rem',
    padding: '1rem 2rem'
  },
  infoAndHistory: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: '3rem'
  },
  infoAndHistoryLink: {
    border: '1px solid #444',
    color: '#444',
    fontSize: '2rem',
    padding: '.5rem 5rem',
    borderRadius: '1rem',
    cursor: 'pointer'
  },
  productDetail: {
    padding: '1rem 10rem',
    lineHeight: '3.5rem',
    fontSize: '2rem'
  },
  table: {
    padding: '1rem 6.5rem',
    width: '150rem'
  },
  th: {
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  td: {
    fontSize: '1.5rem'
  }
}))

export default useStyles
