import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

import { hackathons } from "../../Data/Collabs";

import { IoOpenOutline } from "react-icons/io5";

const Hackathon = () => {
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
      {hackathons.map((proj) => (
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
    </Row>
  );
};

export default Hackathon;
