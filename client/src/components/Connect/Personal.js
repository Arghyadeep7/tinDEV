import { Fragment } from "react";

import { account } from "../../Format/Main";

import { Form, Row, Col, FloatingLabel } from "react-bootstrap";

const Personal = ({ p }) => {    

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
                <h4>Personal</h4>
            </div>
            <Row>
                {account.map(
                    (detail) =>
                        detail.field !== "password" &&
                        detail.field !== "address" && (
                            <Col sm={6} md={4} lg={3} key={detail.label}>
                                <FloatingLabel type="text" label={detail.label}>
                                    <Form.Control
                                        required={detail.required}
                                        type="text"
                                        name={detail.label}
                                        value={p[detail.field]}
                                        style={{ fontWeight: "bold" }}
                                        className="mt-3"
                                        readOnly
                                    />
                                </FloatingLabel>
                            </Col>
                        )
                )}
            </Row>
        </Fragment>
    );
};

export default Personal;
