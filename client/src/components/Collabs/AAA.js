import { useState } from "react";

import Hackathon from "./Hackathon";

import { scope } from "../../Format/Main";

import { Row, Col } from "react-bootstrap";

import styles from "../../styles/Common.module.css";

const AAA = ({ _id }) => {
  const [active, setActive] = useState("Hackathon");

  return (
    <Row className="mt-2">
      <Col md={2} className="mt-1 d-none d-md-block">
        {scope.map((tab) => (
          <h6
            onClick={() => setActive(tab.label)}
            style={{
              color: active === tab.label && "blue",
              borderBottom: active === tab.label && "2px solid blue",
              cursor: "pointer",
            }}
            className="p-2"
            key={tab.label}
          >
            {tab.label}
          </h6>
        ))}
      </Col>
      <Col
        md={2}
        lg={1}
        className={`me-5 d-md-none d-flex justify-content-around ${styles.mobile}`}
      >
        {scope.map((tab) => (
          <h6
            onClick={() => setActive(tab.label)}
            style={{
              color: active === tab.label && "blue",
              borderBottom: active === tab.label && "2px solid blue",
              cursor: "pointer",
            }}
            className="p-1"
            key={tab.label}
          >
            {tab.label}
          </h6>
        ))}
      </Col>
      <Col sm={12} md={10} style={{ position: "relative" }} className="mt-2">
        <div className={styles.common}>
          {active === "Hackathon" && <Hackathon _id={_id}/>}
        </div>
      </Col>
    </Row>
  );
};

export default AAA;
