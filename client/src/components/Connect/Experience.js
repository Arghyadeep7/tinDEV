import { Fragment } from "react";

import { Form, Row, Col, FloatingLabel } from "react-bootstrap";

const Experience = ({ w }) => {
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
                <h4>Experience</h4>
            </div>
            {w.length === 0 && <h5 className="mt-4">No Experience entered.</h5>}
            {w.length > 0 &&
                w.map((exp) => (
                    <Row key={exp._id} className="mt-3">
                        <b>Experience - {exp._id}</b>
                        <Col sm={6} lg={3}>
                            <FloatingLabel type="text" label="Firm">
                                <Form.Control
                                    id={exp._id}
                                    type="text"
                                    name="Firm"
                                    value={exp.firm}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
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
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        <Col sm={6} lg={2}>
                            <FloatingLabel type="text" label="From">
                                <Form.Control
                                    id={exp._id}
                                    type="text"
                                    name="From"
                                    value={exp.from}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        <Col sm={6} lg={2}>
                            <FloatingLabel type="text" label="To">
                                <Form.Control
                                    id={exp._id}
                                    type="text"
                                    name="To"
                                    value={exp.to}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        {exp.to === "Present" && (
                            <Form.Check
                                type="checkbox"
                                label="Currently Working"
                                name="Working"
                                className="mt-2 ms-3"
                                id={exp._id}
                                checked={true}
                                readOnly
                            />
                        )}
                    </Row>
                ))}
        </Fragment>
    );
};

export default Experience;
