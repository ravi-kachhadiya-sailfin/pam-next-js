import React from "react";
import { Para } from "./Editorial";
const Member = (props) => {
  return (
    <div className="healthcare-member-card">
      <img alt={props.alt} src={props.img.src} />
      <Para className="normal-primary-text font-weight-bold text-align-center">{props.name}</Para>
      {/* <SubParaTitle style={{ fontSize: 28, marginTop: "-17px" }}>{props.sub}</SubParaTitle>
      <div style={{ width: "80%", fontSize: "20px", color: "#09425A" }}>{props.details}</div> */}
    </div>
  )
}

Member.propTypes = {};

export default Member;
