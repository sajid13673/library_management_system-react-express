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

function App() {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/laravel-product-list-frontend.appspot.com/o/images%2Fno%20image.jpg?alt=media&token=cfaed1bd-c1f4-4566-8dca-25b05e101829';
  const [members, setMembers] = React.useState({});
  const [books, setBooks] = React.useState({});
  const [login, setLogin] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  function validateEmail(str) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str)
  }
  function validateOnlyNumbers(str) {
    return /^[0-9]*$/.test(str);
  }
  const [bookPage, setBookPage] = React.useState(1);
  const [booksPerPage, setBooksPerPage] = React.useState(9)
  const [memberPage, setMemberPage] = React.useState(1);
  const [membersPerPage, setMembersPerPage] = React.useState(9)
  const getMembers = async ()=>{
    setLoading(true);
    await axios.get(`http://127.0.0.1:8000/api/member?page=${memberPage}&per_page=${membersPerPage}`).then((res)=>{
      console.log(res.data.data);
      setMembers(res.data.data);
      setLoading(false);
    }).catch((err)=>{
      console.log(err.response.data.message);
    })
  }
  const getBooks = async ( )=>{
    setLoading(true);
    await axios.get(`http://127.0.0.1:8000/api/book?page=${bookPage}&per_page=${booksPerPage}`).then((res)=>{
      console.log(res.data.data);
      setBooks(res.data.data);
      setLoading(false);
    }).catch((err)=>{
      console.log(err.response.data.message);
    })
  }
  React.useEffect(()=>{
    getMembers("",9);
    getBooks();
  },[login])
  React.useEffect(()=>{
    getBooks();
  },[bookPage])
  React.useEffect(()=>{
    getMembers();
  },[memberPage])
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <div>
                    <NavBar />
                    <BookList
                      books={books.data ? books.data : []}
                      totalPages={books.last_page ? books.last_page : 1}
                      bookPage={bookPage}
                      setBookPage={(page) => setBookPage(page)}
                      defaultImage={defaultImage}
                      getBooks={() => getBooks()}
                      loading={loading}
                    />
                  </div>
                }
              />
              <Route
                path="/add-member"
                element={
                  <div>
                    <NavBar />
                    <AddMember
                      getMembers={() =>getMembers()}
                      validateEmail={(str) => validateEmail(str)}
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </div>
                }
              />
              <Route
                path="/edit-member"
                element={
                  <div>
                    <NavBar />
                    <EditMember
                      getMembers={() =>getMembers()}
                      validateEmail={(str) => validateEmail(str)}
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </div>
                }
              />
              <Route
                path="/add-book"
                exact
                element={
                  <div>
                    <NavBar />
                    <AddBook
                      getBooks={() => getBooks()}
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </div>
                }
              />
              <Route
                path="/member-list"
                element={
                  <div>
                    <NavBar />
                    <MemberList
                      members={members.data ? members.data : []}
                      defaultImage={defaultImage}
                      getMembers={() =>getMembers()}
                      totalPages={members.last_page ? members.last_page : 1}
                      memberPage={memberPage}
                      setMemberPage={(page)=>setMemberPage(page)}
                      loading={loading}
                    />
                  </div>
                }
              />
              <Route
                path="/edit-book"
                element={
                  <div>
                    <NavBar />
                    <EditBook
                      getBooks={() => getBooks()}
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </div>
                }
              />
              <Route
                path="/add-borrowing"
                element={
                  <div>
                    <NavBar />
                    <AddBorrowing getBooks={() => getBooks()} getMembers={()=>getMembers()}/>
                  </div>
                }
              />
              <Route
                path="/borrowing-list"
                element={
                  <div>
                    <NavBar />
                    <BorrowingList getBooks={() => getBooks()} getMembers={()=>getMembers()}/>
                  </div>
                }
              />
            </Route>
            <Route
              path="/login"
              element={
                <Login
                  validateEmail={(str) => validateEmail(str)}
                  setLogin={() => setLogin()}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
