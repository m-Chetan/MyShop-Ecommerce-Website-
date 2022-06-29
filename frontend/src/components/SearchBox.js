import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const SearchBox = () => {
    const [keyword,setKeyword] = useState("")
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }
        else{
            navigate('/')
        }
        
    }

  return (
    <Form onSubmit={submitHandler} className="header-search" >
        <Form.Control 
            type="search" 
            name="q" 
            placeholder="Search Products..."
            onChange={e => setKeyword(e.target.value)}
            className="mr-sm-2 ms-sm-5 me-sm-2" >
        </Form.Control>
        <Button type="submit" className="btn btn-secondary my-2 my-sm-0 me-sm-5">Search</Button>
    </Form>
  )
}

export default SearchBox