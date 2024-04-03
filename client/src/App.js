import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { login, logout } from "./store/AccountSlice";

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

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                },                
            ).then((res) => res.json());
                 
            if (response.code === 200) {
                dispatch(
                    login({
                        _id: response.user._id,
                        email,
                        password,
                    })
                );
            }else{
                dispatch(logout());
            }
        };

        if(email !== null && password !== null){
            request();
        }

    }, [dispatch, email, password]);

    const loggedIn = useSelector((state) => state.account.loggedIn);
    const _id = useSelector((state) => state.account._id);

    return (
        <Container fluid className="ps-4 pe-4">
            {loggedIn && <Header />}
            <Routes>
                <Route
                    path="/signup"
                    element={
                        !loggedIn ? (
                            <SignUp />
                        ) : (
                            <Navigate to={"/account/" + _id} />
                        )
                    }
                />
                <Route
                    path="/signin"
                    element={
                        !loggedIn ? (
                            <SignIn />
                        ) : (
                            <Navigate to={"/account/" + _id} />
                        )
                    }
                />
                <Route
                    path="/account/:url_id"
                    element={
                        loggedIn ? (
                            <Account _id={_id} />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
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
