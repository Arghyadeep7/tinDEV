import { Fragment } from "react";

import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

const Certificates = ({ c }) => {
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
                <h4>Certificates</h4>
            </div>
            {c.length === 0 && (
                <h5 className="mt-4">No Certificate entered.</h5>
            )}
            {c.length > 0 &&
                c.map((cert) => (
                    <Row key={cert._id} id={cert._id} className="mt-3">
                        <b>Certificate - {cert._id}</b>
                        <Col sm={6} lg={5}>
                            <FloatingLabel type="text" label="Certificate Name">
                                <Form.Control
                                    id={cert._id}
                                    type="text"
                                    name="Name"
                                    value={cert.name}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
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
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6} sm={3} lg={2}>
                            <FloatingLabel type="text" label="Issued Date">
                                <Form.Control
                                    id={cert._id}
                                    type="month"
                                    name="Issued"
                                    value={cert.issued}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6} sm={3} lg={2}>
                            <FloatingLabel type="text" label="Expiry Date">
                                <Form.Control
                                    id={cert._id}
                                    type="text"
                                    name="Expiry"
                                    value={cert.expiry}
                                    style={{ fontWeight: "bold" }}
                                    className="mt-3"
                                    readOnly
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
                                    readOnly
                                />
                            </FloatingLabel>
                        </Col>
                        {cert.expiry === "Not Applicable" && (
                            <Form.Check
                                type="checkbox"
                                label="Does Not Expire"
                                name="DoesNot"
                                className="mt-2 ms-3"
                                id={cert._id}
                                checked={true}
                                readOnly
                            />
                        )}
                    </Row>
                ))}
        </Fragment>
    );
};

export default Certificates;
