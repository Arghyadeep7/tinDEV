import { Fragment } from "react";

import { Form, Row, Col, FloatingLabel } from "react-bootstrap";

const Education = ({ edu }) => {
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
                <h4>Education</h4>
            </div>
            {edu.length === 0 && (
                <h5 className="mt-4">No Education entered.</h5>
            )}
            {edu.length > 0 &&
                edu.map((ed) => (
                    <Row key={ed._id} className="mt-3">
                        <b>Education - {ed._id}</b>
                        <Col lg={5} xl={3}>
                            <FloatingLabel type="text" label="Institute">
                                <Form.Control
                                    id={ed._id}
                                    type="text"
                                    name="Institute"
                                    value={ed.institute}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        <Col sm={6} lg={3} xl={2}>
                            <FloatingLabel type="text" label="Specialisation">
                                <Form.Control
                                    id={ed._id}
                                    type="text"
                                    name="Specialisation"
                                    value={ed.specialisation}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6} sm={3} lg={2} xl={2}>
                            <FloatingLabel type="text" label="Course">
                                <Form.Control
                                    id={ed._id}
                                    name="Course"
                                    type="text"
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
                                    value={ed.course}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6} sm={3} lg={2} xl={1}>
                            <FloatingLabel type="text" label="Grade">
                                <Form.Control
                                    id={ed._id}
                                    type="text"
                                    name="Grade"
                                    value={ed.grade}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3 pe-1"
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        <Col sm={6} lg={3} xl={2}>
                            <FloatingLabel type="text" label="From">
                                <Form.Control
                                    id={ed._id}
                                    type="text"
                                    name="From"
                                    value={ed.from}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3 pe-1"
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        <Col sm={6} lg={3} xl={2}>
                            <FloatingLabel type="text" label="To">
                                <Form.Control
                                    id={ed._id}
                                    type="text"
                                    name="To"
                                    value={ed.to}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3 pe-1"
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        {ed.to === "Present" && (
                            <Form.Check
                                type="checkbox"
                                label="Currently Pursuing"
                                name="Pursuing"
                                className="mt-2 ms-3"
                                id={ed._id}
                                checked={true}
                                readOnly
                            />
                        )}
                    </Row>
                ))}
        </Fragment>
    );
};

export default Education;
