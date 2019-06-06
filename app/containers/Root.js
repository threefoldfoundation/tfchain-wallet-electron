// @flow
import { connect, Provider } from 'react-redux'
import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import Routes from '../Routes'
import { setClient, loadAccounts, setBalance, setChainConstants, getTransactionsNotifications, setError } from '../actions'

const os = require('os')
const storage = require('electron-json-storage')
const path = require('path')

storage.setDataPath(os.tmpdir())

const mapStateToProps = state => ({
  account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  setClient: (client) => {
    dispatch(setClient(client))
  },
  loadAccounts: (accounts) => {
    dispatch(loadAccounts(accounts))
  },
  setBalance: (account) => {
    dispatch(setBalance(account))
  },
  setChainConstants: (account) => {
    dispatch(setChainConstants(account))
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
      this.props.setBalance(account)
      this.props.setChainConstants(account)
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
  mapStateToProps,
  mapDispatchToProps
)(Root)
