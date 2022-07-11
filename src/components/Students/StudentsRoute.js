import React from 'react';
import { Layout, } from 'antd';

import { AffixHeader, AffixMenu } from './../common/AffixLayout';
import TabsContent from './TabsContent';

const { Content } = Layout;

const StudentRoute = ({ pathOder }) => {
    return (
        <Layout style={{ height: '100vh' }}>
            <AffixMenu selectMenu="2" />

            <Layout className="site-layout">
                <AffixHeader />
                <Content className="site-layout-background" style={{ margin: '14px 16px', minHeight: 280, }}>
                    {(pathOder === "add") ? (<TabsContent tabSelected="2" />) : <TabsContent tabSelected="1" />}
                </Content>
            </Layout>
        </Layout>
    );
}

export default StudentRoute;