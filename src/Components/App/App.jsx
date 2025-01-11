import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../Screens/Login";
import AddMember from "../../Screens/Member/AddMember";
import AddBook from "../../Screens/Book/AddBook";
import NavBar from "../Navbar";
import MemberList from "../../Screens/Member/MemberList";
import BookList from "../../Screens/Book/BookList";
import EditBook from "../Book/EditBook";
import EditMember from "../../Screens/Member/EditMember";
import AddBorrowing from "../../Screens/Borrowing/AddBorrowing";
import MemberBorrowingList from "../../Screens/Member/MemberBorrowingList";
import BorrowingList from "../../Screens/Borrowing/BorrowingList";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import SignUp from "../../Screens/SignUp";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import Home from "../../Screens/Home";
import { useAuth } from "../../utils/AuthProvider";
import UserBorrowings from "../../Screens/Borrowing/UserBorrowings";
import useApi from "../../Hooks/useApi";

function App() {
  const defaultImage = "https://firebasestorage.googleapis.com/v0/b/laravel-product-list-frontend.appspot.com/o/images%2Fno%20image.jpg?alt=media&token=cfaed1bd-c1f4-4566-8dca-25b05e101829";
  const [members, setMembers] = React.useState({});
  const [books, setBooks] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  function validateEmail(str) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str);
  }
  function validateOnlyNumbers(str) {
    return /^[0-9]*$/.test(str);
  }
  const [bookPage, setBookPage] = React.useState(1);
  const [booksPerPage, setBooksPerPage] = React.useState(9);
  const [memberPage, setMemberPage] = React.useState(1);
  const [membersPerPage, setMembersPerPage] = React.useState(9);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = React.useState({})
  const { fetchData } = useApi([]);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      h4: {
        color: "#7393B3",
      },
    },
    components: {
      MuiCardContent: {
        defaultProps: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          style: {
            textAlign: "center",
            textTransform: "uppercase",
          },
        },
      }
    },
  });
  const { token } = useAuth();

  const getMembers = async () => {
    setLoading(true);
    const res = await fetchData({ method: "GET", url: `/members?page=${memberPage}&per_page=${membersPerPage}` });
    if (res) {
      console.log(res.data);
      setMembers(res.data);
      setLoading(false);
    }
  };

  const getBooks = async () => {
    setLoading(true);
    const link = token?.role === "admin" ? `http://localhost:5000/api/books` : `http://localhost:5000/api/member_book`;
    const res = await fetchData({ method: "GET", url: `${link}?page=${bookPage}&perPage=${booksPerPage}` });
    if (res) {
      console.log("books");
      console.log(res.data);
      setBooks(res.data);
      setLoading(false);
    }
  };

  function handleDeleteBorrowing(id) {
    return new Promise(function (resolve, reject) {
      fetchData({ method: "DELETE", url: `http://localhost:5000/api/borrowing/${id}` })
        .then((res) => {
          if (res.data.status) {
            console.log("borrowing deleted");
            resolve(true);
          }
        })
        .catch((err) => reject(err));
    });
  }

  async function handleConfirmReturn(id, formData, book) {
    const form = new FormData();
    Object.keys(book).map((key) => form.append(key, book[key]));
    form.append("_method", "put");
    return new Promise((resolve, reject) => {
      fetchData({ method: "POST", url: `http://localhost:5000/api/borrowing/${id}`, data: formData })
        .then((res) => {
          if (res.data.status) {
            resolve(true);
          }
        })
        .catch((err) => reject(err));
    });
  }

  const getUser = async () => {
    const res = await fetchData({ method: "GET", url: "/profile" });
    if (res) {
      console.log(res.data.data);
      setUser(res.data.data);
    }
  };

  useEffect(() => {
    token?.role === "admin" && getMembers("", 9);
    getBooks();
    getUser();
  }, [token]);

  useEffect(() => {
    getBooks();
  }, [bookPage]);

  useEffect(() => {
    getMembers();
  }, [memberPage]);

  return (
        <ThemeProvider theme={theme}>
      <Paper sx={{ minHeight: "100vh", minWidth: "18rem", display: 'flex', flexDirection: 'column' }}>
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                        
                      />
                      <Home user={user}/>
                    </>
                  }
                />
                <Route
                  path="/book-list"
                  element={
                    <>
                      <NavBar 
                      darkMode={darkMode}
                      setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <BookList
                        books={books.data ? books.data : []}
                        totalPages={books.last_page ? books.last_page : 1}
                        bookPage={bookPage}
                        setBookPage={(page) => setBookPage(page)}
                        defaultImage={defaultImage}
                        getBooks={() => getBooks()}
                        loading={loading}
                      />
                    </>
                  }
                />
              </Route>
              <Route element={<ProtectedRoute roles={["user"]} />}>
                  <Route
                  path="my-borrowings"
                  element={
                    <>
                    <NavBar
                      darkMode={darkMode}
                      setDarkMode={(bool) => setDarkMode(bool)}
                    />
                  <UserBorrowings borrowings={user?.member?.borrowing}/>
                  </>
                }
                  />
              </Route>
              <Route element={<ProtectedRoute roles={["admin"]} />}>
                <Route
                  path="/add-book"
                  exact
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <AddBook
                        getBooks={() => getBooks()}
                        validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                      />
                    </>
                  }
                />
                <Route
                  path="/member-list"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <MemberList
                        members={members.data ? members.data : []}
                        defaultImage={defaultImage}
                        getMembers={() => getMembers()}
                        totalPages={members.last_page ? members.last_page : 1}
                        memberPage={memberPage}
                        setMemberPage={(page) => setMemberPage(page)}
                        loading={loading}
                      />
                    </>
                  }
                />
                <Route
                  path="/edit-book"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <EditBook
                        getBooks={() => getBooks()}
                        validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                      />
                    </>
                  }
                />
                <Route
                  path="/edit-member"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <EditMember
                        getMembers={() => getMembers()}
                        validateEmail={(str) => validateEmail(str)}
                        validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                      />
                    </>
                  }
                />
                <Route
                  path="/add-borrowing"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <AddBorrowing
                        getBooks={() => getBooks()}
                        getMembers={() => getMembers()}
                      />
                    </>
                  }
                />
                <Route
                  path="/member-borrowing-list"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <MemberBorrowingList
                        handleConfirmReturn={(id, formData, book) =>
                          handleConfirmReturn(id, formData, book)
                        }
                        getBooks={() => getBooks()}
                        getMembers={() => getMembers()}
                        handleDeleteBorrowing={(id) =>
                          handleDeleteBorrowing(id)
                        }
                      />
                    </>
                  }
                />
                <Route
                  path="/borrowing-list"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <BorrowingList
                        getBooks={() => getBooks()}
                        getMembers={() => getMembers()}
                        handleDeleteBorrowing={(id) =>
                          handleDeleteBorrowing(id)
                        }
                        handleConfirmReturn={(id, formData, book) =>
                          handleConfirmReturn(id, formData, book)
                        }
                      />
                    </>
                  }
                />
                <Route
                  path="/add-member"
                  element={
                    <>
                      <NavBar
                        darkMode={darkMode}
                        setDarkMode={(bool) => setDarkMode(bool)}
                      />
                      <AddMember
                        getMembers={() => getMembers()}
                        validateEmail={(str) => validateEmail(str)}
                        validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                      />
                    </>
                  }
                />
              </Route>
              <Route
                path="/login"
                element={
                  <Login
                    validateEmail={(str) => validateEmail(str)}
                  />
                }
              />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
