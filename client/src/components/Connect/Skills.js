import { Fragment } from "react";

import { Row, Col, Form, FloatingLabel, ProgressBar } from "react-bootstrap";

const Skills = ({ s }) => {
    return (
        <Fragment style={{ position: "relative" }}>
            <div
                style={{
                    position: "sticky",
                    top: "0",
                    zIndex: 1000,
                    backgroundColor: "white",
                }}
            >
                <h4>Skills</h4>
            </div>
            {s.length === 0 && <h5 className="mt-4">No Skill entered.</h5>}
            {s.length > 0 &&
                s.map((skill) => (
                    <Row key={skill._id}>
                        <Col xs={6} sm={4} md={3} lg={2}>
                            <FloatingLabel type="text" label="Name">
                                <Form.Control
                                    id={skill._id}
                                    name="Name"
                                    type="text"
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    value={skill.name}
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6} sm={4} md={3} lg={2}>
                            <FloatingLabel type="text" label="Rating/100">
                                <Form.Control
                                    id={skill._id}
                                    type="text"
                                    max="100"
                                    name="Rating"
                                    value={skill.rating}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
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
                    </Row>
                ))}
        </Fragment>
    );
};

export default Skills;
