import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import { AffixHeader, AffixMenu } from '../common/AffixLayout.js';
import TabsContent from './TabsContent';

const { Content } = Layout;

function CourseRoute({ pathOder }) {
    const [pathIndex, setPathIndex] = useState(pathOder);
    const [path, setPath] = useState("");
    useEffect(() => {
        setPath("change");
    }, [pathIndex])
    return (
        <Layout style={{ height: '100vh' }}>
            <AffixMenu selectMenu="3" />

            <Layout className="site-layout">
                <AffixHeader />
                <Content className="site-layout-background" style={{ margin: '14px 16px', minHeight: 280, }}>
                    {(pathOder === "add") ? (<TabsContent tabSelected={2} />) : ((pathOder === "manager") ? (<TabsContent tabSelected={3} />) : (<TabsContent tabSelected={1} />))}
                </Content>
            </Layout>
        </Layout>
    )
}

export default CourseRoute;