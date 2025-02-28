import "./App.css";
import React, { useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../Screens/Login";
import AddMember from "../../Screens/Member/AddMember";
import AddBook from "../../Screens/Book/AddBook";
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
import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from "../../Context/ThemeContext";
import Layout from "../Layout";
import FineList from "../../Screens/FineList";
import Settings from "../../Screens/Settings";

function App() {
  const [loading, setLoading] = React.useState(false);
  function validateEmail(str) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str);
  }
  function validateOnlyNumbers(str) {
    return /^[0-9]*$/.test(str);
  }
  const [memberPage, setMemberPage] = React.useState(1);
  const { darkMode } = useTheme();
  const [user, setUser] = React.useState({});
  const {
    fetchData: fetchUser,
    error: userError,
    loading: userLoading,
  } = useApi([]);
  const { fetchData, error } = useApi([]);
  const theme = useMemo(
    () =>
      createTheme({
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
          },
          MuiCard: {
            defaultProps: {
              style: {
                background:
                  darkMode &&
                  "linear-gradient(45deg, rgb(35, 35, 35) 48%, rgba(46, 46, 46, 0.78) 95%)",
                  boxShadow: "2px 5px 8px rgba(0, 0, 0, 0.41),  -0px -2px rgba(0, 0, 0, 0.07)",
              },
            },
          },
        },
      }),
    [darkMode]
  );
  const { token } = useAuth();

  function handleDeleteBorrowing(id) {
    return new Promise(function (resolve, reject) {
      fetchData({
        method: "DELETE",
        url: `http://localhost:5000/api/borrowings/${id}`,
      })
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
    return new Promise((resolve, reject) => {
      fetchData({
        method: "PUT",
        url: `http://localhost:5000/api/borrowings/${id}`,
        data: formData,
      })
        .then((res) => {
          if (res.data.status) {
            resolve(true);
          }
        })
        .catch((err) => reject(err));
    });
  }

  const getUser = async () => {
    await fetchUser({ method: "GET", url: "/profile" }).then((res) => {
      if (res) {
        console.log(res.data.data);
        setUser(res.data.data);
      }
    });
  };

  useEffect(() => {
    token && getUser();
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          minHeight: "100vh",
          minWidth: "18rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home user={user} />
                  </Layout>
                }
              />
              <Route
                path="/book-list"
                element={
                  <Layout>
                    <BookList loading={loading} />
                  </Layout>
                }
              />
            </Route>
            <Route element={<ProtectedRoute roles={["user"]} />}>
              <Route
                path="my-borrowings"
                element={
                  <Layout>
                    <UserBorrowings borrowings={user?.member?.borrowings} />
                  </Layout>
                }
              />
            </Route>
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route
                path="/add-book"
                exact
                element={
                  <Layout>
                    <AddBook
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </Layout>
                }
              />
              <Route
                path="/member-list"
                element={
                  <Layout>
                    <MemberList
                      memberPage={memberPage}
                      setMemberPage={(page) => setMemberPage(page)}
                      loading={loading}
                    />
                  </Layout>
                }
              />
              <Route
                path="/edit-book"
                element={
                  <Layout>
                    <EditBook
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </Layout>
                }
              />
              <Route
                path="/edit-member"
                element={
                  <Layout>
                    <EditMember
                      validateEmail={(str) => validateEmail(str)}
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </Layout>
                }
              />
              <Route
                path="/add-borrowing"
                element={
                  <Layout>
                    <AddBorrowing />
                  </Layout>
                }
              />
              <Route
                path="/member-borrowing-list"
                element={
                  <Layout>
                    <MemberBorrowingList
                      handleConfirmReturn={(id, formData, book) =>
                        handleConfirmReturn(id, formData, book)
                      }
                      handleDeleteBorrowing={(id) => handleDeleteBorrowing(id)}
                    />
                  </Layout>
                }
              />
              <Route
                path="/borrowing-list"
                element={
                  <Layout>
                    <BorrowingList
                      handleDeleteBorrowing={(id) => handleDeleteBorrowing(id)}
                      handleConfirmReturn={(id, formData, book) =>
                        handleConfirmReturn(id, formData, book)
                      }
                    />
                  </Layout>
                }
              />
              <Route
                path="/add-member"
                element={
                  <Layout>
                    <AddMember
                      validateEmail={(str) => validateEmail(str)}
                      validateOnlyNumbers={(str) => validateOnlyNumbers(str)}
                    />
                  </Layout>
                }
              />
              <Route
                path="/fine-list"
                element={
                  <Layout>
                    <FineList />
                  </Layout>
                }
              />
            </Route>
            <Route
              path="/login"
              element={<Login validateEmail={(str) => validateEmail(str)} />}
            />
            <Route
              path="settings"
              element={
                <Layout>
                  <Settings
                    user={user}
                    userLoading={userLoading}
                    userError={userError}
                  />
                </Layout>
              }
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
}
const AppWrapper = () => (
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);
export default AppWrapper;
