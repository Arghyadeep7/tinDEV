import { useState } from "react";

import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

import { projects } from "../../Data/Account";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Projects = ({ _id }) => {
  const [p, setP] = useState(projects);

  const changeHandler = (event) => {
    const id = event.target.id;
    const label = event.target.name;
    const val = event.target.value;

    setP((e) => {
      return e.map((obj) => {
        if (String(obj.id) === id) {
          if (label === "Name") {
            return { ...obj, name: val };
          } else if (label === "About") {
            return { ...obj, about: val };
          } else if (label === "Repository") {
            return { ...obj, repo: val.trim() };
          } else if (label === "Deployed") {
            return { ...obj, deployed: val.trim() };
          }

          return { ...obj, tech: val };
        }

        return obj;
      });
    });
  };

  const addhandler = () => {
    const count = p.length + 1;
    setP((e) => [
      ...e,
      {
        id: count,
        name: "",
        about: "",
        repo: "",
        deployed: "",
        tech: "",
      },
    ]);
  };

  const deleteHandler = (event) => {
    const id = event.target.id;
    var count = 1;
    const arr = p
      .filter((proj) => String(proj.id) !== id)
      .map((proj) => {
        return {
          ...proj,
          id: count++,
        };
      });

    setP(arr);
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
        <h4>Projects</h4>
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
      {p.length === 0 && <h5 className="mt-4">No Project entered.</h5>}
      {p.map((proj) => (
        <Row key={proj.id}>
          <Col sm={5} lg={4}>
            <FloatingLabel type="text" label="Name">
              <Form.Control
                id={proj.id}
                type="text"
                name="Name"
                value={proj.name}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
            <FloatingLabel type="text" label="Repository Link">
              <Form.Control
                id={proj.id}
                type="text"
                name="Repository"
                value={proj.repo}
                style={{
                  fontWeight: "bold",
                  color: "blue",
                  textDecoration: "underline",
                }}
                className="mt-3"
                onChange={changeHandler}
              />
            </FloatingLabel>
            <FloatingLabel type="text" label="Deployed Link">
              <Form.Control
                id={proj.id}
                type="text"
                name="Deployed"
                value={proj.deployed}
                style={{
                  fontWeight: "bold",
                  color: "blue",
                  textDecoration: "underline",
                }}
                className="mt-3"
                onChange={changeHandler}
              />
            </FloatingLabel>
          </Col>
          <Col sm={7} lg={8}>
            <FloatingLabel type="textarea" label="About">
              <Form.Control
                id={proj.id}
                as="textarea"
                name="About"
                value={proj.about}
                style={{ fontWeight: "bold", minHeight: "132px" }}
                className="mt-3"
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
            <FloatingLabel type="text" label="Technologies Used">
              <Form.Control
                id={proj.id}
                type="text"
                name="Technologies"
                value={proj.tech}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
          </Col>
          <div className="d-flex justify-content-end mt-2 mb-1">
            <Button
              variant="danger"
              onClick={deleteHandler}
              id={proj.id}
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

export default Projects;
