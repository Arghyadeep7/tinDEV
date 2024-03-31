import { useState } from "react";

import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";

import { links } from "../../Data/Account";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Links = ({ _id }) => {
  const [l, setL] = useState(links);

  const changeHandler = (event) => {
    const id = event.target.id;
    const val = event.target.value;

    setL((e) => {
      return e.map((obj) => {
        if (String(obj.id) === id) {
          return {
            ...obj,
            url: val.trim(),
          };
        }

        return obj;
      });
    });
  };

  const addhandler = () => {
    const count = l.length + 1;
    setL((e) => [
      ...e,
      {
        id: count,
        url: "",
      },
    ]);
  };

  const deleteHandler = (event) => {
    const id = event.target.id;
    var count = 1;
    const arr = l
      .filter((link) => String(link.id) !== id)
      .map((link) => {
        return {
          ...link,
          id: count++,
        };
      });

    setL(arr);
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
        <h4>Links</h4>
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
      <Row>
        {l.length === 0 && <h5 className="mt-4">No Link entered.</h5>}
        {l.map((link) => (
          <Col sm={6} key={link.id}>
            <FloatingLabel type="text" label={`Link-${link.id}`}>
              <Form.Control
                id={link.id}
                type="text"
                name="Link"
                value={link.url}
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
            <div className="d-flex justify-content-end mt-2 mb-1">
              <Button
                variant="danger"
                onClick={deleteHandler}
                id={link.id}
                size="sm"
              >
                Delete <MdOutlineDelete size={20} />
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default Links;
