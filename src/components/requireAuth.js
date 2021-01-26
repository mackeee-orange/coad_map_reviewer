import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { fetchCurrentAccount } from '../actions/accounts'
import routes from '../routes'

export default ComposedComponent => {
  class Auth extends Component {
    componentDidMount() {
      this.shouldNavigateAway()
    }

    shouldNavigateAway() {
      if (this.props.isLoggedIn) {
        return
      }
      if (this.props.authTokenExist) {
        this.props.fetchCurrentAccount()
      } else {
        this.props.push(routes.signIn())
      }
    }

    render() {
      return <ComposedComponent />
    }
  }

  const mapStateToProps = ({ account }) => ({
    isLoggedIn: account.isLoggedIn,
    authTokenExist: !!account.authToken,
  })

  const mapDispatchToProps = dispatch => ({
    push: path => dispatch(push(path)),
    fetchCurrentAccount: () => dispatch(fetchCurrentAccount()),
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth)
}
