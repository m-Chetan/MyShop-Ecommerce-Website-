import React from 'react'
import {Card, CardGroup} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'

const Product = ({product}) => {
  return (
    
    <Card className="my-3 p-3 rounded card-home" style={{ width: '18rem' }} >
        <Link to={`/product/${product._id}`} >
        <Card.Img variant="top" src={product.image} />
        </Link>
       
        <Card.Body>
            <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
            <Card.Title ><strong> {product.name} </strong></Card.Title>
            </Link>
            <Card.Text as="div">
                <Rating rating={product.rating} text={`${product.numReviews} reviews`}/>
            </Card.Text>
            <Card.Text as="h4">${product.price}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product