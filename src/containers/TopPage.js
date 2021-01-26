import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setPageTitle } from '../actions/apps'
import styles from '../styles/TopPage.module.scss'

class TopPage extends Component {
  componentDidMount() {
    this.props.setPageTitle('Top')
  }

  render() {
    return (
      <div className={styles.page}>
        <section className={styles.contentSection}>
          <div className={styles.sectionInnerWrap}>
            <h1>トップページです</h1>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  isLoading: app.isLoading,
})

const mapDispatchToProps = dispatch => ({
  setPageTitle: pageTitle => dispatch(setPageTitle(pageTitle)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopPage))
