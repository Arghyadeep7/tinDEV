import { useState } from "react";
import { useParams } from "react-router-dom";

import { technologies } from "../Data/Account";

import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

import styles from "../styles/Common.module.css";

const HackPage = () => {
  const { id } = useParams();

  const [active, setActive] = useState("About");

  const date = new Date();
  const day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
  const month =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : 1 + date.getMonth();
  const today = date.getFullYear() + "-" + month + "-" + day;

  const [h, setH] = useState({
    name: "HackedIT",
    organiser: "IIT-KGP",
    date: today,
    members: 3,
    about: "User friendly mailing app!",
    repo: "https://github.com/Arghyadeep7",
    deployed: "https://arghya-deep-pal.vercel.app",
    cost: 250,
    mustTech: [
      {
        id: "M1",
        name: "C++",
        rating: 80,
      },
      {
        id: "M2",
        name: "Python",
        rating: 65,
      },
      {
        id: "M3",
        name: "Java",
        rating: 70,
      },
    ],
    prefTech: [
      {
        id: "P1",
        name: "C",
        rating: 80,
      },
      {
        id: "P2",
        name: "JavaScript",
        rating: 70,
      },
    ],
    clgPref: [
      {
        id: "C1",
        name: "XYZ",
      },
    ],
    links: [
      {
        id: "L1",
        url: "https://arghya-deep-pal.vercel.app",
      },
    ],
  });

  const singleChangeHandler = (event) => {
    const label = event.target.name;
    const val = event.target.value;

    setH((e) => {
      if (label === "Name") {
        return { ...e, name: val };
      } else if (label === "Organiser") {
        return { ...e, organiser: val };
      } else if (label === "Members") {
        return { ...e, members: val < 0 ? 0 : Number(val) };
      } else if (label === "About") {
        return { ...e, about: val };
      } else if (label === "Repo") {
        return { ...e, repo: val.trim() };
      } else if (label === "Deployed") {
        return { ...e, deployed: val.trim() };
      } else if (label === "Date") {
        return { ...e, date: val };
      }

      return { ...e, cost: val < 0 ? 0 : Number(val) };
    });
  };

  const arrayChangeHandler = (event) => {
    const id = event.target.id;
    const label = event.target.name;
    const val = event.target.value;

    // console.log(id, label, val);

    if (id[0] === "M") {
      const arr = h.mustTech.map((obj) => {
        if (obj.id === id) {
          if (label === "Name") {
            return { ...obj, id: "M" + val, name: val };
          }

          return {
            ...obj,
            rating:
              Number(val) > 100 ? 100 : Number(val) < 0 ? "0" : Number(val),
          };
        }

        return obj;
      });
      setH((e) => {
        return { ...e, mustTech: arr };
      });
    } else if (id[0] === "P") {
      const arr = h.prefTech.map((obj) => {
        if (obj.id === id) {
          if (label === "Name") {
            return { ...obj, id: "P" + val, name: val };
          }

          return {
            ...obj,
            rating:
              Number(val) > 100 ? 100 : Number(val) < 0 ? "0" : Number(val),
          };
        }

        return obj;
      });
      setH((e) => {
        return { ...e, prefTech: arr };
      });
    } else if (id[0] === "C") {
      setH((e) => {
        const arr = e.clgPref.map((obj) => {
          if (String(obj.id) === id) {
            return { ...obj, name: val };
          }

          return obj;
        });

        return { ...e, clgPref: arr };
      });
    }

    setH((e) => {
      const arr = e.links.map((obj) => {
        if (String(obj.id) === id) {
          return { ...obj, url: val };
        }

        return obj;
      });

      return { ...e, links: arr };
    });
  };

  const addHandler = (event) => {
    const id = event.target.id;

    if (id === "M") {
      let count = h.mustTech.length + 1;
      setH((e) => {
        return {
          ...e,
          mustTech: [
            ...e.mustTech,
            {
              id: "M" + count,
              name: "C++",
              rating: 0,
            },
          ],
        };
      });
    } else if (id === "P") {
      let count = h.prefTech.length + 1;
      setH((e) => {
        return {
          ...e,
          prefTech: [
            ...e.prefTech,
            {
              id: "P" + count,
              name: "C++",
              rating: 0,
            },
          ],
        };
      });
    } else if (id === "C") {
      let count = h.clgPref.length + 1;
      setH((e) => {
        return {
          ...e,
          clgPref: [
            ...e.clgPref,
            {
              id: "C" + count,
              name: "",
            },
          ],
        };
      });
    }

    let count = h.links.length + 1;
    setH((e) => {
      return {
        ...e,
        links: [
          ...e.links,
          {
            id: "L" + count,
            url: "",
          },
        ],
      };
    });
  };

  const deleteHandler = (event) => {
    const id = event.target.id;
    var count = 1;
    if (id[0] === "M") {
      const arr = h.mustTech
        .filter((tech) => tech.id !== id)
        .map((tech) => {
          return {
            ...tech,
            id: "M" + count++,
          };
        });
      setH((e) => {
        return {
          ...e,
          mustTech: arr,
        };
      });
    } else if (id[0] === "P") {
      const arr = h.prefTech
        .filter((tech) => tech.id !== id)
        .map((tech) => {
          return {
            ...tech,
            id: "P" + count++,
          };
        });
      setH((e) => {
        return {
          ...e,
          prefTech: arr,
        };
      });
    } else if (id[0] === "C") {
      const arr = h.clgPref
        .filter((clg) => clg.id !== id)
        .map((clg) => {
          return {
            ...clg,
            id: "C" + count++,
          };
        });
      setH((e) => {
        return {
          ...e,
          clgPref: arr,
        };
      });
    }

    const arr = h.links
      .filter((link) => link.id !== id)
      .map((link) => {
        return {
          ...link,
          id: "L" + count++,
        };
      });
    setH((e) => {
      return {
        ...e,
        links: arr,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const tabs = [
    {
      id: 1,
      label: "About",
    },
    {
      id: 2,
      label: "Skills",
    },
    {
      id: 3,
      label: "References",
    },
  ];

  return (
    <Row className="mt-2">
      <Col md={2} className="mt-1 d-none d-md-block">
        {tabs.map((tab) => (
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
        {tabs.map((tab) => (
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
              <h4>{h.name + "- [" + id + "]"}</h4>
              <Button variant="outline-primary" size="sm" type="submit">
                Save <BiSave size={20} />
              </Button>
            </div>

            {active === "About" && (
              <Row>
                <h5>About</h5>
                <Col sm={6}>
                  <FloatingLabel type="text" label="Name">
                    <Form.Control
                      required
                      type="text"
                      name="Name"
                      value={h.name}
                      style={{ fontWeight: "bold" }}
                      className="mt-3"
                      onChange={singleChangeHandler}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={6}>
                  <FloatingLabel type="text" label="Organiser">
                    <Form.Control
                      required
                      type="text"
                      name="Organiser"
                      value={h.organiser}
                      style={{ fontWeight: "bold" }}
                      className="mt-3"
                      onChange={singleChangeHandler}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={4} lg={3}>
                  <FloatingLabel label="Last Enrollment Date">
                    <Form.Control
                      required
                      type="date"
                      name="Date"
                      min={today}
                      value={h.date}
                      style={{
                        fontWeight: "bold",
                        color: "red",
                      }}
                      className="mt-3"
                      onChange={singleChangeHandler}
                    />
                  </FloatingLabel>
                  <FloatingLabel type="text" label="Reqd. Members">
                    <Form.Control
                      required
                      type="number"
                      name="Members"
                      value={h.members}
                      style={{ fontWeight: "bold" }}
                      className="mt-3"
                      onChange={singleChangeHandler}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Cost/Member (Rs.)">
                    <Form.Control
                      required
                      type="number"
                      name="Cost"
                      value={h.cost}
                      style={{
                        fontWeight: "bold",
                        color: "red",
                      }}
                      className="mt-3"
                      onChange={singleChangeHandler}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={8} lg={9}>
                  <FloatingLabel label="What are you building?">
                    <Form.Control
                      required
                      as="textarea"
                      name="About"
                      value={h.about}
                      style={{ fontWeight: "bold", minHeight: "207px" }}
                      className="mt-3"
                      onChange={singleChangeHandler}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={6}>
                  <FloatingLabel label="Repository Link">
                    <Form.Control
                      required
                      type="text"
                      name="Repo"
                      value={h.repo}
                      style={{
                        fontWeight: "bold",
                        color: "blue",
                        textDecoration: "underline",
                      }}
                      className="mt-3"
                      onChange={singleChangeHandler}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={6}>
                  <FloatingLabel label="Deployment Link">
                    <Form.Control
                      required
                      type="text"
                      name="Deployed"
                      value={h.deployed}
                      style={{
                        fontWeight: "bold",
                        color: "blue",
                        textDecoration: "underline",
                      }}
                      className="mt-3"
                      onChange={singleChangeHandler}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            )}

            {active === "Skills" && (
              <Row>
                <div className="d-flex justify-content-between mt-2">
                  <h5>Required Skills</h5>
                  <Button
                    id="M"
                    variant="outline-dark"
                    size="sm"
                    onClick={addHandler}
                  >
                    Add <FaPlus size={20} />
                  </Button>
                </div>
                {h.mustTech.length === 0 && (
                  <h6 className="mt-4">No mandatory skills required</h6>
                )}
                {h.mustTech.map((tech) => (
                  <>
                    <Col xs={6} md={4} lg={2}>
                      <FloatingLabel
                        label={`Technology-${tech.id.substring(1)}`}
                      >
                        <Form.Select
                          required
                          id={tech.id}
                          type="text"
                          name="Name"
                          value={tech.name}
                          style={{
                            fontWeight: "bold",
                          }}
                          className="mt-3"
                          onChange={arrayChangeHandler}
                        >
                          {technologies.map((option) => (
                            <option value={option} key={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={6} md={2} lg={2}>
                      <FloatingLabel label="Rating">
                        <Form.Control
                          id={tech.id}
                          required
                          type="number"
                          name="Rating"
                          value={tech.rating}
                          style={{
                            fontWeight: "bold",
                          }}
                          className="mt-3 pe-0"
                          onChange={arrayChangeHandler}
                        />
                      </FloatingLabel>
                      <div className="d-flex justify-content-end mt-2 mb-1">
                        <Button
                          variant="danger"
                          onClick={deleteHandler}
                          id={tech.id}
                          size="sm"
                        >
                          Delete <MdOutlineDelete size={20} />
                        </Button>
                      </div>
                    </Col>
                  </>
                ))}

                <div className="d-flex justify-content-between mt-4">
                  <h5 className="mt-1">Additional Skills</h5>
                  <Button
                    id="P"
                    variant="outline-dark"
                    size="sm"
                    className="me-2"
                    onClick={addHandler}
                  >
                    Add <FaPlus size={20} />
                  </Button>
                </div>
                {h.prefTech.length === 0 && (
                  <h6 className="mt-4">No additional skills required</h6>
                )}
                {h.prefTech.map((tech) => (
                  <>
                    <Col xs={6} md={4} lg={2}>
                      <FloatingLabel
                        label={`Technology-${tech.id.substring(1)}`}
                      >
                        <Form.Select
                          required
                          id={tech.id}
                          type="text"
                          name="Name"
                          value={tech.name}
                          style={{
                            fontWeight: "bold",
                          }}
                          className="mt-3"
                          onChange={arrayChangeHandler}
                        >
                          {technologies.map((option) => (
                            <option value={option} key={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={6} md={2} lg={2}>
                      <FloatingLabel label="Rating">
                        <Form.Control
                          id={tech.id}
                          required
                          type="number"
                          name="Rating"
                          value={tech.rating}
                          style={{
                            fontWeight: "bold",
                          }}
                          className="mt-3 pe-0"
                          onChange={arrayChangeHandler}
                        />
                      </FloatingLabel>
                      <div className="d-flex justify-content-end mt-2 mb-1">
                        <Button
                          variant="danger"
                          onClick={deleteHandler}
                          id={tech.id}
                          size="sm"
                        >
                          Delete <MdOutlineDelete size={20} />
                        </Button>
                      </div>
                    </Col>
                  </>
                ))}

                <div className="d-flex justify-content-between mt-4">
                  <h5 className="mt-1">College Preference</h5>
                  <Button
                    id="C"
                    variant="outline-dark"
                    size="sm"
                    className="me-2"
                    onClick={addHandler}
                  >
                    Add <FaPlus size={20} />
                  </Button>
                </div>
                {h.clgPref.length === 0 && (
                  <h6 className="mt-4">No college preference</h6>
                )}
                {h.clgPref.map((clg) => (
                  <Col sm={6} md={4} lg={3} xl={2} key={clg.id.substring(1)}>
                    <FloatingLabel label={`College-${clg.id.substring(1)}`}>
                      <Form.Control
                        required
                        id={clg.id}
                        type="text"
                        name="Clg pref"
                        value={clg.name}
                        style={{
                          fontWeight: "bold",
                        }}
                        className="mt-3"
                        onChange={arrayChangeHandler}
                      />
                    </FloatingLabel>
                    <div className="d-flex justify-content-end mt-2 mb-1">
                      <Button
                        variant="danger"
                        onClick={deleteHandler}
                        id={clg.id}
                        size="sm"
                      >
                        Delete <MdOutlineDelete size={20} />
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            )}

            {active === "References" && (
              <Row>
                <div className="d-flex justify-content-between mt-2">
                  <h5>Reference Links</h5>
                  <Button
                    id="L"
                    variant="outline-dark"
                    size="sm"
                    onClick={addHandler}
                  >
                    Add <FaPlus size={20} />
                  </Button>
                </div>
                {h.links.length === 0 && (
                  <h6 className="mt-4">No reference links provided</h6>
                )}
                {h.links.map((link) => (
                  <Col sm={6} md={4} key={link.id}>
                    <FloatingLabel label={`Link-${link.id.substring(1)}`}>
                      <Form.Control
                        required
                        id={link.id}
                        type="text"
                        name="Link"
                        value={link.url}
                        style={{
                          fontWeight: "bold",
                        }}
                        className="mt-3"
                        onChange={arrayChangeHandler}
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
            )}
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default HackPage;
