import '../../../index.css'
import React from 'react'
import {Menu, Layout, Badge} from 'antd'
import {BookOutlined, StarOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux'

const {Sider} = Layout
const {SubMenu} = Menu;

interface SiderProps {
    collapsed?: boolean
    shipments?: object[]
    onSelect?: () => void
    setCollapsed?: () => void
}

const Sidebar: React.FC<SiderProps> = ({collapsed, shipments, onSelect, setCollapsed}) => {

    const {wishlist, collection} = useSelector((state: any) => state.library)

    return (
        <Sider
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
                <SubMenu key="sub1" icon={<BookOutlined/>} title="Library">
                    <Menu.ItemGroup key="g1" title="Categories">
                        <Menu.Item key="1">
                            <Link
                                to={'/fantasy'}
                            >
                                Fantasy <Badge style={{marginLeft: 10, backgroundColor: '#52c41a'}}
                                               count={collection[0]?.collection.length}/>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link
                                to={'/novels'}
                            >
                                Novels <Badge style={{marginLeft: 10, backgroundColor: '#52c41a'}}
                                              count={collection[1]?.collection.length}/>
                            </Link>
                        </Menu.Item>

                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="3" icon={<StarOutlined/>}>
                    <Link
                        className="text-decoration-none"
                        to={'/wishlist'}
                    >
                        Wishlist <Badge style={{marginLeft: 10}} count={wishlist.length}/>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Sidebar
