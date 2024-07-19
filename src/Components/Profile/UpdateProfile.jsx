import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import styled from '@emotion/styled';

function UpdateProfile({ edit, setEdit, data }) {

const [form] = Form.useForm();
const { fullName, email, phoneNumber, city, postalCode, address } = data;
const oldData = {
    fullName, email, phoneNumber, city, postalCode, address
}

const onFinish = (data) => {
    console.log(data);
    form.resetFields();
    setEdit(false);
    message.success('Profile details updated successfully!');
};

const onFinishFailed = (errorFields) => {
    const consecutiveSpacesError = errorFields.find((field) =>
        field.errors.toString().includes("consecutive spaces")
    );
    consecutiveSpacesError
    ? message.error("Please Remove Consecutive Spaces!")
    : message.error("Please Fill Required Fields!");
};

const areObjectsEqual = (obj1, obj2) => 
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key => obj1[key] === obj2[key]);


  return (
    <>
        <Form
            form={form}
            layout="vertical"
            style={{
            maxWidth: 600,
            width: '100%'
            }}
            onFinish={(values) => areObjectsEqual(values, oldData) ? null : onFinish(values)}
            onFinishFailed={({ errorFields }) => onFinishFailed(errorFields)}
            initialValues={data}
        >
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
                                message: "full name length must be at least 3 characters long",
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
                                required: true,
                                message: 'Please input email',
                            },
                        ]}
                    >
                    <InputText email disabled readOnly/>
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
                                message: "phone length must be at least 11 digits long",
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
                                message: "city length must be at least 3 characters long",
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
                                message: "postal code length must be at least 5 digits long",
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
                                message: "address length must be at least 3 characters long",
                            },
                        ]}
                    >
                        <InputText />
                    </Form.Item>
                </Col>
            </Row>

            {
                edit &&
                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <LogButton type="primary" htmlType="submit">
                        Update
                    </LogButton>
                    <LogButton type="primary" cancel onClick={() => setEdit(false)}>
                        Cancel
                    </LogButton>
                </Form.Item>
            }

        </Form>
    </>
  )
}

export default UpdateProfile;

  const InputText = styled(Input)(({ email }) => ({
    height: '40px',
    pointerEvents: email && 'none',
    '&:hover': {
        borderColor: '#553E97',
      },
      "&:focus, &:active, &:focus-within": {
        borderColor: '#553E97',
        boxShadow: 'none !important',
      }
  }));
  
  const LogButton = styled(Button)(({ cancel }) => ({
    marginTop: '20px',
    marginLeft: cancel && '10px',
    width: '100px',
    height: '40px',
    backgroundColor: cancel ? 'transparent' : '#0047ab',
    color: cancel ? '#0047ab' : 'white',
    border: cancel && '1px solid #0047ab',
    '&:hover': {
      backgroundColor: cancel ? '#F9FAFB !important' : '#003580 !important',
      color: cancel && '#0047ab !important',
    }
  }));