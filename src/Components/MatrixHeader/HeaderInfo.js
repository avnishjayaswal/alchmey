import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const HeaderInfo = () => {
  let r, g, b, MovesleftVal = 0;
  const user = useSelector((state) => state.user.user);
  const info = useSelector((state) => state.user);
  const closestColor = useSelector((state) => state.user.closestColor);
  const deltaValue = useSelector((state) => state.user.deltaValue);


  if (!isEmpty(user)) {
    r = user?.target[0];
    g = user?.target[1];
    b = user?.target[2];
    MovesleftVal = info?.MovesLeft;
  }

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <h4>RGB Alchmey</h4>
        </div>
      </div>
      <div className="row justify-content-md-center mt-2">
        <div className="col-md-auto">User ID</div>
        <div className="col-md-auto">{user?.userId}</div>
      </div>
      <div className="row justify-content-md-center  mt-2">
        <div className="col-md-auto">Moves Left</div>
        <div className="col-md-auto">{MovesleftVal}</div>
      </div>
      <div className="row justify-content-md-center  mt-2">
        <div className="col-md-auto">Target Color</div>
        <div className="col-md-auto">
          <span
            className="square"
            style={{ backgroundColor: `rgb(${r},${g},${b})` }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
      <div className="row justify-content-md-center  mt-2">
        <div className="col-md-auto">Closest Color</div>
        <div className="col-md-auto">
          <span
            className="square"
            style={{
              backgroundColor: closestColor
                ? `rgb(${closestColor[0]},${closestColor[1]},${closestColor[2]})`
                : "",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <div className="row justify-content-md-center  mt-2">
        <div className="col-md-auto">Delta Value</div>
        <div className="col-md-auto">
          <span
            className="square"
          >
            {Math.round(deltaValue)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
