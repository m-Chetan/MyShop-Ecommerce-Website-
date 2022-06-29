import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {Link, useNavigate} from 'react-router-dom'
import {Button,Row,Col,Image,ListGroup,Card} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Message from '../components/Message'
import {createOrder} from '../actions/orderActions.js'

const PlaceOrderScreen = () => {
    const dispatch = useDispatch()

    const addDecimals =(num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }
  
    const cart = useSelector(state => state.cart)
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc,item) => acc + item.qty*item.price ,0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDecimals(Number(0.15*cart.itemsPrice))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    
    const navigate = useNavigate()

    const orderCreated = useSelector(state => state.orderCreate)
    const {error,order,success} = orderCreated

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`)
        } 
        // eslint-disable-next-line 
    },[navigate,success])

    const placeOrderHandler = () => {
        
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h4>Shipping</h4>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}{" "},
                            {cart.shippingAddress.city}{" "},
                            {cart.shippingAddress.postalcode}{" "},
                            {cart.shippingAddress.country}{" "}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h4>Payment Method</h4>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h4>Orders: </h4>
                        {cart.cartItems.length === 0 ? 
                            <Message>Your cart is empty</Message> : (
                            <ListGroup variant="flush">
                                {cart.cartItems.map( (item,index) =>
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid="true"></Image>
                                            </Col>
                                            <Col>
                                                <Link to={`/products/${item.productId}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty*item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                )}        
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item><h4>Order Summary</h4></ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        
                        {error && <Message variant='danger'>{error}</Message>}
                        

                        <ListGroup.Item  className= 'd-grid'>
                            <Button
                                type='button'
                                disabled={cart.cartItems.length === 0}
                                onClick = {placeOrderHandler}
                            >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

    </>
  )
}

export default PlaceOrderScreen