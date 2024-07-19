import React, { useEffect } from 'react';
import { Button, Form, Grid, Input, Layout, Space, Typography, message, Row, Col } from 'antd';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Slices/authSlice';


const Signup = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state?.auth);
  
    useEffect(() => {
      user.email && navigate('/dashboard');
    }, [])

    if(user.email){
        return (
            <></>
        )
    }

    const onFinish = (values) => {
        console.log(values);
        navigate('/login')
        message.success("Account created successfully")
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
                    Sign Up
                </Heading>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input full name',
                            },
                            {
                                min: 3,
                                message: "Name length must be at least 3 characters long",
                            },
                        ]}
                    >
                        <InputText />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} >
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
                        <InputText />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} >
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                whitespace: true,
                                required: true,
                                message: 'Please input your password',
                            },
                            {
                                min: 8,
                                message: 'Password length must be atleast 8 characters long',
                            },
                        ]}
                    >
                    <InputPassword />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} >
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            {
                            required: true,
                            message: 'Please input password again',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                  if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    "Passwords doesn't match"
                                  );
                                },
                              }),
                        ]}
                    >
                        <InputPassword />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} >
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please input phone',
                            },
                            {
                                min: 11,
                                message: "Phone length must be at least 11 digits long",
                            },
                        ]}
                    >
                    <InputText
                        onKeyPress={(e) => {
                            if ((e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122) || (e.which >= 33 &&  e.which <= 47) || (e.which >= 58 && e.which <= 64) || (e.which >= 91 && e.which <= 96) || (e.which >= 123 && e.which <= 126) ) {
                            e.preventDefault();
                            }
                        }}
                        maxLength={11}
                    />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} >
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Please input city',
                            },
                            {
                                min: 3,
                                message: "City length must be at least 3 characters long",
                            },
                        ]}
                    >
                        <InputText />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} >
                    <Form.Item
                        label="Postal Code"
                        name="postalCode"
                        rules={[
                            {
                                required: true,
                                message: 'Please input postal code',
                            },
                            {
                                min: 5,
                                message: "Postal code length must be at least 5 digits long",
                            },
                        ]}
                    >
                    <InputText />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} >
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input address',
                            },
                            {
                                min: 3,
                                message: "Address length must be at least 3 characters long",
                            },
                        ]}
                    >
                        <InputText />
                    </Form.Item>
                </Col>
            </Row>
                <Form.Item>
                    <LogButton type="primary" htmlType="submit">
                        Signup
                    </LogButton>
                </Form.Item>

                <FooterText>
                  Already have an account? <Link to='/login' style={{color: '#0047ab'}}>Login here</Link>
                </FooterText>
            </CustomForm>
        </Container>
    )
};
export default Signup;

const CustomForm = styled(Form)(() => ({
  maxWidth: 700,
  width: 'auto',
  margin: '70px auto',
  border: '1px solid #d9d9d9',
  borderRadius: '20px',
  padding: '40px 30px',
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
const InputText = styled(Input)(() => (inputStyle));
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