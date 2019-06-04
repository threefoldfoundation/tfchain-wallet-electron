import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setChainConstants } from '../actions'
import moment from 'moment'
import { toast } from 'react-toastify'
import momentTz from 'moment-timezone'

const mapStateToProps = state => ({
  account: state.account,
  chainConstants: state.chainConstants
})

const mapDispatchToProps = (dispatch) => ({
  setChainConstants: (constants) => {
    dispatch(setChainConstants(constants))
  }
})

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
      intervalId: undefined
    }
  }

  componentDidMount () {
    this.mounted = true
    this.getChainInfo()
    this.getTransactionsForWallet()
    const intervalId = setInterval(() => {
      this.getChainInfo()
      this.getTransactionsForWallet()
    }, 60000)
    this.setState({ intervalId })
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
    this.mounted = false
  }

  getTransactionsForWallet = () => {
    if (this.props.account.chain_info_get) {
      this.props.account.chain_info_get().then(info => {
        this.props.account.wallets.map(w => {
          const block = info.last_block_get({
            addresses: w.addresses
          })
          if (block.transactions.length > 0) {
            block.transactions.forEach(tx => {
              if (tx.inputs.length > 0) {
                toast('Incomming transaction received')
              }
              if (tx.outputs.length > 0) {
                toast('Outgoing transaction received')
              }
            })
          }
        })
        if (this.mounted) {
          this.setState({ error: false })
        }
      })
        .catch(err => {
          if (this.mounted) {
            this.setState({ error: err.__str__() })
          }
        })
    }
  }

  getChainInfo = () => {
    if (this.props.account.chain_info_get) {
      this.props.account.chain_info_get().then(info => {
        const chainInfo = {
          chainHeight: info.chain_height,
          chainName: info.chain_name,
          chainNetwork: info.chain_network,
          chainTimestamp: info.chain_timestamp,
          chainVersion: info.chain_version,
          explorerAddress: info.explorer_address
        }
        if (this.mounted) {
          this.props.setChainConstants(chainInfo)
          this.setState({ error: false })
        }
      })
        .catch(err => {
          if (this.mounted) {
            this.setState({ error: err.__str__() })
          }
        })
    }
  }

  render () {
    const { chainConstants } = this.props
    const { error } = this.state
    const date = moment(chainConstants.chain_timestamp).format('MMMM Do , HH:mm')
    const tz = momentTz.tz.guess()

    return (
      <div style={{ position: 'absolute', height: 70, bottom: 0, width: '100%', background: '#131216', borderTopStyle: 'solid', borderTopWidth: 2, borderTopColor: '#1A253F', padding: 25 }}>
        {error || !chainConstants.chainNetwork
          ? <div>
            <Icon name='circle' style={{ color: 'red', marginLeft: 10 }} />
            <label>not connected</label>
          </div>
          : <div>
            <Icon name='circle' style={{ color: 'green', marginLeft: 10 }} />
            <label>connected to {chainConstants.chainNetwork}</label>
            <label style={{ position: 'absolute', right: 500 }}><Icon name='h square' /> {chainConstants.chainHeight} @ {date} {tz}</label>
            <label style={{ position: 'absolute', right: 50 }}>version 0.1.0</label>
          </div>
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
