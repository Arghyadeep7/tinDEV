import { useState } from "react";

import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";

import { certifications } from "../../Data/Account";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Certificates = ({ _id }) => {
  const [c, setC] = useState(certifications);

  const date = new Date();
  const month =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : 1 + date.getMonth();
  const dt = date.getFullYear() + "-" + month;

  const changeHandler = (event) => {
    const id = event.target.id;
    const label = event.target.name;
    const val = event.target.value;

    setC((e) => {
      return e.map((obj) => {
        if (String(obj.id) === id) {
          if (label === "Org") {
            return { ...obj, org: val };
          } else if (label === "Name") {
            return { ...obj, name: val };
          } else if (label === "Issued") {
            return { ...obj, issued: val };
          } else if (label === "Expiry") {
            return { ...obj, expiry: val };
          }

          return {
            ...obj,
            link: val.trim(),
          };
        }

        return obj;
      });
    });
  };

  const checkHandler = (event) => {
    const id = event.target.id;
    const val = event.target.checked;

    setC((e) => {
      return e.map((obj) => {
        if (String(obj.id) === id) {
          return { ...obj, expiry: val === true ? "Not Applicable" : "" };
        }

        return obj;
      });
    });
  };

  const addhandler = () => {
    const count = c.length + 1;
    setC((e) => [
      ...e,
      {
        id: count,
        name: "",
        rating: "0",
      },
    ]);
  };

  const deleteHandler = (event) => {
    const id = event.target.id;
    var count = 1;
    const arr = c
      .filter((proj) => String(proj.id) !== id)
      .map((proj) => {
        return {
          ...proj,
          id: count++,
        };
      });

    setC(arr);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={submitHandler} style={{ position: "relative" }}>
      <div
        className="d-flex justify-content-between pb-2"
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1000,
          backgroundColor: "white",
        }}
      >
        <h4>Certificates</h4>
        <div>
          <Button
            variant="outline-dark"
            size="sm"
            className="me-2"
            onClick={addhandler}
          >
            Add <FaPlus size={20} />
          </Button>
          <Button variant="outline-primary" size="sm" type="submit">
            Save <BiSave size={20} />
          </Button>
        </div>
      </div>
      {c.length === 0 && <h5 className="mt-4">No Certification entered.</h5>}
      {c.map((cert) => (
        <Row key={cert.id} id={cert.id}>
          <Col sm={6} lg={3}>
            <FloatingLabel type="text" label="Issuing Organization">
              <Form.Control
                id={cert.id}
                type="text"
                name="Org"
                value={cert.org}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
          </Col>
          <Col sm={6} lg={5}>
            <FloatingLabel type="text" label="Certificate Name">
              <Form.Control
                id={cert.id}
                type="text"
                name="Name"
                value={cert.name}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
          </Col>
          <Col xs={6} sm={3} lg={2}>
            <FloatingLabel type="text" label="Issued Date">
              <Form.Control
                id={cert.id}
                type="month"
                name="Issued"
                value={cert.issued}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                onChange={changeHandler}
                max={dt}
                required
              />
            </FloatingLabel>
          </Col>
          <Col xs={6} sm={3} lg={2}>
            <FloatingLabel type="text" label="Expiry Date">
              <Form.Control
                id={cert.id}
                type={cert.expiry === "Not Applicable" ? "text" : "month"}
                name="Expiry"
                value={cert.expiry}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                onChange={changeHandler}
                max={dt}
                required
              />
            </FloatingLabel>
          </Col>
          <Col sm={6} lg={12}>
            <FloatingLabel type="text" label="Link (if applicable)">
              <Form.Control
                id={cert.id}
                type="text"
                name="link"
                value={cert.link}
                style={{
                  fontWeight: "bold",
                  color: "blue",
                  textDecoration: "underline",
                }}
                className="mt-3"
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
          </Col>
          <div className="d-flex justify-content-between mt-2 mb-1">
            <Form.Check
              type="checkbox"
              label="Does not expire"
              name="DoesNot"
              id={cert.id}
              onChange={checkHandler}
              checked={cert.expiry === "Not Applicable" ? true : false}
            />
            <Button
              variant="danger"
              onClick={deleteHandler}
              id={cert.id}
              size="sm"
            >
              Delete <MdOutlineDelete size={20} />
            </Button>
          </div>
        </Row>
      ))}
    </Form>
  );
};

export default Certificates;
