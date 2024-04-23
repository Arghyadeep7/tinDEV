import { useState, useEffect, Fragment } from "react";

import { account } from "../../Format/Main";

import { Form, Row, Col, FloatingLabel } from "react-bootstrap";

const Personal = ({ url_id }) => {
    const [p, setP] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/account/" + url_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            //console.log(response);

            setP(response.user);
        };
        request();
        setLoading(false);
    }, [url_id]);

    return (
        <Fragment style={{ position: "relative" }}>
            {loading ? (
                <h5>Loading...</h5>
            ) : (
                <>
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
                                    <Col
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={detail.label}
                                    >
                                        <FloatingLabel
                                            type="text"
                                            label={detail.label}
                                        >
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
                </>
            )}
        </Fragment>
    );
};

export default Personal;
