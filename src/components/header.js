import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Badge } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cart = useSelector((state) => state.cart.cart);

  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <NavLink className="text-decoration-none text-light mr-5 " to="/">
          Products
        </NavLink>
        <NavLink className="text-decoration-none text-light" to="/contact">
          Contact
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavLink to={"/cart"} className="text-decoration-none text-light">
            <Badge badgeContent={totalQuantity} color="primary">
              <i
                className="fa-solid fa-cart-shopping text-light cart-icon"
                style={{
                  fontSize: 25,
                  cursor: "pointer",
                }}
              ></i>
            </Badge>
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
