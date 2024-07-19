import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Input, Row, Button } from 'antd';
import styled from '@emotion/styled';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const QuantityButtonsInput = forwardRef(({ index, item, handleItem, cart, cartQty, calculateAmount }, ref) => {

        const [quantity, setQuantity] = useState(cartQty ? cartQty : 1);
    
        useImperativeHandle(ref, () => ({
            resetQuantity: () => setQuantity(1),
          }));
    
        const handleIncrement = () => {
            setQuantity(prev => {
                const newCount = prev + 1;
                const newItem = {
                    ...item,
                    qty: newCount,
                    total: newCount * item?.price
                }
                // handleItem(newItem);
                cart ? calculateAmount(newCount, index) : handleItem(newItem)
                return newCount;
            });
        };
    
        const handleDecrement = () => {
            setQuantity(prev => {
                const newCount = prev > 1 ? prev - 1 : 1;
                const newItem = {
                    ...item,
                    qty: newCount,
                    total: newCount * item?.price
                }
                // handleItem(newItem);
                cart ? calculateAmount(newCount, index) : handleItem(newItem)
                return newCount;
            });
        };
    
        // const handleChange = (index, e) => {
        //     setQuantity(Number(e.target.value) || 0)
        // };
    
      return (
        <>
            <Row style={{marginTop: !cart && '20px'}}>
                <QuantityBtn minus cart onClick={() => handleDecrement(index)}><MinusOutlined style={{fontSize: '13px'}} /></QuantityBtn>
                <QInput
                    value={quantity}
                    // onChange={(e) => handleChange(index, e.target.value)}
                    readOnly
                    cart
                />
                <QuantityBtn cart onClick={() => handleIncrement(index)}><PlusOutlined style={{fontSize: '13px'}} /></QuantityBtn>
            </Row>
        </>
      )
    }) 

export default QuantityButtonsInput;

const QInput = styled(Input)(({cart}) => ({
    width: cart ? '50px' : '40%',
    textAlign: 'center',
    borderRadius: '0px',
    pointerEvents: 'none',
    borderColor: '#e9e9e9 !important',
    '&:hover, &:focus': {
      boxShadow: 'none !important',
    }
  }));
  
  const QuantityBtn = styled(Button)(({ minus, cart }) => ({
    width: cart ? '35px' : '30%',
    height: '33px',
    backgroundColor: '#e9e9e9',
    borderColor: '#e9e9e9',
    color: '#333',
    borderRadius: minus ? '6px 0px 0px 6px' : '0px 6px 6px 0px',
    '&:hover': {
      backgroundColor: '#0047ab !important',
      borderColor: '#0047ab !important',
      color: 'white !important',
    }
  }));