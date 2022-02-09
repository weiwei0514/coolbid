import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '200px auto 0',
    padding: theme.spacing(2, 0)
  },
  productWrapper: {
    margin: '40px 10px'
  },
  mainMedia: {
    height: '400px',
    width: '400px'
  },
  smallMediaWrapper: {
    backgroundColor: '#ddd',
    width: '400px'
  },
  smallMedia: {
    display: 'inline-block',
    height: '90px',
    width: '90px',
    margin: '5px'
  },
  productInfoWrapper: {
    margin: '0 60px'
  },
  storeMedia: {
    height: '90px',
    width: '90px'
  },
  productTitle: {
    fontWeight: 'bold',
    margin: '2.5rem 0 3.5rem'
  },
  productInfo: {
    color: '#555',
    fontWeight: '500',
    lineHeight: '5rem'
  },
  store: {
    display: 'flex',
    alignItems: 'center',
    margin: '3rem 2rem 4rem'
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
  follow: {
    fontSize: '.2rem'
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
    borderRadius: '1rem'
  },
  productDetail: {
    padding: '1rem 5rem',
    lineHeight: '3.5rem',
    fontSize: '1.7rem'
  },
  table: {
    padding: '1rem 6.5rem',
    width: '150rem'
  },
  th: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  }
}))

export default useStyles
