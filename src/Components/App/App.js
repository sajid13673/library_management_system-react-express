import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../login';
import AddMember from '../addMember'
import AddBook from '../addBook';
import NavBar from '../navbar';
import MemberList from '../memberList';
import BookList from '../bookList';
import axios from 'axios';
import EditBook from '../editBook';
import EditMember from '../editMember';
import AddBorrowing from '../addBorrowing';
import BorrowingList from '../borrowingList';

function App() {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/laravel-product-list-frontend.appspot.com/o/images%2Fno%20image.jpg?alt=media&token=cfaed1bd-c1f4-4566-8dca-25b05e101829';
  const [members, setMembers] = React.useState({});
  const [books, setBooks] = React.useState({});
  function validateEmail(str) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str)
  }
  function validateOnlyNumbers(str) {
    return /^[0-9]*$/.test(str);
  }
  const getMembers = async ()=>{
    await axios.get("http://127.0.0.1:8000/api/member").then((res)=>{
      console.log(res.data.data);
      setMembers(res.data.data);
    }).catch((err)=>{
      console.log(err.response.data.message);
    })
  }
  const getBooks = async ()=>{
    await axios.get("http://127.0.0.1:8000/api/book").then((res)=>{
      console.log(res.data.data);
      setBooks(res.data.data);
    }).catch((err)=>{
      console.log(err.response.data.message);
    })
  }
  React.useEffect(()=>{
    getMembers();
    getBooks();
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div><NavBar/><BookList 
        books={books}
        defaultImage={defaultImage}
        getBooks={()=>getBooks()}
        /></div>} />
        <Route path="/login" element={<Login validateEmail ={(str)=>validateEmail(str)}/>} />
        <Route path="/add-member" 
        element={<div><NavBar/><AddMember getMembers={()=>getMembers()} validateEmail ={(str)=>validateEmail(str)} validateOnlyNumbers={(str)=>validateOnlyNumbers(str)}/></div>} 
        />
        <Route path="/edit-member" 
        element={<div><NavBar/><EditMember getMembers={()=>getMembers()} validateEmail ={(str)=>validateEmail(str)} validateOnlyNumbers={(str)=>validateOnlyNumbers(str)}/></div>} 
        />
        <Route path="/add-book" element={<div><NavBar/><AddBook getBooks={()=>getBooks()} validateOnlyNumbers={(str)=>validateOnlyNumbers(str)}/></div>} />
        <Route 
        path="/member-list" 
        element={<div><NavBar/><MemberList members={members} defaultImage={defaultImage} getMembers={()=>getMembers()}/></div>} 
        />
        <Route path='/edit-book' element={<div><NavBar/><EditBook getBooks={()=>getBooks()} validateOnlyNumbers={(str)=>validateOnlyNumbers(str)}/></div>} />
        <Route path='/add-borrowing' element={<div><NavBar/><AddBorrowing /></div>} />
        <Route path='/borrowing-list' element={<div><NavBar/><BorrowingList /></div>} />
      </Routes>
    </div>
  );
}

export default App;
