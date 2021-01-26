import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import Header from '../Layouts/GuestHeader'
import Footer from '../Layouts/Footer'
import { toggleMenu } from '../../actions/apps'
import { selfSignOut } from '../../actions/accounts'
import styles from './index.module.scss'

const { Content } = Layout

const GuestPageFrame = ({ children, app, toggleMenu }) => (
  <Layout className={styles.guestPageFrame}>
    <Layout>
      <Header app={app} toggleMenu={toggleMenu} />
      <Content className={styles.content}>{children}</Content>
      <Footer />
    </Layout>
  </Layout>
)

const mapStateToProps = ({ app }) => ({
  app,
})

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleMenu()),
  signOut: () => dispatch(selfSignOut()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestPageFrame)
