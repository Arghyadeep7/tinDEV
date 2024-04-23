import { useState, useEffect, Fragment } from "react";

import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

const Links = ({ url_id }) => {
    const [l, setL] = useState([]);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/links/" + url_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            //console.log(response);

            setL(response.arr);
            
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
            >
                <h4>Links</h4>                
            </div>
            <Row>
                {loading ? (
                    <h5>Loading...</h5>
                ) : (
                    <>
                        {l.length === 0 && (
                            <h5 className="mt-4">No Link entered.</h5>
                        )}
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
                    </>
                )}
            </Row>
        </Fragment>
    );
};

export default Links;
