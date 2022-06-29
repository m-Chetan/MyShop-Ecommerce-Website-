import React from 'react'
import {Container,Row,Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container className="foot">
        <Row>
            <Col className='text-center py-3'>
            Copyright &copy; MyShop
            </Col>

        </Row>
       
    </Container>
    
  )
}

export default Footer