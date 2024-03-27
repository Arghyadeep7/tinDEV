import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../src/store/LoginSlice";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import SignUp from "./components/Forms/SignUp";
import SignIn from "./components/Forms/SignIn";
import Interests from "./components/Interests/AAA";
import Collabs from "./components/Collabs/AAA";
import New from "./components/New/AAA";
import Account from "./components/Account/AAA";
import HackPage from "./Pages/HackPage";

import { Container } from "react-bootstrap";

const App = () => {

  const dispatch = useDispatch();

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (email !== null && password !== null) {
    console.log("here");
    dispatch(login({
      email, password
    }));
  }

  const loggedIn = useSelector((state) => state.login.loggedIn);

  return (
    <Container fluid className="ps-4 pe-4">
      {loggedIn && <Header />}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/interests" element={<Interests />} />
        <Route path="/collabs" element={<Collabs />} />
        <Route path="/hackathon/:id" element={<HackPage />} />
        <Route path="/new" element={<New />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
