import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { login, logout } from "./store/AccountSlice";

import Header from "./Components/Header";
import SignUp from "./Components/Forms/SignUp";
import SignIn from "./Components/Forms/SignIn";
import Interests from "./Components/Interests/AAA";
import Collabs from "./Components/Collabs/AAA";
import New from "./Components/New/AAA";
import Account from "./Components/Account/AAA";
import Connect from "./Components/Connect/AAA";
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
                 
            console.log('here');
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
                    path="/connect/:url_id"
                    element={
                        loggedIn ? (
                            <Connect _id={_id} />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/"
                    element={loggedIn ? <Navigate to={"/account/" + _id} /> : <Navigate to="/signin" />}
                />
                <Route
                    path="/interests"
                    element={
                        loggedIn ? <Interests _id={_id} /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/collabs"
                    element={loggedIn ? <Collabs _id={_id}/> : <Navigate to="/signin" />}
                />
                <Route
                    path="/hackathon/:url_id"
                    element={
                        loggedIn ? <HackPage /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/new"
                    element={loggedIn ? <New _id={_id}/> : <Navigate to="/signin" />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Container>
    );
};

export default App;
