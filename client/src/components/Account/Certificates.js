import { useState, useEffect } from "react";

import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { ImBlocked } from "react-icons/im";

const Certificates = ({ url_id }) => {
    const [c, setC] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSave] = useState(false);

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/certificates/" + url_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            //console.log(response);

            setC(response.arr);
        };
        request();
        setLoading(false);
    }, [url_id]);

    const date = new Date();
    const month =
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : 1 + date.getMonth();
    const dt = date.getFullYear() + "-" + month;

    const changeHandler = (event) => {
        const _id = event.target.id;
        const label = event.target.name;
        const val = event.target.value;

        setC((e) => {
            return e.map((obj) => {
                if (String(obj._id) === _id) {
                    if (label === "Org") {
                        return { ...obj, org: val };
                    } else if (label === "Name") {
                        return { ...obj, name: val };
                    } else if (label === "Issued") {
                        return { ...obj, issued: val };
                    } else if (label === "Expiry") {
                        return { ...obj, expiry: val };
                    }

                    return {
                        ...obj,
                        link: val.trim(),
                    };
                }

                return obj;
            });
        });
    };

    const checkHandler = (event) => {
        const _id = event.target.id;
        const val = event.target.checked;

        setC((e) => {
            return e.map((obj) => {
                if (String(obj._id) === _id) {
                    return {
                        ...obj,
                        expiry: val === true ? "Not Applicable" : "",
                    };
                }

                return obj;
            });
        });
    };

    const addhandler = () => {
        const count = c.length + 1;
        setC((e) => [
            ...e,
            {
                _id: count,
                name: "",
                org: "",
                issued: "",
                expiry: "",
            },
        ]);
    };

    const deleteHandler = (event) => {
        const _id = event.target.id;
        var count = 1;
        const arr = c
            .filter((proj) => String(proj._id) !== _id)
            .map((proj) => {
                return {
                    ...proj,
                    _id: count++,
                };
            });

        setC(arr);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setSave(true);
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/certificates/" + url_id,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(c),
                }
            ).then((res) => res.json());

            if (response.code === 500) {
                alert("Some Error has occurred. Please try again later.");
            } else {
                alert("Details Saved");
            }
        };

        request();
        setSave(false);
    };

    return (
        <Form onSubmit={submitHandler} style={{ position: "relative" }}>
            <div
                className="d-flex justify-content-between pb-2"
                style={{
                    position: "sticky",
                    top: "0",
                    zIndex: 1000,
                    backgroundColor: "white",
                }}
            >
                <h4>Certificates</h4>
                <div>
                    <Button
                        variant="outline-dark"
                        size="sm"
                        className="me-2"
                        onClick={addhandler}
                        disabled={saving || loading}
                    >
                        Add <FaPlus size={20} />
                    </Button>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        type="submit"
                        disabled={saving || loading}
                    >
                        {saving ? (
                            <>
                                Saving <ImBlocked size={20} />
                            </>
                        ) : (
                            <>
                                Save <BiSave size={20} />
                            </>
                        )}
                    </Button>
                </div>
            </div>
            {loading ? (
                <h5>Loading...</h5>
            ) : (
                <>
                    {c.length === 0 && (
                        <h5 className="mt-4">No Certificate entered.</h5>
                    )}
                    {c.length > 0 &&
                        c.map((cert) => (
                            <Row key={cert._id} id={cert._id}>
                                <b>Certificate - {cert._id}</b>
                                <Col sm={6} lg={5}>
                                    <FloatingLabel
                                        type="text"
                                        label="Certificate Name"
                                    >
                                        <Form.Control
                                            id={cert._id}
                                            type="text"
                                            name="Name"
                                            value={cert.name}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            required
                                            disabled={saving || loading}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm={6} lg={3}>
                                    <FloatingLabel
                                        type="text"
                                        label="Issuing Organization"
                                    >
                                        <Form.Control
                                            id={cert._id}
                                            type="text"
                                            name="Org"
                                            value={cert.org}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            required
                                            disabled={saving || loading}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={6} sm={3} lg={2}>
                                    <FloatingLabel
                                        type="text"
                                        label="Issued Date"
                                    >
                                        <Form.Control
                                            id={cert._id}
                                            type="month"
                                            name="Issued"
                                            value={cert.issued}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            max={dt}
                                            required
                                            disabled={saving || loading}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={6} sm={3} lg={2}>
                                    <FloatingLabel
                                        type="text"
                                        label="Expiry Date"
                                    >
                                        <Form.Control
                                            id={cert._id}
                                            type={
                                                cert.expiry === "Not Applicable"
                                                    ? "text"
                                                    : "month"
                                            }
                                            name="Expiry"
                                            value={cert.expiry}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            required
                                            disabled={saving || loading}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm={6} lg={12}>
                                    <FloatingLabel
                                        type="text"
                                        label="Link (if applicable)"
                                    >
                                        <Form.Control
                                            id={cert._id}
                                            type="text"
                                            name="link"
                                            value={cert.link}
                                            style={{
                                                fontWeight: "bold",
                                                color: "blue",
                                                textDecoration: "underline",
                                            }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            disabled={saving || loading}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <div className="d-flex justify-content-between mt-2 mb-1">
                                    <Form.Check
                                        type="checkbox"
                                        label="Does not expire"
                                        name="DoesNot"
                                        id={cert._id}
                                        onChange={checkHandler}
                                        checked={
                                            cert.expiry === "Not Applicable"
                                                ? true
                                                : false
                                        }
                                        disabled={saving || loading}
                                    />
                                    <Button
                                        variant="danger"
                                        onClick={deleteHandler}
                                        id={cert._id}
                                        size="sm"
                                        disabled={saving || loading}
                                    >
                                        Delete <MdOutlineDelete size={20} />
                                    </Button>
                                </div>
                            </Row>
                        ))}
                </>
            )}
        </Form>
    );
};

export default Certificates;
