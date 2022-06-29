import React,{useState,useEffect} from 'react'
import axios from 'axios'
import FormContainer from '../components/FormContainer'
import {Link,useNavigate, useParams} from 'react-router-dom'
import {Button,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = () => {
    const {id} = useParams()
    const [name,setName] = useState("")
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState("")
    const [category,setCategory] = useState("")
    const [brand,setBrand] = useState("")
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState("")
    const [uploading,setUploading] = useState(false)
    

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDetails= useSelector(state=> state.productDetails)
    const {loading,error,product} = productDetails

    const productUpdate= useSelector(state=> state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate(`/admin/productlist`)
        }
        else{
            if(!product.name || product._id !== id){
                dispatch(getProductDetails(id))
                
            }
            else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setDescription(product.description)
              
            }
        }
        
    },[product,dispatch,id,navigate,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:id,
            name,price,image,brand,category,countInStock,description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        console.log(file);
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)   

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload',formData,config) 

            setImage(data)
            setUploading(false)
            
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h2>Edit Product</h2>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name"  value={name}
                        onChange= {(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price"  value={price}
                        onChange= {(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Enter image url" value={image}
                        onChange= {(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.Control type="file" controlid='image-file' label="Choose file" custom="true" onChange={uploadFileHandler}>
                    </Form.Control>
                    {uploading && <Loader />}
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter Category"  value={category}
                        onChange= {(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter Brand"  value={brand}
                        onChange= {(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="countInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type="number" placeholder="Enter Count In Stock"  value={countInStock}
                        onChange= {(e) => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description"  value={description}
                        onChange= {(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                
                <Button style={{marginTop:"10px"}} type="submit" variant="primary">Update</Button>
            </Form>  
            )}
            </FormContainer>
        </> 
    )
}

export default ProductEditScreen