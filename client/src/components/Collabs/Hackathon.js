import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

import { IoOpenOutline } from "react-icons/io5";

const Hackathon = ({ _id }) => {
    const [h, setH] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/hackathons/" + _id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },                    
                }
            ).then((res) => res.json());

            console.log(response);

            setH(response.arr);
        };
        request();
        setLoading(false);
    }, [_id]);

    return (
        <Row style={{ position: "relative" }}>
            <div
                className="pb-2"
                style={{
                    position: "sticky",
                    top: "0",
                    zIndex: 1000,
                    backgroundColor: "white",
                }}
            >
                <h4>Hackathons</h4>
            </div>
            {loading ? (
                <h5>Loading...</h5>
            ) : (
                <>           
                    {h.length === 0 && (
                        <h5 className="mt-4">No collaborations.</h5>
                    )} 
                    {h.length > 0 && h.map((proj) => (
                        <Col
                            sm={6}
                            md={4}
                            lg={3}
                            className="mt-3 pe-2"
                            style={{ overflow: "hidden" }}
                        >
                            <h5>{proj.name}</h5>
                            <i>
                                by <b>{proj.organiser}</b>
                            </i>
                            <br />
                            Owner: <b>{proj.owner}</b>
                            <hr />
                            <div>
                                Members -{" "}
                                <b>
                                    {proj.members}/{proj.total}
                                </b>
                            </div>
                            <h6>Last Enrollment Date - {proj.date}</h6>
                            <hr />
                            <div className="d-flex justify-content-between mt-3">
                                <a
                                    href={proj.id}
                                    className="d-flex justify-content-end"
                                    style={{ color: "red" }}
                                >
                                    Contact Owner <IoOpenOutline size={20} />
                                </a>
                                <Link
                                    to={`/hackathon/${proj.id}`}
                                    className="d-flex justify-content-end"
                                >
                                    Open <IoOpenOutline size={20} />
                                </Link>
                            </div>
                            <hr />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};

export default Hackathon;
