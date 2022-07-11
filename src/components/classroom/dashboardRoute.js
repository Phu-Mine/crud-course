import React from 'react';
import { Layout, } from 'antd';
import Classroom from './index.js';

import { AffixHeader, AffixMenu } from './../common/AffixLayout';

const { Content } = Layout;

function Dashboard() {

    return (
        <Layout style={{ height: '100vh' }}>
            <AffixMenu selectMenu="1" />

            <Layout className="site-layout">
                <AffixHeader />
                <Content className="site-layout-background" style={{ margin: '14px 16px', minHeight: 280, }}>
                    <Classroom />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard;