import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Sidebar from '../Sidebar'
import Header from '../Header'

const { Content } = Layout

const LayoutComponent: React.FC<{}> = () => {
    return (
        <Layout className="h-100">
            <Sidebar />
            <Layout className="site-layout">
                <Header></Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutComponent
