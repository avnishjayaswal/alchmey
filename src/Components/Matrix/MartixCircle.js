import React from "react";

const MartixCircle = (props) => {
  return (
    <>
      <div
        id={`${props.rowPos}-${props.colPos}`}
        title={`rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})`}
        className="rounded-circle"
        style={{ width: "10px", margin: "2px" , backgroundColor: `rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})`}}
        onClick={props.onClick}
        onDragOver={(e) => {
          props.getSourceDetail(props.rowPos, props.colPos, props.rgb);
        }}
      >
       &nbsp;
      </div>
    </>
  );
};

export default MartixCircle;
