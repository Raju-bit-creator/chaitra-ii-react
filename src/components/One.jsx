import React from "react";
import Image from "../assets/participant1.jpg";

const One = (props) => {
  return (
    <div className={`bg-${props.mode}`}>
      <div className="container">
        <h4>thsi is our service</h4>
        <div className="col-md-3">
          <div className="card">
            <img src={Image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default One;
