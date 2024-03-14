import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Navbar, Offcanvas } from "react-bootstrap";

import { PiSignOutBold } from "react-icons/pi";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);
  const handleClose = () => setShow(false);

  const [screenSize, getDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  console.log("Screen Width -> ", screenSize.width);

  const pages = [
    {
      url: "home",
    },
    {
      url: "connect",
    },
    {
      url: "interests",
    },
    {
      url: "collabs",
    },
    {
      url: "new",
    },
    {
      url: "account",
    },
  ];

  return (
    <>
      <Navbar sticky="top" className="d-flex justify-content-between pt-3">
        <h3>
          <b>tinDEV</b>
        </h3>
        <div className="d-flex justify-content-around">
          {screenSize.width >= 850 ? (
            <>
              {pages.map((page) => (
                <b
                  className="ms-4"
                  style={{ cursor: "pointer", color: "#2636bf" }}
                >
                  <Link style={{ textDecoration: "none" }} to={`/${page.url}`}>
                    {page.url.toUpperCase()}
                  </Link>
                </b>
              ))}
              <PiSignOutBold
                className="ms-4"
                size={27}
                style={{ cursor: "pointer", color: "red" }}
              />
            </>
          ) : (
            <>
              {!show ? (
                <>
                  <PiSignOutBold
                    size={27}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                  <FaBars
                    className="ms-4"
                    size={25}
                    onClick={handleShow}
                    style={{ cursor: "pointer" }}
                  />
                </>
              ) : (
                <>
                  <PiSignOutBold
                    size={27}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                  <ImCross
                    size={25}
                    style={{ cursor: "pointer" }}
                    className="ms-4"
                  />
                  <Offcanvas show={show} onHide={handleClose} scroll={false}>
                    <Offcanvas.Header className="d-flex justify-content-between">
                      <h3>
                        <b>tinDEV</b>
                      </h3>
                      <ImCross
                        size={25}
                        onClick={handleClose}
                        style={{ cursor: "pointer" }}
                      />
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      {pages.map((page) => (
                        <h6 className="mb-4">
                          <b style={{ cursor: "pointer", color: "#2636bf" }}>
                            {page.url.toUpperCase()} {page.icon}
                          </b>
                        </h6>
                      ))}
                      <div
                        className="mt-5"
                        style={{
                          cursor: "pointer",
                          color: "red",
                          textDecoration: "underline",
                        }}
                      >
                        <h6>
                          Sign Out
                          <PiSignOutBold className="ms-1" size={20} />
                        </h6>
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                </>
              )}
            </>
          )}
        </div>
      </Navbar>
    </>
  );
};

export default Header;
