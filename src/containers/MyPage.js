import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Spin } from 'antd'
import { withRouter } from 'react-router-dom'
import { setPageTitle } from '../actions/apps'
import style from '../styles/MyPage.module.scss'

class MyPage extends Component {
  componentDidMount() {
    this.props.setPageTitle('マイページ')
  }

  render() {
    const { isLoading, account } = this.props
    return (
      <div className={style.page}>
        <section className={style.contentSection}>
          <div className={style.sectionInnerWrap}>
            <h1>マイページ</h1>
            <div className={style.profileTable}>
              {isLoading ?
                <Spin size="large" /> :
                Object.keys(account).map((key, idx) => (
                  <Row type="flex" key={idx}>
                    <Col xs={24} md={10}>
                      <div className={style.profileKey}>{account[key].label}</div>
                    </Col>
                    <Col xs={24} md={10}>
                      <div className={style.profileValue}>{account[key].value}</div>
                    </Col>
                  </Row>
                ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({ app, account }) => ({
  isLoading: app.isLoading,
  account: account.me,
})

const mapDispatchToProps = dispatch => ({
  setPageTitle: pageTitle => dispatch(setPageTitle(pageTitle)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyPage))
