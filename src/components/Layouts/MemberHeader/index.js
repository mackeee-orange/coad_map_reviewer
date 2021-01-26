import React from 'react'
import { Col, Dropdown, Icon, Layout, Menu, Row } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import routes from '../../../routes'

const { Header } = Layout
const menu = (account, signOut) => (
  <Menu>
    <Menu.Item key="1">
      <Link to={routes.myPage()}>マイページ</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <div onClick={signOut}>ログアウト</div>
    </Menu.Item>
  </Menu>
)

export default ({ app, account, toggleMenu, signOut }) => (
  <Header className={styles.header}>
    <Row type="flex" justify="space-between">
      <Col>
        <div>
          <Icon
            type={app.isMenuCollapsed ? 'menu-unfold' : 'menu-fold'}
            className={styles.menuToggleTrigger}
            onClick={toggleMenu}
          />
          <b className={styles.pageTitle}>{app.pageTitle}</b>
        </div>
      </Col>
      <Col xs={0} sm={6} style={{ textAlign: 'right' }}>
        <Dropdown.Button
          overlay={menu(account, signOut)}
          icon={<Icon type="user"/>}
          trigger={['click']}
        >
          {account.username}
        </Dropdown.Button>
      </Col>
    </Row>
  </Header>
)
