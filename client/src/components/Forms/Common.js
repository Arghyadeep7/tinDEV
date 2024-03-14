import { Col } from "react-bootstrap";

import { FaCopyright } from "react-icons/fa";

const Common = () => {
  return (
    <Col
      sm={5}
      lg={4}
      style={{
        height: "100vh",
        color: "white",
        // backgroundColor: "#17a4d4",
        backgroundImage: "linear-gradient(to bottom right, blue, #05a1f0)",
      }}
      className="pt-3"
    >
      <div
        style={{
          border: "5px solid white",
          position: "relative",
          height: "98%",
        }}
        className="p-2"
      >
        <h1>tinDEV</h1>
        <br />
        <h3>
          "Tinder" but for <i>DEVELOPERS</i>
        </h3>
        <i>
          <b>Note: Not for dating but for development</b>
        </i>
        <h4 style={{ marginTop: "25%" }}>
          "A real life collaboration tool built for developers to collaborate
          and collectively participate for a hackathon or a project."
        </h4>
        <h5
          style={{
            position: "absolute",
            bottom: "5px",
          }}
        >
          tinDEV | <FaCopyright size={25} /> All Rights Reserved
        </h5>
      </div>
    </Col>
  );
};

export default Common;
