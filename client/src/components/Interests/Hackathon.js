import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Row, Col, Button } from "react-bootstrap";

import { IoOpenOutline } from "react-icons/io5";

const Hackathon = ({ _id }) => {
    const [h, setH] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interests = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/interests/" + _id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            return response.hackArr.received;
        };

        const hackathon = async (hackId) => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/hackathons/" + hackId,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            setH((arr) => [...arr, response]);
        };

        const request = async () => {
            const arr = await interests();

            for (var i = 0; i < arr.length; i++) {
                console.log(arr[i]);
                hackathon(arr[i].hackId);
            }
        };

        request();
        setLoading(false);
    }, [_id]);

    const AcceptHandler = (event) => {
        const arr = event.target.value.split(" ");
        const hackId = arr[0],
            senderId = arr[1];

        const data = async (receiverId) => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/account/" + receiverId,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            return response.user;
        };

        const accept = async ({ hackId, fname, lname, email, college }) => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL +
                    "/interests/" +
                    hackId +
                    "/accept",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        receiverId: _id,
                        senderId,
                        fname,
                        lname,
                        email,
                        college,
                    }),
                }
            ).then((res) => res.json());

            if (response.code === 500) {
                alert("Some Error has occurred. Please try again later.");
            } else {
                alert("Interest Accepted");
            }
        };

        const request = async (receiverId) => {
            console.log("here");
            const response = await data(receiverId);
            console.log(response);

            accept({hackId, fname: response.fname, lname: response.lname, email: response.email, college: response.college});
        };

        request(_id);
    };

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
                <h4>Interests</h4>
            </div>
            {loading ? (
                <h5>Loading...</h5>
            ) : (
                <>
                    {h.length === 0 && <h5 className="mt-4">No Interests.</h5>}
                    {h.length > 0 &&
                        h.map((proj) => (
                            <Col
                                sm={6}
                                md={4}
                                lg={3}
                                className="mt-3 pe-2"
                                style={{ overflow: "hidden" }}
                                key={proj._id}
                            >
                                <h5>{proj.name}</h5>
                                <i>
                                    by <b>{proj.organiser}</b>
                                </i>
                                <br />
                                Owner: <b>{proj.owner}</b>
                                <hr />
                                <div>
                                    Members - <b>{proj.memberCount}</b>
                                </div>
                                <h6>Last Enrollment Date - {proj.date}</h6>
                                <hr />
                                <div className="d-flex justify-content-center m-3">
                                    <Link
                                        to={`/hackathon/${proj._id}`}
                                        className="d-flex justify-content-end"
                                    >
                                        Open <IoOpenOutline size={20} />
                                    </Link>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="me-4"
                                    >
                                        Decline
                                    </Button>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="ms-4"
                                        value={`${proj._id} ${proj.ownerId}`}
                                        onClick={AcceptHandler}
                                    >
                                        Accept
                                    </Button>
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
