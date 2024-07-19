import React from 'react';
import { Col, Input, Row, Typography } from 'antd';
import styled from '@emotion/styled';

function ProfileInfo({ data }) {

    const { fullName, email, phoneNumber, city, postalCode, address } = data;
    
  return (
    <>
        <Row
            gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}
            style={{marginTop: '20px'}}
        >
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} style={style}>
                <LabelText>Full Name</LabelText>
                <LabelInfo>{fullName}</LabelInfo>
            </Col>
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} style={style}>
                <LabelText>Email</LabelText>
                <LabelInfo>{email}</LabelInfo>
            </Col>
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} style={style}>
                <LabelText>Phone Number</LabelText>
                <LabelInfo>{phoneNumber}</LabelInfo>
            </Col>
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} style={style}>
                <LabelText>City</LabelText>
                <LabelInfo>{city}</LabelInfo>
            </Col>
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} style={style}>
                <LabelText>Postal Code</LabelText>
                <LabelInfo>{postalCode}</LabelInfo>
            </Col>
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} style={style}>
                <LabelText>Address</LabelText>
                <LabelInfo>{address}</LabelInfo>
            </Col>
        </Row>
    </>
  )
}

export default ProfileInfo;


  const LabelText = styled(Typography)(() => ({
    fontFamily: 'Montserrat',
    fontSize: '15px',
    fontWeight: '500',
    color: '#000000e0'
  }));

  const LabelInfo = styled(Typography)(() => ({
    fontFamily: 'Montserrat',
    fontSize: '14px',
    fontWeight: '400',
    color: '#000000e0',
    marginTop: '5px',
  }));

  const style = {
    margin: '20px 0px',
  }