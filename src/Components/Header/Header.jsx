import { Badge, Button, Dropdown, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { logout } from '../../Redux/Slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ProfileDrawer from '../Drawers/ProfileDrawer';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state?.auth);
  const { data } = useSelector((state) => state?.cart);
  const [drawer, setDrawer] = useState({
    open: false,
    data: {}
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    handleCount();
  }, [data])

  const handleCount = () => {
    const count = data?.map(item => item?.qty)?.reduce((acc, val) => acc + val, 0);
    setCount(count);
  }
  
  const onClose = () => {
      setDrawer({
        open: false,
        data: {}
      });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    const priv_items = [
      {
        key: '1',
        label: 'Profile',
        onClick: () => { setDrawer({ open: true, data: dummy_user }) }
      },
      {
        key: '2',
        label: 'Logout',
        onClick: handleLogout
      },
    ];

    const public_items = [
      {
        key: '1',
        label: 'Login',
        onClick: () => { navigate('/login') }
      },
      {
        key: '2',
        label: 'Signup',
        onClick: () => { navigate('/signup') }
      },
    ];

    const items =  user?.email ? priv_items : public_items

    const dummy_user = {
      id: 1,
      fullName: 'John Doe',
      email: 'demo@gmail.com',
      phoneNumber: "03034873652",
      city: 'Islamabad',
      postalCode: '44000',
      address: 'DHA Sector F, Phase 1, Islamabad'
    }

  return (
    <>
        <Container>
            <Link to='/dashboard'>
              <img src={`https://foodapp.ee/wp-content/uploads/2022/01/FoodApp-Logo-small-300x100-1.png`} 
                alt="logo"
                width={150}
              />
            </Link>
            <div style={{display: 'flex', gap: '15px'}}>
              <Dropdown
                trigger={'click'}
                menu={{
                  items,
                }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                <CustomUserOutlined />
                </a>
              </Dropdown>
              <Badge color={'#FF7E20'} count={count}>
                <Link to={'cart'}>
                  <CustomCartOutlined />
                </Link>
              </Badge>
            </div>
            
        </Container>

        {/* Profile Drawer */}
        <ProfileDrawer
          drawer={drawer}
          onClose={onClose}
        />
    </>
  )
}

export default Header;

const Container = styled(Space)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingInline: '10%',
    height: '80px',
    background: 'white',
    borderBottom: '1px solid #e5e7eb',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  }));

  const CustomIconStyle = {
    fontSize: '20px',
    color: 'white',
    cursor: 'pointer',
    backgroundColor: '#0047ab',
    borderRadius: '50%', 
    padding: '10px',
    '&:hover': {
        backgroundColor: '#003580',
        transition: '.6s ease',
      },
  }

  const CustomUserOutlined = styled(UserOutlined)(() => (CustomIconStyle));
  const CustomCartOutlined = styled(ShoppingCartOutlined)(() => (CustomIconStyle));