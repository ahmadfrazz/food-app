import { Button, Form, Input, InputNumber, message, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import QuantityButtonsInput from '../../Components/QuantityButtons/QuantityButtonsInput';
import { DeleteTwoTone } from '@ant-design/icons';
import { clearCart, removeCartItem, updateCart } from '../../Redux/Slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import EmptyCart from '../../Components/EmptyCart/EmptyCart';


function Cart() {
    const [form] = Form.useForm();
    const { data } = useSelector(state => state?.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [subTotal, setSubTotal] = useState(0);
    
    useEffect(() => {
        form.setFieldsValue({ servicesDetails: data });
        calculateTotal();
    }, [data]);

    const calculateAmount = (e, index, field) => {
        const updatedData = form.getFieldsValue().servicesDetails;
        const item = updatedData[index];
        item.qty =   item.qty !== null ? e : '';
        const t_amount =  (parseFloat(item?.price) || 0) * (parseFloat(e) || 0);
        item.total = +t_amount?.toFixed(2);
        calculateTotal();
        updatedData[index] = item;
        dispatch(updateCart(item))
        form.setFieldsValue({ servicesDetails: updatedData });
      };

    const calculateTotal = () => {
        const updatedData = form.getFieldsValue().servicesDetails;
        let sub_total = 0;
        updatedData?.forEach((item) => {
          sub_total += parseFloat(item?.total) || 0;
        });
        setSubTotal(sub_total?.toFixed(2))
      };

    const handleItemDelete = (id) => {
        dispatch(removeCartItem(id));
        message.success('Item deleted successfully')
    };

    const handlePlaceOrder = () => {
        const items = form.getFieldsValue().servicesDetails;
        let order_deatil = {
            items: items,
            grandTotal: subTotal
        }
        dispatch(clearCart());
        navigate('/')
        message.success('Order placed successfully');
        console.log('order_deatil===', order_deatil);
    }

    if(data?.length === 0){
        return (
            <EmptyCart />
        )
    }
    

  return (
    <div>
        <HeadText>Cart Details</HeadText>
        <div className="table-responsive">
            <Form
                form={form}
                initialValues={{
                    servicesDetails: data,
                }}
            >                        
                    
                <table className="table table-hover table-white cartTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Form.List name="servicesDetails">
                            {(fields) => (
                            <>
                                {fields.map((field, index) => (
                                <tr key={field.key}>
                                    <td>{index+1}.</td>
                                    <td>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'imageUrl']}
                                        className='tableImage'
                                        style={{ marginTop: '19px', marginBottom: '22px'}}
                                        fieldKey={[field.fieldKey, 'imageUrl']}
                                        >
                                            <img 
                                                src={form.getFieldValue(['servicesDetails', field.name, 'imageUrl'])}
                                                height={60}
                                                style={{borderRadius: '10px'}}
                                                alt="food"
                                                loading='lazy'
                                            />
                                        </Form.Item>
                                    </td>
                                    <td>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'title']}
                                        className='custom-border'
                                        style={{ marginTop: '19px', marginBottom: '22px'}}
                                        fieldKey={[field.fieldKey, 'title']}
                                        >
                                        {form.getFieldValue(['servicesDetails', field.name, 'title'])}
                                        </Form.Item>
                                    </td>
                                    <td>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'price']}
                                        className='custom-border'
                                        style={{ marginTop: '19px', marginBottom: '22px'}}
                                        fieldKey={[field.fieldKey, 'price']}
                                    >
                                        {form.getFieldValue(['servicesDetails', field.name, 'price'])?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </Form.Item>
                                    </td>
                                    <td>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'qty']}
                                        className='custom-border'
                                        style={{ marginTop: '19px', marginBottom: '22px'}}
                                        fieldKey={[field.fieldKey, 'qty']}
                                    >
                                        <QuantityButtonsInput
                                            cart={true}
                                            cartQty={form.getFieldValue(['servicesDetails', field.name, 'qty'])}
                                            calculateAmount={(e) => calculateAmount(e, index)}
                                        />
                                    </Form.Item>
                                    </td>
                                    <td>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'total']}
                                        className='custom-border'
                                        style={{ marginTop: '19px', marginBottom: '22px'}}
                                        fieldKey={[field.fieldKey, 'total']}
                                    >
                                        <TotalText>
                                            {form.getFieldValue(['servicesDetails', field.name, 'total'])?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </TotalText>
                                    </Form.Item>
                                    </td>
                                    <td title='Delete'>
                                        <DeleteTwoTone 
                                            style={delStyle}
                                            twoToneColor="#f62d51"
                                            onClick={() => handleItemDelete(form.getFieldValue(['servicesDetails', field.name, 'id']))}
                                        />
                                    </td>
                                </tr>
                                ))}
                            </>
                            )}
                        </Form.List>
                    </tbody>
                </table>
            </Form>
        </div>
        <div style={{display: 'grid', justifyContent: 'flex-end', marginTop: '20px'}}>
            <table className="table table-hover table-white totalTable">
                <tbody>
                    <tr>
                        <td style={{textAlign: 'right', fontWeight: 'bold', fontSize: '17px', fontWeight: '700'}}>
                        Grand Total:
                        </td>
                        <td style={{textAlign: 'right', paddingRight: '40px', fontWeight: 'bold', fontSize: '17px', width: '230px'}}>
                        <div style={{marginBottom: '0px'}}>
                        {subTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} PKR
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <PlaceButton type="primary" onClick={handlePlaceOrder}>
                PLACE ORDER
            </PlaceButton>
        </div>

    </div>
  )
}

export default Cart;

const labelstyle = {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    fontWeight: '700',
    color: '#333'
  }
  const delStyle = {
    fontSize: '18px',
    color: '#f62d51',
    cursor: 'pointer'   
    }
  const TotalText = styled(Typography)(() => (labelstyle));
  const HeadText = styled(Typography)(() => ({
    ...labelstyle,
    // color: '#FF7E20',
    fontSize: '25px',
    // textAlign: 'center',
    marginBottom: '35px'
  }));

  const PlaceButton = styled(Button)(() => ({
    marginTop: '20px',
    width: '470px',
    right: 0,
    height: '50px',
    backgroundColor: '#0047ab',
    color: 'white',
    border: '1px solid #0047ab',
    '&:hover': {
      backgroundColor: '#003580 !important',
    }
  }));