import './App.css'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../login';
import AddMember from '../Member/addMember'
import AddBook from '../Book/addBook';
import NavBar from '../navbar';
import MemberList from '../Member/memberList';
import BookList from '../Book/bookList';
import axios from 'axios';
import EditBook from '../Book/editBook';
import EditMember from '../Member/editMember';
import AddBorrowing from '../Borrowing/addBorrowing';
import BorrowingList from '../Borrowing/borrowingList';
import AuthProvider from '../../utils/authProvider';
import { ProtectedRoute } from '../../utils/protectedRoute';
// import Routes from '../../utils/routes';

function App() {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/laravel-product-list-frontend.appspot.com/o/images%2Fno%20image.jpg?alt=media&token=cfaed1bd-c1f4-4566-8dca-25b05e101829';
  const [members, setMembers] = React.useState({});
  const [books, setBooks] = React.useState({});
  const [login, setLogin] = React.useState({});
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
  },[login])
  return (
    <div className="App">
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<div><NavBar/><BookList 
        books={books}
        defaultImage={defaultImage}
        getBooks={()=>getBooks()}
        /></div>} />
        <Route path="/add-member" 
        element={<div><NavBar/><AddMember getMembers={()=>getMembers()} validateEmail ={(str)=>validateEmail(str)} validateOnlyNumbers={(str)=>validateOnlyNumbers(str)}/></div>} 
        />
        <Route path="/edit-member" 
        element={<div><NavBar/><EditMember getMembers={()=>getMembers()} validateEmail ={(str)=>validateEmail(str)} validateOnlyNumbers={(str)=>validateOnlyNumbers(str)}/></div>} 
        />
        <Route path="/add-book" exact element={<div><NavBar/><AddBook getBooks={()=>getBooks()} validateOnlyNumbers={(str)=>validateOnlyNumbers(str)}/></div>} />
        <Route 
        path="/member-list" 
        element={<div><NavBar/><MemberList members={members} defaultImage={defaultImage} getMembers={()=>getMembers()}/></div>} 
        />
        <Route path='/edit-book' element={<div><NavBar/><EditBook getBooks={()=>getBooks()} validateOnlyNumbers={(str)=>validateOnlyNumbers(str)}/></div>} />
        <Route path='/add-borrowing' element={<div><NavBar/><AddBorrowing getBooks={()=>getBooks()}/></div>} />
        <Route path='/borrowing-list' element={<div><NavBar/><BorrowingList getBooks={()=>getBooks()}/></div>} />
        </Route>
        <Route path="/login" element={<Login validateEmail ={(str)=>validateEmail(str)} setLogin={()=>setLogin()}/>} />
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
