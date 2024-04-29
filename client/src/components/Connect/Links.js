import { Fragment } from "react";

import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

const Links = ({ l }) => {
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
                <h4>Links</h4>
            </div>
            <Row>
                {l.length === 0 && <h5 className="mt-4">No Link entered.</h5>}
                {l.length > 0 &&
                    l.map((link) => (
                        <Col sm={6} key={link._id}>
                            <FloatingLabel
                                type="text"
                                label={`Link-${link._id}`}
                            >
                                <Form.Control
                                    id={link._id}
                                    type="text"
                                    name="Link"
                                    value={link.url}
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
                    ))}
            </Row>
        </Fragment>
    );
};

export default Links;
