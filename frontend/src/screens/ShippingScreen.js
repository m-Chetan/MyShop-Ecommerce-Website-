import React,{useState} from 'react'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate} from 'react-router-dom'
import {Button,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] = useState(shippingAddress.address || "")
    const [city,setCity] = useState(shippingAddress.city || "")
    const [postalcode,setPostalcode] = useState(shippingAddress.postalcode || "")
    const [country,setCountry] = useState(shippingAddress.country || "")

    const dispatch= useDispatch()
    const navigate= useNavigate()
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(saveShippingAddress({address,city,postalcode,country}))
      navigate('/payment')
    }
  
    return (
      <FormContainer>
        <CheckoutSteps step1 step2/>
          <h3>Shipping Details</h3>
          <Form onSubmit={submitHandler}>
              <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter Your Address"  value={address}
                          onChange= {(e) => setAddress(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Enter Your City"  value={city}
                          onChange= {(e) => setCity(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="postalcode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter Your Address"  value={postalcode}
                          onChange= {(e) => setPostalcode(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" placeholder="Enter Your Country"  value={country}
                          onChange= {(e) => setCountry(e.target.value)}></Form.Control>
              </Form.Group>

              <Button style={{marginTop:"15px"}} type="submit" variant="primary">Continue</Button>
          </Form>
      </FormContainer>
    )
}

export default ShippingScreen