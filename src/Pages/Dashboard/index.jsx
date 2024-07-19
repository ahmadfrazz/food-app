import React, { useRef } from 'react'
import { Col, Row, Typography, Card, Button, message } from 'antd';
import styled from '@emotion/styled';
import { ShoppingCartOutlined } from '@ant-design/icons';
import QuantityButtonsInput from '../../Components/QuantityButtons/QuantityButtonsInput';
import { foodItems } from '../../utils/FoodItems';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../Redux/Slices/cartSlice';

function Dashboard() {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state?.auth);

  let cart = {};
  const childRefs = useRef([]);

  const handleAddToCart = (index, item) => {
    if(!user?.email){
      message.error('Please login first');
      return;
    }
    if(!cart?.id){
      const newItem = {
        ...item,
        qty: 1,
        total: parseFloat(item?.price)
    }
      cart = newItem
    }
    dispatch(setCart(cart));
    const msg = `${cart?.qty} ${cart?.qty > 1 ? 'Items' : 'Item'} added to the cart successfully`
    message.success(msg)
    cart= {};

    childRefs.current.forEach((ref) => {
      if (ref) {
        ref.resetQuantity();
      }
    });

  };

  const handleItem = (newItem) => {
    cart = newItem
  }

  return (
    <>
        <Row
            gutter={35}
        >
          {
            foodItems.map((item, index) => 
              <Col key={index} className="gutter-row" xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }} style={style}>
                <CustomCard
                  cover={
                    <img
                      src={item?.imageUrl}
                      alt={item?.title}
                      loading='lazy'
                    />
                  }
                >
                  <CardBody>
                    <LabelText>{item?.title}</LabelText>
                    <PriceText>PKR {item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</PriceText>
                  </CardBody>
                  <Row
                      gutter={10}
                  >
                    <Col key={index} className="gutter-row" xs={{ span: 24 }} md={{ span: 10 }}>
                      <QuantityButtonsInput
                        index={index}
                        item={item}
                        handleItem={handleItem}
                        cart={false}
                        cartQty={false}
                        ref={(el) => (childRefs.current[index] = el)}
                      />
                    </Col>
                    <Col key={index} className="gutter-row" xs={{ span: 24 }} md={{ span: 14 }}>
                      <AddButton type="primary" onClick={() => handleAddToCart(index, item)}>
                          <ShoppingCartOutlined />
                          Add to cart
                      </AddButton>
                    </Col>
                  </Row>
                </CustomCard>
              </Col>
            )
          }
        </Row>
    </>
  )
}

export default Dashboard;

const labelstyle = {
  fontFamily: 'Montserrat',
  fontSize: '16px',
  fontWeight: '700',
  color: '#333'
}
const LabelText = styled(Typography)(() => (labelstyle));
const PriceText = styled(Typography)(() => ({
  ...labelstyle,
  color: '#FF7E20',
  fontSize: '17px'
}));

const CustomCard = styled(Card)(() => ({
  overflow: 'hidden',
  '&:hover': {
    'img': {
      transform: 'scale(1.03)',
      transition: 'transform 0.3s ease-in-out',
    }
  }
}));

const CardBody = styled(Typography)(() => ({
display: 'flex',
justifyContent: 'space-between',
}));

const style = {
  margin: '20px 0px',
}

const AddButton = styled(Button)(() => ({
  marginTop: '20px',
  width: '100%',
  height: '33px',
  backgroundColor: '#0047ab',
  color: 'white',
  border: '1px solid #0047ab',
  '&:hover': {
    backgroundColor: '#003580 !important',
  }
}));