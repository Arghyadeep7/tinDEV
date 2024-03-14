import { useState } from "react";

import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

import { education } from "../../Data/Account";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Education = () => {
  const [edu, setEdu] = useState(education);

  const changeHandler = (event) => {
    const id = event.target.id;
    const label = event.target.name;
    const val = event.target.value;

    setEdu((e) => {
      return e.map((obj) => {
        if (String(obj.id) === id) {
          if (label === "Institute") {
            return { ...obj, institute: val };
          } else if (label === "Course") {
            return { ...obj, course: val };
          } else if (label === "Specialisation") {
            return { ...obj, specialisation: val };
          } else if (label === "From") {
            return { ...obj, from: val };
          } else if (label === "To") {
            return { ...obj, to: val };
          }
          return { ...obj, grade: Number(val) < 0? 0: Number(val) > 100? 100: Number(val) };
        }

        return obj;
      });
    });
  };

  const addhandler = () => {
    const count = edu.length + 1;
    setEdu((e) => [
      ...e,
      {
        id: count,
        institute: "",
        course: "B. Tech.",
        options: [
          "B. Tech.",
          "M. Tech.",
          "B. Eng.",
          "M. Eng.",
          "B. B. A.",
          "M. B. A.",
          "B. Sc.",
          "M. Sc.",
          "B. Com.",
          "M. Com.",
          "B. C. A.",
          "M. C. A.",
          "B. A.",
          "B. Ed.",
          "PhD",
          "Others",
        ],
        specialisation: "",
        from: "",
        to: "",
        grade: "",
      },
    ]);
  };

  const deleteHandler = (event) => {
    const id = event.target.id;
    var count = 1;
    const arr = edu
      .filter((ed) => String(ed.id) !== id)
      .map((ed) => {
        return {
          ...ed,
          id: count++,
        };
      });

    setEdu(arr);
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
        <h4>Education</h4>
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
      {edu.length === 0 && <h5 className="mt-4">No Education to show</h5>}
      {edu.map((ed) => (
        <Row key={ed.id}>
          <Col lg={5} xl={3}>
            <FloatingLabel type="text" label="Institute">
              <Form.Control
                id={ed.id}
                type="text"
                name="Institute"
                value={ed.institute}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                required
                onChange={changeHandler}
              />
            </FloatingLabel>
          </Col>
          <Col sm={6} lg={3} xl={2}>
            <FloatingLabel type="text" label="Specialisation">
              <Form.Control
                id={ed.id}
                type="text"
                name="Specialisation"
                value={ed.specialisation}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                required
                onChange={changeHandler}
              />
            </FloatingLabel>
          </Col>
          <Col xs={6} sm={3} lg={2} xl={2}>
            <FloatingLabel type="text" label="Course">
              <Form.Select
                name={ed.label}
                style={{ fontWeight: "bold" }}
                className="mt-3"
                onChange={changeHandler}
                value={ed.value}
              >
                {ed.options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xs={6} sm={3} lg={2} xl={1}>
            <FloatingLabel type="text" label="Grade">
              <Form.Control
                id={ed.id}
                type="number"
                name="Grade"
                value={ed.grade}
                style={{ fontWeight: "bold" }}
                className="mt-3 pe-1"
                required
                onChange={changeHandler}
              />
            </FloatingLabel>
          </Col>
          <Col sm={6} lg={3} xl={2}>
            <FloatingLabel type="text" label="From">
              <Form.Control
                id={ed.id}
                type="month"
                name="From"
                value={ed.from}
                style={{ fontWeight: "bold" }}
                className="mt-3 pe-1"
                required
                onChange={changeHandler}
              />
            </FloatingLabel>
          </Col>
          <Col sm={6} lg={3} xl={2}>
            <FloatingLabel type="text" label="To">
              <Form.Control
                id={ed.id}
                type="month"
                name="To"
                value={ed.to}
                style={{ fontWeight: "bold" }}
                className="mt-3 pe-1"
                required
                onChange={changeHandler}
              />
            </FloatingLabel>
          </Col>
          <div className="d-flex justify-content-end mt-2 mb-1">
            <Button
              variant="danger"
              onClick={deleteHandler}
              id={ed.id}
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

export default Education;
