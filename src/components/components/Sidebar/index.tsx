import '../../../index.css'
import React from 'react'
import { Empty, Menu, Layout } from 'antd'
import { BookOutlined, StarOutlined } from '@ant-design/icons';
import {Link, Outlet} from "react-router-dom";
const { Sider } = Layout

interface SiderProps {
    collapsed?: boolean
    shipments?: object[]
    onSelect?: ()=>void
    setCollapsed?: ()=>void
}

const Sidebar: React.FC<SiderProps> = ({ collapsed, shipments, onSelect, setCollapsed }) => {
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            // onCollapse={() => setCollapsed(!collapsed)}
            className="site-layout-background"
            width={300}
        >
            <Menu
                className=""
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={false}
            >
                <div className="logo mb-5">

                </div>
                <Menu.Item key="1" icon={<BookOutlined />}>
                    <Link
                        className="text-decoration-none"
                        to={'/'}
                    >
                        Library
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<StarOutlined />}>
                    <Link
                        className="text-decoration-none"
                        to={'/wishlist'}
                    >
                        Wishlist
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Sidebar
