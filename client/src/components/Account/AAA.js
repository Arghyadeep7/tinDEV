import { useState } from "react";
import { useParams } from "react-router-dom";

import Personal from "./Personal";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Certificates from "./Certificates";
import Links from "./Links";

import { Row, Col } from "react-bootstrap";

import { tabs } from "../../Format/Main";

import styles from "../../styles/Common.module.css";

const AAA = ({ _id }) => {
    const { url_id } = useParams();

    const [active, setActive] = useState("Personal");

    console.log(_id, url_id);

    return (
        <Row className="mt-2">
            <Col md={2} className="mt-1 d-none d-md-block">
                {tabs.map((acc) => (
                    <h6
                        onClick={() => setActive(acc.label)}
                        style={{
                            color: active === acc.label && "blue",
                            borderBottom:
                                active === acc.label && "2px solid blue",
                            cursor: "pointer",
                        }}
                        className="p-2"
                        key={acc.label}
                    >
                        {acc.label}
                    </h6>
                ))}
            </Col>
            <Col md={2} className={`me-5 d-md-none d-flex ${styles.mobile}`}>
                {tabs.map((acc) => (
                    <h6
                        onClick={() => setActive(acc.label)}
                        style={{
                            color: active === acc.label && "blue",
                            borderBottom:
                                active === acc.label && "2px solid blue",
                            cursor: "pointer",
                        }}
                        className="p-1 me-3"
                        key={acc.label}
                    >
                        {acc.label}
                    </h6>
                ))}
            </Col>
            <Col
                sm={12}
                md={10}
                style={{ position: "relative" }}
                className="mt-2"
            >
                <div className={styles.common}>
                    {active === "Personal" && (
                        <Personal url_id={url_id} _id={_id} />
                    )}
                    {active === "Education" && (
                        <Education url_id={url_id} _id={_id} />
                    )}
                    {active === "Experience" && (
                        <Experience url_id={url_id} _id={_id} />
                    )}
                    {active === "Projects" && (
                        <Projects url_id={url_id} _id={_id} />
                    )}
                    {active === "Skills" && (
                        <Skills url_id={url_id} _id={_id} />
                    )}
                    {active === "Certificates" && (
                        <Certificates url_id={url_id} _id={_id} />
                    )}
                    {active === "Links" && <Links url_id={url_id} _id={_id} />}
                </div>
            </Col>
        </Row>
    );
};

export default AAA;
