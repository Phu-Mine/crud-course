import React, { useState } from 'react';
import { Menu, Button, Layout, Typography, Affix, Tooltip } from 'antd';

import CheckLogin from '../../api/CheckLogin.js';
import UserOptions from './UserOption.js';

import { Link } from 'react-router-dom';

import {
    DashboardOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    TeamOutlined,
    PicCenterOutlined,
} from '@ant-design/icons';

const { Sider, Header } = Layout;

export function AffixHeader() {
    return (
        <Affix offsetTop={0}>
            <CheckLogin />
            <Header className="site-layout-background" style={{ padding: 0, background: '#777' }}>
                <Typography.Paragraph style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                    QUẢN LÝ SINH VIÊN
                </Typography.Paragraph>
                <UserOptions />
            </Header>
        </Affix>
    )
}

export function AffixMenu({ selectMenu }) {

    const [collapsedTitle, setCollapsedTitle] = useState("Thu nhỏ");
    const [collapsed, setCollapsed] = useState(localStorage.getItem("axd") == "1");

    const toggle = () => {
        setCollapsed(!collapsed);
        if (collapsed) {
            setCollapsedTitle("Thu nhỏ");
            localStorage.setItem("axd", "0")
        }
        else {
            setCollapsedTitle("Phóng to");
            localStorage.setItem("axd", "1")
        }
    };

    switch (selectMenu) {
        case "1": document.title = "Tổng Quan";
            break;
        case "2": document.title = "Quản lý sinh viên";
            break;
        case "3": document.title = "Quản lý khoá học";
            break;
        default: document.title = "Quản lý "
    }

    return (
        <Affix offsetTop={0}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
                <div className="logo">DEMO APP</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectMenu]} style={{ fontSize: 16 }}>
                    <Menu.Item key="1" icon={<DashboardOutlined />} >
                        <Link to='/dashboard'>Tổng Quan</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />} >
                        <Link to='/students'>Quản Lý Sinh Viên</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<PicCenterOutlined />}>
                        <Link to='/courses'>Quản Lý Khóa Học</Link>
                    </Menu.Item>
                    <Tooltip title={collapsedTitle} placement="right">
                        <Button type='ghost' style={{ width: "99%", height: "30px", color: "#fff" }} onClick={toggle}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                            })}
                        </Button>
                    </Tooltip>
                </Menu>

            </Sider>

        </Affix>
    )
}