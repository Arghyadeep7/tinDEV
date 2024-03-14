import { useState } from "react";

import Personal from "./Personal";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Certificates from "./Certificates";
import Links from "./Links";

import { Row, Col } from "react-bootstrap";

import { account } from "../../Data/Account";

import styles from "../../styles/Common.module.css";

const AAA = () => {
  const [active, setActive] = useState("Personal");

  return (
    <Row className="mt-2">
      <Col md={2} className="mt-1 d-none d-md-block">
        {account.map((acc) => (
          <h6
            onClick={() => setActive(acc.label)}
            style={{
              color: active === acc.label && "blue",
              borderBottom: active === acc.label && "2px solid blue",
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
        {account.map((acc) => (
          <h6
            onClick={() => setActive(acc.label)}
            style={{
              color: active === acc.label && "blue",
              borderBottom: active === acc.label && "2px solid blue",
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
        // lg={11}
        style={{ position: "relative" }}
        className="mt-2"
      >
        <div className={styles.common}>
          {active === "Personal" && <Personal />}
          {active === "Education" && <Education />}
          {active === "Experience" && <Experience />}
          {active === "Projects" && <Projects />}
          {active === "Skills" && <Skills />}
          {active === "Certificates" && <Certificates />}
          {active === "Links" && <Links />}
        </div>
      </Col>
    </Row>
  );
};

export default AAA;
