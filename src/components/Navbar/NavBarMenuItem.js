/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom"

const NavBarMenuItem = (props) => {
  // console.log(props.title, props.onClick)
  // let arr = []
  const currentPg = useLocation();

  return props.isDonateButton ? (
    <li className="donate-button" onClick={() => { props.toggleDonet(true) }}>
      <a target="_blank" rel="noreferrer">Donate</a>
    </li>
  ) : (
    <li className={currentPg.pathname === props.route ? "active" : ""} id={props.id}>
      {
        props.target ?
          <a className="a-class" onClick={(event) => { props.onClick(event) }} href={props.route ? props.route : "#"} target={props.target}>
            {props.title}
          </a>
          :
          <Link className="a-class" onClick={(event) => { props.onClick(event) }} to={props.route ? props.route : "#"}>
            {props.title}
          </Link>
      }
    </li>
  );
};

NavBarMenuItem.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  href: PropTypes.func,
  isDonateButton: PropTypes.bool,
};

export default NavBarMenuItem;
