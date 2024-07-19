import React, { useEffect } from 'react';
import { Button, Form, Grid, Input, Layout, Space, Typography, message } from 'antd';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Slices/authSlice';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state?.auth);
  
    useEffect(() => {
      user.email && navigate('/dashboard');
    }, [])

    if(user.email){
        return (
            <></>
        )
    }

    const user_data = {
        email: 'demo@gmail.com',
        password: '123abc'
    }

    const isEqual = (obj1, obj2) => {
        return Object.keys(obj1).every(key => obj1[key] === obj2[key]) &&
               Object.keys(obj2).every(key => obj2[key] === obj1[key]);
      };

    const onFinish = (values) => {
        console.log(values, user_data);
        isEqual(user_data, values)
        ? <>
            {dispatch(login(values))}
            {navigate('/dashboard')}
        </>
        : message.error("Email or password does match")
    };
    
    const onFinishFailed = (errorFields) => {
        const consecutiveSpacesError = errorFields.find((field) =>
            field.errors.toString().includes("consecutive spaces")
        );
        consecutiveSpacesError
        ? message.error("Please Remove Consecutive Spaces!")
        : message.error("Please Fill Required Fields!");
    };
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    return (
        <Container>
            <CustomForm
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={({ errorFields }) => onFinishFailed(errorFields)}
                autoComplete="off"
            >
                <Heading>
                    Sign In
                </Heading>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                          whitespace: true,
                          required: true,
                          validator: (_, value) => {
                            if (!value || value.trim() === "") {
                              return Promise.reject("please enter email");
                            } else if (/\s{2,}/.test(value)) {
                              return Promise.reject(
                                "please remove consecutive spaces"
                              );
                            }else if (!isValidEmail(value)) {
                              return Promise.reject("please enter a valid email");
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                >
                    <InputUsername />
                </Form.Item>
            
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                >
                <InputPassword />
                </Form.Item>
            
                <Form.Item>
                    <LogButton type="primary" htmlType="submit">
                        Submit
                    </LogButton>
                </Form.Item>
                <FooterText>
                  Don't have an account? <Link to='/signup' style={{color: '#0047ab'}}>Signup here</Link>
                </FooterText>
            </CustomForm>
        </Container>
    )
};
export default Login;

const CustomForm = styled(Form)(() => ({
  maxWidth: 400,
  width: 'auto',
  margin: '0 auto',
  border: '1px solid #d9d9d9',
  borderRadius: '20px',
  padding: '40px 30px'
}));

const Heading = styled(Typography)(() => ({
  fontSize: 'clamp(22px, 3vw, 30px)',
  fontWeight: '700',
  textAlign: 'center',
  margin: '0px auto 30px'
}));

const FooterText = styled(Typography)(() => ({
  fontSize: 'clamp(15px, 3%, 23px)',
  fontWeight: '500',
  textAlign: 'center',
  margin: '30px auto 0px'
}));

const Container = styled(Space)(() => ({
    display: 'grid',
    height: '100vh',
    marginInline: '20px'
  }));

  const inputStyle = {
    height: '40px',
    '&:hover': {
        borderColor: '#0047ab',
      },
      "&:focus, &:active, &:focus-within": {
        borderColor: '#0047ab',
        boxShadow: 'none !important',
      }
  }
const InputUsername = styled(Input)(() => (inputStyle));
const InputPassword = styled(Input.Password)(() => (inputStyle));

const LogButton = styled(Button)(() => ({
    marginTop: '20px',
    width: '100%',
    height: '40px',
    backgroundColor: '#0047ab',
    color: 'white',
    '&:hover': {
        backgroundColor: '#003580 !important',
      }
  }));