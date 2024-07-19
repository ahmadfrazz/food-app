import React from 'react';
import { Button, Result, Space, Typography } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PageNotFound() {
  const nav = useNavigate();
  const { user } = useSelector(state => state?.auth);
  const navigateTo = user.email ? '/dashboard' : '/login' 

  return (
    <>
        <Container>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited doesn't exist or some other error occured."
              extra={<Button type="primary" onClick={() => nav(navigateTo)} style={{background: '#0047ab'}}>Back Home</Button>}
            />
        </Container>
    </>
  )
}

export default PageNotFound;

const Container = styled(Space)(() => ({
    display: 'grid',
    alignContent: 'center',
    justifyItems: 'center',
    height: '100vh',
  }));