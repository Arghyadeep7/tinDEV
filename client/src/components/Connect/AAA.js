import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import Personal from "./Personal";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Certificates from "./Certificates";
import Links from "./Links";

import { Row, Col, ButtonGroup, Button, Form } from "react-bootstrap";

import { tabs, scope } from "../../Format/Main";

import styles from "../../styles/Connect.module.css";

import { FaCode } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";

const AAA = ({ _id }) => {
    const { url_id } = useParams();

    const [active, setActive] = useState("Personal");

    const [p, setP] = useState([]);
    const [edu, setEdu] = useState([]);
    const [w, setW] = useState([]);
    const [proj, setProj] = useState([]);
    const [s, setS] = useState([]);
    const [c, setC] = useState([]);
    const [l, setL] = useState([]);
    const [hacks, setHacks] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = async (url) => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + `/${url}/` + url_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            //console.log(response);

            if(url === "account"){
                setP(response.user);
                setHacks(response.user.hackathons);
                if(response.user.hackathons.length>0){
                    // console.log(response.user.hackathons);
                    setSelected(response.user.hackathons[0]._id);
                }
            }else if(url === "educations"){
                setEdu(response.arr);
            }else if(url === "experiences"){
                setW(response.arr);
            }else if(url === "projects"){
                setProj(response.arr);
            }else if(url === "skills"){
                setS(response.arr);
            }else if(url === "certificates"){
                setC(response.arr);
            }else if(url === "links"){
                setL(response.arr);
            }
        };

        request("account");
        request("educations");
        request("experiences");
        request("projects");
        request("skills");
        request("certificates");
        request("links");
        setLoading(false);
    }, [url_id]);

    const interestedHandler = (event) => {
        console.log(selected);

        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL + "/interests/" + selected,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        _id: selected,
                        senderId: p._id,
                        receiverId: url_id
                    }),
                }
            ).then((res) => res.json());

            // console.log(response);

            if (response.code === 500) {
                alert("Some Error has occurred. Please try again later.");
            } else {
                alert("Interest Sent");
            }
        };

        request();
    };

    const changeHandler = (event) => {
        const val = event.target.value;
        const id = p.hackathons.filter((hack) => hack.name === val)[0]._id;

        setSelected(id);
    }

    return (
        <Fragment>
            {loading ? (
                <h4>Loading...</h4>
            ) : (
                <Row>
                    {/* Selector */}
                    <Row className="mb-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <Form.Select
                                    type="select"
                                    style={{ fontWeight: "bold" }}                                    
                                >
                                    {scope.map((option) => (
                                        <option
                                            value={option.label}
                                            key={option.id}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                                {hacks.length > 0 && (
                                    <Form.Select
                                        type="select"
                                        style={{ fontWeight: "bold" }}  
                                        onChange={changeHandler}                                      
                                    >
                                        {hacks.map((hack) => (
                                            <option
                                                value={hack.name}
                                                key={hack._id}
                                            >
                                                {hack.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                            </div>
                            <ButtonGroup>
                                <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={interestedHandler}                                    
                                >
                                    <b>
                                        INTERESTED <FaCode size="25" />
                                    </b>
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                    <b>
                                        NOT-INTERESTED <ImBlocked size="20" />
                                    </b>
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Row>

                    {/* Web Tabs */}
                    <Col md={2} className="mt-1 d-none d-md-block">
                        {tabs.map((acc) => (
                            <h6
                                onClick={() => setActive(acc.label)}
                                style={{
                                    color: active === acc.label && "blue",
                                    borderBottom:
                                        active === acc.label &&
                                        "2px solid blue",
                                    cursor: "pointer",
                                }}
                                className="p-2"
                                key={acc.label}
                            >
                                {acc.label}
                            </h6>
                        ))}
                    </Col>

                    {/* Mobile Tabs */}
                    <Col
                        md={2}
                        className={`me-5 d-md-none d-flex ${styles.mobile}`}
                    >
                        {tabs.map((acc) => (
                            <h6
                                onClick={() => setActive(acc.label)}
                                style={{
                                    color: active === acc.label && "blue",
                                    borderBottom:
                                        active === acc.label &&
                                        "2px solid blue",
                                    cursor: "pointer",
                                }}
                                className="p-1 me-3"
                                key={acc.label}
                            >
                                {acc.label}
                            </h6>
                        ))}
                    </Col>

                    {/* Content */}
                    <Col
                        sm={12}
                        md={10}
                        style={{ position: "relative" }}
                        className="mt-2"
                    >
                        <div className={styles.common}>
                            {active === "Personal" && <Personal p={p} />}
                            {active === "Education" && (
                                <Education edu={edu} />
                            )}
                            {active === "Experience" && (
                                <Experience w={w} />
                            )}
                            {active === "Projects" && (
                                <Projects proj={proj} />
                            )}
                            {active === "Skills" && (
                                <Skills s={s} />
                            )}
                            {active === "Certificates" && (
                                <Certificates c={c} />
                            )}
                            {active === "Links" && (
                                <Links l={l} />
                            )}
                        </div>
                    </Col>
                </Row>
            )}
        </Fragment>
    );
};

export default AAA;
