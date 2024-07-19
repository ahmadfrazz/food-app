import React from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header';

function TopNav({ children }) {
  return (
    <div>
        <Layout>
            <Header />
        </Layout>
        <div style={{padding: '130px 10% 50px'}}>{children}</div>
    </div>
  )
}

export default TopNav;