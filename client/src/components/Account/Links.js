import { useState, useEffect } from "react";

import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Links = ({ url_id }) => {
  const [l, setL] = useState({});
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const request = async () => {
        const response = await fetch(
            process.env.REACT_APP_FETCH_URL + "/links/" + url_id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => res.json());

        console.log(response);

        setL(response.arr);
      };
      request();
      setLoading(false);
    }, [url_id]);

  const changeHandler = (event) => {
    const _id = event.target.id;
    const val = event.target.value;

    setL((e) => {
      return e.map((obj) => {
        if (String(obj._id) === _id) {
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
        _id: count,
        url: "",
      },
    ]);
  };

  const deleteHandler = (event) => {
    const _id = event.target.id;
    var count = 1;
    const arr = l
      .filter((link) => String(link._id) !== _id)
      .map((link) => {
        return {
          ...link,
          _id: count++,
        };
      });

    setL(arr);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(l);
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
        {loading? <h5>Loading...</h5>
          :
          <>        
            {l.length === 0 && <h5 className="mt-4">No Link entered.</h5>}
            {l.length > 0 && l.map((link) => (
              <Col sm={6} key={link._id}>
                <FloatingLabel type="text" label={`Link-${link._id}`}>
                  <Form.Control
                    id={link._id}
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
                    id={link._id}
                    size="sm"
                  >
                    Delete <MdOutlineDelete size={20} />
                  </Button>
                </div>
              </Col>
            ))}
          </>
        }
      </Row>
    </Form>
  );
};

export default Links;
