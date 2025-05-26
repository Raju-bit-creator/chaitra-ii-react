import React from "react";
import Smallbanner from "../assets/bg.jpeg";

const SmallBanner = ({ title }) => {
  return (
    <div>
      <img
        src={Smallbanner}
        alt="small banner"
        height={300}
        className="small-banner"
      ></img>
      <h4 className="page-title">{title}</h4>
    </div>
  );
};

export default SmallBanner;
