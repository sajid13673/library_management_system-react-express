import { Grid } from '@material-ui/core'
import React from 'react'
import BookForm from './bookForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddBook(props) {
    const navigate = useNavigate()
    async function handleSubmit(values){
        const formData = new FormData();
        Object.keys(values).map((key) => formData.append(key, values[key]));
        await axios.post('http://127.0.0.1:8000/api/book',formData).then(res=>{
            if(res.data.status){
                props.getBooks();
                navigate('/')
            }
        }).catch(err => console.log(err))
    }
  return (
    <Grid className='grid' style={{ alignItems: "center"}}>
        <BookForm handleSubmit={(values)=>handleSubmit(values)} validateOnlyNumbers={(str)=>props.validateOnlyNumbers(str)} title="ADD BOOK"/>
    </Grid>
  )
}

export default AddBook