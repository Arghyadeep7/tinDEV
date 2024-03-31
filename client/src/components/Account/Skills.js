import { useState } from "react";

import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  ProgressBar,
} from "react-bootstrap";

import { technologies, skills } from "../../Data/Account";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Skills = ({ _id }) => {
  const [s, setS] = useState(skills);

  const changeHandler = (event) => {
    const id = event.target.id;
    const label = event.target.name;
    const val = event.target.value;

    setS((e) => {
      return e.map((obj) => {
        if (String(obj.id) === id) {
          if (label === "Name") {
            return { ...obj, id: val, name: val };
          }

          return {
            ...obj,
            rating:
              Number(val) > 100 ? 100 : Number(val) < 0 ? "0" : Number(val),
          };
        }

        return obj;
      });
    });
  };

  const addHandler = () => {
    setS((e) => [
      ...e,
      {
        id: "AWS",
        name: "AWS",
        rating: "0",
      },
    ]);
  };

  const deleteHandler = (event) => {
    const id = event.target.id;
    var count = 1;
    const arr = s
      .filter((skill) => String(skill.id) !== id)
      .map((skill) => {
        return {
          ...skill,
          id: count++,
        };
      });

    setS(arr);
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
        <h4>Skills</h4>
        <div>
          <Button
            variant="outline-dark"
            size="sm"
            className="me-2"
            onClick={addHandler}
          >
            Add <FaPlus size={20} />
          </Button>
          <Button variant="outline-primary" size="sm" type="submit">
            Save <BiSave size={20} />
          </Button>
        </div>
      </div>
      {s.length === 0 && <h5 className="mt-4">No Skill entered.</h5>}
      {s.map((skill) => (
        <Row key={skill.id}>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FloatingLabel type="text" label="Name">
              <Form.Select
                id={skill.id}
                name="Name"
                style={{ fontWeight: "bold" }}
                className="mt-3"
                onChange={changeHandler}
                value={skill.name}
              >
                {technologies.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FloatingLabel type="text" label="Rating/100">
              <Form.Control
                id={skill.id}
                type="number"
                max="100"
                name="Rating"
                value={skill.rating}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                onChange={changeHandler}
                required
              />
            </FloatingLabel>
          </Col>
          <Col sm={4} md={6} lg={8} className="d-none d-sm-block mt-4">
            <ProgressBar
              now={skill.rating}
              label={`${skill.rating}%`}
              className="mt-2"
            />
          </Col>
          <div className="d-flex justify-content-end mt-2 mb-1">
            <Button
              variant="danger"
              onClick={deleteHandler}
              id={skill.id}
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

export default Skills;
