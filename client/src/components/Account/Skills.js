import { useState, useEffect } from "react";

import {
    Row,
    Col,
    Form,
    Button,
    FloatingLabel,
    ProgressBar,
} from "react-bootstrap";

import { technologies } from "../../Format/Main";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Skills = ({ url_id }) => {
    const [s, setS] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/skills/" + url_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            console.log(response);

            setS(response.arr);
        };
        request();
        setLoading(false);
    }, [url_id]);

    const changeHandler = (event) => {
        const _id = event.target.id;
        const label = event.target.name;
        const val = event.target.value;

        setS((e) => {
            return e.map((obj) => {
                if (String(obj._id) === _id) {
                    if (label === "Name") {
                        return { ...obj, name: val };
                    }

                    return {
                        ...obj,
                        rating:
                            Number(val) > 100
                                ? 100
                                : Number(val) < 0
                                ? "0"
                                : Number(val),
                    };
                }

                return obj;
            });
        });
    };

    const addHandler = () => {
        var count = s.length + 1;
        setS((e) => [
            ...e,
            {
                _id: count,
                name: "AWS",
                rating: "0",
            },
        ]);
    };

    const deleteHandler = (event) => {
        const _id = event.target.id;
        const arr = s.filter((skill) => String(skill._id) !== _id);

        setS(arr);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(s);
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
                <h4>Skills</h4>
                <div>
                    <Button
                        variant="outline-dark"
                        size="sm"
                        className="me-2"
                        onClick={addHandler}
                    >
                        Add <FaPlus size={20} />
                    </Button>
                    <Button variant="outline-primary" size="sm" type="submit">
                        Save <BiSave size={20} />
                    </Button>
                </div>
            </div>
            {loading ? (
                <h5>loading...</h5>
            ) : (
                <>
                    {s.length === 0 && (
                        <h5 className="mt-4">No Skill entered.</h5>
                    )}
                    {s.length > 0 &&
                        s.map((skill) => (
                            <Row key={skill._id}>
                                <Col xs={6} sm={4} md={3} lg={2}>
                                    <FloatingLabel type="text" label="Name">
                                        <Form.Select
                                            id={skill._id}
                                            name="Name"
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            value={skill.name}
                                        >
                                            {technologies.map((option) => (
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
                                <Col xs={6} sm={4} md={3} lg={2}>
                                    <FloatingLabel
                                        type="text"
                                        label="Rating/100"
                                    >
                                        <Form.Control
                                            id={skill._id}
                                            type="number"
                                            max="100"
                                            name="Rating"
                                            value={skill.rating}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            onChange={changeHandler}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col
                                    sm={4}
                                    md={6}
                                    lg={8}
                                    className="d-none d-sm-block mt-4"
                                >
                                    <ProgressBar
                                        now={skill.rating}
                                        label={`${skill.rating}%`}
                                        className="mt-2"
                                    />
                                </Col>
                                <div className="d-flex justify-content-end mt-2 mb-1">
                                    <Button
                                        variant="danger"
                                        onClick={deleteHandler}
                                        id={skill._id}
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

export default Skills;
