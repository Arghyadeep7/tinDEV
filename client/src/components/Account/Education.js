import { useState, useEffect } from "react";

import { options } from "../../Format/Main";

import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { ImBlocked } from "react-icons/im";

const Education = ({ url_id }) => {
    const [edu, setEdu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSave] = useState(false);

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/educations/" + url_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            //console.log(response);

            setEdu(response.arr);
        };
        request();
        setLoading(false);
    }, [url_id]);

    const addhandler = () => {
        const count = edu.length + 1;
        setEdu((e) => [
            ...e,
            {
                _id: count,
                institute: "",
                course: "B. Tech.",
                specialisation: "",
                from: "",
                to: "",
                grade: "",
            },
        ]);
    };

    const changeHandler = (event) => {
        const _id = event.target.id;
        const label = event.target.name;
        const val = event.target.value;        

        setEdu((e) => {
            return e.map((obj) => {
                if (String(obj._id) === _id) {
                    if (label === "Institute") {
                        return { ...obj, institute: val };
                    } else if (label === "Course") {
                        return { ...obj, course: val };
                    } else if (label === "Specialisation") {
                        return { ...obj, specialisation: val };
                    } else if (label === "From") {
                        return { ...obj, from: val };
                    } else if (label === "To") {
                        return { ...obj, to: val };
                    }
                    return {
                        ...obj,
                        grade:
                            Number(val) < 0
                                ? 0
                                : Number(val) > 100
                                ? 100
                                : Number(val),
                    };
                }

                return obj;
            });
        });
    };

    const deleteHandler = (event) => {
        const _id = event.target.id;
        var count = 1;
        const arr = edu
            .filter((ed) => String(ed._id) !== _id)
            .map((ed) => {
                return {
                    ...ed,
                    _id: count++,
                };
            });

        setEdu(arr);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setSave(true);
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/educations/" + url_id,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(edu),
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
                <h4>Education</h4>
                <div>
                    <Button
                        variant="outline-dark"
                        size="sm"
                        className="me-2"
                        onClick={addhandler}
                        disabled={loading || saving}
                    >
                        Add <FaPlus size={20} />
                    </Button>
                    <Button variant="outline-primary" size="sm" type="submit" disabled={loading || saving}>
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
                    {edu.length === 0 && (
                        <h5 className="mt-4">No Education entered.</h5>
                    )}
                    {edu.length > 0 &&
                        edu.map((ed) => (
                            <Row key={ed._id}>
                                <Col lg={5} xl={3}>
                                    <FloatingLabel
                                        type="text"
                                        label="Institute"
                                    >
                                        <Form.Control
                                            id={ed._id}
                                            type="text"
                                            name="Institute"
                                            value={ed.institute}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            required
                                            disabled={loading || saving}
                                            onChange={changeHandler}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm={6} lg={3} xl={2}>
                                    <FloatingLabel
                                        type="text"
                                        label="Specialisation"
                                    >
                                        <Form.Control
                                            id={ed._id}
                                            type="text"
                                            name="Specialisation"
                                            value={ed.specialisation}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            required
                                            disabled={loading || saving}
                                            onChange={changeHandler}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={6} sm={3} lg={2} xl={2}>
                                    <FloatingLabel type="text" label="Course">
                                        <Form.Select
                                            id={ed._id}
                                            name="Course"
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            required
                                            disabled={loading || saving}
                                            onChange={changeHandler}
                                            value={ed.course}
                                        >
                                            {options.map((option) => (
                                                <option
                                                    value={option}
                                                    key={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={6} sm={3} lg={2} xl={1}>
                                    <FloatingLabel type="text" label="Grade">
                                        <Form.Control
                                            id={ed._id}
                                            type="number"
                                            name="Grade"
                                            value={ed.grade}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3 pe-1"
                                            required
                                            disabled={loading || saving}
                                            onChange={changeHandler}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm={6} lg={3} xl={2}>
                                    <FloatingLabel type="text" label="From">
                                        <Form.Control
                                            id={ed._id}
                                            type="month"
                                            name="From"
                                            value={ed.from}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3 pe-1"
                                            required
                                            disabled={loading || saving}
                                            onChange={changeHandler}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm={6} lg={3} xl={2}>
                                    <FloatingLabel type="text" label="To">
                                        <Form.Control
                                            id={ed._id}
                                            type="month"
                                            name="To"
                                            value={ed.to}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3 pe-1"
                                            required
                                            disabled={loading || saving}
                                            onChange={changeHandler}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <div className="d-flex justify-content-end mt-2 mb-1">
                                    <Button
                                        variant="danger"
                                        onClick={deleteHandler}
                                        id={ed._id}
                                        disabled={loading || saving}
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

export default Education;
