// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Segment, Icon, Divider, Button } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import Footer from '../footer'
import BalanceGrid from './BalanceGrid'
import TransactionsList from './TransactionList'
import { saveAccount, updateAccount } from '../../actions'
import UpdateContactModal from '../addressBook/UpdateContactModal'
import UpdateMultiSigContactModal from '../addressBook/UpdateMultiSigContactModal'
import ExportToPdfModal from './ExportToPdfModal'
import { toast } from 'react-toastify'

const mapStateToProps = state => {
  if (!state.account.state) {
    return {
      routerLocations: state.routerLocations,
      account: null,
      is_loaded: false,
      walletLoadedCount: 0,
      walletCount: 0,
      intermezzoUpdateCount: 0
    }
  }
  return {
    routerLocations: state.routerLocations,
    account: state.account.state,
    is_loaded: state.account.state.is_loaded,
    walletLoadedCount: state.account.walletLoadedCount,
    walletCount: state.account.walletCount,
    intermezzoUpdateCount: state.account.intermezzoUpdateCount
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  },
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  }
})

class Wallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactions: [],
      intervalId: undefined,
      loader: false,
      contactName: '',
      contactAddress: '',
      openAddModal: false,
      ownerAddresses: ['', ''],
      signatureCount: 2
    }
  }

  // implement goBack ourselfs, if a user has made a transaction and he presses go back then he should route to account
  // instead of going back to transfer (default behaviour of react router 'goBack' function)
  goBack = () => {
    const { routerLocations } = this.props
    const previousLocation = routerLocations[routerLocations.length - 1]
    switch (previousLocation) {
      case '/transfer':
        return this.props.history.push(routes.ACCOUNT)
      default:
        return this.props.history.push(routes.ACCOUNT)
    }
  }

  renderWalletBalanceGrid = () => {
    const routeToReceive = () => this.props.history.push(routes.WALLET_RECEIVE)
    const routeToTransfer = () => this.props.history.push(routes.TRANSFER)
    const routeToSign = () => this.props.history.push(routes.SIGN_TRANSACTIONS)
    const walletBalance = this.props.account.selected_wallet.balance

    return (
      <BalanceGrid
        loader={this.state.loader}
        walletBalance={walletBalance}
        routeToReceive={routeToReceive}
        routeToTransfer={routeToTransfer}
        routeToSign={routeToSign}
      />
    )
  }

  openAddModal = (contactAddress) => {
    if (contactAddress instanceof Array) {
      const [signatureCount, ownerAddresses] = contactAddress
      const open = !this.state.openAddMultisigModal
      return this.setState({ openAddMultisigModal: open, contactName: '', ownerAddresses, signatureCount })
    }
    const open = !this.state.openAddModal
    this.setState({ openAddModal: open, contactAddress, contactName: '' })
  }

  closeAddModal = () => {
    this.setState({ openAddModal: false })
  }

  addContact = () => {
    const { contactAddress, contactName } = this.state
    const { account } = this.props
    const { address_book: addressBook } = account
    try {
      addressBook.contact_new(contactName, contactAddress)
      this.setState({ openAddModal: false })
      toast.success('Added contact')
      this.props.saveAccount(account)
    } catch (error) {
      console.log(error)
      this.setState({ openAddModal: false })
      toast.error('Adding contact failed')
    }
  }

  handleAddressChange = (value) => {
    this.setState({ contactAddress: value })
  }

  handleContactNameChange = ({ target }) => (
    this.setState({ contactName: target.value })
  )

  closeAddMultisigModal = () => {
    this.setState({ openAddMultisigModal: false })
  }

  addMultiSigContact = () => {
    const { contactName, ownerAddresses, signatureCount } = this.state
    const { account } = this.props
    const { address_book: addressBook } = account
    try {
      addressBook.contact_new(contactName, [ownerAddresses, signatureCount])
      this.setState({ openAddMultisigModal: false })
      toast.success('Added multisig contact')
      this.props.saveAccount(account)
    } catch (error) {
      this.setState({ openAddMultisigModal: false })
      toast.error('Adding multisig contact failed')
    }
  }

  openExportModal = () => {
    const open = !this.state.openExportModal
    this.setState({ openExportModal: open })
  }

  closeExportModal = () => {
    this.setState({ openExportModal: false })
  }

  render () {
    // If refreshed in development and data in store is deleted, route to account.
    if (!this.props.account.selected_wallet) {
      this.props.history.push(routes.ACCOUNT)
      return null
    }

    const { account } = this.props
    const { chain_info: chainConstants } = account
    const { contactName, contactAddress, openAddModal, ownerAddresses, signatureCount, openAddMultisigModal, openExportModal } = this.state
    const wallet = this.props.account.selected_wallet

    if (openExportModal) {
      return (
        <ExportToPdfModal
          openExportModal={openExportModal}
          closeExportModal={this.closeExportModal}
        />
      )
    }

    return (
      <div>
        <UpdateContactModal
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          contactAddress={contactAddress}
          handleAddressChange={this.handleAddressChange}
          openUpdateModal={openAddModal}
          closeUpdateModal={this.closeAddModal}
          updateContact={this.addContact}
        />
        <UpdateMultiSigContactModal
          editAddressess={false}
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          ownerAddresses={ownerAddresses}
          openUpdateMultisigModal={openAddMultisigModal}
          closeUpdateMultisigModal={this.closeAddMultisigModal}
          updateMultiSigContact={this.addMultiSigContact}
          signatureCount={signatureCount}
        />
        <div className={styles.pageHeader}>
          <p className={styles.pageHeaderTitle}>Wallet {wallet.wallet_name}</p>
          <p className={styles.pageHeaderSubtitle}>Wallet balance and transactions</p>
        </div>
        <Divider className={styles.pageDivider} />
        <div>
          <div className={styles.pageGoBack}>
            <Icon onClick={() => this.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 5, cursor: 'pointer', zIndex: 5 }} name='chevron circle left' />
            <span onClick={() => this.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
          </div>
          <div style={{ height: '100vh', overflow: 'auto', paddingBottom: 250, marginTop: 10 }}>
            {this.renderWalletBalanceGrid()}
            <Segment style={{ width: '90%', height: '45vh', overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E', marginTop: 20 }}>
              <Button size='tiny' style={{ float: 'right' }} className={styles.tinyAcceptButton} onClick={() => this.openExportModal()}>Export to PDF</Button>
              <TransactionsList account={this.props.account} loader={this.state.loader} transactions={wallet.balance.transactions} chainInfo={chainConstants} addContact={this.openAddModal} />
            </Segment>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet)
