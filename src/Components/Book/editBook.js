import axios from 'axios';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BookForm from './bookForm';
import { Grid } from '@material-ui/core';

function EditBook(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    const [book, setBook] = React.useState({})
    const getBookById = async (id) => {
        await axios.get('http://127.0.0.1:8000/api/book/' + id).then(res=>{
            console.log(res.data);
            if(res.data.status){
                setBook(res.data.data);
            }
        })
    }
    const handleSubmit = async (values) => {
        const formData = new FormData();
        Object.keys(values).map((key) => formData.append(key, values[key]));
        formData.append("_method", "put");
        await axios.post('http://127.0.0.1:8000/api/book/'+id, formData).then(res=>{
            if(res.data.status){
                navigate('/')
                props.getBooks();
            }
        }).catch(err => console.log(err))
    }
    React.useEffect(() => {
        getBookById(id);
    },[])
  return (
    <Grid className="grid" style={{ alignItems: "center" }}>
      <BookForm 
      handleSubmit={(values) => handleSubmit(values)}
      validateOnlyNumbers={(str)=>props.validateOnlyNumbers(str)}
      book={book}
      title="EDIT BOOK"
      />
    </Grid>
  );
}
export default EditBook