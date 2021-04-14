import { Layout, Menu, Breadcrumb } from 'antd';
import React from 'react';
import * as ICONS from '@ant-design/icons';
import MenuData from '../menu';
import Styles from './index.less';
import { Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Layouts extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  createMenu = (data) => {
    return data.map((it, i) => {
      const ICON = it.icon ? React.createElement(ICONS[it.icon]) : '';
      if (it.children && it.children.length > 0) {
        return (
          <SubMenu key={it.key} icon={ICON} title={it.name}>
            {this.createMenu(it)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={it.key} icon={ICON} title={it.name}>
            <Link to={it.path}> {it.name}</Link>
          </Menu.Item>
        );
      }
    });
  };

  render() {
    const { collapsed } = this.state;
    const isLogin = this.props.history.location.pathname === '/login';
    if (isLogin) {
      return this.props.children;
    } else {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className={Styles.logo} />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              {this.createMenu(MenuData)}
            </Menu>
          </Sider>
          <Layout className={Styles.siteLayout}>
            <Header
              className={Styles.siteLlayoutBbackground}
              style={{ padding: 0 }}
            />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className={Styles.siteLlayoutBbackground}
                style={{ padding: 24, minHeight: 360 }}
              >
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      );
    }
  }
}
