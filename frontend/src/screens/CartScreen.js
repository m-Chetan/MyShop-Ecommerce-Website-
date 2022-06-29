import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useParams,useLocation,useNavigate,Link} from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button, Image,Form} from 'react-bootstrap'
import { addToCart, removeItemFromCart } from '../actions/cartActions'
import Message from '../components/Message'


const CartScreen = () => {
  const {id} =useParams()
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const qty = Number(searchParams.get("qty"))

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  
  useEffect(() => {
    if(id){
      dispatch(addToCart(id,qty))
    }
  },[dispatch,id,qty])

  const removeItemHandler = (id) => {
    dispatch(removeItemFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <Row>
      <h1>My Cart</h1>
      <Col md={8}>
      
        {cartItems.length === 0 ? <Message>Your cart is empty <Link to="/">Go back</Link></Message> : (
          <ListGroup variant="flush">
            {cartItems.map( item => 
              <ListGroup.Item key={item.productId}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid="true" rounded/>
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Select value={item.qty} 
                      onChange={ (e) => 
                        dispatch(addToCart(item.productId,Number(e.target.value)))
                      }>
                        {
                          [...Array(item.countInStock).keys()].map( count =>
                            <option key={count+1} value={count+1}>
                              {count+1}
                            </option>
                          )
                        }
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => removeItemHandler(item.productId)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Subtotal ({cartItems.reduce( (acc,item) => acc + item.qty,0 )}) items</h3>
              ${cartItems.reduce( (acc,item) => acc + (item.qty* item.price),0 ).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className="d-grid">
              <Button type="button" disabled={cartItems.length === 0} onClick={checkoutHandler}>
              Proceed To Checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
 
  )
}

export default CartScreen