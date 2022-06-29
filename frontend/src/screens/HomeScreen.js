import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import  { useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions.js'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const dispatch = useDispatch()
 
  const {keyword,pageNumber} = useParams()
  const pageNum = pageNumber || 1 

  const productList = useSelector(state => state.productList)
  const { loading,error,products,pages,page} = productList

  useEffect(() => {
    dispatch(listProducts(keyword,pageNum))
  },[dispatch,keyword,pageNum])
  
  return (
    <>
      <Meta />
      {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-dark'>Go Back</Link>}
      <h2>Latest Products</h2>
      {loading ? <Loader />: error ? <Message variant="danger">{error}</Message>: 
        <>
        
        <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                      <Product product={product} />
                    
                  </Col>
              ))}
        </Row>
             
        <Paginate pages={pages} page={page} keyword={keyword? keyword : ""} />
        </>
      }
        
        
        
    </>
  )
}

export default HomeScreen