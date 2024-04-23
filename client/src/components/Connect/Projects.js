import { useState, useEffect, Fragment } from "react";

import { Form, Row, Col, FloatingLabel } from "react-bootstrap";

const Projects = ({ url_id }) => {
    const [p, setP] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/projects/" + url_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            //console.log(response);

            setP(response.arr);
        };
        request();
        setLoading(false);
    }, [url_id]);

    return (
        <Fragment style={{ position: "relative" }}>
            <div
                style={{
                    position: "sticky",
                    top: "0",
                    zIndex: 1000,
                    backgroundColor: "white",
                }}
                className="mb-3"
            >
                <h4>Projects</h4>
            </div>
            {loading ? (
                <h5>Loading...</h5>
            ) : (
                <>
                    {p.length === 0 && (
                        <h5 className="mt-4">No Project entered.</h5>
                    )}
                    {p.length > 0 &&
                        p.map((proj) => (
                            <Row key={proj._id}>
                                <b>Project - {proj._id}</b>
                                <Col sm={5} lg={4}>
                                    <FloatingLabel type="text" label="Name">
                                        <Form.Control
                                            id={proj._id}
                                            type="text"
                                            name="Name"
                                            value={proj.name}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            readOnly
                                        />
                                    </FloatingLabel>
                                    <FloatingLabel
                                        type="text"
                                        label="Repository Link"
                                    >
                                        <Form.Control
                                            id={proj._id}
                                            type="text"
                                            name="Repository"
                                            value={proj.repo}
                                            style={{
                                                fontWeight: "bold",
                                                color: "blue",
                                                textDecoration: "underline",
                                            }}
                                            className="mt-3"
                                            readOnly
                                        />
                                    </FloatingLabel>
                                    <FloatingLabel
                                        type="text"
                                        label="Deployed Link"
                                    >
                                        <Form.Control
                                            id={proj._id}
                                            type="text"
                                            name="Deployed"
                                            value={proj.deployed}
                                            style={{
                                                fontWeight: "bold",
                                                color: "blue",
                                                textDecoration: "underline",
                                            }}
                                            className="mt-3"
                                            readOnly
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm={7} lg={8}>
                                    <FloatingLabel
                                        type="textarea"
                                        label="About"
                                    >
                                        <Form.Control
                                            id={proj._id}
                                            as="textarea"
                                            name="About"
                                            value={proj.about}
                                            style={{
                                                fontWeight: "bold",
                                                minHeight: "132px",
                                                resize: "none",
                                            }}
                                            className="mt-3"
                                            readOnly
                                        />
                                    </FloatingLabel>
                                    <FloatingLabel
                                        type="text"
                                        label="Technologies Used"
                                    >
                                        <Form.Control
                                            id={proj._id}
                                            type="text"
                                            name="Technologies"
                                            value={proj.tech}
                                            style={{ fontWeight: "bold" }}
                                            className="mt-3"
                                            readOnly
                                        />
                                    </FloatingLabel>
                                </Col>                                
                            </Row>
                        ))}
                </>
            )}
        </Fragment>
    );
};

export default Projects;
