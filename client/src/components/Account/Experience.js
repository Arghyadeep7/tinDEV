import { useState, useEffect } from "react";

import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Experience = ({ url_id }) => {
    const [w, setW] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const request = async () => {
        const response = await fetch(
            process.env.REACT_APP_FETCH_URL + "/experiences/" + url_id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => res.json());

        console.log(response);

        setW(response.arr);
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

        setW((e) => {
            return e.map((obj) => {
                if (String(obj._id) === _id) {
                    if (label === "Firm") {
                        return { ...obj, firm: val };
                    } else if (label === "Position") {
                        return { ...obj, position: val };
                    } else if (label === "From") {
                        return { ...obj, from: val };
                    }

                    return { ...obj, to: val };
                }

                return obj;
            });
        });
    };

    const checkHandler = (event) => {
        const _id = event.target.id;
        const val = event.target.checked;

        setW((e) => {
            return e.map((obj) => {
                if (String(obj._id) === _id) {
                    return { ...obj, to: val === true ? "Present" : "" };
                }

                return obj;
            });
        });
    };

    const addhandler = () => {
        const count = w.length + 1;
        setW((e) => [
            ...e,
            {
                _id: count,
                firm: "",
                position: "",
                from: "",
                to: "",
            },
        ]);
    };

    const deleteHandler = (event) => {
        const _id = event.target.id;
        var count = 1;
        const arr = w
            .filter((wrk) => String(wrk._id) !== _id)
            .map((wrk) => {
                return {
                    ...wrk,
                    _id: count++,
                };
            });

        setW(arr);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(w);
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
                <h4>Experience</h4>
                <div>
                    <Button
                        variant="outline-dark"
                        size="sm"
                        className="me-2"
                        onClick={addhandler}
                    >
                        Add <FaPlus size={20} />
                    </Button>
                    <Button variant="outline-primary" size="sm" type="submit">
                        Save <BiSave size={20} />
                    </Button>
                </div>
            </div>
            {loading ? (
                <h5>Loading...</h5>
            ) : (
                <>
                    {w.length === 0 && (
                        <h5 className="mt-4">No Experience entered.</h5>
                    )}
                    {w.length > 0 &&
                        w.map((exp) => (
                            <Row key={exp._id}>
                                <Col sm={6} lg={3}>
                                    <FloatingLabel type="text" label="Firm">
                                        <Form.Control
                                            id={exp._id}
                                            type="text"
                                            name="Firm"
                                            value={exp.firm}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm={6} lg={5}>
                                    <FloatingLabel type="text" label="Position">
                                        <Form.Control
                                            id={exp._id}
                                            type="text"
                                            name="Position"
                                            value={exp.position}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm={6} lg={2}>
                                    <FloatingLabel type="text" label="From">
                                        <Form.Control
                                            id={exp._id}
                                            type="month"
                                            name="From"
                                            value={exp.from}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            max={dt}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm={6} lg={2}>
                                    <FloatingLabel type="text" label="To">
                                        <Form.Control
                                            id={exp._id}
                                            type={
                                                exp.to === "Present"
                                                    ? "text"
                                                    : "month"
                                            }
                                            name="To"
                                            value={exp.to}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            max={dt}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>
                                <div className="d-flex justify-content-between mt-2 mb-1">
                                    <Form.Check
                                        type="checkbox"
                                        label="Currently Working"
                                        name="Working"
                                        id={exp._id}
                                        onChange={checkHandler}
                                        checked={
                                            exp.to === "Present" ? true : false
                                        }
                                    />
                                    <Button
                                        variant="danger"
                                        onClick={deleteHandler}
                                        id={exp._id}
                                        size="sm"
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

export default Experience;
