import React,{useEffect,useState} from 'react'
import { Link, useParams , useNavigate} from 'react-router-dom'
import { Image,Row,Col, ListGroup, ListGroupItem, Button,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useSelector,useDispatch } from 'react-redux'
import {getProductDetails,reviewProduct} from '../actions/productActions'
import {PRODUCT_REVIEW_RESET} from '../constants/productConstants'
import Meta from '../components/Meta'


const ProductScreen = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [qty,setQty] = useState(1)
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState("")

  const product_Details = useSelector( state => state.productDetails)
  const { loading,error,product } = product_Details

  const productReview = useSelector( state => state.productReview)
  const { error:errorReview,success:successReview } = productReview

  const userLogin = useSelector( state => state.userLogin)
  const { userInfo} = userLogin

  useEffect(() => {
      if(successReview){
        alert("Review Submitted!")
        setRating(0)
        setComment("")
        dispatch({type:PRODUCT_REVIEW_RESET})
      }
      dispatch(getProductDetails(id))
  },[dispatch, id,successReview])

  const addToCartHandler = () =>{
      navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(reviewProduct(id,{rating,comment}))
  }

  return (
      <>
        <Link to='/' className='btn btn-light my-3'>
          &lt; Go back
        </Link>

        { loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
          <>
            <Meta title={product.name} />
            <ListGroup variant="flush">
            <ListGroup.Item>
            <Row>
            <Col md={6} fluid="true">
              <Image src={product.image} alt={product.name} fluid="true"></Image>
            </Col>
            
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                <ListGroup.Item><Rating rating={product.rating} text={`${product.numReviews} reviews`}/></ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Price</Col>
                    <Col><strong>${product.price}</strong></Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status</Col>
                    <Col>{product.countInStock >0 ? "In Stock" : "Out Of Stock"}</Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock >0 && (
                  <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                    <Form.Select value={qty} onChange={ (e) => setQty(e.target.value)}>
                          {
                            [...Array(product.countInStock).keys()].map( count =>
                              <option key={count+1} value={count+1}>
                                {count+1}
                              </option>
                            )
                          }
                      </Form.Select>
                    </Col>
                  </Row>
                   </ListGroupItem>
                )}

                <ListGroupItem className="d-grid" >
                  <Button onClick={addToCartHandler} type="button" disabled={product.countInStock===0}>ADD TO CART</Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          </ListGroup.Item>

          <ListGroup.Item>
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length===0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map( review => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} />
                      <p>{review.createdAt.substring(0,10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                )
                )}
              </ListGroup>
            </Col>
            <Col>
            <h4>Write a Customer Review</h4>
                  {errorReview && <Message variant="danger">{errorReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select value={rating} onChange={e => setRating(e.target.value)}>
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' row={3} 
                          value={comment} 
                          onChange={e => setComment(e.target.value)}>
                        </Form.Control>
                      </Form.Group>
                      <Button style={{marginTop:"10px"}} type='submit' variant='primary'>Submit</Button>
                    </Form>
                  ) : <Message> Please <Link to="/login">sign in</Link> to write a review</Message>}
            </Col>
          </Row>
          </ListGroup.Item>
          </ListGroup>
          
          </>
        }
        
      </>
  )
}

export default ProductScreen