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
        dispatch(
            login({
                email,
                password,
            })
        );
    }

    const loggedIn = useSelector((state) => state.login.loggedIn);
    const _id = useSelector((state) => state.account._id);

    console.log(_id);

    return (
        <Container fluid className="ps-4 pe-4">
            {loggedIn && <Header />}
            <Routes>
                <Route
                    path="/signup"
                    element={
                        !loggedIn ? <SignUp /> : <Navigate to="/account" />
                    }
                />
                <Route
                    path="/signin"
                    element={
                        !loggedIn ? (
                            <SignIn />
                        ) : (
                            <Navigate to={"/account/"} />
                        )
                    }
                />
                <Route
                    path="/account"
                    element={loggedIn ? <Account /> : <Navigate to="/signin" />}
                />
                <Route
                    path="/"
                    element={loggedIn ? <Header /> : <Navigate to="/signin" />}
                />
                <Route
                    path="/interests"
                    element={
                        loggedIn ? <Interests /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/collabs"
                    element={loggedIn ? <Collabs /> : <Navigate to="/signin" />}
                />
                <Route
                    path="/hackathon/:_id"
                    element={
                        loggedIn ? <HackPage /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/new"
                    element={loggedIn ? <New /> : <Navigate to="/signin" />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Container>
    );
};

export default App;
