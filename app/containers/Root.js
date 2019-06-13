// @flow
import { connect, Provider } from 'react-redux'
import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import Routes from '../Routes'
import { loadAccounts, updateAccount, getTransactionsNotifications, setError } from '../actions'

const os = require('os')
const storage = require('electron-json-storage')
const path = require('path')

storage.setDataPath(os.tmpdir())

const mapDispatchToProps = (dispatch) => ({
  loadAccounts: (accounts) => {
    dispatch(loadAccounts(accounts))
  },
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  },
  getTransactionsNotifications: (account) => {
    dispatch(getTransactionsNotifications(account))
  },
  setError: (error) => {
    dispatch(setError(error))
  }
})

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = { errorOccurred: false }
  }

  componentDidCatch = (error, info) => {
    console.log(error)
    if (error) {
      this.props.setError(error)
      this.props.history.push('/home')
    }
    this.setState({ errorOccurred: true })
  }

  componentWillMount () {
    // Configure storage
    const dataPath = storage.getDefaultDataPath()
    const newPath = path.join(dataPath, '/tfchain/accounts')
    storage.setDataPath(newPath)

    // Load in accounts and put them in store
    const loadAccountsFromStorage = this.props.loadAccounts
    storage.getAll(function (err, data) {
      if (err) throw err
      loadAccountsFromStorage(Object.values(data))
    })

    // Refresh account balance every 1 minutes
    this.intervalID = setInterval(() => {
      const { account } = this.props
      this.props.updateAccount(account)
      this.props.getTransactionsNotifications(account)
    }, 60000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalID)
  }

  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Root)
