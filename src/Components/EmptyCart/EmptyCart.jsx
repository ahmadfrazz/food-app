import React from 'react';
import { Button, Empty, Typography } from 'antd';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
    const nav = useNavigate()

    return (
    
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 160,
          }}
          description={
            <DescText>
              You haven’t added any items in cart yet
            </DescText>
          }
          style={{display: 'grid', placeItems: 'center', height: '70vh', alignContent: 'center'}}
        >
          <ExploreButton type="primary" onClick={() => nav('/dashboard')}>EXPLORE MENU</ExploreButton>
        </Empty>
      )
};
export default EmptyCart;

  const DescText = styled(Typography)(() => ({
    fontSize: '16px',
    color: '#333'
}));

const ExploreButton = styled(Button)(() => ({
    marginTop: '20px',
    width: '450px',
    right: 0,
    height: '40px',
    backgroundColor: '#0047ab',
    color: 'white',
    border: '1px solid #0047ab',
    '&:hover': {
      backgroundColor: '#003580 !important',
    }
  }));