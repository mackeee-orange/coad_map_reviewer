import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Layout, Menu } from 'antd'
import Logo from '../../../constants/images/logo.svg'
import routes from '../../../routes'
import styles from './index.module.scss'

const { Sider } = Layout

const mainMenuItemList = [
  { name: 'Home', iconType: 'appstore', link: routes.home() },
  { name: 'マイページ', iconType: 'user', link: routes.myPage() },
]

export default class SideBar extends React.Component {
  state = {
    currentUrl: '',
    selectedKeys: [mainMenuItemList[0].name],
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const pageUrl = window.location.href
    if (pageUrl !== this.state.currentUrl) {
      const menuItems = [...mainMenuItemList].filter(
        menuItem => pageUrl.includes(menuItem.link)
      )
      this.setState({ currentUrl: pageUrl, selectedKeys: menuItems.map(menuItem => menuItem.name) })
    }
  }

  render() {
    const { isMenuCollapsed } = this.props
    return (
      <Sider breakpoint="md" collapsible collapsed={isMenuCollapsed} className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={Logo} alt="" width={36} height={36} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={this.state.selectedKeys}
          defaultOpenKeys={[]}
        >
          {mainMenuItemList.map(menuItem => (
            <Menu.Item key={menuItem.name}>
              <Link to={menuItem.link}>
                <Icon type={menuItem.iconType} />
                <span className="nav-text">{menuItem.name}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    )
  }
}
