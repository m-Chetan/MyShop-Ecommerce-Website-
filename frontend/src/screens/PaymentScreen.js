import React,{useState} from 'react'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate} from 'react-router-dom'
import {Button,Form,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [paymentMethod,setPaymentMethod] = useState('PayPal')

    const dispatch= useDispatch()
    const navigate= useNavigate()

    if(!shippingAddress){
        navigate('/shipping')
    }
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      navigate('/placeorder')
    }
  
    return (
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
          <h3>Payment Method</h3>
          <Form onSubmit={submitHandler} style={{marginTop:"30px"}}>
              <Form.Group as="legend">
                <Form.Label>Select Method</Form.Label>
              </Form.Group>
              <Col>
                <Form.Check
                  type="radio" 
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>

                {/* <Form.Check 
                  type="radio" 
                  label="Stripe"
                  id="Stripe"
                  name="paymentMethod"
                  value='Stripe'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check> */}
              </Col>

              <Button style={{marginTop:"15px"}} type="submit" variant="primary">Continue</Button>
          </Form>
      </FormContainer>
    )
}

export default PaymentScreen