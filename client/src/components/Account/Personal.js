import { useState } from "react";

import { personal } from "../../Data/Account";

import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

import { BiSave } from "react-icons/bi";

const Personal = () => {
  const [p, setP] = useState(personal);

  const changeHandler = (event) => {
    const label = event.target.name;
    const val = event.target.value;

    setP((oldP) => {
      return oldP.map((obj) => {
        if(obj.label === label){
          if(label === "Pincode" || label === "University Roll" || label === "Course Duration (Years)" || label === "Year of Graduation"){
            return {
              ...obj,
              value: Number(val) < 0 ? 0: Number(val),
            }
          }

          return {
            ...obj,
            value: val,
          }
        }
        return obj;
      });
    });
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
        <h4>Personal</h4>
        <Button variant="outline-primary" size="sm" type="submit">
          Save <BiSave size={20} />
        </Button>
      </div>
      <Row>
        {p.map((detail) => (
          <Col sm={6} md={4} lg={3} key={detail.label}>
            <FloatingLabel type="text" label={detail.label}>
              {detail.type === "select" ? (
                <Form.Select
                  name={detail.label}
                  style={{ fontWeight: "bold" }}
                  className="mt-3"
                  onChange={changeHandler}
                  value={detail.value}
                >
                  {detail.options.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  required={detail.required}
                  type={detail.type}
                  name={detail.label}
                  value={detail.value}
                  style={{ fontWeight: "bold" }}
                  className="mt-3"
                  onChange={changeHandler}
                />
              )}
            </FloatingLabel>
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default Personal;
