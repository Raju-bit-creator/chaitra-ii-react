import React from "react";

const Alert = (props) => {
  return (
    <div>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.type}:</strong> {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
