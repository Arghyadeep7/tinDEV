import { useState, useEffect } from "react";

import { account } from "../../Format/Main";

import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

import { BiSave } from "react-icons/bi";

const Personal = ({ url_id }) => {
    const [p, setP] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/account/" + url_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            console.log(response);

            setP(response.user);
        };
        request();
        setLoading(false);
    }, [url_id]);

    const changeHandler = (event) => {
        const label = event.target.name;
        const val = event.target.value;

        if (label === "First Name") {
            setP((oldP) => {
                return { ...oldP, fname: val };
            });
        } else if (label === "Last Name") {
            setP((oldP) => {
                return { ...oldP, lname: val };
            });
        } else if (label === "Email Address") {
            setP((oldP) => {
                return { ...oldP, email: val.trim() };
            });
        } else if (label === "Password") {
            setP((oldP) => {
                return { ...oldP, password: val };
            });
        } else if (label === "Date of Birth") {
            setP((oldP) => {
                return { ...oldP, dob: val };
            });
        } else if (label === "Gender") {
            setP((oldP) => {
                return { ...oldP, gender: val };
            });
        } else if (label === "Country") {
            setP((oldP) => {
                return { ...oldP, country: val };
            });
        } else if (label === "Address") {
            setP((oldP) => {
                return { ...oldP, address: val };
            });
        } else if (label === "Date of Birth") {
            setP((oldP) => {
                return { ...oldP, dob: val };
            });
        } else if (label === "Pincode") {
            const value = Number(val) < 0 ? 0 : Number(val);
            setP((oldP) => {
                return { ...oldP, pinCode: value };
            });
        } else if (label === "College") {
            setP((oldP) => {
                return { ...oldP, college: val };
            });
        } else if (label === "University") {
            setP((oldP) => {
                return { ...oldP, university: val };
            });
        } else if (label === "University Roll") {
            setP((oldP) => {
                return { ...oldP, roll: val };
            });
        } else if (label === "Course") {
            setP((oldP) => {
                return { ...oldP, course: val };
            });
        } else if (label === "Course Type") {
            setP((oldP) => {
                return { ...oldP, type: val };
            });
        } else if (label === "Specialisation") {
            setP((oldP) => {
                return { ...oldP, specialisation: val };
            });
        } else if (label === "Course Duration (Years)") {
            const value = Number(val) < 0 ? 0 : Number(val);
            setP((oldP) => {
                return { ...oldP, duration: value };
            });
        } else if (label === "Year of Graduation") {
            const value = Number(val) < 0 ? 0 : Number(val);
            setP((oldP) => {
                return { ...oldP, grad: value };
            });
        } else {
            setP((oldP) => {
                return { ...oldP, status: val };
            });
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(p);
    };

    return (
        <Form onSubmit={submitHandler} style={{ position: "relative" }}>
            {loading ? (
                <h5>Loading...</h5>
            ) : (
                <>
                    <div
                        className="d-flex justify-content-between pb-2"
                        style={{
                            position: "sticky",
                            top: "0",
                            zIndex: 1000,
                            backgroundColor: "white",
                        }}
                    >
                        <h4>Personal</h4>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            type="submit"
                        >
                            Save <BiSave size={20} />
                        </Button>
                    </div>
                    <Row>
                        {account.map((detail) => (
                            <Col sm={6} md={4} lg={3} key={detail.label}>
                                <FloatingLabel type="text" label={detail.label}>
                                    {detail.type === "select" ? (
                                        <Form.Select
                                            name={detail.label}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            value={p[detail.field]}
                                        >
                                            {detail.options.map((option) => (
                                                <option
                                                    value={option}
                                                    key={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    ) : (
                                        <Form.Control
                                            required={detail.required}
                                            type={detail.type}
                                            name={detail.label}
                                            value={p[detail.field]}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                        />
                                    )}
                                </FloatingLabel>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Form>
    );
};

export default Personal;
