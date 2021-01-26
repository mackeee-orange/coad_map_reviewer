import React from 'react'
import { Button, Col, Icon, Layout, Row } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import routes from '../../../routes'

const { Header } = Layout

export default ({ app, toggleMenu }) => (
  <Header className={styles.header}>
    <Row type="flex" justify="space-between">
      <Col>
        <Link to={routes.top()}>
          <h1>{app.pageTitle}</h1>
        </Link>
      </Col>
      <Row type="flex" justify="end" gutter={24}>
        <Col xs={0} md={12}>
          <Button ghost type="primary">
            <Link to={routes.signIn()}>Log IN</Link>
          </Button>
        </Col>
        <Col xs={0} md={12}>
          <Button type="primary">
            <Link to={routes.signUp()}>Register</Link>
          </Button>
        </Col>
        <Col xs={24} md={0}>
          <div className={styles.rectMenuButton} onClick={toggleMenu}>
            <Icon type={app.isMenuOpen ? 'close' : 'menu'} />
          </div>
        </Col>
      </Row>
    </Row>
  </Header>
)

