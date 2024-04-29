import { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { hackTabs, technologies } from "../Format/Main";

import { Form, Row, Col, Button, FloatingLabel, Card } from "react-bootstrap";

import { FaPlus } from "react-icons/fa6";
import { BiSave } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

import styles from "../styles/Common.module.css";

const HackPage = () => {
    const { url_id } = useParams();

    const [h, setH] = useState([]);
    const [submitting, setSubmit] = useState(false);
    const [loading, setLoading] = useState(true);

    const [active, setActive] = useState("About");

    useEffect(() => {
        const request = async () => {
            const response = await fetch(
                process.env.REACT_APP_FETCH_URL +
                    "/hackathons/" +
                    url_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());

            console.log(response);

            setH(response);
        };
        request();
        console.log("here");
        setLoading(false);
    }, [url_id]);

    const date = new Date();
    const day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
    const month =
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : 1 + date.getMonth();
    const today = date.getFullYear() + "-" + month + "-" + day;

    const singleChangeHandler = (event) => {
        const label = event.target.name;
        const val = event.target.value;

        setH((e) => {
            if (label === "Name") {
                return { ...e, name: val };
            } else if (label === "Organiser") {
                return { ...e, organiser: val };
            } else if (label === "Members") {
                return { ...e, memberCount: val < 0 ? 0 : Number(val) };
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
        const _id = event.target.id;
        const val = event.target.value;
        const name = event.target.name;

        if (name === "Reqd") {
            const arr = h.mustTech.map((obj) => {
                if (String(obj._id) === _id) {
                    const type = /\d/.test(val) ? "number" : "string";
                    if (type === "string") {
                        return { ...obj, name: val };
                    }

                    return {
                        ...obj,
                        rating:
                            Number(val) > 100
                                ? 100
                                : Number(val) < 0
                                ? "0"
                                : Number(val),
                    };
                }

                return obj;
            });
            setH((e) => {
                return { ...e, mustTech: arr };
            });
        } else if (name === "Additional") {
            const arr = h.prefTech.map((obj) => {
                if (String(obj._id) === _id) {
                    const type = /\d/.test(val) ? "number" : "string";
                    if (type === "string") {
                        return { ...obj, name: val };
                    }

                    return {
                        ...obj,
                        rating:
                            Number(val) > 100
                                ? 100
                                : Number(val) < 0
                                ? "0"
                                : Number(val),
                    };
                }

                return obj;
            });
            setH((e) => {
                return { ...e, prefTech: arr };
            });
        } else if (name === "Clg") {
            setH((e) => {
                const arr = e.clgPref.map((obj) => {
                    if (String(obj._id) === _id) {
                        return { ...obj, name: val };
                    }

                    return obj;
                });

                return { ...e, clgPref: arr };
            });
        } else {
            setH((e) => {
                const arr = e.links.map((obj) => {
                    if (String(obj._id) === _id) {
                        return { ...obj, url: val };
                    }

                    return obj;
                });

                return { ...e, links: arr };
            });
        }
    };

    const addHandler = (name) => {
        console.log(name);

        if (name === "Reqd") {
            let count = h.mustTech.length + 1;
            setH((e) => {
                return {
                    ...e,
                    mustTech: [
                        ...e.mustTech,
                        {
                            _id: count,
                            name: "C++",
                            rating: 0,
                        },
                    ],
                };
            });
        } else if (name === "Additional") {
            let count = h.prefTech.length + 1;
            setH((e) => {
                return {
                    ...e,
                    prefTech: [
                        ...e.prefTech,
                        {
                            _id: count,
                            name: "C++",
                            rating: 0,
                        },
                    ],
                };
            });
        } else if (name === "Clg") {
            let count = h.clgPref.length + 1;
            setH((e) => {
                return {
                    ...e,
                    clgPref: [
                        ...e.clgPref,
                        {
                            _id: count,
                            name: "",
                        },
                    ],
                };
            });
        } else if (name === "Link") {
            let count = h.links.length + 1;
            setH((e) => {
                return {
                    ...e,
                    links: [
                        ...e.links,
                        {
                            _id: count,
                            url: "",
                        },
                    ],
                };
            });
        }
    };

    const deleteHandler = (event) => {
        console.log("here");

        const _id = event.target.id;
        const name = event.target.name;

        console.log(_id, "-", name);

        var count = 1;
        if (name === "Reqd") {
            const arr = h.mustTech
                .filter((tech) => String(tech._id) !== _id)
                .map((tech) => {
                    return {
                        ...tech,
                        _id: count++,
                    };
                });
            setH((e) => {
                return {
                    ...e,
                    mustTech: arr,
                };
            });
        } else if (name === "Additional") {
            const arr = h.prefTech
                .filter((tech) => String(tech._id) !== _id)
                .map((tech) => {
                    return {
                        ...tech,
                        _id: count++,
                    };
                });
            setH((e) => {
                return {
                    ...e,
                    prefTech: arr,
                };
            });
        } else if (name === "Clg") {
            const arr = h.clgPref
                .filter((clg) => String(clg._id) !== _id)
                .map((clg) => {
                    return {
                        ...clg,
                        _id: count++,
                    };
                });
            setH((e) => {
                return {
                    ...e,
                    clgPref: arr,
                };
            });
        } else if (name === "Link") {
            const arr = h.links
                .filter((link) => String(link._id) !== _id)
                .map((link) => {
                    return {
                        ...link,
                        _id: count++,
                    };
                });
            setH((e) => {
                return {
                    ...e,
                    links: arr,
                };
            });
        } else {
            const arr = h.members.filter((mem) => String(mem._id) !== _id);
            setH((e) => {
                return {
                    ...e,
                    members: arr,
                };
            });
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(h);

        setSubmit(true);

        const response = await fetch(
            process.env.REACT_APP_FETCH_URL + "/hackathons/" + url_id,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(h),
            }
        ).then((res) => res.json());

        console.log(response);

        setSubmit(false);

        if (response.code === 200) {
            alert("Hackathon successfully updated");
        } else {
            alert("Internal Error occurred. Try again later.");
        }
    };

    return (
        <Row className="mt-2">
            <Col md={2} className="mt-1 d-none d-md-block">
                {hackTabs.map((tab) => (
                    <h6
                        onClick={() => setActive(tab.label)}
                        style={{
                            color: active === tab.label && "blue",
                            borderBottom:
                                active === tab.label && "2px solid blue",
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
                {hackTabs.map((tab) => (
                    <h6
                        onClick={() => setActive(tab.label)}
                        style={{
                            color: active === tab.label && "blue",
                            borderBottom:
                                active === tab.label && "2px solid blue",
                            cursor: "pointer",
                        }}
                        className="p-1"
                        key={tab.label}
                    >
                        {tab.label}
                    </h6>
                ))}
            </Col>
            <Col
                sm={12}
                md={10}
                style={{ position: "relative" }}
                className="mt-2"
            >
                {loading ? (
                    <h5>Loading...</h5>
                ) : (
                    <div className={styles.common}>
                        <Form
                            onSubmit={submitHandler}
                            style={{ position: "relative" }}
                        >
                            <div
                                className="d-flex justify-content-between pb-2"
                                style={{
                                    position: "sticky",
                                    top: "0",
                                    zIndex: 1000,
                                    backgroundColor: "white",
                                }}
                            >
                                <h4>{h.name + " - " + url_id}</h4>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    type="submit"
                                >
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
                                                disabled={submitting}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={6}>
                                        <FloatingLabel
                                            type="text"
                                            label="Organiser"
                                        >
                                            <Form.Control
                                                required
                                                type="text"
                                                name="Organiser"
                                                value={h.organiser}
                                                style={{ fontWeight: "bold" }}
                                                className="mt-3"
                                                onChange={singleChangeHandler}
                                                disabled={submitting}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={4} lg={3}>
                                        <FloatingLabel label="Owner">
                                            <Form.Control
                                                required
                                                type="text"
                                                name="Owner"                                                
                                                value={h.owner}
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "red",
                                                }}
                                                className="mt-3"
                                                readOnly
                                            />
                                        </FloatingLabel>
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
                                                disabled={submitting}
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            type="text"
                                            label="Reqd. Members"
                                        >
                                            <Form.Control
                                                required
                                                type="number"
                                                name="Members"
                                                value={h.memberCount}
                                                style={{ fontWeight: "bold" }}
                                                className="mt-3"
                                                onChange={singleChangeHandler}
                                                disabled={submitting}
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
                                                disabled={submitting}
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
                                                style={{
                                                    fontWeight: "bold",
                                                    minHeight: "280px",
                                                    resize: "none",
                                                }}
                                                className="mt-3"
                                                onChange={singleChangeHandler}
                                                disabled={submitting}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={6}>
                                        <FloatingLabel label="Repository Link (if applicable)">
                                            <Form.Control
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
                                                disabled={submitting}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={6}>
                                        <FloatingLabel label="Deployment Link (if applicable)">
                                            <Form.Control
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
                                                disabled={submitting}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            )}

                            {active === "Skills" && (
                                <Row>
                                    <div className="d-flex justify-content-between mt-4">
                                        <h5 className="mt-1">
                                            Required Skills
                                        </h5>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            onClick={() => addHandler("Reqd")}
                                            disabled={submitting}
                                        >
                                            Add <FaPlus size={20} />
                                        </Button>
                                    </div>
                                    {h.mustTech.length === 0 && (
                                        <h6 className="mt-4">
                                            No mandatory skills required
                                        </h6>
                                    )}
                                    {h.mustTech.length > 0 &&
                                        h.mustTech.map((tech) => (
                                            <Fragment key={tech._id}>
                                                <Col xs={6} md={4} lg={2}>
                                                    <FloatingLabel
                                                        label={`Technology-${tech._id}`}
                                                    >
                                                        <Form.Select
                                                            required
                                                            id={tech._id}
                                                            type="text"
                                                            name="Reqd"
                                                            label="Name"
                                                            value={tech.name}
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                            className="mt-3"
                                                            onChange={
                                                                arrayChangeHandler
                                                            }
                                                            disabled={
                                                                submitting
                                                            }
                                                        >
                                                            {technologies.map(
                                                                (option) => (
                                                                    <option
                                                                        value={
                                                                            option
                                                                        }
                                                                        key={
                                                                            option
                                                                        }
                                                                    >
                                                                        {option}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={6} md={2} lg={2}>
                                                    <FloatingLabel label="Rating">
                                                        <Form.Control
                                                            id={tech._id}
                                                            required
                                                            type="number"
                                                            name="Reqd"
                                                            label="Rating"
                                                            value={tech.rating}
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                            className="mt-3 pe-0"
                                                            onChange={
                                                                arrayChangeHandler
                                                            }
                                                            disabled={
                                                                submitting
                                                            }
                                                        />
                                                    </FloatingLabel>
                                                    <div
                                                        className="d-flex justify-content-end mt-2 mb-1"
                                                        id={tech._id}
                                                    >
                                                        <Button
                                                            variant="danger"
                                                            onClick={
                                                                deleteHandler
                                                            }
                                                            id={tech._id}
                                                            name="Reqd"
                                                            size="sm"
                                                            disabled={
                                                                submitting
                                                            }
                                                        >
                                                            Delete{" "}
                                                            <MdOutlineDelete
                                                                size={20}
                                                            />
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Fragment>
                                        ))}

                                    <div className="d-flex justify-content-between mt-4">
                                        <h5 className="mt-1">
                                            Additional Skills
                                        </h5>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            onClick={() =>
                                                addHandler("Additional")
                                            }
                                            disabled={submitting}
                                        >
                                            Add <FaPlus size={20} />
                                        </Button>
                                    </div>
                                    {h.prefTech.length === 0 && (
                                        <h6 className="mt-4">
                                            No additional skills required
                                        </h6>
                                    )}
                                    {h.prefTech.length > 0 &&
                                        h.prefTech.map((tech) => (
                                            <Fragment key={tech._id}>
                                                <Col xs={6} md={4} lg={2}>
                                                    <FloatingLabel
                                                        label={`Technology-${tech._id}`}
                                                    >
                                                        <Form.Select
                                                            required
                                                            id={tech._id}
                                                            type="text"
                                                            name="Additional"
                                                            label="Name"
                                                            value={tech.name}
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                            className="mt-3"
                                                            onChange={
                                                                arrayChangeHandler
                                                            }
                                                            disabled={
                                                                submitting
                                                            }
                                                        >
                                                            {technologies.map(
                                                                (option) => (
                                                                    <option
                                                                        value={
                                                                            option
                                                                        }
                                                                        key={
                                                                            option
                                                                        }
                                                                    >
                                                                        {option}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={6} md={2} lg={2}>
                                                    <FloatingLabel label="Rating">
                                                        <Form.Control
                                                            id={tech._id}
                                                            required
                                                            type="number"
                                                            name="Additional"
                                                            label="Rating"
                                                            value={tech.rating}
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                            className="mt-3 pe-0"
                                                            onChange={
                                                                arrayChangeHandler
                                                            }
                                                            disabled={
                                                                submitting
                                                            }
                                                        />
                                                    </FloatingLabel>
                                                    <div
                                                        className="d-flex justify-content-end mt-2 mb-1"
                                                        id={tech._id}
                                                    >
                                                        <Button
                                                            variant="danger"
                                                            id={tech._id}
                                                            onClick={
                                                                deleteHandler
                                                            }
                                                            size="sm"
                                                            name="Additional"
                                                            disabled={
                                                                submitting
                                                            }
                                                        >
                                                            Delete{" "}
                                                            <MdOutlineDelete
                                                                size={20}
                                                            />
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Fragment>
                                        ))}

                                    <div className="d-flex justify-content-between mt-4">
                                        <h5 className="mt-1">
                                            College Preference
                                        </h5>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            onClick={() => addHandler("Clg")}
                                            disabled={submitting}
                                        >
                                            Add <FaPlus size={20} />
                                        </Button>
                                    </div>
                                    {h.clgPref.length === 0 && (
                                        <h6 className="mt-4">
                                            No college preference
                                        </h6>
                                    )}
                                    {h.clgPref.length > 0 &&
                                        h.clgPref.map((clg) => (
                                            <Col sm={6} lg={4} key={clg._id}>
                                                <FloatingLabel
                                                    label={`College-${clg._id}`}
                                                >
                                                    <Form.Control
                                                        required
                                                        id={clg._id}
                                                        type="text"
                                                        name="Clg"
                                                        label="Clg Pref"
                                                        value={clg.name}
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                        className="mt-3"
                                                        onChange={
                                                            arrayChangeHandler
                                                        }
                                                        disabled={submitting}
                                                    />
                                                </FloatingLabel>
                                                <div
                                                    className="d-flex justify-content-end mt-2 mb-1"
                                                    id={clg._id}
                                                >
                                                    <Button
                                                        variant="danger"
                                                        onClick={deleteHandler}
                                                        id={clg._id}
                                                        size="sm"
                                                        name="Clg"
                                                        disabled={submitting}
                                                    >
                                                        Delete{" "}
                                                        <MdOutlineDelete
                                                            size={20}
                                                        />
                                                    </Button>
                                                </div>
                                            </Col>
                                        ))}
                                </Row>
                            )}

                            {active === "References" && (
                                <Row>
                                    <div className="d-flex justify-content-between mt-4">
                                        <h5 className="mt-1">
                                            Reference Links
                                        </h5>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            onClick={() => addHandler("Link")}
                                            disabled={submitting}
                                        >
                                            Add <FaPlus size={20} />
                                        </Button>
                                    </div>
                                    {h.links.length === 0 && (
                                        <h6 className="mt-4">
                                            No reference links provided
                                        </h6>
                                    )}
                                    {h.links.map((link) => (
                                        <Col sm={6} md={4} key={link._id}>
                                            <FloatingLabel
                                                label={`Link-${link._id}`}
                                            >
                                                <Form.Control
                                                    required
                                                    id={link._id}
                                                    type="text"
                                                    name="Link"
                                                    value={link.url}
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                    className="mt-3"
                                                    onChange={
                                                        arrayChangeHandler
                                                    }
                                                    disabled={submitting}
                                                />
                                            </FloatingLabel>
                                            <div
                                                className="d-flex justify-content-end mt-2 mb-1"
                                                id={link._id}
                                            >
                                                <Button
                                                    variant="danger"
                                                    onClick={deleteHandler}
                                                    id={link._id}
                                                    size="sm"
                                                    name="Link"
                                                    disabled={submitting}
                                                >
                                                    Delete{" "}
                                                    <MdOutlineDelete
                                                        size={20}
                                                    />
                                                </Button>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            )}

                            {active === "Members" && (
                                <Row>
                                    <div className="mt-3">
                                        <h5 className="mb-3">Members</h5>
                                    </div>
                                    {h.members.length === 0 && (
                                        <h6 className="mt-4">
                                            No members present
                                        </h6>
                                    )}
                                    {h.members.map((mem) => (
                                        <Col sm={6} lg={4} key={mem._id}>
                                            <Card>
                                                <Card.Body>
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <b
                                                            style={{
                                                                color:
                                                                    mem._id ===
                                                                    h.ownerId
                                                                        ? "red"
                                                                        : "black",
                                                            }}
                                                        >
                                                            {mem._id ===
                                                            h.ownerId
                                                                ? "OWNER"
                                                                : "MEMBER"}
                                                        </b>
                                                        <Link
                                                            to={`/account/${mem._id}`}
                                                        >
                                                            VIEW
                                                        </Link>
                                                    </div>
                                                    <h5>
                                                        {mem.fname +
                                                            " " +
                                                            mem.lname}
                                                    </h5>
                                                    <b>{mem.college}</b>
                                                    <br />
                                                    <a
                                                        href={`mailto:${mem.email}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {mem.email}
                                                    </a>
                                                    <div className="mt-3">
                                                        <small>
                                                            <i>
                                                                ID : {mem._id}
                                                            </i>
                                                        </small>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <div
                                                className="d-flex justify-content-end mt-2 mb-1"
                                                id={mem._id}
                                            >
                                                <Button
                                                    variant="danger"
                                                    onClick={deleteHandler}
                                                    id={mem._id}
                                                    size="sm"
                                                    name="Member"
                                                    disabled={
                                                        submitting ||
                                                        mem._id === h.ownerId
                                                    }
                                                >
                                                    Delete{" "}
                                                    <MdOutlineDelete
                                                        size={20}
                                                    />
                                                </Button>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Form>
                    </div>
                )}
            </Col>
        </Row>
    );
};

export default HackPage;
