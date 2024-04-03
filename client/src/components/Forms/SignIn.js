import { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { login } from "../../store/AccountSlice";

import Common from "./Common";

import { Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

import { signin } from "../../Format/Main";

import styles from "../../styles/Form.module.css";

const SignIn = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const buttons = [
        {
            label: "Sign in with Google",
            icon: <FcGoogle size={25} />,
            color: "red",
        },
        {
            label: "Sign in with LinkedIn",
            icon: <FaLinkedin size={25} />,
            color: "blue",
        },
        {
            label: "Sign in with Github",
            icon: <FaGithub size={25} />,
            color: "black",
        },
        {
            label: "Sign in with Facebook",
            icon: <FaFacebook size={25} />,
            color: "#2636bf",
        },
    ];

    const submitHandler = async (event) => {
        event.preventDefault();

        setLoading(true);

        const obj = {
            email: event.target[0].value.trim(),
            password: event.target[1].value.trim(),
        };

        const response = await fetch(
            process.env.REACT_APP_FETCH_URL + "/signin/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            }
        ).then((res) => res.json());

        console.log(response);

        if (response.code === 200) {
            dispatch(
                login({
                    _id: response.user._id,
                    email: obj.email,
                    password: obj.password,
                })
            );
        }

        setLoading(false);
    };

    return (
        <>
            <Row>
                <Common />
                <Col
                    sm={7}
                    lg={8}
                    style={{
                        position: "relative",
                    }}
                >
                    <h3 className="text-center mt-3">SIGN IN</h3>
                    <Form onSubmit={submitHandler} className={styles.form}>
                        <div className="text-center">
                            <h6 className="mb-4">
                                Don't have an account?{" "}
                                <Link to="/signup">Sign-up</Link>
                            </h6>
                        </div>
                        <h5 className="mb-4 text-center">
                            Welcome back Developer! Let's get back on track.
                        </h5>
                        <Row>
                            <Col lg={6}>
                                {signin.map((field) => (
                                    <FloatingLabel
                                        type={field.type}
                                        label={field.label}
                                        className="mt-4"
                                        key={field.label}
                                    >
                                        <Form.Control
                                            type={field.type}
                                            placeholder={field.label}
                                            required={field.required}
                                            key={field.label}
                                            name={field.label}
                                            style={{
                                                border: "1px solid black",
                                            }}
                                        />
                                    </FloatingLabel>
                                ))}
                                <div className="d-flex justify-content-between mt-4">
                                    <h6>
                                        <Form.Check
                                            label="Remember me"
                                            checked
                                            readOnly
                                        />
                                    </h6>
                                    <h6>
                                        Forgot Password? <Link>Click here</Link>
                                    </h6>
                                </div>
                                <Button
                                    type="submit"
                                    className="mt-3 mb-5"
                                    style={{
                                        width: "100%",
                                        backgroundImage:
                                            "linear-gradient(to bottom right, blue, #05a1f0)",
                                        border: "none",
                                    }}
                                >
                                    <h5>
                                        {loading ? "Loading..." : "Sign In"}
                                    </h5>
                                </Button>
                            </Col>
                            <Col lg={6} className="mt-3 mb-5">
                                <b>or Sign in using:</b>
                                {buttons.map((btn) => (
                                    <div
                                        key={btn.color}
                                        className="mt-4 text-center p-1"
                                        style={{
                                            width: "100%",
                                            color: btn.color,
                                            border: `1px solid ${btn.color}`,
                                            borderRadius: "5px",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {btn.label} {btn.icon}
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default SignIn;
