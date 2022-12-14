import React,{useState,useEffect} from 'react'
import FormContainer from '../components/FormContainer'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {Row,Col,Button,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userActions'

const RegisterScreen = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [message,setMessage] = useState(null)

    const location = useLocation()

    const redirect = location.search ? location.search.split("=")[1] : '/'
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userRegister= useSelector(state=> state.userRegister)
    const {loading,error,userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    },[redirect,navigate,userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords do not match")
        }else{
            dispatch(register(name,email,password))
        }
    }

    return (
        <FormContainer>
            <h2>Sign Up</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name"  value={name}
                        onChange= {(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email"  value={email}
                        onChange= {(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"  value={password}
                        onChange= {(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password"  value={confirmPassword}
                        onChange= {(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button style={{marginTop:"10px"}} type="submit" variant="primary">Register</Button>
            </Form> 
            <Row className="py-3">
                <Col>
                    Already have an account?{" "}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                     Login</Link>
                </Col>
            </Row>   
        </FormContainer>
    )
}

export default RegisterScreen